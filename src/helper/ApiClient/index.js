import sha1 from "sha1";
import axios from "axios";
import instance from "./instance";
import Store from "../../store";

const Client = () => {
	let call = axios.CancelToken.source();

	return {
		auth: {
			signUpNewUser(payload) {
				return instance.post("/api/Login/SignUp", payload);
			},
			resetPassword(value) {
				return instance.post("/api/Login/ResetPassword", value);
			},
			otpVerification(clientId, Otp) {
				return instance.get(
					`/api/Login/AuthenticateOTP?ClientId=${clientId}&OTP=${Otp}`
				);
			},
			resendOtp(clientId) {
				return instance.get(
					`/api/Login/ResendOTP?ClientId=${clientId}`
				);
			},
			login(loginId, password, IsLoginBySocialMedia) {
				return instance.post(`/api/Login/SignIn`, {
					LoginId: loginId,
					Password: password,
					IsLoginBySocialMedia
				});
			},
			createPassword(clientId, Password) {
				console.log("clientId", Password, clientId);
				return instance.get(
					`/api/Login/CreatePassword?ClientId=${clientId}&Password=${Password}`
				);
			}
		},
		main: {
			getPersonalDetails() {
				const { ClientId } = Store().store.getState().auth;
				return instance.get(
					`/api/Driver/GetPersonalDetail?ClientId=${ClientId}`
				);
			},

			getExperience() {
				const { ClientId } = Store().store.getState().auth;
				return instance.get(
					`/api/Driver/GetLicense?ClientId=${ClientId}`
				);
			},
			/*  =================================================================  */
			getWorkSchedule() {
				const { ClientId } = Store().store.getState().auth;
				return instance.get(
					`/api/Driver/GetWorkShedule?ClientId=${ClientId}`
				);
			},
			postWorkSchedule(value) {
				return instance.post(`/api/Driver/SaveWorkSchedule`, value);
			},
			/*===========================================*/
			driverGetHourlyPay() {
				const { ClientId } = Store().store.getState().auth;
				return instance.get(
					`/api/Driver/GetHourlyPay?ClientId=${ClientId}`
				);
			},

			driverSaveHourly(value) {
				return instance.post(`/api/Driver/SaveHourlyPay`, value);
			},
			/*===========================================*/
			driverGetWeeklyPay() {
				const { ClientId } = Store().store.getState().auth;
				return instance.get(
					`/api/Driver/GetWeeklyPay?ClientId=${ClientId}`
				);
			},
			driverSaveWeeklyPay(value) {
				return instance.post(
					`/api/Driver/SaveWeeklyPay
`,
					value
				);
			},
			/*===========================================*/

			driverGetMonthlyPay() {
				const { ClientId } = Store().store.getState().auth;
				return instance.get(
					`/api/Driver/GetMonthlyPay?ClientId=${ClientId}`
				);
			},

			driverSaveMonthlyPay(value) {
				return instance.post(`/api/Driver/SaveMonthlyPay`, value);
			},
			/*===========================================*/
			driverGetKMPay() {
				const { ClientId } = Store().store.getState().auth;
				return instance.get(
					`/api/Driver/GetKMPay?ClientId=${ClientId}`
				);
			},
			driverSaveKMPay(value) {
				return instance.post(`api/Driver/SaveKMPay`, value);
			},
			/*===========================================*/

			driverGetTripPay() {
				const { ClientId } = Store().store.getState().auth;
				return instance.get(
					`/api/Driver/GetTripPay?ClientId=${ClientId}`
				);
			},

			driverSaveTripPay() {
				return instance.post(`/api/Driver/SaveTripPay`, value);
			},

			/*===========================================*/
			driverGetVechiclePreference() {
				const { ClientId } = Store().store.getState().auth;
				return instance.get(
					`/api/Driver/GetVehicleCategory?ClientId=${ClientId}`
				);
			},

			driverSaveVechiclePreference(value) {
				return instance.post(`/api/Driver/SaveVehicleCategory`, value);
			},

			saveProfile(value) {
				const { ClientId } = Store().store.getState().auth;
				const profileValue = Object.assign({}, value, {
					ClientId: ClientId
				});
				console.log(" profileValue", profileValue);
				return instance.post("/api/Driver/SaveProfile", profileValue);
			},

			/*===========================================*/
			ownerGetVechiclePreference() {
				const { ClientId } = Store().store.getState().auth;
				return instance.get(`/api/Owner/GetAllOwnerDropDown`);
			},

			ownerSaveVechiclePreference(value) {
				return instance.post(`/api/Driver/SaveVehicleCategory`, value);
			},

			/*===========================================*/
			getAllDriverJobs() {
				const { ClientId } = Store().store.getState().auth;
				return instance.get(`/api/Driver/GetJob?ClientId=${ClientId}`);
			},

			SaveOwnerJob(value) {
				const { ClientId } = Store().store.getState().auth;
				const OwnerJob = Object.assign(
					{},
					Store().store.getState().main.owner.postAdsDriver,
					{ ClientId }
				);

				return instance.post(`/api/Owner/SaveOwnerJob`, OwnerJob);
			},

			SaveOwnerFirm(value) {
				const { ClientId } = Store().store.getState().auth;
				return instance.post(`/api/Owner/SaveLeasingFirmJob`, value);
			},

			getJobId(jobId) {
				const { ClientId } = Store().store.getState().auth;
				return instance.get(
					`/api/Owner/GetDriverDetails?JobId=${jobId}`
				);
			},

			getLeaseFirmById(jobId) {
				const { ClientId } = Store().store.getState().auth;
				return instance.get(
					`/api/Owner/GetFirmDetails?FirmId=${jobId}`
				);
			},

			getAllLeaseFirm(jobId) {
				const { ClientId } = Store().store.getState().auth;
				return instance.get(
					`/api/Owner/GetAllFirmDetails?FirmId=${jobId}`
				);
			},

			getAllDriverOwner(jobId) {
				const { ClientId } = Store().store.getState().auth;
				return instance.get(
					`/api/Owner/GetAllDriverDetails?JobId=${jobId}`
				);
			},

			getOwnerPost() {
				const { ClientId } = Store().store.getState().auth;
				return instance.get(
					`/api/Owner/GetPostedJob?ClientId=${ClientId}`
				);
			},

			driverApplyJob(jobId) {
				const { ClientId } = Store().store.getState().auth;
				return instance.get(
					`/api/Driver/ApplyJob?ClientId=${ClientId}&JobId=${jobId}`
				);
			},

			driverGetJobOffer() {
				const { ClientId } = Store().store.getState().auth;
				return instance.get(
					`/api/Driver/GetOfferJob?ClientId=${ClientId}`
				);
			},

			getLeaseDashBoard() {
				const { ClientId } = Store().store.getState().auth;
				return instance.get(
					`/api/LeasingFirm/LeasingFirmDashBord?ClientId=${ClientId}`
				);
			},

			FindOwnerFirm(firmId) {
				const { ClientId } = Store().store.getState().auth;
				return instance.get(
					`/api/LeasingFirm/FindOwnerFirm?FirmId=${firmId}`
				);
			},

			requestedLeaseFirmDetail(firmId) {
				const { ClientId } = Store().store.getState().auth;
				return instance.get(
					`/api/LeasingFirm/GetLeaseFirmDetails?FirmId=${firmId}`
				);
			},

			/*===============================================*/
			getOwnerDashBoard() {
				const { ClientId } = Store().store.getState().auth;
				return instance.get(
					`/api/Owner/GetOwnerDashBoard?ClientId=${ClientId}`
				);
			},
			getPostedLeaseFirm() {
				const { ClientId } = Store().store.getState().auth;
				return instance.get(
					`/api/LeasingFirm/PostedRequirement?ClientId=${ClientId}`
				);
			},
			saveLeaseFirmRequirement(value) {
				const { ClientId } = Store().store.getState().auth;
				return instance.post(
					`/api/LeasingFirm/SaveLeasingFirmRequirement`,
					Object.assign({}, value, {
						FirmVehicle: {
							ClientId: ClientId
						}
					})
				);
			}
		}
	};
};

export default new Client();
