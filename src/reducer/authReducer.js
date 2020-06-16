import {
	SET_AUTH_CLIENT_ID,
	SET_SUCCESSFUL_LOGIN,
	SET_LOGOUT,
	RESET_AUTH,SET_PROFILE_IMAGE_URL
} from "../actions/type";

const authReducer = (
	state = {
		ClientId: 0,
		isLoginSuccessFul: false,
		Email: "",
		Mobile: "",
		FirstName: "",
		LastName: "",
		ClientTypeId: 0,ProfileURL: ""
	},
	action
) => {
	switch (action.type) {
		case RESET_AUTH:
			return { ...authReducer };

		case SET_AUTH_CLIENT_ID:
			const { ClientTypeId, ClientId, value } = action.payload;
			return {
				...state,
				ClientTypeId: ClientTypeId ? ClientTypeId : state.ClientTypeId,
				ClientId: ClientId ? ClientId : state.ClientId
			};

		case SET_PROFILE_IMAGE_URL:
			return {...state, ProfileURL: action.payload}

		case SET_SUCCESSFUL_LOGIN:
			return {
				...state,
				...action.payload.value,
				isLoginSuccessFul: action.payload.successLogin
			};

		case SET_LOGOUT:
			return { ...state, isLoginSuccessFul: false };

		default:
			return state;
	}
};

export default authReducer;
