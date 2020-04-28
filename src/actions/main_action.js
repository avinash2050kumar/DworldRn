import {
	SET_MAIN_SCREEN_WORK_SCHEDULE,
	SET_MAIN_SCREEN_DRIVER_HOURLY_PAY,
	SET_MAIN_SCREEN_DRIVER_WEEKLY_PAY,
	SET_MAIN_SCREEN_DRIVER_MONTHLY_PAY,
	SET_MAIN_SCREEN_DRIVER_KM_PAY,
	SET_MAIN_SCREEN_DRIVER_TRIP_PAY,
	SET_MAIN_SCREEN_EXPERIENCE,
	SET_MAIN_SCREEN_DRIVER_VEHICLE_PREFERENCE,
	SET_MAIN_SCREEN_OWNER_VEHICLE_PREFERENCE,
	SAVE_MAIN_SCREEN_OWNER_VEHICLE_PREFERENCE,
	SAVE_MAIN_SCREEN_OWNER_DRIVER_QUALIFICATION,
	SAVE_MAIN_SCREEN_OWNER_WORK_SCHEDULE,
	SET_MAIN_SCREEN_PERSONAL_DETAILS,
	SAVE_MAIN_SCREEN_OWNER_DRIVER_PAY_SCALE,
	RESET_OWNER_JOB_POST,
	SET_OWNER_ADS_INDEX,
	SET_OWNER_DASHBOARD,SAVE_DRIVER_EXPERIENCE,RESET_MAIN_REDUCER
} from "./type";

import client from "../helper/ApiClient";
import { setChooseProfileVisibility } from "./choose_profile_action";
import { setAppMessage } from "./message_action";
import Store from "../store";

export const getPersonalDetails = () => async dispatch => {
	try {
		const res = await client.main.getPersonalDetails();
		dispatch({ type: SET_MAIN_SCREEN_PERSONAL_DETAILS, payload: res.data });
	} catch (e) {
		dispatch(setAppMessage("Error", "Something went wrong", "danger"));
	}
};

/* ============================================= */

export const getExperience = () => async dispatch => {
	try {
		const res = await client.main.getExperience();
		dispatch({ type: SET_MAIN_SCREEN_EXPERIENCE, payload: res.data });
	} catch (e) {
		dispatch(setAppMessage("Error", "Check Network Connection", "danger"));
	}
};

export const SaveExperience=(value)=> dispatch =>{
	dispatch({type:SAVE_DRIVER_EXPERIENCE,payload:value})
}

export const getWorkSchedule = () => async dispatch => {
	try {
		const res = await client.main.getWorkSchedule();
		dispatch({ type: SET_MAIN_SCREEN_WORK_SCHEDULE, payload: res.data });
	} catch (e) {
		dispatch(setAppMessage("Error", "Check Network Connection", "danger"));
	}
};

export const postWorkSchedule = payload => async dispatch => {
	try {
		const res = await client.main.postWorkSchedule(payload);
		res.status === 200 &&
			dispatch(
				setAppMessage(
					"Success",
					"Successfully saved your work schedule",
					"success"
				)
			);

		res.status === 204 &&dispatch(
			setAppMessage("Error", "Unable to save Work Schedule", "danger")
		);
		return res
	} catch (e) {
		dispatch(
			setAppMessage("Error", "Unable to save Work Schedule", "danger")
		);
	}
};
/*=============================================*/
export const driverGetHourlyPay = () => async dispatch => {
	try {
		const res = await client.main.driverGetHourlyPay();
		dispatch({
			type: SET_MAIN_SCREEN_DRIVER_HOURLY_PAY,
			payload: res.data
		});
	} catch (e) {
		dispatch(setAppMessage("Error", "Check Network Connection", "danger"));
	}
};

export const saveDriverHourlyInfo = values => async dispatch => {
	try {
		const res = await client.main.driverSaveHourly(values);
		res.status === 200 &&
			dispatch(
				setAppMessage(
					"Success",
					"Successfully saved your pay Scale",
					"success"
				)
			);
		res.status === 204 && dispatch(
			setAppMessage(
				"Error",
				"Unable to save Driver hourly values",
				"danger"
			)
		);
		return res
	} catch (e) {
		dispatch(setAppMessage("Error", "Check Network Connection", "danger"));
	}
};
/*=============================================*/
export const driverGetWeeklyPay = () => async dispatch => {
	try {
		const res = await client.main.driverGetWeeklyPay();
		dispatch({
			type: SET_MAIN_SCREEN_DRIVER_WEEKLY_PAY,
			payload: res.data
		});
	} catch (e) {
		dispatch(setAppMessage("Error", "Check Network Connection", "danger"));
	}
};
export const saveDriverWeeklyInfo = values => async dispatch => {
	try {
		const res = await client.main.driverSaveWeeklyPay(values);
		res.status === 200 &&
			dispatch(
				setAppMessage(
					"Success",
					"Successfully saved your pay Scale",
					"success"
				)
			);
		res.status === 204 && dispatch(
			setAppMessage(
				"Error",
				"Unable to save Driver Weekly values",
				"danger"
			)
		);
		return res
	} catch (e) {
		dispatch(setAppMessage("Error", "Check Network Connection", "danger"));
	}
};

/*=============================================*/
export const driverGetMonthlyPay = () => async dispatch => {
	try {
		const res = await client.main.driverGetMonthlyPay();
		dispatch({
			type: SET_MAIN_SCREEN_DRIVER_MONTHLY_PAY,
			payload: res.data
		});
	} catch (e) {
		dispatch(setAppMessage("Error", "Check Network Connection", "danger"));
	}
};

export const saveDriverMonthlyInfo = values => async dispatch => {
	try {
		const res = await client.main.driverSaveMonthlyPay(values);
		res.status === 200 &&
			dispatch(
				setAppMessage(
					"Success",
					"Successfully saved your pay Scale",
					"success"
				)
			);
		res.status === 204 && dispatch(
			setAppMessage(
				"Error",
				"Unable to save Driver Weekly values",
				"danger"
			)
		);
		return res
	} catch (e) {
		dispatch(setAppMessage("Error", "Check Network Connection", "danger"));
	}
};

/*=============================================*/
export const driverGetKMPay = () => async dispatch => {
	try {
		const res = await client.main.driverGetKMPay();
		dispatch({ type: SET_MAIN_SCREEN_DRIVER_KM_PAY, payload: res.data });
	} catch (e) {
		dispatch(setAppMessage("Error", "Check Network Connection", "danger"));
	}
};

export const saveDriverKMInfo = values => async dispatch => {
	try {
		const res = await client.main.driverSaveKMPay(values);
		res.status === 200 &&
			dispatch(
				setAppMessage(
					"Success",
					"Successfully saved your pay Scale",
					"success"
				)
			);
		res.status === 204 && dispatch(
			setAppMessage("Error", "Unable to save Driver KM values", "danger")
		);
		return res
	} catch (e) {
		dispatch(setAppMessage("Error", "Check Network Connection", "danger"));
	}
};

/*=============================================*/
export const driverGetTripPay = () => async dispatch => {
	try {
		const res = await client.main.driverGetTripPay();
		dispatch({ type: SET_MAIN_SCREEN_DRIVER_TRIP_PAY, payload: res.data });
	} catch (e) {
		dispatch(setAppMessage("Error", "Check Network Connection", "danger"));
	}
};

export const saveDriverTripPayInfo = values => async dispatch => {
	try {
		const res = await client.main.driverSaveTripPay(values);
		res.status === 200 &&
			dispatch(
				setAppMessage(
					"Success",
					"Successfully saved your pay Scale",
					"success"
				)
			);
		res.status === 204 && dispatch(
			setAppMessage(
				"Error",
				"Unable to save Driver Trip values",
				"danger"
			)
		);
		return res
	} catch (e) {
		dispatch(setAppMessage("Error", "Check Network Connection", "danger"));
	}
};

/*=============================================*/
export const driverGetVehiclePreferences = () => async dispatch => {
	try {
		const res = await client.main.driverGetVechiclePreference();
		dispatch({
			type: SET_MAIN_SCREEN_DRIVER_VEHICLE_PREFERENCE,
			payload: res.data
		});
	} catch (e) {
		dispatch(setAppMessage("Error", "Check Network Connection", "danger"));
	}
};

export const driverSaveVehiclePreferences = values => async dispatch => {
	try {
		const res = await client.main.driverSaveVechiclePreference(values);
		res.status === 200 &&
			dispatch(
				setAppMessage(
					"Success",
					"Successfully saved Vehicle Preference Scale",
					"success"
				)
			);
		res.status !== 200 &&
			dispatch(
				setAppMessage(
					"Error",
					"Unable to save Driver Trip values",
					"danger"
				)
			);
		return res
	} catch (e) {
		dispatch(setAppMessage("Error", "Check Network Connection", "danger"));
	}
};
/*=============================================*/
export const ownerGetVehiclePreferences = () => async dispatch => {
	try {
		const res = await client.main.ownerGetVechiclePreference();
		dispatch({
			type: SET_MAIN_SCREEN_OWNER_VEHICLE_PREFERENCE,
			payload: res.data
		});
	} catch (e) {
		console.log("error", e);
		dispatch(setAppMessage("Error", "Check Network Connection", "danger"));
	}
};

export const ownerSaveVehiclePreferences = values => async dispatch => {
	try {
		const res = await client.main.driverSaveVechiclePreference(values);
		res.status === 200 &&
			dispatch(
				setAppMessage(
					"Success",
					"Successfully saved Vehicle Preference Scale",
					"success"
				)
			);
		dispatch(
			setAppMessage(
				"Error",
				"Unable to save Driver Trip values",
				"danger"
			)
		);
	} catch (e) {
		dispatch(setAppMessage("Error", "Check Network Connection", "danger"));
	}
};

export const SaveProfile = value => async dispatch => {
	try {
		const res = await client.main.saveProfile(value);

		if (res.status === 200) {
			dispatch(
				setAppMessage(
					"Success",
					"Successfully saved your details",
					"success"
				)
			);
			dispatch(getPersonalDetails());
		}
		res.status !== 200 &&
			dispatch(
				setAppMessage(
					"Error",
					"Unable to save, Please try again later",
					"danger"
				)
			);
		return res
	} catch (e) {
		dispatch(setAppMessage("Error", "Check Network Connection", "danger"));
	}
};

/*=============================================*/
export const saveOwnerVehiclePostDetail = values => async dispatch => {
	dispatch({
		type: SAVE_MAIN_SCREEN_OWNER_VEHICLE_PREFERENCE,
		payload: values
	});
};

export const saveOwnerDriverQualification = values => async dispatch => {
	dispatch({
		type: SAVE_MAIN_SCREEN_OWNER_DRIVER_QUALIFICATION,
		payload: values
	});
};

export const saveOwnerWorkSchedule = values => async dispatch => {
	dispatch({
		type: SAVE_MAIN_SCREEN_OWNER_WORK_SCHEDULE,
		payload: values
	});
};

export const saveOwnerDriverPayScale = values => async dispatch => {
	dispatch({
		type: SAVE_MAIN_SCREEN_OWNER_DRIVER_PAY_SCALE,
		payload: values
	});
};

export const postOwnerDriverJob = () => async dispatch => {
	try {
		const res = await client.main.SaveOwnerJob();
		res.status === 200
			? dispatch(
					setAppMessage(
						"Success",
						"Successfully saved Job for drivers",
						"success"
					)
			  )
			: dispatch(
					setAppMessage(
						"Error",
						"Unable to save Job for drivers",
						"danger"
					)
			  );
		return res.status;
	} catch (e) {
		dispatch(setAppMessage("Error", "Check Network Connection", "danger"));
	}
};

export const postOwnerVehicleFirm = () => async dispatch => {
	try {
		const { ClientId } = Store().store.getState().auth;
		const vehicleFirm = Store().store.getState().main.owner.postAdsDriver;
		const {
			vehicleCategory
		} = Store().store.getState().main.owner.postAdsDriver.vehicle;
		const { vehicle } = Store().store.getState().main.owner.postAdsDriver;
		const firm = Object.assign(
			{},
			{
				ClientId: ClientId,
				FirmVehicle: {
					ClientId: ClientId,
					VehicleCompany: vehicle.vehicleCompany,
					VehicleCategory: {
						Id: vehicleCategory.VehicleCategoryId,
						Name: vehicleCategory.VehicleCategoryName
					},
					VehicleType: vehicleCategory.VehicleType,
					PaymentType: vehicle.PaymentType,
					Location: "Bangalore",
					VehicleCount: 3,
					IsWithDriver: true
				},
				firmPay: {
					VehicleType: vehicleFirm.price.VehicleType,
					PaymentType: vehicle.PaymentType,
					price: vehicleFirm.price.price
				}
			}
		);

		const res = await client.main.SaveOwnerFirm(firm);

		res.status === 200
			? dispatch(
					setAppMessage(
						"Success",
						"Successfully saved Firm for drivers",
						"success"
					)
			  )
			: dispatch(
					setAppMessage(
						"Error",
						"Unable to save Firm for drivers",
						"danger"
					)
			  );
		return res.status;
	} catch (e) {
		dispatch(
			setAppMessage(
				"Error",
				"Something went wrong, please try again",
				"danger"
			)
		);
	}
};

export const saveExperienceAndDl = (payload)=>async dispatch=>{
	try {
		const res = await client.main.saveExperienceAndDl(payload);

		res.status === 200
			? dispatch(
			setAppMessage(
				"Success",
				"Successfully Save your Dl Info",
				"success"
			)
			)
			: dispatch(
			setAppMessage(
				"Error",
				"Unable to save Dl Info",
				"danger"
			)
			);
		return res
	} catch (e) {
		dispatch(
			setAppMessage(
				"Error",
				"Something went wrong, please try again",
				"danger"
			)
		);
	}
}

export const resetOwner = values => async dispatch => {
	dispatch({
		type: RESET_OWNER_JOB_POST,
		payload: values
	});
};

export const setAdsIndex = values => async dispatch => {
	dispatch({
		type: SET_OWNER_ADS_INDEX,
		payload: values
	});
};

/*======================================================================*/
export const getOwnerDashboard = () => async dispatch => {
	try {
		const res = await client.main.getOwnerDashBoard();
		dispatch({ type: SET_OWNER_DASHBOARD, payload: res.data });
	} catch (e) {
		dispatch(setAppMessage("Error", "Check Network Connection", "danger"));
	}
};

export const resetMainScreen = () => dispatch=>{
	dispatch({type:RESET_MAIN_REDUCER})
}
