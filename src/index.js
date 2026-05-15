// CSS 파일 임포트
// 이 CSS 임포트는 vite-plugin-css-injected-by-js에 의해 자동으로 처리됩니다
import "./css/colors.css";
import "./css/units.css";

// 프로젝트에서 사용하는 컴포넌트 CSS 파일들도 여기서 임포트
// 예시: 공통 모듈 스타일이나 전역 스타일이 있다면 여기에 추가
// 개별 컴포넌트 CSS 모듈은 자동으로 번들링됩니다
import PaintEditor from "./containers/paint-editor.jsx";
import ScratchPaintReducer from "./reducers/scratch-paint-reducer";
import { changeFillDefaultColor } from "./reducers/fill-style";

export { PaintEditor as default, ScratchPaintReducer, changeFillDefaultColor };
