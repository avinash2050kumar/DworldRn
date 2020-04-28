import React, { Component } from "react";
import {
	StatusBar,
	View,
	ScrollView,
	KeyboardAvoidingView,
	Text,
	FlatList,
	TouchableOpacity,
	Image
} from "react-native";
import { connect } from "react-redux";
import Constants from "expo-constants";
import {
	Card,
	NavigationBar,
	Screen,
	ShadowLessCard,
	StyledText,
	StyledTitle
} from "../theme/styledComponent";
import {
	setHomeScreenVisibility,
	setHomeScreenNoOfWork,
	setDeviceLocation
} from "../actions";
import axios from "axios";
import HomeCarousel from "../components/Home/Crousel";
import theme from "../theme/lightTheme";
import styles from "../theme/styles";
import * as Permissions from "expo-permissions";
// import * as Location from "expo-location";
import i18n from "i18n-js";
import NavigationService from "../config/NavigationService";
import {PERMISSIONS, requestMultiple} from "react-native-permissions";
import Geolocation from "@react-native-community/geolocation";

class HomeScreen extends Component {
	static navigationOptions = ({ navigation }) => {
		return {
			title: navigation.getParam("title")
		};
	};

	state = {
		location: 'Unable to fetch your location',
		errorMessage: null
	};

	componentDidMount() {
		this.props.setHomeScreenNoOfWork();
		requestMultiple([PERMISSIONS.IOS.LOCATION_ALWAYS,PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION]).then(
			(statuses) => {
				console.log('Camera', statuses[PERMISSIONS.IOS.LOCATION_ALWAYS]);
				if(statuses[PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION]=='granted')
					Geolocation.getCurrentPosition(location => {
						axios
							.get(
								`https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.coords.latitude},${location.coords.longitude}&key=AIzaSyDVo9Zmn86bAlIMz4pxCqUeDdn0Gm2I4pw`
							)
							.then(response => {
								this.props.setDeviceLocation(
									location,
									response.data.results[0]
								);
							});

						this.setState({ location });
					})
				if(statuses[PERMISSIONS.IOS.LOCATION_ALWAYS]=='granted')
					Geolocation.getCurrentPosition(location => {
						axios
							.get(
								`https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.coords.latitude},${location.coords.longitude}&key=AIzaSyDVo9Zmn86bAlIMz4pxCqUeDdn0Gm2I4pw`
							)
							.then(response => {
								this.props.setDeviceLocation(
									location,
									response.data.results[0]
								);
							});

						this.setState({ location });
					})
			},
		);
	}

	_handleSubmit = payload => {
		this.props.setAppMessage(
			"Sending",
			"Try to send Successfully",
			"success"
		);
	};

	color = index => {
		const colors = [
			"rgba(0, 203, 153, 0.6)",
			"rgba(255, 116, 116, 0.6)",
			"rgba(92, 183, 248, 0.6)",
			"rgba(250, 197, 75, 0.6)",
			"rgba(146, 60, 180, 0.6)",
			"rgba(173, 190, 82, 0.6)"
		];
		return colors[index];
	};

	_renderItem = (item, index) => (
		<TouchableOpacity
			key={index}
			style={{
				width: "99%"
			}}
			onPress={() =>
				NavigationService.navigate("DriverHomeCardDetailScreen", {
					title: item.type,
					index: index
				})
			}
		>
			<ShadowLessCard
				style={{
					width: "100%",
					alignItems: "center",
					justifyContent: "space-around",
					backgroundColor: this.color(index)
				}}
			>
				<View style={[styles.flex_row, { marginTop: 7 }]}>
					<Text
						style={{
							fontWeight: "bold",
							fontSize: 25,
							color: "rgba(41, 39, 95, 0.77)"
						}}
					>
						{item.number}
					</Text>
					<Text
						style={{
							fontSize: 11,
							marginLeft: 5,
							marginTop: 5,
							color: "rgba(41, 39, 95, 0.77)"
						}}
					>
						Jobs
					</Text>
				</View>
				<Text
					style={{
						fontSize: 14,
						marginLeft: 5,
						color: "rgba(41, 39, 95, 0.77)"
					}}
				>
					{item.type}
				</Text>
			</ShadowLessCard>
		</TouchableOpacity>
	);

	render() {
		const { work } = this.props.home;
		let text = "Waiting..";
		if (this.state.errorMessage) {
			text = this.state.errorMessage;
		} else if (this.state.location) {
			text = JSON.stringify(this.state.location);
		}
		return (
			<View style={{ /*paddingTop: 22*/ }}>
				<NavigationBar
					style={[
						styles.flex_row,
						{
							justifyContent: "space-between"
						}
					]}
				>
					<View style={[styles.flex_row, { alignItems: "center" }]}>
						<Image
							source={require("../assets/images/Location.png")}
							style={{
								width: 25,
								height: 25,
								resizeMode: "contain"
							}}
						/>
						<View style={{ marginLeft: 10, width: "70%" }}>
							<Text style={{ color: theme.textLightColor }}>
								You are here
							</Text>

							<Text numberOfLines={1}>
								{this.props.address
									? this.props.address.formatted_address
									: "unable to get Location"}
							</Text>
						</View>
					</View>

				</NavigationBar>
				<ScrollView showsVerticalScrollIndicator={false}>
					<Screen style={{ backgroundColor: "#fff" }}>
						<StatusBar barStyle="dark-content" />
						<HomeCarousel />
						<StyledTitle style={{ marginTop: 20 }}>
							{work.title}
						</StyledTitle>

						<FlatList
							data={work.data}
							/*columnWrapperStyle={{
								margin: "1%",
								justifyContent: "space-between"
							}}*/
							renderItem={({ item, index }) =>
								this._renderItem(item, index)
							}
							keyExtractor={(item, index) => index}
							//numColumns={3}
							showsHorizontalScrollIndicator={false}
							showsVerticalScrollIndicator={false}
						/>
					</Screen>
				</ScrollView>
			</View>
		);
	}
}

const mapStateToProps = state => ({
	home: state.home,
	address: state.home.address
});

const mapDispatchToProps = {
	setHomeScreenVisibility,
	setDeviceLocation,
	setHomeScreenNoOfWork
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
