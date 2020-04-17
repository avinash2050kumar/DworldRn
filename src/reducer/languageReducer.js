import { SET_APP_LANGUAGE } from "../actions/type";

const intro = (
	state = {
		language: "English",
		langIndex: 0,
		langCode: "en"
	},
	action
) => {
	switch (action.type) {
		case SET_APP_LANGUAGE:
			const { language, langIndex, langCode } = action.payload;
			return { ...state, langCode, langIndex, language };

		default:
			return state;
	}
};

export default intro;
