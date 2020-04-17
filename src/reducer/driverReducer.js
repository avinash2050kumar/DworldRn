import { RESET_DRIVER, SET_DRIVER_EARNING_VALUE } from "../actions/type";

const initialState = {
	earning: []
};

const driverReducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_DRIVER_EARNING_VALUE:
			return { ...state, earning: action.payload };

		case RESET_DRIVER:
			return { ...initialState };

		default:
			return state;
	}
};

export default driverReducer;
