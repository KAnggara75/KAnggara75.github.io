import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vite.dev/config/
export default defineConfig({
	plugins: [react()],
	build: {
		outDir: "./dist",
		emptyOutDir: true, // also necessary
		chunkSizeWarningLimit: 1024,
		rollupOptions: {
			input: {
				index: path.resolve(__dirname, "index.html"),
				404: path.resolve(__dirname, "404.html"),
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
