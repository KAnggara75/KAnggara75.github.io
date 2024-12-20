import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vite.dev/config/
export default defineConfig({
	plugins: [react()],
	build: {
		outDir: "./dist",
		emptyOutDir: true, // also necessary
		rollupOptions: {
			input: {
				index: path.resolve(__dirname, "index.html"),
				404: path.resolve(__dirname, "404.html"),
			},
		},
	},
});
