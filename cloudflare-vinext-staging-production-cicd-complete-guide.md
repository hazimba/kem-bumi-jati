# Cloudflare Workers + Vinext: Complete Staging and Production CI/CD Guide

**Reusable reference for Next.js/Vinext projects developed in VS Code,
stored on GitHub, and hosted on Cloudflare Workers.**

Example project: **Kem Bumi Jati**. Replace its names and domains for
another project.

> **Scope:** This describes the setup discussed and tested for Kem Bumi
> Jati as of October 2026. CLI flags, APIs, and Cloudflare dashboard
> labels can change. Validate commands against your installed versions
> before using them in a new project.

## 1. What the deployment architecture looks like

### Current setup: staging automatic, production manual

``` text
VS Code (staging branch)
  -> git commit + git push origin staging
  -> GitHub Actions: deploy-staging.yml
  -> Cloudflare staging application Worker
  -> staging.kembumijati.com

VS Code (main branch)
  -> npm run deploy:vinext (LOCAL TERMINAL)
  -> Cloudflare production application Worker
  -> www.kembumijati.com
```

**Important:** Pushing `main` to GitHub does **not** deploy production
in this current setup. A local production deployment may also contain
uncommitted code, so the live site and GitHub's `main` can differ.
Prefer deploying a committed, tested `main` revision.

  ---------------------------------------------------------------------------------------------------------------------------
  Resource                Production                                    Staging
  ----------------------- --------------------------------------------- -----------------------------------------------------
  Git branch              `main`                                        `staging`

  Application Worker      `kem-bumi-jati`                               `kem-bumi-jati-staging`

  Response Store Worker   `kem-bumi-jati-response-store`                `kem-bumi-jati-staging-response-store`

  R2 cache bucket         `kem-bumi-jati-response-store-cache-bodies`   `kem-bumi-jati-staging-response-store-cache-bodies`

  Domain                  `www.kembumijati.com`                         `staging.kembumijati.com`

  Deploy trigger          Manual CLI                                    GitHub push to `staging`
  ---------------------------------------------------------------------------------------------------------------------------

The **application Worker** runs the website. The **Response Store
Worker** provides caching through an **R2 bucket**. Separate Workers and
buckets prevent staging cache tests from interfering with production
cache.

**Database caution:** Separate Workers and caches do **not** isolate
Supabase or other databases. If both deployments use the same Supabase
credentials, staging may still read or modify production data. For true
isolation, create a separate staging database/project and secrets.

## 2. Prerequisites

-   A Next.js app configured for Vinext on Cloudflare Workers.
-   A GitHub repository with a `main` branch.
-   Cloudflare account and a domain already managed in Cloudflare (for
    example `kembumijati.com`).
-   Node.js and npm installed (the example uses Node.js 22).
-   Project dependencies installed (`npm ci` or `npm install`).
-   Cloudflare R2 enabled on the account.
-   Existing production deployment working before modifying its
    configuration.

Keep a backup or commit of the working production configuration before
starting.

## 3. Create and publish the staging branch

From the VS Code terminal:

``` bash
git switch main
git pull origin main
git switch -c staging
git push -u origin staging
```

For later work:

``` bash
git switch staging
# Edit files in VS Code
git add .
git commit -m "Update staging features"
git push origin staging
```

The GitHub Actions workflow will listen for pushes to this branch. A
branch alone does **not** create a Cloudflare staging environment; the
separate infrastructure and deployment workflow must also be configured.

## 4. Create Cloudflare credentials for GitHub Actions

1.  In Cloudflare, open **My Profile → API Tokens → Create Token**.
2.  Start with the **Edit Cloudflare Workers** template. Scope it to the
    relevant account and zone; adjust permissions only if the actual
    deployment requires more.
3.  Copy the token once. Never commit it.
4.  Find your **Account ID** from the Cloudflare account dashboard /
    Workers & Pages account details.
5.  In GitHub, open **Repository → Settings → Secrets and variables →
    Actions → New repository secret**.
6.  Add `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID`.

GitHub Actions passes these as environment variables to the Cloudflare
CLI. **GitHub detects the push and runs the CLI; Cloudflare does not
need to poll your repository.**

## 5. Files and folders changed

``` text
my-project/
├── .github/
│   └── workflows/
│       ├── deploy-staging.yml       # NEW: auto-deploy staging
│       └── deploy-production.yml    # OPTIONAL: auto-deploy production later
├── cloudflare.config.ts             # EDIT: environment-specific Workers and cache
├── vite.config.ts                   # EDIT: auxiliary Response Store Workers
├── package.json                     # EDIT: npm deployment scripts
├── package-lock.json                # Existing: npm ci uses this
├── .env.staging                      # OPTIONAL: nonsecret build-time staging settings
└── ... app source files ...
```

**Do not commit** `.env` files containing secrets. Put runtime secrets
in the correct Cloudflare Worker environment and build-time secrets in
GitHub Actions secrets when needed. GitHub secrets do not automatically
become deployed Worker runtime secrets.

## 6. Configure separate Cloudflare Workers and R2 caches

### `cloudflare.config.ts`

``` ts
import { bindings, defineConfig, defineWorker } from "cf/config";
import { createWorkersResponseStoreServiceBindingConfig } from "@vinext/cloudflare/cache/config";

const productionResponseStore =
  await createWorkersResponseStoreServiceBindingConfig({
    worker: {
      name: "kem-bumi-jati-response-store",
      compatibilityDate: "2026-10-28",
      compatibilityFlags: ["nodejs_compat"],
    },
    bucket: "kem-bumi-jati-response-store-cache-bodies",
  });

const stagingResponseStore =
  await createWorkersResponseStoreServiceBindingConfig({
    worker: {
      name: "kem-bumi-jati-staging-response-store",
      compatibilityDate: "2026-10-28",
      compatibilityFlags: ["nodejs_compat"],
    },
    bucket: "kem-bumi-jati-staging-response-store-cache-bodies",
  });

export const productionResponseStoreServiceBinding =
  productionResponseStore.serviceBindingWorker;
export const stagingResponseStoreServiceBinding =
  stagingResponseStore.serviceBindingWorker;

export default defineConfig(({ mode }) => {
  const isStaging = mode === "staging";
  const responseStore = isStaging
    ? stagingResponseStore
    : productionResponseStore;

  return {
    worker: defineWorker({
      ...responseStore.applicationWorker,
      name: isStaging ? "kem-bumi-jati-staging" : "kem-bumi-jati",
      entrypoint: "vinext/server/fetch-handler",
      compatibilityDate: "2026-10-28",
      compatibilityFlags: ["nodejs_compat"],
      assets: {
        htmlHandling: "none",
        notFoundHandling: "none",
        runWorkerFirst: ["/*", "!/_next/static/*", "!/*/_next/static/*"],
      },
      env: {
        ...responseStore.applicationWorker.env,
        ASSETS: bindings.assets(),
        IMAGES: bindings.images(),
      },
    }),
  };
});
```

The Worker name is configured here because
`vinext-cloudflare deploy --name ...` is **not supported** for this
`cloudflare.config.ts`-based project. An earlier attempt failed with
that exact error; do not use `--name` in the workflow.

### `vite.config.ts`

``` ts
import { defineConfig } from "vite";
import vinext from "vinext";
import { cloudflare } from "@cloudflare/vite-plugin";
import {
  productionResponseStoreServiceBinding,
  stagingResponseStoreServiceBinding,
} from "./cloudflare.config";
import { responseStoreAdapter } from "@vinext/cloudflare/cache/response-store-adapter";
import { imagesOptimizer } from "@vinext/cloudflare/images/images-optimizer";

export default defineConfig({
  plugins: [
    vinext({
      cache: responseStoreAdapter(),
      images: { optimizer: imagesOptimizer() },
    }),
    cloudflare({
      auxiliaryWorkers: [
        { config: productionResponseStoreServiceBinding },
        { config: stagingResponseStoreServiceBinding },
      ],
      viteEnvironment: {
        name: "rsc",
        childEnvironments: ["ssr"],
      },
    }),
  ],
});
```

This example registers both auxiliary cache Workers for builds; deploy
**only the environment's named Response Store Worker** in the relevant
command.

## 7. How `const isStaging = mode === "staging"` actually works

`mode` is provided by the **configuration tool** when it evaluates
`defineConfig`. It is **not** the Git branch name, not the URL hostname,
and not automatically determined by Cloudflare DNS.

``` ts
export default defineConfig(({ mode }) => {
  const isStaging = mode === "staging";
  // ...
});
```

### What selects the mode?

  ------------------------------------------------------------------------------------------------------------
  Command                                        Selected mode     `isStaging`       Application Worker
  ---------------------------------------------- ----------------- ----------------- -------------------------
  `npx vite build --mode staging`                `staging`         `true`            `kem-bumi-jati-staging`

  `npx vinext-cloudflare deploy --env staging`   staging           `true`            `kem-bumi-jati-staging`
                                                 deployment mode                     
                                                 (for this CLI                       
                                                 setup)                              

  `npm run deploy:vinext`                        default           `false`           `kem-bumi-jati`
                                                 production                          
                                                 deployment mode                     

  `npx vite build --mode production`             `production`      `false`           `kem-bumi-jati`
  ------------------------------------------------------------------------------------------------------------

**Illustration:** `"staging" === "staging"` is `true`;
`"production" === "staging"` is `false`.

The expression is evaluated when the configuration loads. Then it
selects **both** the application Worker name and matching cache binding.

**Important nuance:** `--env staging` is the Vinext deploy CLI's option
in this project, while `--mode staging` is Vite's build option. They are
not universally interchangeable across tools. Verify the selected Worker
name in build/deploy output when using new CLI versions.

### `.env.staging` vs Cloudflare Worker secrets

A Vite staging mode may load `.env.staging` for **build-time** settings,
but it does not automatically isolate database credentials or set
Cloudflare runtime secrets. For a real staging database, configure
separate Worker bindings/secrets and ensure the application reads the
correct values. Do not expose server secrets via client-side `VITE_`
variables.

## 8. `package.json` deployment scripts

Add these scripts to the existing `scripts` object (do not remove
unrelated scripts):

``` json
{
  "scripts": {
    "dev:vinext": "vite dev --port 3001",
    "build:vinext": "vite build",
    "deploy:vinext": "vinext-cloudflare deploy",
    "deploy:staging": "vinext-cloudflare deploy --env staging",
    "deploy:response-store": "cf deploy --prebuilt --mode production --worker kem-bumi-jati-response-store",
    "deploy:response-store:staging": "cf deploy --prebuilt --mode staging --worker kem-bumi-jati-staging-response-store"
  }
}
```

This is an **excerpt**; preserve `dev`, `build`, `start`, `lint`, and
other existing scripts.

## 9. First-time infrastructure setup (from terminal)

**Yes: first create the staging cache bucket and deploy its auxiliary
Worker before relying on automatic staging deployment.** This is an
initial provisioning step, not something you normally repeat on every
code edit.

### A. Create the staging R2 bucket (once)

``` bash
npx wrangler r2 bucket create kem-bumi-jati-staging-response-store-cache-bodies
```

R2 must already be enabled. If the bucket already exists, verify its
name rather than recreating it.

### B. Build staging

``` bash
npx vite build --mode staging
```

In the actual Kem Bumi Jati test, the build succeeded and produced
bundles for:

``` text
.cloudflare/output/v0/workers/kem-bumi-jati-response-store/...
.cloudflare/output/v0/workers/kem-bumi-jati-staging-response-store/...
```

**Both bundles appearing is expected** with the `auxiliaryWorkers`
configuration. It does **not** mean both Workers were deployed or
changed.

### C. Deploy the staging Response Store Worker

``` bash
npm run deploy:response-store:staging
```

This deploys the prebuilt `kem-bumi-jati-staging-response-store`
auxiliary Worker. If the CLI reports a missing prebuilt artifact,
rebuild in staging mode first. If it reports an R2 bucket error, confirm
the bucket exists in the correct Cloudflare account.

### D. Deploy the staging application Worker

``` bash
npm run deploy:staging
```

Confirm the Cloudflare dashboard shows:

``` text
kem-bumi-jati                     # Existing production application
kem-bumi-jati-response-store      # Existing production cache
kem-bumi-jati-staging             # New staging application
kem-bumi-jati-staging-response-store # New staging cache
```

**Do not use `npm run deploy:vinext` to initialize staging**: without
the staging option it targets production.

## 10. Connect the permanent staging domain

In Cloudflare:

1.  Open **Workers & Pages → `kem-bumi-jati-staging`**.
2.  Find **Domains & Routes → Custom domains → Add a custom domain**.
3.  Choose the existing Cloudflare zone `kembumijati.com`.
4.  Enter subdomain `staging`.
5.  If the dialog says **Enable for: Production**, leave it selected: it
    refers to the active deployment of **this staging-named Worker**,
    not the `kem-bumi-jati` production Worker.
6.  Confirm **Add domain** and wait for DNS/TLS activation.
7.  Open `https://staging.kembumijati.com`.

**Do not** create a new Cloudflare zone named `staging.kembumijati.com`.
You already own the parent domain. **Do not** add a wildcard route such
as `*.kembumijati.com/*`; it may capture other subdomains.

A `*.workers.dev` URL for the staging Worker can help test before the
custom domain becomes active.

## 11. Add GitHub Actions for automatic staging deployment

Create:

``` text
.github/workflows/deploy-staging.yml
```

``` yaml
name: Deploy Kem Bumi Jati Staging

on:
  push:
    branches:
      - staging
  workflow_dispatch:

permissions:
  contents: read

concurrency:
  group: deploy-staging
  cancel-in-progress: false

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Set up Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: npm

      - name: Install dependencies
        run: npm ci

      - name: Build staging
        run: npx vite build --mode staging

      - name: Deploy staging Response Store
        run: npm run deploy:response-store:staging
        env:
          CLOUDFLARE_API_TOKEN: ${{ secrets.CLOUDFLARE_API_TOKEN }}
          CLOUDFLARE_ACCOUNT_ID: ${{ secrets.CLOUDFLARE_ACCOUNT_ID }}

      - name: Deploy staging application
        run: npm run deploy:staging
        env:
          CLOUDFLARE_API_TOKEN: ${{ secrets.CLOUDFLARE_API_TOKEN }}
          CLOUDFLARE_ACCOUNT_ID: ${{ secrets.CLOUDFLARE_ACCOUNT_ID }}
```

This example rebuilds and deploys the staging Response Store on each
push for simplicity. You can optimize that step after the initial setup
is reliable.

**First run checklist:** `npm ci` needs a committed lockfile; the token
needs sufficient permissions; the R2 bucket must already exist; the
selected Worker name must be staging; any build-time environment
variables must be provided to the build step.

Commit and push the workflow **on the staging branch**:

``` bash
git switch staging
git add .github/workflows/deploy-staging.yml cloudflare.config.ts vite.config.ts package.json package-lock.json
git commit -m "Configure staging CI/CD"
git push origin staging
```

If a listed file was not changed, Git simply skips it. GitHub Actions
detects the push and runs the workflow. Check **GitHub → Actions →
Deploy Kem Bumi Jati Staging** for green checks and logs.

## 12. Daily workflow: staging to production

### Develop and auto-deploy staging

``` bash
git switch staging
# Edit and test in VS Code
git add .
git commit -m "Implement feature"
git push origin staging
```

Wait for GitHub Actions success. Test `https://staging.kembumijati.com`.

### Promote tested code to production

``` bash
git switch main
git pull origin main
git merge staging
# Resolve conflicts and run tests if needed
npm run deploy:vinext
# Keep GitHub's main in sync with the deployed code
git push origin main
```

The current `deploy-staging.yml` only watches `staging`, so pushing
`main` **does not** automatically deploy production. Production remains
a manual CLI step.

**Suggested improvement:** For repeatable releases, commit/push `main`
before the manual deployment, and record the commit hash deployed.
Otherwise the live site may differ from GitHub.

## 13. Optional future upgrade: automatic production CI/CD

If you later want **both** environments deployed from GitHub, add a
separate production workflow, ideally with a protected GitHub
Environment requiring approval.

Create:

``` text
.github/workflows/deploy-production.yml
```

``` yaml
name: Deploy Kem Bumi Jati Production

on:
  push:
    branches:
      - main
  workflow_dispatch:

permissions:
  contents: read

concurrency:
  group: deploy-production
  cancel-in-progress: false

jobs:
  deploy:
    runs-on: ubuntu-latest
    environment: production
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: npm
      - run: npm ci
      - name: Build production
        run: npx vite build --mode production
      - name: Deploy production Response Store
        run: npm run deploy:response-store
        env:
          CLOUDFLARE_API_TOKEN: ${{ secrets.CLOUDFLARE_API_TOKEN }}
          CLOUDFLARE_ACCOUNT_ID: ${{ secrets.CLOUDFLARE_ACCOUNT_ID }}
      - name: Deploy production application
        run: npm run deploy:vinext
        env:
          CLOUDFLARE_API_TOKEN: ${{ secrets.CLOUDFLARE_API_TOKEN }}
          CLOUDFLARE_ACCOUNT_ID: ${{ secrets.CLOUDFLARE_ACCOUNT_ID }}
```

**Only add this if you want automatic production deployments.**
Configure GitHub's `production` Environment protection and environment
secrets before enabling. When enabled, every push to `main` triggers
production deployment unless blocked by approval rules. You may then
retire the manual production process.

## 14. Troubleshooting

  -------------------------------------------------------------------------------------------------
  Problem                                                       Likely reason / fix
  ------------------------------------------------------------- -----------------------------------
  `--name is not supported for cloudflare.config.ts projects`   Remove `--name`; set the Worker
                                                                name in `cloudflare.config.ts`.

  Staging push updates production                               Stop deploying; verify
                                                                `--env staging`, mode selection,
                                                                Worker name, and cache binding
                                                                before rerunning.

  GitHub Actions doesn't run                                    Check workflow file path, branch
                                                                name, workflow permissions, and
                                                                whether the YAML is committed on
                                                                `staging`.

  `npm ci` fails                                                Check `package-lock.json` is
                                                                committed and consistent with
                                                                `package.json`.

  R2 bucket not found                                           Enable R2 and create the correct
                                                                staging bucket in the same account.

  Response Store binding error                                  Deploy the staging Response Store
                                                                Worker before the application
                                                                Worker.

  Build succeeds but website unchanged                          Confirm deployment job succeeded,
                                                                Worker name is correct, and domain
                                                                points to that Worker; check
                                                                caching.

  Staging URL shows the production database                     Separate Supabase projects and
                                                                runtime credentials; Worker
                                                                separation alone does not isolate
                                                                data.

  `staging.kembumijati.com` does not open                       Check custom-domain status, DNS/TLS
                                                                activation, and whether it is
                                                                attached to the staging application
                                                                Worker.

  Both Response Store bundles appear during staging build       Normal with both auxiliary Workers
                                                                registered; building does not
                                                                deploy either one.
  -------------------------------------------------------------------------------------------------

## 15. Generic project setup checklist

When copying this pattern to another project:

-   [ ] Replace `kem-bumi-jati` and `kembumijati.com` throughout.
-   [ ] Confirm the new project actually uses Vinext and Workers
    Response Store; omit cache infrastructure if it doesn't.
-   [ ] Verify installed Vinext, Vite, Cloudflare Vite plugin, and `cf`
    CLI commands.
-   [ ] Create `staging` branch from a known-good `main`.
-   [ ] Create a separate staging application Worker name.
-   [ ] Create separate cache Worker and R2 bucket if applicable.
-   [ ] Configure separate databases, secrets, and third-party
    credentials if needed.
-   [ ] Build in staging mode and verify the selected Worker name.
-   [ ] Provision bucket, deploy cache Worker, then application Worker.
-   [ ] Attach staging subdomain as a **Custom Domain** to staging
    Worker.
-   [ ] Create Cloudflare API token and GitHub secrets.
-   [ ] Commit `.github/workflows/deploy-staging.yml` to `staging`.
-   [ ] Push a harmless change and confirm GitHub Actions + staging URL.
-   [ ] Decide whether production remains manual or gets its own
    protected workflow.
-   [ ] Verify staging and production do not share sensitive production
    data.

## 16. Quick command reference

``` bash
# One-time branch setup
git switch main && git pull origin main
git switch -c staging && git push -u origin staging

# One-time staging cache storage
npx wrangler r2 bucket create kem-bumi-jati-staging-response-store-cache-bodies

# First staging deployment / local troubleshooting
npx vite build --mode staging
npm run deploy:response-store:staging
npm run deploy:staging

# Daily staging deployment (GitHub Actions)
git switch staging
git add . && git commit -m "Update staging"
git push origin staging

# Current manual production deployment
git switch main
npm run deploy:vinext
```

------------------------------------------------------------------------

**Key idea:** Git branches control *which code* is checked out. The
deployment command and `mode` control *which Cloudflare Worker* receives
it. GitHub Actions provides the automatic trigger. The custom domain
routes requests to the Worker. Separate storage, secrets, and databases
provide environment isolation.
