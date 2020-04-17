import {
	SET_HOME_SCREEN_VISIBLE,
	SET_HOME_SCREEN_NO_OF_WORK,
	SET_DEVICE_LOCATION,
	SET_LOGOUT,
	SET_FILTERED_HOME_WORK_DATA,
	SET_DRIVER_JOB_OFFERS_FOR_DRIVER,
	SET_LEASE_DASHBOARD
} from "./type";
import client from "../helper/ApiClient";
import { setAppMessage } from "./message_action";

export const setHomeScreenVisibility = value => dispatch => {
	dispatch({
		type: SET_HOME_SCREEN_VISIBLE,
		payload: value
	});
};

export const setHomeScreenNoOfWork = () => async dispatch => {
	try {
		const res = await client.main.getAllDriverJobs();
		dispatch({
			type: SET_HOME_SCREEN_NO_OF_WORK,
			payload: res.data
		});
	} catch (e) {}
};

export const setDeviceLocation = (location, formattedAddress) => dispatch => {
	dispatch({
		type: SET_DEVICE_LOCATION,
		payload: { location, formattedAddress }
	});
};

export const filtersAndSortingDriverData = (
	filterObj,
	dataIndex
) => dispatch => {
	dispatch({
		type: SET_FILTERED_HOME_WORK_DATA,
		payload: { filterObj, dataIndex }
	});
};

export const driverApplyJob = jobId => async dispatch => {
	try {
		const res = await client.main.driverApplyJob(jobId);
		if (res.status === 200) {
			dispatch(
				setAppMessage(
					"Success",
					"Successfully saved Vehicle Preference Scale",
					"success"
				)
			);
			dispatch(setHomeScreenNoOfWork());
		}
		res.status === 204 &&
			dispatch(setAppMessage("Error", "Unable to Apply", "danger"));
	} catch (e) {
		dispatch(setAppMessage("Error", "Something went wrong.", "danger"));
	}
};

export const driverGetJobOffer = () => async dispatch => {
	try {
		const res = await client.main.driverGetJobOffer();
		dispatch({ type: SET_DRIVER_JOB_OFFERS_FOR_DRIVER, payload: res.data });
	} catch (e) {
		dispatch(setAppMessage("Error", "Something went wrong.", "danger"));
	}
};

export const getLeaseDashBoard = () => async dispatch => {
	try {
		const res = await client.main.getLeaseDashBoard();
		dispatch({ type: SET_LEASE_DASHBOARD, payload: res.data });
	} catch (e) {
		dispatch(
			setAppMessage("Error", "Unable to fetch lease Dashboard", "danger")
		);
	}
};
