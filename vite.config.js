import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { fileURLToPath } from "url";
import autoprefixer from "autoprefixer";
import postcssImport from "postcss-import";
import postcssSimpleVars from "postcss-simple-vars";
import fontPlugin from "./vite-fonts-plugin";
import cssInjectedByJsPlugin from "vite-plugin-css-injected-by-js";

// ESM에서 __dirname 대체하기
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),
        fontPlugin(), // 폰트 로더 플러그인 추가
        cssInjectedByJsPlugin(), // CSS를 JS에 주입하는 플러그인
    ],
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
        // CSS 최소화 설정 추가
        minify: true,
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
                // CSS를 별도 파일로 추출하지 않도록 설정
                assetFileNames: (assetInfo) => {
                    if (assetInfo.name.endsWith(".css")) {
                        return "assets/[name][extname]";
                    }
                    return "assets/[name]-[hash][extname]";
                },
            },
        },
        sourcemap: true,
        minify: "terser",
        // CSS 번들링 전략 설정
        cssCodeSplit: false, // 모든 CSS를 하나의 파일로 합침
    },
    server: {
        host: "0.0.0.0",
        port: process.env.PORT || 8078,
    },
    // CSS 및 font 파일에 대한 추가 처리
    optimizeDeps: {
        include: ["react", "react-dom"],
        exclude: ["scratch-render-fonts"],
    },
});
