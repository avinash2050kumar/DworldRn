import client from "../helper/ApiClient";
import { setAppMessage } from "./message_action";
import {
	OWNER_JOB_DETAIL_BY_ID,
	OWNER_FIND_DRIVERS_BY_ID,
	OWNER_FIND_LEASE_FIRM_BY_ID,
	OWNER_LEASE_FIRM_BY_ID,
	LEASE_FIRM_JOBS,
	GET_OWNER_POST
} from "./type";

export const getOwnerJobDetailById = jobId => async dispatch => {
	try {
		const res = await client.main.getJobId(jobId);
		dispatch({ type: OWNER_JOB_DETAIL_BY_ID, payload: res.data });
	} catch (e) {
		dispatch(setAppMessage("Error", "Check Network Connection", "danger"));
	}
};

export const getApplyOwnerFindDriver = (offerToClientId,JobId)=> async dispatch => {
	try {
		const res = await client.main.applyOwnerFindDriver(offerToClientId,JobId);console.log('res',res)
		res.status===200 &&
		dispatch(
			setAppMessage(
				"Success",
				"Successfully Requested",
				"success"
			)
		);
		res.status===200 &&
		dispatch(
			getOwnerAllDriverById(JobId)
		);
		res.status===204 &&dispatch(setAppMessage("Error", "Doesn't Look good", "danger"));
	} catch (e) {
		dispatch(setAppMessage("Error", "Check Network Connection", "danger"));
	}
};
export const getApplyOwnerFindFirm = (OfferToClientId,JobId)=> async dispatch => {
	try {
		const res = await client.main.applyOwnerFindFirm(OfferToClientId,JobId);
		console.log('res',res)
		res.status===200 &&
		dispatch(
			setAppMessage(
				"Success",
				"Successfully Requested",
				"success"
			)
		);
		res.status===204 &&dispatch(setAppMessage("Error", "Doesn't Look good", "danger"));
	} catch (e) {
		dispatch(setAppMessage("Error", "Check Network Connection", "danger"));
	}
};
export const getOwnerAllDriverById = jobId => async dispatch => {
	try {
		const res = await client.main.getAllDriverOwner(jobId);
		dispatch({ type: OWNER_FIND_DRIVERS_BY_ID, payload: res.data });
	} catch (e) {
		dispatch(setAppMessage("Error", "Check Network Connection", "danger"));
	}
};

export const getOwnerLeaseFirmById = jobId => async dispatch => {
	try {
		const res = await client.main.getLeaseFirmById(jobId);
		dispatch({ type: OWNER_LEASE_FIRM_BY_ID, payload: res.data });
	} catch (e) {
		dispatch(setAppMessage("Error", "Check Network Connection", "danger"));
	}
};

export const getOwnerAllLeaseById = jobId => async dispatch => {
	try {
		const res = await client.main.getAllLeaseFirm(jobId);
		dispatch({ type: OWNER_FIND_LEASE_FIRM_BY_ID, payload: res.data });
	} catch (e) {
		dispatch(setAppMessage("Error", "Check Network Connection", "danger"));
	}
};

export const getOwnerJobPost = () => async dispatch => {
	try {
		const res = await client.main.getOwnerPost();
		dispatch({ type: GET_OWNER_POST, payload: res.data });
	} catch (e) {
		dispatch(
			setAppMessage("Error", "Unable to get Job Post Detail", "danger")
		);
	}
};
