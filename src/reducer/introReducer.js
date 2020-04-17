import { SET_INTRO_TOGGLE } from "../actions/type";

const intro = (
	state = {
		isIntroVisible: true
	},
	action
) => {
	switch (action.type) {
		case SET_INTRO_TOGGLE:
			return {
				...state,
				isIntroVisible: action.payload
			};

		default:
			return state;
	}
};

export default intro;
