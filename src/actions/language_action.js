import { SET_APP_LANGUAGE } from "./type";

export const setAppLanguage = (language, langIndex, langCode) => dispatch => {
	dispatch({
		type: SET_APP_LANGUAGE,
		payload: { language, langIndex, langCode }
	});
};
