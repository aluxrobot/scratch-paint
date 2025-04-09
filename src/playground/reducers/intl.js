// react-intl-redux와 호환되는 방식으로 업데이트
import { IntlProvider } from "react-intl-redux";
import paintMessages from "scratch-l10n/locales/paint-editor-msgs";

// 최신 React Intl은 addLocaleData가 필요 없음
// 브라우저의 Intl API를 사용합니다

const intlInitialState = {
    intl: {
        defaultLocale: "en",
        locale: "en",
        messages: paintMessages.en.messages,
    },
};

// updateIntl 함수 업데이트
const updateIntl = (locale) => ({
    type: "UPDATE_INTL",
    payload: {
        locale: locale,
        messages: paintMessages[locale]?.messages || paintMessages.en.messages,
    },
});

// createIntlReducer가 있다면 사용하고, 없다면 커스텀 리듀서 생성
const intlReducer = (state = intlInitialState.intl, action) => {
    if (action.type === "UPDATE_INTL") {
        return {
            ...state,
            locale: action.payload.locale,
            messages: action.payload.messages,
        };
    }
    return state;
};

export { intlReducer as default, IntlProvider, intlInitialState, updateIntl };
