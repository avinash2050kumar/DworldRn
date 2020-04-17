import { SET_APP_MESSAGE } from "../actions/type";

const appMsg = (
	state = {
		message: "",
		description: "",
		type: ""
		//  duration:''
	},
	action
) => {
	switch (action.type) {
		case SET_APP_MESSAGE:
			const { message, description, type } = action.payload;
			return {
				...state,
				message,
				description,
				type
			};

		default:
			return state;
	}
};

export default appMsg;
