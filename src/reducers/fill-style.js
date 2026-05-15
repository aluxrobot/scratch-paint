import makeColorStyleReducer from '../lib/make-color-style-reducer';

const CHANGE_FILL_COLOR = 'scratch-paint/fill-style/CHANGE_FILL_COLOR';
const CHANGE_FILL_COLOR_2 = 'scratch-paint/fill-style/CHANGE_FILL_COLOR_2';
const CHANGE_FILL_GRADIENT_TYPE = 'scratch-paint/fill-style/CHANGE_FILL_GRADIENT_TYPE';
const CLEAR_FILL_GRADIENT = 'scratch-paint/fill-style/CLEAR_FILL_GRADIENT';
const CHANGE_FILL_DEFAULT_COLOR = 'scratch-paint/fill-style/CHANGE_FILL_DEFAULT_COLOR';

const DEFAULT_COLOR = '#9966FF';

const hexRegex = /^#([0-9a-f]{3}){1,2}$/i;
const isValidHex = color => typeof color === 'string' && hexRegex.test(color);

const baseReducer = makeColorStyleReducer({
    changePrimaryColorAction: CHANGE_FILL_COLOR,
    changeSecondaryColorAction: CHANGE_FILL_COLOR_2,
    changeGradientTypeAction: CHANGE_FILL_GRADIENT_TYPE,
    clearGradientAction: CLEAR_FILL_GRADIENT,
    defaultColor: DEFAULT_COLOR,
    selectionPrimaryColorKey: 'fillColor',
    selectionSecondaryColorKey: 'fillColor2',
    selectionGradientTypeKey: 'fillGradientType'
});

const reducer = function (state, action) {
    if (typeof state === 'undefined') {
        // base 의 초기 state 에 defaultColor 필드를 합성해 노출
        state = { ...baseReducer(undefined, { type: '@@INIT' }), defaultColor: DEFAULT_COLOR };
    }
    if (action.type === CHANGE_FILL_DEFAULT_COLOR) {
        if (!isValidHex(action.color)) return state;
        // 사용자가 아직 색을 안 골랐을 때만 primary 도 동기화
        const userHasPicked = state.primary !== state.defaultColor;
        return {
            ...state,
            defaultColor: action.color,
            primary: userHasPicked ? state.primary : action.color
        };
    }
    return baseReducer(state, action);
};

// Action creators ==================================
const changeFillColor = function (fillColor) {
    return {
        type: CHANGE_FILL_COLOR,
        color: fillColor
    };
};

const changeFillColor2 = function (fillColor) {
    return {
        type: CHANGE_FILL_COLOR_2,
        color: fillColor
    };
};

const changeFillGradientType = function (gradientType) {
    return {
        type: CHANGE_FILL_GRADIENT_TYPE,
        gradientType
    };
};

const clearFillGradient = function () {
    return {
        type: CLEAR_FILL_GRADIENT
    };
};

const changeFillDefaultColor = function (fillColor) {
    return {
        type: CHANGE_FILL_DEFAULT_COLOR,
        color: fillColor
    };
};

export {
    reducer as default,
    changeFillColor,
    changeFillColor2,
    changeFillGradientType,
    clearFillGradient,
    changeFillDefaultColor,
    DEFAULT_COLOR,
    CHANGE_FILL_GRADIENT_TYPE
};
