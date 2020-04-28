import React from "react";
import {
	createStackNavigator,
	createAppContainer,
	createDrawerNavigator,
	createSwitchNavigator
} from "react-navigation";

import SplashScreen from "../screens/splashScreen";
import LoginScreen from "../screens/loginScreen";
import LogoutScreen from "../screens/logout";
import SignUpScreen from "../screens/signup";
import IntroScreen from "../screens/introScreen";
import ChooseYourProfileScreen from "../screens/chooseYourProfile";
import ForgetPasswordScreen from "../screens/forgetPassword";
import OtpVerificationScreen from "../screens/otpVerification";
import CreatePasswordScreen from "../screens/createPassword";
import MainScreen from "../screens/MainScreen";
import PersonalDetailScreen from "../screens/personalDetailScreen";
import ExperiencesDLScreen from "../screens/experiencesDLScreen";
import WorkScheduleScreen from "../screens/WorkScheduleScreen";
import PayScaleScreen from "../screens/payScaleScreen";
import VehiclePreferenceScreen from "../screens/driver/vehiclePreference";
import HomeTabs from "../screens/homeTabs";
import ChangePasswordScreen from "../screens/changePassword";
import ProfileScreen from "../screens/ProfileScreen";

import DrawerMenu from "../components/DrawerMenu";
import CustomerSupportScreen from "../screens/customerSupport";
import ProfileFormScreen from "../screens/profileForm";
import LanguageScreen from "../screens/Language";
import DriverHomeCardDetailScreen from "../screens/driverHomeCardDetailScreen";
import JobDescriptionScreen from "../screens/jobDescriptionScreen";
import PostAdsByOwner from "../screens/owner/postAdsByOwner";
import OwnerVehiclePreference from "../screens/owner/vehiclePreference";
import OwnerDriverQualification from "../screens/owner/ownerDriverQualification";
import OwnerDriverWorkSchedule from "../screens/owner/ownerWorkSchedule";
import OwnerDriverPayScaleTabs from "../screens/owner/ownerPayscaleTabs";
import OwnerDriverJobList from "../screens/owner/ownerDriverDetail";
import OwnerJobTabs from "../screens/owner/ownerJobTabs";
import OwnerRequestJobDetails from "../screens/owner/ownerRequestJobDetails";
import Policy from "../screens/Policy";
import SubscriptionPlan from "../screens/subscriptionPlan";
import DriverJobOfferScreen from "../screens/driverJobOffer";
import JobOfferDescriptionScreen from "../screens/JobOfferDescriptionScreen";
import OwnerLeaseFirmTabs from "../screens/owner/ownerLeaseFirmTabs";
import OwnerLeaseFirmDetails from "../screens/owner/ownerLeaseFirmDetails";
import FindAllLeaseFirmOwner from "../screens/lease/FindAllOwner";
import HomeScreenChildLeaseFirmTabs from "../screens/lease/HomeScreenChildLeaseFirmTabs";
import LeaseFirmOwnerDetails from "../screens/lease/LeaseFirmOwnerDetails";
import OwnerJobPost from "../screens/owner/ownerJobPostTabs";
import DriverApplicants from "../screens/owner/jobPost/DriverApplicants";
import LeaseFirmApplicant from "../screens/owner/jobPost/LeasingFirm";
import PostRequirementsFirm from "../screens/lease/postRequirements";
import LeaseContractDetails from "../screens/lease/contractDetails";
import LeaseFirmPayScaleTabs from "../screens/lease/LeaseFirmPayScaleTabs";
import NoInternet from "../screens/NoInternet";

// Stack Navigators

const IntroStack = createStackNavigator(
	{ IntroScreen },
	{ initialRouteName: "IntroScreen" }
);

const ChooseYourProfileStack = createStackNavigator(
	{ ChooseYourProfileScreen },
	{ initialRouteName: "ChooseYourProfileScreen" }
);

const UserStack = createStackNavigator(
	{
		Home: HomeTabs,
		MainScreen,
		PersonalDetailScreen,
		ExperiencesDLScreen,
		WorkScheduleScreen,
		PayScaleScreen,
		VehiclePreferenceScreen,
		ChangePasswordScreen,
		CustomerSupportScreen,
		DriverApplicants,
		ProfileFormScreen,
		DriverHomeCardDetailScreen,
		LanguageScreen,
		JobDescriptionScreen,
		PostAdsByOwner,
		OwnerVehiclePreference,
		OwnerDriverQualification,
		OwnerDriverWorkSchedule,
		OwnerDriverPayScaleTabs,
		OwnerDriverJobList,
		OwnerJobTabs,NoInternet,
		OwnerRequestJobDetails,
		Policy,
		SubscriptionPlan,
		PostRequirementsFirm,
		DriverJobOfferScreen,
		LeaseFirmOwnerDetails,
		JobOfferDescriptionScreen,
		OwnerLeaseFirmDetails,
		FindAllLeaseFirmOwner,
		HomeScreenChildLeaseFirmTabs,
		OwnerLeaseFirmTabs,
		OwnerJobPost,
		LeaseFirmApplicant,
		LeaseContractDetails,
		LeaseFirmPayScaleTabs
	},
	{
		initialRouteName: "Home",
		defaultNavigationOptions: {
			headerTitleStyle: { fontWeight: "bold" },
			gesturesEnabled: false
		}
	}
);

/*const LeaseFirm = createStackNavigator(
	{
		MainScreen,
		PersonalDetailScreen
	},
	{
		initialRouteName: "MainScreen",
		defaultNavigationOptions: {
			headerTitleStyle: { fontWeight: "bold" },
			gesturesEnabled: false
		}
	}
);*/

const Authentication = createStackNavigator(
	{
		LoginScreen,
		SignUpScreen,
		ForgetPasswordScreen,
		OtpVerificationScreen,
		CreatePasswordScreen,
		LogoutScreen
	},
	{
		initialRouteName: "LoginScreen"
	}
);

const Splash = createStackNavigator({
	Splash: SplashScreen
});

// Switch Navigator
export default createAppContainer(
	createSwitchNavigator(
		{
			Auth: Authentication,
			SplashSrn: Splash,
			Intro: IntroStack,
			ChooseYourProfile: ChooseYourProfileStack,
			UserStack
		},
		{ initialRouteName: "SplashSrn" }
	)
);
