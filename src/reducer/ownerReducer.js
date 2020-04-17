import {
	OWNER_FIND_DRIVERS_BY_ID,
	OWNER_JOB_DETAIL_BY_ID,
	OWNER_LEASE_FIRM_BY_ID,
	OWNER_FIND_LEASE_FIRM_BY_ID,
	GET_OWNER_POST
} from "../actions/type";

const intro = (
	state = {
		job: [],
		findAllDrivers: [],
		leaseFirm: [],
		findAllLeaseFirm: [],
		jobPost: { OwnerJob: [], FirmJob: [] }
	},
	action
) => {
	switch (action.type) {
		case OWNER_JOB_DETAIL_BY_ID:
			return { ...state, job: action.payload };

		case OWNER_FIND_DRIVERS_BY_ID:
			return { ...state, findAllDrivers: action.payload };

		case OWNER_FIND_LEASE_FIRM_BY_ID:
			return { ...state, findAllLeaseFirm: action.payload };

		case OWNER_LEASE_FIRM_BY_ID:
			return { ...state, leaseFirm: action.payload };

		case GET_OWNER_POST:
			return { ...state, jobPost: action.payload };

		default:
			return state;
	}
};

export default intro;
