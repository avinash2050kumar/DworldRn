import React, { Component } from "react";
import {
	Image,
	StatusBar,
	View,
	Text,
	ScrollView,
	KeyboardAvoidingView,
	TouchableOpacity,
	FlatList,
	Alert
} from "react-native";
import { connect } from "react-redux";
import styled from "styled-components";
import {
	checkSubscription,
	driverGetVehiclePreferences,
	getLeaseDashBoard,
	ownerGetVehiclePreferences,
	setAppMessage
} from "../actions";
import {
	Card,
	Screen,
	StyledHeading,
	StyledText
} from "../theme/styledComponent";

import { isEmpty } from "../helper/string";
import { Formik } from "formik";
import Button from "../components/common/Buttons";
import styles from "../theme/styles";
import theme from "../theme/lightTheme";
import i18n from "i18n-js";
import NavigationService from "../config/NavigationService";

class MainScreen extends Component {
	static navigationOptions = ({ navigation }) => {
		return {
			title: "Profile Details"
		};
	};

	componentDidMount() {
		this.props.ownerGetVehiclePreferences();
		this.props.driverGetVehiclePreferences();
	}

	constructor(props) {
		super(props);
		this.action = [
			{
				type: [
					{
						Name: i18n.t("mainScreenPersonalDetails"),
						icon: require("../assets/images/resume.png"),
						route: "PersonalDetailScreen",
						param: { title: "Personal Detail" }
					},
					{
						Name: i18n.t("mainScreenExperienceDetails"),
						icon: require("../assets/images/experience.png"),
						route: "ExperiencesDLScreen"
					},
					{
						Name: i18n.t("mainScreenWorkScheduleDetails"),
						icon: require("../assets/images/calendar.png"),
						route: "WorkScheduleScreen"
					},
					{
						Name: i18n.t("mainScreenPayScaleDetails"),
						icon: require("../assets/images/payment.png"),
						route: "PayScaleScreen"
					},
					{
						Name: i18n.t("mainScreenVehiclePreferenceDetails"),
						icon: require("../assets/images/license.png"),
						route: "VehiclePreferenceScreen"
					}
				]
			},
			{
				type: [
					{
						Name: i18n.t("mainScreenPersonalDetails"),
						icon: require("../assets/images/resume.png"),
						route: "PersonalDetailScreen",
						param: { title: "Personal Detail" }
					},
					{
						Name: i18n.t("mainScreenAdsDriverDetails"),
						icon: require("../assets/images/requirement.png"),
						route: "PostAdsByOwner",
						param: { title: "Post a Ads for drivers", index: 0 },
						isSubscriptionCheck:true
					},
					{
						Name: i18n.t("mainScreenAdsVehicleDetails"),
						icon: require("../assets/images/requirement.png"),
						route: "PostAdsByOwner",
						param: { title: "Post a Ads for Vehicle", index: 1 },
						isSubscriptionCheck:true
					}
				]
			},
			{
				type: [
					{
						Name: i18n.t("mainScreenFirmDetails"),
						icon: require("../assets/images/resume.png"),
						route: "PersonalDetailScreen",
						param: { title: "Firm Detail" }
					},
					{
						Name: i18n.t("mainScreenPostRequirementDetails"),
						icon: require("../assets/images/requirement.png"),
						route: "PostRequirementsFirm",
						isSubscriptionCheck:true
					}
				]
			}
		];
		this.state = { selectedIndex: null };
	}

	_handleSubmit = async (payload, actions) => {};

	_resendOtp = async () => {};

	_onSelect = data => {
		console.log("data", data);
	};

	handlePlanCheck=async (item)=>{
		const res=await  this.props.checkSubscription()
		res.data?NavigationService.navigate(item.route, item.param):this.handleBuySubscription()

	}

	handleBuySubscription() {
		this.props.setAppMessage('Error','You Don\'t have enough ads left',"danger")
		NavigationService.navigate('BuySubscription')
	}

	_renderItem = (item, index) => (
		<TouchableOpacity
			key={index}
			style={{
				width: "45%"
			}}
			activeOpacity={1.0}
			onPress={() =>
				item.isSubscriptionCheck?this.handlePlanCheck(item):this.props.navigation.navigate(item.route, item.param)
			}
		>
			<Card
				style={{
					width: "100%",
					alignItems: "center",
					aspectRatio: 1,
					justifyContent: "center",
					backgroundColor:
						index == this.state.selectedIndex
							? "#ccc"
							: theme.cardBackgroundColor
				}}
			>
				<Image
					style={{ width: 70, aspectRatio: 1 }}
					source={item.icon}
					resizeMode="contain"
				/>
				<Text style={{ marginTop: 20 }}>{item.Name}</Text>
			</Card>
		</TouchableOpacity>
	);

	render() {
		return (
			<Screen style={{ backgroundColor: "#243164" }}>
				<StatusBar barStyle="dark-content" />
				<FlatList
					data={this.action[this.props.ClientTypeId - 1].type}
					columnWrapperStyle={{
						margin: "1%",
						justifyContent: "space-between"
					}}
					renderItem={({ item, index }) =>
						this._renderItem(item, index)
					}
					keyExtractor={(item, index) => index}
					numColumns={2}
					showsHorizontalScrollIndicator={false}
					showsVerticalScrollIndicator={false}
				/>
			</Screen>
		);
	}
}

const mapStateToProps = state => ({
	ClientTypeId: state.auth.ClientTypeId
});

const mapDispatchToProps = { driverGetVehiclePreferences,ownerGetVehiclePreferences,checkSubscription,setAppMessage };

export default connect(mapStateToProps, mapDispatchToProps)(MainScreen);
