import { ViteImageOptimizer } from "vite-plugin-image-optimizer";
import { defineConfig } from "vite";
import preact from "@preact/preset-vite";
import { cloudflare } from "@cloudflare/vite-plugin";
import { setupPlugins as responsiveImage } from "@responsive-image/vite-plugin";

export default defineConfig({
  plugins: [
    preact(),
    responsiveImage({ include: /^.*\/assets\/.+\.png\?.*responsive$/ }),
    ViteImageOptimizer({ test: /^assets\/.*\.png$/ }),
    cloudflare(),
  ],
});
