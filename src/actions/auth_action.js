import {
	SET_AUTH_CLIENT_ID,
	SET_LOGOUT,
	SET_SUCCESSFUL_LOGIN,
	RESET_AUTH
} from "./type";

import client from "../helper/ApiClient";
import { setChooseProfileVisibility } from "./choose_profile_action";
import { setAppMessage } from "./message_action";
import Store from "../store";

export const postSignUp = payload => async dispatch => {
	try {
		const res = await client.auth.signUpNewUser(payload);
		if (res.data || !res.data) {
			dispatch(setClientId(res.data.ClientTypeId, res.data.ClientId));

			return res.data;
		}
	} catch (e) {
		dispatch(setAppMessage("Error", "Unable to sign up user", "danger"));
	}
};

export const resetAuth = () => async dispatch => {
	dispatch({ type: RESET_AUTH });
};

export const resendOtp = clientId => async dispatch => {
	try {
		const res = await client.auth.resendOtp(clientId);
		if (res.data) {
			dispatch(
				setAppMessage("Success", "Successfully Sent Otp", "success")
			);
			return res.data;
		}
	} catch (e) {
		dispatch(
			setAppMessage(
				"Error",
				"Something Went wrong, Unable to send OTP",
				"danger"
			)
		);
	}
};

export const otpVerification = (clientId, otp) => async dispatch => {
	try {
		const res = await client.auth.otpVerification(clientId, otp);
		if (res.data) {
			dispatch(
				setAppMessage("Success", "Successfully OTP verify", "success")
			);
			return res.data;
		}
	} catch (e) {
		dispatch(setAppMessage("Error", "Wrong Otp, try again", "danger"));
	}
};

export const setClientId = (ClientTypeId, ClientId) => dispatch => {
	dispatch({
		type: SET_AUTH_CLIENT_ID,
		payload: { ClientTypeId, ClientId }
	});
};

export const createPassword = (clientId, password) => async dispatch => {
	try {
		const res = await client.auth.createPassword(clientId, password);

		if (res.status === 200) {
			dispatch(
				setAppMessage(
					"Success",
					"Successfully Changed Password",
					"success"
				)
			);
			return res.status;
		}
		if (res.status === 204) {
			dispatch(setAppMessage("Error", "Already created", "danger"));
			return res.status;
		}
	} catch (e) {
		dispatch(setAppMessage("Error", "Something Went wrong", "danger"));
	}
};

export const setLoginSuccessFul = (value, successLogin) => dispatch => {
	dispatch({ type: SET_SUCCESSFUL_LOGIN, payload: { value, successLogin } });
};

export const login = (
	loginId,
	password,
	IsLoginBySocialMedia
) => async dispatch => {
	try {
		const res = await client.auth.login(
			loginId,
			password,
			IsLoginBySocialMedia
		);
		console.log("res", res);
		if (res.status === 200) {
			dispatch(setAppMessage("Success", "Successfully Login", "success"));
			return res.data;
		}
	} catch (e) {
		console.log("e", e);
		dispatch(
			setAppMessage(
				"Error",
				"Unable to login, Something Went wrong",
				"danger"
			)
		);
	}
};

export const setLogout = () => dispatch => {
	dispatch({
		type: SET_LOGOUT
	});
};

export const resetPassword = payload => async dispatch => {
	try {
		const { ClientId } = Store().store.getState().auth;
		const resetPassword = Object.assign({}, payload, { ClientId });
		const res = await client.auth.resetPassword(resetPassword);
		console.log("from action ", res);
		if (res.data === "WRONG PASSWORD")
			dispatch(
				setAppMessage("Error", "Entered wrong password", "danger")
			);
		else if (res.status === 200) {
			dispatch(
				setAppMessage(
					"Success",
					"Successfully Changed Password",
					"success"
				)
			);
			return true;
		} else if (res.status === 204) {
			dispatch(
				setAppMessage(
					"Error",
					"Unable to change your password",
					"danger"
				)
			);
		}
	} catch (e) {
		dispatch(setAppMessage("Error", "Unable to change password", "danger"));
	}
};
