import { SET_CHOOSE_PROFILE_VISIBILITY,RESET_PROFILE_VISIBILITY } from "./type";

export const setChooseProfileVisibility = (
	value,
	clientTypeId,
	ClientId
) => dispatch => {
	dispatch({
		type: SET_CHOOSE_PROFILE_VISIBILITY,
		payload: { value, clientTypeId, ClientId }
	});
};

export const resetProfileVisibility = (
) => dispatch => {
	dispatch({
		type: RESET_PROFILE_VISIBILITY,
	});
};
