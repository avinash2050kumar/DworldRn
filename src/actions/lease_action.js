import client from "../helper/ApiClient";
import { setAppMessage } from "./message_action";
import {
	LEASE_FIND_ALL_OWNER_BY_ID,
	LEASE_FIRM_JOBS,
	LEASE_FIRM_POSTED_ADS,
	SAVE_LEASE_FIRM_VEHICLE_DETAILS,
	SET_MAIN_SCREEN_LEASE_VEHICLE_PREFERENCE,
	SAVE_LEASE_CONTRACT_DETAILS,
	SAVE_LEASE_PAY_SCALE
} from "./type";
import Store from "../store";

export const getLeaseFirmDetailById = firmId => async dispatch => {
	try {
		const res = await client.main.FindOwnerFirm(firmId);
		dispatch({ type: LEASE_FIND_ALL_OWNER_BY_ID, payload: res.data });
	} catch (e) {
		dispatch(
			setAppMessage("Error", "Unable to get Owner Detail", "danger")
		);
	}
};

export const requestedLeaseFirmDetailById = firmId => async dispatch => {
	try {
		const res = await client.main.requestedLeaseFirmDetail(firmId);
		dispatch({ type: LEASE_FIRM_JOBS, payload: res.data });
	} catch (e) {
		dispatch(
			setAppMessage("Error", "Unable to get Owner Detail", "danger")
		);
	}
};

export const getLeaseFirmPostedAds = () => async dispatch => {
	try {
		const res = await client.main.getPostedLeaseFirm();
		dispatch({ type: LEASE_FIRM_POSTED_ADS, payload: res.data });
	} catch (e) {
		dispatch(
			setAppMessage(
				"Error",
				"Unable to get Lease Firm Posted Ads",
				"danger"
			)
		);
	}
};

export const saveLeaseFirmPost = () => async dispatch => {
	try {
		const res = await client.main.saveLeaseFirmRequirement(
			Store().store.getState().main.lease.postLeaseFirmRequirement
		);
		console.log("save", res);
		if (res.status === 200)
			dispatch(setAppMessage("Success", "Successfully Saved", "success"));
	} catch (e) {
		dispatch(setAppMessage("Error", "Unable to save", "danger"));
	}
};

export const saveLeaseFirmVehiclePreference = value => dispatch => {
	dispatch({ type: SAVE_LEASE_FIRM_VEHICLE_DETAILS, payload: value });
};

export const saveLeaseContractDetails = value => dispatch => {
	dispatch({ type: SAVE_LEASE_CONTRACT_DETAILS, payload: value });
};

export const saveLeasePayScale = value => dispatch => {
	dispatch({ type: SAVE_LEASE_PAY_SCALE, payload: value });
};
