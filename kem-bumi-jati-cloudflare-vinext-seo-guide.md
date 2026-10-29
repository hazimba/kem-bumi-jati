# Kem Bumi Jati: Cloudflare + Vinext Deployment and SEO Guide

A beginner-friendly reference for deploying the Kem Bumi Jati website
from VS Code to Cloudflare Workers, understanding the files and
commands, and submitting the site to Google.

> **Website:** `https://www.kembumijati.com`\
> **Project folder on your Mac:** > `/Users/hazimbakar/Documents/project/kem-bumi-jati`\
> **Framework:** Next.js app using Vinext/Vite for Cloudflare Workers\
> **Important:** This guide records the setup and errors encountered
> during the deployment. Cloudflare and Vinext are actively changing, so
> if a command behaves differently later, check the official Vinext
> Cloudflare deployment guide:
> https://vinext.dev/docs/deploying/cloudflare

---

## 1. The big picture: what happens when you deploy?

Think of your website as a shop:

- **Your Mac / VS Code** is where you build and edit the shop.
- **Git** is your notebook of changes.
- **GitHub** is an online backup and collaboration place for your
  source code.
- **Vinext + Vite** prepare your app to run on Cloudflare.
- **Cloudflare Workers** run your website for visitors.
- **Your domain** (`www.kembumijati.com`) is the address people type
  into their browser.
- **Google Search Console** helps Google discover your pages and
  reports how Google sees them.

These are separate actions:

---

Action What it does Does it automatically
do the others?

---

Save a file in VS Code Saves a change on your No
Mac

`git commit` Saves a snapshot in No
your local Git history

`git push` Sends committed changes No
to GitHub

Build Checks/compiles the app No
and creates deployment  
 output

Deploy Uploads a built version No
to Cloudflare

Submit a sitemap Tells Google where your No guarantee of
sitemap is indexing or ranking

---

Deploying directly from the terminal in VS Code does **not** push files
to GitHub. It uploads a built version to Cloudflare. Likewise, pushing
to GitHub does not deploy your site unless you separately configure a
CI/CD workflow.

## 2. Your project setup

The main files involved in this setup are:

- `package.json` --- project dependencies and shortcuts (scripts).
- `vite.config.ts` --- tells Vite/Vinext and Cloudflare how to build
  the app.
- `cloudflare.config.ts` --- describes your Cloudflare Worker and its
  bindings.
- `src/app/` --- your App Router pages, layouts, and route metadata.
- `src/app/robots.ts` --- generates `/robots.txt`.
- `src/app/sitemap.ts` --- generates `/sitemap.xml`.
- `public/` --- static public assets such as images.
- `.gitignore` --- tells Git which generated or private files to
  ignore.
- `.env.local` or other `.env*` files --- may contain secrets; never
  publish their contents.

Your project uses the Cloudflare Workers Response Store adapter. That
setup has a main website Worker and a separate cache/Response Store
Worker.

### Main website Worker vs Response Store Worker

- **Main Worker (`kem-bumi-jati`)**: serves the website.
- **Response Store Worker (`kem-bumi-jati-response-store`)**: stores
  cached response bodies and metadata for the caching adapter.
- **R2 bucket (`kem-bumi-jati-response-store-cache-bodies`)**: object
  storage used by the Response Store.

The Response Store is not the website itself. Your custom domain must be
connected to the **main website Worker**.

---

## 3. One-time setup commands we used

Run commands from the project folder unless a step says otherwise:

```bash
cd "/Users/hazimbakar/Documents/project/kem-bumi-jati"
```

### Check Node.js

The Cloudflare `cf` CLI version installed in this project requires a
newer Node 22 release. We ended up using Node `v22.23.4` through NVM.

```bash
node -v
which node
```

The `node -v` output should be at least `v22.23.0` if using the Node 22
series. `which node` should show the NVM path if NVM is managing Node,
for example:

```text
/Users/your-user/.nvm/versions/node/v22.x.x/bin/node
```

If NVM is installed and you need the latest Node 22 release:

```bash
nvm install 22
nvm use 22
node -v
```

To make Node 22 the default in new terminal windows:

```bash
nvm alias default 22
```

We also tried `brew update` and `brew upgrade node`. Homebrew failed
because the installed Xcode and Command Line Tools were outdated. That
was separate from NVM. We avoided changing/removing Xcode tools and
updated Node using NVM instead.

### Check deployment dependencies

```bash
npm ls vinext @vinext/cloudflare @cloudflare/vite-plugin @cloudflare/workers-response-store cf vite
```

At the time of setup, the reported versions were:

- `vinext@1.3.1`
- `@vinext/cloudflare@1.2.1`
- `@cloudflare/vite-plugin@2.0.0-beta.v.6`
- `@cloudflare/workers-response-store@1.1.3`
- `cf@1.0.0-beta.24`
- `vite@8.3.5`

Versions can change. If deployment breaks after a package update, record
the output of this command before changing dependencies.

We previously ran:

```bash
npm install --save-dev @cloudflare/vite-plugin@beta cf@latest --legacy-peer-deps
```

We used `--legacy-peer-deps` because npm initially reported dependency
peer conflicts involving Babel 7 and Babel 8. It tells npm to proceed
despite peer dependency conflicts; it does not prove every package
combination is fully compatible. Avoid repeatedly upgrading packages
just to silence a warning.

### Initialize Vinext for Cloudflare

The initializer we used was:

```bash
npx vinext init
```

We selected Cloudflare and enabled the Workers Response Store caching
option. The initializer generated/updated the deployment configuration
and scripts.

For a new migration, current Vinext documentation also shows:

```bash
npx vinext init --platform=cloudflare
```

**Do not rerun the initializer casually in this existing project.** It
may modify configuration. Back up/commit your current working tree first
and review any proposed file changes.

### Authenticate with Cloudflare

The current CLI authentication command is:

```bash
npx cf auth login
```

Follow the browser login prompt. Confirm you authenticate to the
Cloudflare account that owns `kembumijati.com`.

You can also check the CLI:

```bash
npx cf --version
```

The installed CLI reported `cf v1.0.0-beta.24` during this deployment.

---

## 4. The deployment commands we used

Your `package.json` currently has scripts similar to:

```json
{
  "dev:vinext": "vite dev --port 3001",
  "build:vinext": "vite build",
  "start:vinext": "vite preview",
  "deploy:vinext": "vinext-cloudflare deploy",
  "deploy:response-store": "cf deploy --prebuilt --mode production --worker kem-bumi-jati-response-store"
}
```

These scripts are shortcuts. `npm run build:vinext` runs `vite build`;
`npm run deploy:response-store` runs the exact `cf deploy ...` command
shown above.

### A. Build the application

```bash
npm run build:vinext
```

This prepares the application for deployment and prints the routes it
recognises. A successful build is a good sign, but it does not itself
publish the website.

### B. Deploy the Response Store Worker

For the first deployment, the documented order for Response Store
service-binding mode is:

```bash
npm run build:vinext
npm run deploy:response-store
npm run deploy:vinext
```

The Response Store Worker is deployed separately because the normal
website deployment does not automatically deploy that auxiliary Worker.

You successfully deployed it. The output included:

```text
Deploy complete
Current Version ID: ...
```

That means Cloudflare accepted the Worker deployment.

### C. Deploy the main website Worker

```bash
npm run deploy:vinext
```

Your script calls `vinext-cloudflare deploy`. Current Vinext
documentation also gives the direct command:

```bash
npx @vinext/cloudflare deploy
```

Use the project's existing script if it works; it is easier to remember.
The direct command is useful if the script is missing or you want to
follow the current documented CLI directly.

A successful deployment normally reports the deployed Worker and a
`workers.dev` URL. Your custom domain `www.kembumijati.com` is attached
to the **main** Worker, not the Response Store Worker.

### D. After the first deployment

For ordinary website code changes, the usual workflow is:

```bash
npm run build:vinext
npm run deploy:vinext
```

If `npm run deploy:vinext` already performs a build in your installed
version, the extra build may be redundant, but keeping the explicit
build step lets you catch build errors before publishing. The official
Vinext deploy command builds the app itself by default.

Redeploy the Response Store only when its own package/configuration or
code needs updating, or if you are following the initial setup sequence.
It is not normally required for every page-content change.

---

## 5. How we connected the domain

Your desired public address is:

- `https://www.kembumijati.com`

The domain is connected through Cloudflare's **Custom Domain** feature
on the main website Worker. In the dashboard:

1.  Open Cloudflare Dashboard.
2.  Go to **Workers & Pages**.
3.  Open the main Worker `kem-bumi-jati`.
4.  Open **Settings → Domains & Routes**.
5.  Choose **Add → Custom Domain**.
6.  Enter `www.kembumijati.com`.

Cloudflare can create the required DNS record and issue the HTTPS
certificate when the zone/domain is correctly set up in Cloudflare. The
domain must be active in the account, and an existing conflicting CNAME
can prevent adding a custom domain.

If you also want the root domain `https://kembumijati.com`, set that up
too, then choose one canonical version and redirect the other to it.
Avoid maintaining two independently indexable versions of the same
pages.

---

## 6. Errors we encountered and what they mean

### Error 1 --- npm `ERESOLVE` / peer dependency conflict

**What happened:** npm initially refused to install the packages because
some peer dependency requirements conflicted, including Babel major
versions.

**What we did:** installed with `--legacy-peer-deps`, then later updated
the Cloudflare Vite plugin.

**What it means:** npm could not find a dependency tree that satisfied
all peer requirements. The workaround lets installation continue, but it
can hide an incompatible package combination. If builds later fail in a
package-related way, check the exact installed versions and Vinext's
current compatibility guidance before trying random upgrades.

### Error 2 --- Node.js engine warning

**What happened:** `cf@1.0.0-beta.24` warned that it requires Node
`^22.23.0 || ^24.22.0 || ^26.12.0`, while the active Node version was
`v22.21.1`.

**What we did:** Homebrew upgrade failed because Xcode/Command Line
Tools were outdated, so we used NVM and reached Node `v22.23.4`.

**What it means:** a CLI package declared a minimum Node version newer
than the active runtime. Updating NVM's Node version fixed that
mismatch. It was not a website code error.

### Error 3 --- `.cloudflare/output/v0/config.json` missing

**What happened:** `cf deploy --prebuilt` complained that it could not
find `.cloudflare/output/v0/config.json`.

**What we did:** investigated versions and updated
`@cloudflare/vite-plugin` from `1.65.0` to `2.0.0-beta.v.6`.

**What it means:** the `cf` CLI was expecting Cloudflare Build Output,
but the build path/version/configuration had not generated the expected
output at that point. Do not manually create that JSON file. It is
generated build output. Build/deploy using the Vinext Cloudflare
workflow and inspect the actual error if it returns.

### Error 4 --- R2 bucket not found

**What happened:** Response Store deployment failed with:

```text
R2 bucket 'kem-bumi-jati-response-store-cache-bodies' not found.
```

**What it means:** the Worker config referred to an R2 bucket that was
not yet available in the account.

### Error 5 --- R2 API error `10042`

**What happened:** `npx wrangler r2 bucket list` returned:

```text
Please enable R2 through the Cloudflare Dashboard. [code: 10042]
```

**What we did:** enabled R2 in Cloudflare Dashboard and retried the
Response Store deployment. It eventually succeeded.

**What it means:** R2 needed activation for the Cloudflare account
before the bucket binding could work. R2 storage/operations may incur
charges beyond the account's free allowance, so review the current
pricing and usage dashboard if cost matters.

### Error 6 --- Tailwind CSS import path

**What happened:** Vite's CSS pipeline tried to resolve a root-level
`tailwindcss` file after the CSS had `@import "tailwindcss";`.

**What we changed:** `src/app/globals.css` was changed to:

```css
@import "tailwindcss/index.css";
```

That was a project-specific workaround encountered with the current
Vite/Tailwind setup. If Tailwind styles break after future package
upgrades, inspect the build output before changing this line back or
forward.

### Error 7 --- oversized `test.jpg` asset

**What happened:** `vite preview` once reported a
`dist/client/assets/test.jpg` of 39.7 MiB, above the Workers static
asset size limit.

**What we checked:** the file could not later be found in `dist` or the
source tree; it appeared to be stale build output. Do not assume the
image still exists. If the error returns, inspect `dist` and source
assets for unexpectedly large files and clean only generated output
after confirming the paths.

### Error 8 --- Vinext local dev routes returned 404

**What happened:** `npm run dev:vinext` returned 404s for app routes
during early testing, while build/start worked later.

**What it means:** the local dev route resolution/configuration was not
behaving as expected at that point. It was not proof that production
deployment would fail. If it recurs, capture the exact output and check
current Vinext compatibility/issue notes.

### Error 9 --- `vinext start` said the Response Store adapter must run through the generated Cloudflare worker

**What happened:** local `npx vinext start` logged:

```text
The Workers Response Store adapter must run through its generated Cloudflare worker entry.
```

**What it means:** the adapter relies on Cloudflare Worker
bindings/runtime and cannot fully initialise under the generic local
Vinext server. The local server could still render pages using its
fallback cache handler. Test Cloudflare-specific cache behaviour on a
deployed Worker or the supported Cloudflare local runtime.

### Error 10 --- `next/image` images did not display

**What happened:** gallery images hosted in Supabase Storage did not
display correctly with `next/image` under this setup.

**What we changed:** the gallery client component switched to a native
`<img src={img.url}>`, and the images displayed.

**What it means:** the current image optimisation/runtime setup wasn't
working as expected for that component. The native image element avoids
the Vinext image optimizer. This works, but images may need manual
performance improvements (correct dimensions, compressed files, lazy
loading). Do not switch back to `next/image` without testing the
Cloudflare Images binding and optimizer in production.

### Warning --- npm audit reported vulnerabilities

**What happened:** npm reported audit findings after package changes.

**What it means:** one or more packages in the dependency tree have
advisories. It does not automatically mean the deployed website is
compromised. Review with:

```bash
npm audit
```

Do not blindly run `npm audit fix --force`; that can install breaking
major versions. Review the affected package, whether it is used at
runtime or only during development, and the recommended fix first.

---

## 7. SEO: what `robots.ts` and `sitemap.ts` do

SEO means helping search engines understand your website. These files
help Google discover and crawl pages, but **they do not guarantee
first-page ranking**.

### `src/app/robots.ts`

This generates:

```text
https://www.kembumijati.com/robots.txt
```

Think of it as a public set of instructions for crawlers. It can
allow/disallow paths and point to the sitemap. It is **not security**; a
private/admin route still needs real authentication and authorisation.

A basic example for a public business site:

```ts
import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin/", "/api/"],
    },
    sitemap: "https://www.kembumijati.com/sitemap.xml",
  };
}
```

Adapt it to your actual routes. Do not block public pages you want
Google to find. Robots rules do not remove an already indexed URL by
themselves.

### `src/app/sitemap.ts`

This generates:

```text
https://www.kembumijati.com/sitemap.xml
```

Think of it as a list of the public pages you want Google to discover.
Only include URLs that exist, return successfully, are canonical, and
should appear in search results.

Example only (verify every route against your real app):

```ts
import type { MetadataRoute } from "next";

const baseUrl = "https://www.kembumijati.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/about-us", "/activity", "/fasiliti", "/galeri", "/hubungi-kami", "/latar-belakang", "/lokasi-kami", "/pakej"];

  return pages.map((page) => ({
    url: `${baseUrl}${page}`,
  }));
}
```

Your project has dynamic facility pages such as `/fasiliti/[slug]`.
Include real public facility URLs if they are intended to be indexed; a
literal URL containing `[slug]` should not be included. Do not include
`/admin`, `/login`, private pages, API endpoints, or duplicate routes.
If `/utama` and `/` show the same content, choose one canonical URL and
redirect or canonicalise the duplicate.

### Metadata and canonical URLs

Your `src/app/layout.tsx` contains site-wide metadata. Confirm the site
title, description, Open Graph data and `metadataBase` use the real
production domain. If the preferred host is `www`, use it consistently
in canonical URLs and the sitemap.

The existing layout had a placeholder:

```ts
verification: {
  google: "YOUR_GOOGLE_SEARCH_CONSOLE_CODE",
},
```

Replace it with the real Google verification token **only if using
HTML-tag verification**, or remove the placeholder if you verify the
domain using a DNS TXT record. Leaving a fake placeholder will not
verify ownership.

### Build and deploy after SEO changes

```bash
npm run build:vinext
npm run deploy:vinext
```

Then visit both URLs in a browser:

- https://www.kembumijati.com/robots.txt
- https://www.kembumijati.com/sitemap.xml

Check that they load and that the sitemap contains valid XML with the
right URLs. Do not assume they work just because the build succeeded.

---

## 8. Google Search Console: connect Google to your site

Search Console is Google's dashboard for site ownership, indexing
reports, search queries, impressions and clicks.

### Step 1 --- Add a Domain property

1.  Open https://search.google.com/search-console/
2.  Choose **Add property**.
3.  Choose **Domain**.
4.  Enter `kembumijati.com` (no `https://` and no `www`).

A Domain property covers both `www.kembumijati.com` and
`kembumijati.com`, including protocols.

### Step 2 --- Verify with DNS

1.  Google shows a DNS TXT record.
2.  Open the Cloudflare Dashboard for `kembumijati.com`.
3.  Open **DNS → Records** and add the TXT record exactly as Google
    provides it.
4.  Return to Search Console and click **Verify**.
5.  Leave the TXT record in DNS so verification remains valid.

Do not paste the token publicly or commit it to Git.

### Step 3 --- Submit the sitemap

1.  Select your property in Search Console.
2.  Open **Sitemaps**.
3.  Enter `sitemap.xml` under "Add a new sitemap".
4.  Click **Submit**.
5.  Review the reported status and errors.

Submitting the sitemap helps Google discover URLs; it does not guarantee
indexing.

### Step 4 --- Request indexing for important pages

1.  Open **URL Inspection** in Search Console.
2.  Enter `https://www.kembumijati.com/`.
3.  If Google can access it, click **Request indexing**.
4.  Repeat for a few important public pages, such as Facilities, About
    Us, and Contact.

Do not repeatedly request the same URLs. Google decides when and whether
to crawl/index them.

### Step 5 --- Monitor results

Check these sections periodically:

- **Pages / Indexing:** which pages are indexed and which have issues.
- **Sitemaps:** whether Google successfully fetched the sitemap.
- **Performance → Search results:** impressions, clicks, click-through
  rate and queries.
- **URL Inspection:** Google's current understanding of a specific
  URL.

Indexing can take days or weeks, sometimes longer. First-page ranking is
not guaranteed.

---

## 9. GitHub: safely save your project

Deployment from VS Code uploads the built app to Cloudflare; it does not
automatically push your source files to GitHub.

### Review changes

```bash
git status
```

Inspect the files before staging. Make sure `.env*` secrets, API tokens,
service role keys, and credentials are not staged.

To inspect what Git is about to commit:

```bash
git diff
git diff --cached
```

### Commit and push

If you intend to push to the existing `main` branch:

```bash
git add .
git status
git diff --cached
git commit -m "Configure Cloudflare deployment and SEO"
git push origin main
```

Only proceed with the commit after checking the staged diff. If you have
not checked that `origin` points to the intended repository, run:

```bash
git remote -v
```

### Generated files

Commit source/configuration such as `src/`, `package.json`,
`package-lock.json`, `vite.config.ts`, `cloudflare.config.ts`, and
`.gitignore`.

Normally do not commit `node_modules/`, generated `dist/` output,
`.cloudflare/output/`, or secret `.env` files. Check your `.gitignore`
and make sure the project configuration needed to reproduce deployment
is committed.

### Optional: automated deployment from GitHub

You are currently deploying from your terminal. GitHub can later be
connected to an automated workflow, but that is a separate setup. Do not
assume `git push` deploys your site unless you deliberately configure
CI/CD.

---

## 10. Recommended routine for future changes

### When you change website code

1.  Save files in VS Code.
2.  Run the local checks/build.
3.  Deploy the main Worker.
4.  Test the live site.
5.  Commit and push to GitHub when ready.

Useful commands:

```bash
npm run build:vinext
npm run deploy:vinext
git status
```

### When you change only SEO files

1.  Edit `src/app/robots.ts`, `src/app/sitemap.ts`, or metadata.
2.  Build and deploy.
3.  Visit `/robots.txt` and `/sitemap.xml`.
4.  Check Search Console if sitemap or indexing behaviour changes.
5.  Commit and push the source changes to GitHub.

### When you change the Response Store configuration

Use the documented service-binding deployment order and redeploy the
Response Store when its own config/package changes:

```bash
npm run build:vinext
npm run deploy:response-store
npm run deploy:vinext
```

If deployment fails, save the full error output. Fix the first concrete
error rather than changing several packages/config files at once.

---

## 11. Quick troubleshooting table

---

Symptom First thing to check

---

`cf` reports Node engine warning `node -v` and `which node`; use
supported Node version

`ERESOLVE` during npm install Review package versions and peer
dependency requirements; avoid
`--force` blindly

Missing Check build output and current
`.cloudflare/output/v0/config.json` Vinext/Cloudflare plugin
compatibility; use Vinext's
supported deploy command

R2 bucket not found / error `10042` Confirm R2 is enabled and the
configured bucket exists in the
correct account

Worker deploy succeeds but custom Check the main Worker's Custom
domain fails Domain, Cloudflare zone, DNS
conflicts and HTTPS status

`/robots.txt` returns 404 Check `src/app/robots.ts`,
build/deploy, and the live URL

`/sitemap.xml` returns 404 or invalid Check `src/app/sitemap.ts`,
XML build/deploy, and the live URL

Google does not index a page Check URL Inspection, robots rules,
canonical URL, page response,
internal links and content

Gallery images fail Check browser console/network,
Supabase public URL/policies, and
whether native `<img>` or
configured optimizer works

`npm audit` shows vulnerabilities Run `npm audit`, inspect affected
dependencies; don't use
`npm audit fix --force` without
reviewing breaking changes

---

---

## 12. Official references

- Vinext Cloudflare deployment:
  https://vinext.dev/docs/deploying/cloudflare
- Vinext GitHub repository and CLI reference:
  https://github.com/cloudflare/vinext
- Cloudflare Workers Custom Domains:
  https://developers.cloudflare.com/workers/configuration/routing/custom-domains/
- Google Search Console: https://search.google.com/search-console/
- Google sitemap guidance:
  https://developers.google.com/search/docs/crawling-indexing/sitemaps/overview
- Google robots.txt guidance:
  https://developers.google.com/search/docs/crawling-indexing/robots/intro

## Final checklist

- [ ] Main Worker `kem-bumi-jati` is deployed.
- [ ] `www.kembumijati.com` loads over HTTPS.
- [ ] Root domain behaviour/redirect is decided.
- [ ] R2 and Response Store Worker are configured and deployed.
- [ ] `robots.txt` loads and has suitable rules.
- [ ] `sitemap.xml` loads and lists only valid public canonical URLs.
- [ ] Placeholder Google verification token is removed or replaced
      correctly.
- [ ] Domain is verified in Search Console.
- [ ] Sitemap is submitted in Search Console.
- [ ] Important URLs are inspected/requested for indexing.
- [ ] Git diff and staged files contain no secrets before pushing to
      GitHub.
