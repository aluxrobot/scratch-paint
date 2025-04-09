import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { fileURLToPath } from "url";
import autoprefixer from "autoprefixer";
import postcssImport from "postcss-import";
import postcssSimpleVars from "postcss-simple-vars";

// ESM에서 __dirname 대체하기
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            // 필요시 경로 별칭 설정
            "@": path.resolve(__dirname, "src"),
        },
    },
    css: {
        modules: {
            localsConvention: "camelCase",
            generateScopedName: "[name]_[local]_[hash:base64:5]",
        },
        postcss: {
            plugins: [postcssImport(), postcssSimpleVars(), autoprefixer()],
        },
    },
    build: {
        lib: {
            entry: path.resolve(__dirname, "src/index.js"),
            name: "scratch-paint",
            fileName: (format) => `scratch-paint.${format}.js`,
            formats: ["es", "cjs"],
        },
        rollupOptions: {
            // 외부 의존성 설정 (webpack의 externals와 유사)
            external: [
                "minilog",
                "prop-types",
                "react",
                "react-dom",
                "react-intl",
                "react-intl-redux",
                "react-popover",
                "react-redux",
                "react-responsive",
                "react-style-proptype",
                "react-tooltip",
                "redux",
            ],
            output: {
                globals: {
                    react: "React",
                    "react-dom": "ReactDOM",
                    // 필요시 다른 전역 변수 매핑 추가
                },
            },
        },
        sourcemap: true,
        minify: "terser",
    },
    server: {
        host: "0.0.0.0",
        port: process.env.PORT || 8078,
    },
});
