import { SET_CHOOSE_PROFILE_VISIBILITY,RESET_PROFILE_VISIBILITY } from "../actions/type";

const initialState={
	isChooseProfileVisible: true,
	clientTypeId: 0,
	ClientId: null
}

const chooseProfileVisibility = (
	state =initialState ,
	action
) => {
	switch (action.type) {
		case SET_CHOOSE_PROFILE_VISIBILITY:
			const { ClientId, value, clientTypeId } = action.payload;
			return {
				...state,
				isChooseProfileVisible:
					value !== undefined ? value : state.isChooseProfileVisible,
				clientTypeId: clientTypeId ? clientTypeId : state.clientTypeId,
				ClientId: ClientId ? ClientId : state.ClientId
			};

		case RESET_PROFILE_VISIBILITY:
			return {
				...state,
				clientTypeId:initialState.clientTypeId
			}

		default:
			return state;
	}
};

export default chooseProfileVisibility;
