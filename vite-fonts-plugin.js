// vite-fonts-plugin.js
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// base64 인코딩 함수
function base64Encode(file) {
    const data = fs.readFileSync(file);
    return data.toString("base64");
}

export default function fontPlugin() {
    return {
        name: "vite-plugin-scratch-fonts",
        resolveId(source) {
            if (source.includes("base64-loader!./")) {
                // base64-loader 문자열이 포함된 요청 처리
                return source;
            }
            return null;
        },
        load(id) {
            if (id.includes("base64-loader!./")) {
                // base64-loader 요청 처리
                const fontName = id.split("base64-loader!./")[1];
                const fontPath = path.resolve(
                    "node_modules/scratch-render-fonts/src",
                    fontName,
                );

                try {
                    const fontBase64 = base64Encode(fontPath);
                    // 폰트 MIME 타입 결정
                    let mimeType = "application/octet-stream";
                    if (fontName.endsWith(".ttf")) {
                        mimeType = "font/ttf";
                    } else if (fontName.endsWith(".otf")) {
                        mimeType = "font/otf";
                    }

                    // 모듈이 내보내는 base64 문자열
                    return `export default "data:${mimeType};base64,${fontBase64}"`;
                } catch (error) {
                    console.error(`폰트 로딩 오류: ${fontPath}`, error);
                    return 'export default ""';
                }
            }
            return null;
        },
    };
}
