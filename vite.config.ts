import path from "node:path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
	plugins: [tailwindcss(), react()],
	build: {
		outDir: "./dist",
		emptyOutDir: true, // also necessary
		chunkSizeWarningLimit: 1024,
		rollupOptions: {
			input: {
				index: path.resolve(import.meta.dirname, "index.html"),
				404: path.resolve(import.meta.dirname, "404.html"),
			},
			output: {
				manualChunks(id: string) {
					if (id.includes("node_modules")) {
						const modulePath = id.split("node_modules/")[1];
						const topLevelFolder = modulePath.split("/")[0];
						if (topLevelFolder !== ".pnpm") {
							return topLevelFolder;
						}
						const scopedPackageName = modulePath.split("/")[1];
						const chunkName =
							scopedPackageName.split("@")[
								scopedPackageName.startsWith("@") ? 1 : 0
							];
						return chunkName;
					}
				},
			},
		},
	},
});
