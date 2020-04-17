import { SET_APP_MESSAGE } from "./type";

import client from "../helper/ApiClient";
import { setChooseProfileVisibility } from "./choose_profile_action";

export const setAppMessage = (message, description, type) => dispatch => {
	dispatch({
		type: SET_APP_MESSAGE,
		payload: { message, description, type }
	});
};

//appMessage
