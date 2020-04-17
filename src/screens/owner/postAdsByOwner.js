import React, { Component } from "react";
import {
	Image,
	StatusBar,
	View,
	Text,
	ScrollView,
	FlatList,
	TouchableOpacity,
	KeyboardAvoidingView
} from "react-native";
import { connect } from "react-redux";
import styled from "styled-components";
import theme from "../../theme/lightTheme";
import { Screen, StyledText, StyledTitle } from "../../theme/styledComponent";
import { Dropdown } from "react-native-material-dropdown";
import update from "immutability-helper";
import Button from "../../components/common/Buttons";
import {
	driverGetHourlyPay,
	ownerGetVehiclePreferences,
	saveDriverHourlyInfo,
	setAdsIndex
} from "../../actions";
import { Formik } from "formik";
import styles from "../../theme/styles";
import { withNextInputAutoFocusForm } from "react-native-formik";
import * as yup from "yup";
import NavigationService from "../../config/NavigationService";

const validationSchema = yup.object().shape({
	HourlyPay: yup.array().of(
		yup.object().shape({
			HourlyPrice: yup.string().required("Hourly Pricing is required"),
			ExtraHours: yup.string().required("Extra Hours Time is required"),
			NightHours: yup
				.string()
				.required("Night Charges (Hour) is required"),
			NightExtraHours: yup
				.string()
				.required("Night Charges (Extra Hour) is required")
		})
	)
});

const Card = styled.View`
	border-radius: 10px;
	margin: 10px 0px;
	background-color: #f1f3f6;
`;

const Form = withNextInputAutoFocusForm(View);

class PostAdsByOwner extends Component {
	static navigationOptions = ({ navigation }) => {
		return {
			title: navigation.getParam("title")
		};
	};

	constructor(props) {
		super(props);
		console.log("rposadsf", props);
		this.state = {
			selectedIndex: 0,
			routeName: "OwnerVehiclePreference",
			adsIndex: props.navigation.getParam("index")
				? props.navigation.getParam("index")
				: 0
		};
		this.action = [
			{
				data: [
					{
						id: 0,
						name: "Vehicle Details",
						route: "OwnerVehiclePreference",
						icon: require("../../assets/images/vechicle.png"),
						adsIndex: 0
					},
					{
						id: 1,
						name: "Driver Qualification",
						route: "OwnerDriverQualification",
						icon: require("../../assets/images/driverQualification.png"),
						adsIndex: 0
					},
					{
						id: 2,
						name: "Pay Scale",
						route: "OwnerDriverPayScaleTabs",
						icon: require("../../assets/images/salary.png"),
						params: { index: 0 },
						adsIndex: 0
					},
					{
						id: 3,
						name: "Working Shift",
						route: "OwnerDriverWorkSchedule",
						icon: require("../../assets/images/day-and-night.png"),
						params: { index: 0 },
						adsIndex: 0
					}
				]
			},
			{
				data: [
					{
						id: 0,
						name: "Vehicle Details",
						route: "OwnerVehiclePreference",
						icon: require("../../assets/images/vechicle.png"),
						adsIndex: 1
					},
					{
						id: 2,
						name: "Pay Scale",
						route: "OwnerDriverPayScaleTabs",
						icon: require("../../assets/images/salary.png"),
						adsIndex: 1
					}
				]
			}
		];
	}

	componentDidMount() {
		this.props.ownerGetVehiclePreferences();
	}

	_Submit = (values, actions) => {
		this.props.setAdsIndex(this.state.adsIndex);
		NavigationService.navigate(this.state.routeName);
	};

	_renderItem = (item, index) => (
		<TouchableOpacity
			key={index}
			style={{
				width: "45%"
			}}
			activeOpacity={1.0}
			onPress={() =>
				this.setState({
					selectedIndex: index,
					routeName: item.route,
					adsIndex: item.adsIndex
				})
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
							? "#29275F"
							: theme.secondThemeColor
				}}
			>
				<Image
					style={{
						width: index == this.state.selectedIndex ? 80 : 70,
						aspectRatio: 1
					}}
					source={item.icon}
					resizeMode="contain"
				/>
				<Text
					style={{
						fontSize: index == this.state.selectedIndex ? 16 : 14,
						marginTop: 20,
						color: "#fff",
						fontWeight:
							index == this.state.selectedIndex
								? "bold"
								: "normal"
					}}
				>
					{item.name}
				</Text>
			</Card>
		</TouchableOpacity>
	);

	render() {
		return (
			<Screen style={{ backgroundColor: "#fff" }}>
				<FlatList
					data={
						this.action[this.props.navigation.getParam("index")]
							.data
					}
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
				<Button
					onPress={() => this._Submit()}
					label="Save And Next"
					color="secondary"
				/>
			</Screen>
		);
	}
}

const mapStateToProps = state => ({});

const mapDispatchToProps = { ownerGetVehiclePreferences, setAdsIndex };

export default connect(mapStateToProps, mapDispatchToProps)(PostAdsByOwner);
