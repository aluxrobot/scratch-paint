import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "path";
import { fileURLToPath } from "url";

// ESM에서 __dirname 대체하기
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
    plugins: [react()],
    test: {
        globals: true,
        environment: "jsdom",
        setupFiles: ["./test/helpers/setup-tests.js"],
        coverage: {
            reporter: ["text", "json", "html"],
        },
        deps: {
            inline: ["react-dom"],
        },
        alias: {
            "@": path.resolve(__dirname, "src"),
        },
        mockReset: true,
    },
});
