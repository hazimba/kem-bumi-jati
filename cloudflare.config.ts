import { bindings, defineConfig, defineWorker } from "cf/config";
import { createWorkersResponseStoreServiceBindingConfig } from "@vinext/cloudflare/cache/config";

// Production Response Store
const productionResponseStore = await createWorkersResponseStoreServiceBindingConfig({
  worker: {
    name: "kem-bumi-jati-response-store",
    compatibilityDate: "2026-10-28",
    compatibilityFlags: ["nodejs_compat"],
  },
  bucket: "kem-bumi-jati-response-store-cache-bodies",
});

// Staging Response Store
const stagingResponseStore = await createWorkersResponseStoreServiceBindingConfig({
  worker: {
    name: "kem-bumi-jati-staging-response-store",
    compatibilityDate: "2026-10-28",
    compatibilityFlags: ["nodejs_compat"],
  },
  bucket: "kem-bumi-jati-staging-response-store-cache-bodies",
});

// Export both auxiliary Worker configurations
export const productionResponseStoreServiceBinding = productionResponseStore.serviceBindingWorker;

export const stagingResponseStoreServiceBinding = stagingResponseStore.serviceBindingWorker;

// Select the correct Response Store for the application Worker
export default defineConfig(({ mode }) => {
  const isStaging = mode === "staging";

  const responseStore = isStaging ? stagingResponseStore : productionResponseStore;

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
