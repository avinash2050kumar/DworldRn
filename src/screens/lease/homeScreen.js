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
} from "../../theme/styledComponent";
import {
	setHomeScreenVisibility,
	setHomeScreenNoOfWork,
	setDeviceLocation,
	getLeaseDashBoard
} from "../../actions";
import axios from "axios";
import HomeCarousel from "../../components/Home/Crousel";
import theme from "../../theme/lightTheme";
import styles from "../../theme/styles";
import * as Permissions from "expo-permissions";
// import * as Location from "expo-location";
import i18n from "i18n-js";
import NavigationService from "../../config/NavigationService";
import styled from "styled-components";
import AdPostModal from "./adPostModal";

const AddPostButton = styled.TouchableOpacity`
	padding: 16px;
	width: 90%;
	align-self: center;
	margin: 15px 0px;
	align-items: center;
	border-radius: 15px;
	border-color: ${props => props.theme.buttonColor};
	border-width: 1px;
`;

class LeaseHomeScreen extends Component {
	static navigationOptions = ({ navigation }) => {
		return {
			title: navigation.getParam("title")
		};
	};

	state = {
		location: null,
		errorMessage: null,
		isDriverPostFullVisible: false,
		isLeasingJobPostFullVisible: false,
		modalVisible: false
	};

	componentDidMount() {
		this.props.setHomeScreenNoOfWork();
		this.props.getLeaseDashBoard();
		if (Platform.OS === "android" && !Constants.isDevice) {
			this.setState({
				errorMessage: "unable to fetch device loaction"
			});
		} else {
			// this._getLocationAsync();
		}
	}

	_handleSubmit = payload => {
		this.props.setAppMessage(
			"Sending",
			"Try to send Successfully",
			"success"
		);
	};

	/*_getLocationAsync = async () => {
		let { status } = await Permissions.askAsync(Permissions.LOCATION);
		if (status !== "granted") {
			this.setState({
				errorMessage: "Permission to access location was denied"
			});
		}

		let location = await Location.getCurrentPositionAsync({});

		await axios
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
	};
*/
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

	_renderItem = (item, index, route) => (
		<TouchableOpacity
			key={index}
			style={{
				width: "30%"
			}}
			onPress={() =>
				NavigationService.navigate(route, {
					item,
					JobAddId: item.JobAddId,
					index: index
				})
			}
		>
			{console.log("route", route)}
			<ShadowLessCard
				style={{
					width: "100%",
					alignItems: "center",
					justifyContent: "space-around",
					backgroundColor: this.color(index !== 0 ? index % 5 : 0)
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
						{item.AplicantCount}
					</Text>
					<Text
						style={{
							fontSize: 11,
							marginLeft: 5,
							marginTop: 5,
							color: "rgba(41, 39, 95, 0.77)"
						}}
					>
						Applicants
					</Text>
				</View>
				<Text
					style={{
						fontSize: 14,
						marginLeft: 5,
						color: "rgba(41, 39, 95, 0.77)"
					}}
				>
					{item.CarCompany}
				</Text>
			</ShadowLessCard>
		</TouchableOpacity>
	);

	isEmpty = obj => {
		return Object.keys(obj).length === 0;
	};

	setModalVisible = () => this.setState({ modalVisible: false });

	render() {
		const { leaseDashBoard } = this.props;
		let text = "Waiting..";
		if (this.state.errorMessage) {
			text = this.state.errorMessage;
		} else if (this.state.location) {
			text = JSON.stringify(this.state.location);
		}

		return (
			<View style={{ paddingTop: 22 }}>
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
							source={require("../../assets/images/Location.png")}
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
					<View>
						<Image
							source={require("../../assets/images/Notification.png")}
							style={{
								width: 25,
								height: 25,
								resizeMode: "contain"
							}}
						/>
					</View>
				</NavigationBar>
				<ScrollView showsVerticalScrollIndicator={false}>
					<Screen style={{ backgroundColor: "#fff" }}>
						<StatusBar barStyle="dark-content" />
						<HomeCarousel />
						<AddPostButton
							onPress={() =>
								this.setState({ modalVisible: true })
							}
						>
							<Text style={{ color: theme.buttonColor }}>
								+Post New Ad
							</Text>
						</AddPostButton>
						<AdPostModal
							modalVisible={this.state.modalVisible}
							setModalVisible={this.setModalVisible}
							navigation={this.props.navigation}
						/>
						<StyledTitle style={{ marginTop: 20 }}>
							Job Ads
						</StyledTitle>
						{!this.isEmpty(leaseDashBoard) && (
							<View style={{ paddingBottom: 50 }}>
								<FlatList
									data={
										this.state.isDriverPostFullVisible
											? leaseDashBoard
											: leaseDashBoard.slice(0, 6)
									}
									columnWrapperStyle={{
										margin: "1%",
										justifyContent: "space-between"
									}}
									renderItem={({ item, index }) =>
										this._renderItem(
											item,
											index,
											"HomeScreenChildLeaseFirmTabs"
										)
									}
									ListFooterComponent={() => (
										<TouchableOpacity
											style={{ alignSelf: "flex-end" }}
											onPress={() =>
												this.setState({
													isDriverPostFullVisible: !this
														.state
														.isDriverPostFullVisible
												})
											}
										>
											<Text style={{ color: "#4eacbb" }}>
												{leaseDashBoard.length === 0
													? "No Data"
													: this.state
															.isDriverPostFullVisible
													? "Show Less"
													: "Show more"}
											</Text>
										</TouchableOpacity>
									)}
									extraData={
										this.state.isDriverPostFullVisible
									}
									keyExtractor={(item, index) => index}
									numColumns={3}
									showsHorizontalScrollIndicator={false}
									showsVerticalScrollIndicator={false}
								/>
							</View>
						)}
					</Screen>
				</ScrollView>
			</View>
		);
	}
}

const mapStateToProps = state => ({
	leaseDashBoard: state.home.leaseDashBoard,
	address: state.home.address
});

const mapDispatchToProps = {
	setHomeScreenVisibility,
	setDeviceLocation,
	setHomeScreenNoOfWork,
	getLeaseDashBoard
};

export default connect(mapStateToProps, mapDispatchToProps)(LeaseHomeScreen);
