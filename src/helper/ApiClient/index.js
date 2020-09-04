import sha1 from 'sha1';
import axios from 'axios';
import instance from './instance';
import Store from '../../store';

const Client = () => {
  let call = axios.CancelToken.source();

  return {
    auth: {
      signUpNewUser(payload) {
        return instance.post('/api/Login/SignUp', payload);
      },
      resetPassword(value) {
        return instance.post('/api/Login/ResetPassword', value);
      },
      otpVerification(clientId, Otp) {
        return instance.get(
          `/api/Login/AuthenticateOTP?ClientId=${clientId}&OTP=${Otp}`,
        );
      },
      resendOtp(clientId) {
        return instance.get(`/api/Login/ResendOTP?ClientId=${clientId}`);
      },
      saveProfileImage(img_obj) {
        return instance.post(`/api/Login/SaveProfileImage`, img_obj);
      },
      login(loginId, password, IsLoginBySocialMedia) {
        return instance.post(`/api/Login/SignIn`, {
          LoginId: loginId,
          Password: password,
          IsLoginBySocialMedia,
        });
      },
      upgradeRole(roleType) {
        const {ClientId} = Store().store.getState().auth;
        console.warn(
          'url',
          `/api/Login/UpdateRole?ClientId=${ClientId}&RoleType=${roleType}`,
        );
        return instance.get(
          `/api/Login/UpdateRole?ClientId=${ClientId}&RoleType=${roleType}`,
        );
      },
      createPassword(clientId, Password) {
        return instance.get(
          `/api/Login/CreatePassword?ClientId=${clientId}&Password=${Password}`,
        );
      },
    },
    main: {
      driverAddNewVehicle(vehicle) {
        return instance.post(
          `https://djobs.azurewebsites.net/api/LeasingFirm/SaveVehicleType?VehicleType=${vehicle}`,
        );
      },

      getVehicleCompany() {
        return instance.get(`api/Driver/GetVehicleCompany`);
      },

      getPersonalDetails() {
        const {ClientId} = Store().store.getState().auth;
        return instance.get(
          `/api/Driver/GetPersonalDetail?ClientId=${ClientId}`,
        );
      },

      getExperience() {
        const {ClientId} = Store().store.getState().auth;
        return instance.get(`/api/Driver/GetLicense?ClientId=${ClientId}`);
      },
      /*  =================================================================  */
      getWorkSchedule() {
        const {ClientId} = Store().store.getState().auth;
        return instance.get(`/api/Driver/GetWorkShedule?ClientId=${ClientId}`);
      },
      postWorkSchedule(value) {
        const {ClientId} = Store().store.getState().auth;
        const FinalValue = Object.assign({}, value, {ClientId});
        return instance.post(`/api/Driver/SaveWorkSchedule`, FinalValue);
      },
      /*===========================================*/
      driverGetHourlyPay() {
        const {ClientId} = Store().store.getState().auth;
        return instance.get(`/api/Driver/GetHourlyPay?ClientId=${ClientId}`);
      },

      driverSaveHourly(value) {
        return instance.post(`/api/Driver/SaveHourlyPay`, value);
      },
      /*===========================================*/
      driverGetWeeklyPay() {
        const {ClientId} = Store().store.getState().auth;
        return instance.get(`/api/Driver/GetWeeklyPay?ClientId=${ClientId}`);
      },
      driverSaveWeeklyPay(value) {
        return instance.post(
          `/api/Driver/SaveWeeklyPay
`,
          value,
        );
      },
      /*===========================================*/

      driverGetMonthlyPay() {
        const {ClientId} = Store().store.getState().auth;
        return instance.get(`/api/Driver/GetMonthlyPay?ClientId=${ClientId}`);
      },

      driverSaveMonthlyPay(value) {
        return instance.post(`/api/Driver/SaveMonthlyPay`, value);
      },
      /*===========================================*/
      driverGetKMPay() {
        const {ClientId} = Store().store.getState().auth;
        return instance.get(`/api/Driver/GetKMPay?ClientId=${ClientId}`);
      },
      driverSaveKMPay(value) {
        return instance.post(`api/Driver/SaveKMPay`, value);
      },
      /*===========================================*/

      driverGetTripPay() {
        const {ClientId} = Store().store.getState().auth;
        return instance.get(`/api/Driver/GetTripPay?ClientId=${ClientId}`);
      },

      driverSaveTripPay(value) {
        return instance.post(`/api/Driver/SaveTripPay`, value);
      },

      /*===========================================*/
      driverGetVechiclePreference() {
        const {ClientId} = Store().store.getState().auth;
        return instance.get(
          `/api/Driver/GetVehicleCategory?ClientId=${ClientId}`,
        );
      },
      driverApproveOfferJob(toClientOffer, jobId) {
        const {ClientId} = Store().store.getState().auth;
        return instance.get(
          `/api/Driver/ApproveDriverOfferJob?OfferByClientId=${ClientId}&OfferToClientId=${toClientOffer}&JobId=${jobId}`,
        );
      },

      applyFirmJob(JobId) {
        const {ClientId} = Store().store.getState().auth;
        return instance.get(
          `/api/LeasingFirm/ApplyFirmJob?ClientId=${ClientId}&JobId=${JobId}`,
        );
      },

      driverSaveVechiclePreference(value) {
        const {ClientId} = Store().store.getState().auth;
        return instance.post(
          `/api/Driver/SaveVehicleCategory`,
          Object.assign({}, value, {
            vehicleCategory: {
              ...value.vehicleCategory,
              ClientId,
            },
          }),
        );
      },

      saveProfile(value) {
        const {ClientId} = Store().store.getState().auth;
        const profileValue = Object.assign({}, value, {
          ClientId: ClientId,
        });
        return instance.post('/api/Driver/SaveProfile', profileValue);
      },

      /*===========================================*/
      ownerGetVechiclePreference() {
        const {ClientId} = Store().store.getState().auth;
        return instance.get(`/api/Owner/GetAllOwnerDropDown`);
      },

      ownerSaveVechiclePreference(value) {
        return instance.post(`/api/Driver/SaveVehicleCategory`, value);
      },

      /*===========================================*/
      getAllDriverJobs() {
        const {ClientId} = Store().store.getState().auth;
        return instance.get(`/api/Driver/GetJob?ClientId=${ClientId}`);
      },

      SaveOwnerJob(value) {
        const {ClientId} = Store().store.getState().auth;
        const OwnerJob = Object.assign(
          {},
          Store().store.getState().main.owner.postAdsDriver,
          {ClientId},
        );

        return instance.post(`/api/Owner/SaveOwnerJob`, OwnerJob);
      },

      saveExperienceAndDl(payload) {
        return instance.post(`/api/Driver/SaveLicense`, payload);
      },

      SaveOwnerFirm(value) {
        const {ClientId} = Store().store.getState().auth;
        return instance.post(`/api/Owner/SaveLeasingFirmJob`, value);
      },

      getJobId(jobId) {
        const {ClientId} = Store().store.getState().auth;
        return instance.get(`/api/Owner/GetDriverDetails?JobId=${jobId}`);
      },

      getLeaseFirmById(jobId) {
        const {ClientId} = Store().store.getState().auth;
        return instance.get(`/api/Owner/GetFirmDetails?FirmId=${jobId}`);
      },

      getAllLeaseFirm(jobId) {
        const {ClientId} = Store().store.getState().auth;
        return instance.get(`/api/Owner/GetAllFirmDetails?FirmId=${jobId}`);
      },

      getAllDriverOwner(jobId) {
        const {ClientId} = Store().store.getState().auth;
        return instance.get(`/api/Owner/GetAllDriverDetails?JobId=${jobId}`);
      },

      getOwnerPost() {
        const {ClientId} = Store().store.getState().auth;
        return instance.get(`/api/Owner/GetPostedJob?ClientId=${ClientId}`);
      },

      driverApplyJob(jobId) {
        const {ClientId} = Store().store.getState().auth;
        return instance.get(
          `/api/Driver/ApplyJob?ClientId=${ClientId}&JobId=${jobId}`,
        );
      },

      driverGetJobOffer() {
        const {ClientId} = Store().store.getState().auth;
        return instance.get(`/api/Driver/GetOfferJob?ClientId=${ClientId}`);
      },

      getLeaseDashBoard() {
        const {ClientId} = Store().store.getState().auth;
        return instance.get(
          `/api/LeasingFirm/LeasingFirmDashBord?ClientId=${ClientId}`,
        );
      },

      FindOwnerFirm(firmId) {
        const {ClientId} = Store().store.getState().auth;
        return instance.get(`/api/LeasingFirm/FindOwnerFirm?FirmId=${firmId}`);
      },

      requestedLeaseFirmDetail(firmId) {
        const {ClientId} = Store().store.getState().auth;
        return instance.get(
          `/api/LeasingFirm/GetLeaseFirmDetails?ClientId=${ClientId}&FirmId=${firmId}`,
        );
      },

      /*===============================================*/
      getOwnerDashBoard() {
        const {ClientId} = Store().store.getState().auth;
        return instance.get(
          `/api/Owner/GetOwnerDashBoard?ClientId=${ClientId}`,
        );
      },
      getPostedLeaseFirm() {
        const {ClientId} = Store().store.getState().auth;
        return instance.get(
          `/api/LeasingFirm/PostedRequirement?ClientId=${ClientId}`,
        );
      },
      applyOwnerFindDriver(offerToClientId, JobId) {
        const {ClientId} = Store().store.getState().auth;
        return instance.get(
          `/api/Owner/OfferJob?OfferByClientId=${ClientId}&OfferToClientId=${offerToClientId}&JobId=${JobId}`,
        );
      },
      applyOwnerFindFirm(offerToClientId, JobId) {
        const {ClientId} = Store().store.getState().auth;
        return instance.get(
          `/api/Owner/RequestFirm?OfferByClientId=${ClientId}&OfferToClientId=${offerToClientId}&JobId=${JobId}`,
        );
      },
      saveSubscription(payload) {
        const {ClientId} = Store().store.getState().auth;
        return instance.post(`/api/Login/SaveSuscription`, payload);
      },

      getUserSubscription() {
        const {ClientId} = Store().store.getState().auth;
        return instance.get(`/api/Login/GetSuscription?ClientId=${ClientId}`);
      },

      checkSubscription() {
        const {ClientId} = Store().store.getState().auth;
        return instance.get(`/api/Login/CheckSuscription?ClientId=${ClientId}`);
      },

      approveDriverApplyjob(toClientId, JobId) {
        const {ClientId} = Store().store.getState().auth;
        return instance.get(
          `/api/Owner/ApproveDriverApplyJob?ClientId=${toClientId}&JobId=${JobId}`,
        );
      },
      approveFirmApplyJob(toClientId, JobId) {
        const {ClientId} = Store().store.getState().auth;
        return instance.get(
          `/api/Owner/ApproveFirmApplyJob?ClientId=${toClientId}&JobId=${JobId}`,
        );
      },

      approveDriverOffer(jobId) {
        const {ClientId} = Store().store.getState().auth;
        return instance.get(
          `/api/Driver/ApproveDriverOfferJob?ClientId=${ClientId}&JobId=${jobId}`,
        );
      },

      approveFirmOffer(jobId) {
        const {ClientId} = Store().store.getState().auth;
        return instance.get(
          `/api/LeasingFirm/ApproveFirmRequestedJob?ClientId=${ClientId}&JobId=${jobId}`,
        );
      },

      saveLeaseFirmRequirement(value) {
        const {ClientId} = Store().store.getState().auth;
        return instance.post(
          `/api/LeasingFirm/SaveLeasingFirmRequirement`,
          Object.assign({}, value, {
            FirmVehicle: {
              ...value.FirmVehicle,
              ClientId: ClientId,
            },
          }),
        );
      },
    },
  };
};

export default new Client();
