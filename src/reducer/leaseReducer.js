import {
	LEASE_FIND_ALL_OWNER_BY_ID,
	LEASE_FIRM_JOBS,
	LEASE_FIRM_POSTED_ADS,
	SET_MAIN_SCREEN_LEASE_VEHICLE_PREFERENCE
} from "../actions/type";

const intro = (
	state = {
		job: [],
		findAllDrivers: [],
		leaseFirm: [],
		findLeaseOwnerFirm: [],
		leaseFirmPostedAds: []
	},
	action
) => {
	switch (action.type) {
		case LEASE_FIND_ALL_OWNER_BY_ID:
			return { ...state, findLeaseOwnerFirm: action.payload };

		case LEASE_FIRM_JOBS:
			return { ...state, job: action.payload };

		case LEASE_FIRM_POSTED_ADS:
			return { ...state, leaseFirmPostedAds: action.payload };

		default:
			return state;
	}
};

export default intro;
