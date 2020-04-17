import { SET_CHOOSE_PROFILE_VISIBILITY } from "./type";

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
