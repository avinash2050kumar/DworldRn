import { SET_INTRO_TOGGLE } from "./type";

export const setIntroVisibility = value => dispatch => {
	dispatch({
		type: SET_INTRO_TOGGLE,
		payload: value
	});
};
