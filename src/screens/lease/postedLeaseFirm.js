import React, { Component } from "react";
import {
	StatusBar,
	View,
	ScrollView,
	KeyboardAvoidingView,
	Text,
	FlatList,
	TouchableOpacity,
	Image,
	Dimensions
} from "react-native";
import { connect } from "react-redux";
import Constants from "expo-constants";
import {
	Card,
	HorizontalLine,
	NavigationBar,
	Screen,
	ShadowLessCard,
	StyledText,
	StyledTitle
} from "../../theme/styledComponent";
import {
	setHomeScreenVisibility,
	setHomeScreenNoOfWork,
	getLeaseFirmPostedAds,
	setDeviceLocation,
	getOwnerJobDetailById
} from "../../actions";
import axios from "axios";
import HomeCarousel from "../../components/Home/Crousel";
import theme from "../../theme/lightTheme";
import styles from "../../theme/styles";
import i18n from "i18n-js";
import NavigationService from "../../config/NavigationService";
import Ionicons from "react-native-vector-icons/dist/Ionicons";
import styled from "styled-components";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const StyledPropText = styled.Text`
	color: ${props => props.theme.textLightColor};
	margin: 5px 0px;
`;

class PostedLeaseFirm extends Component {
	state = {};

	componentDidMount() {
		this.props.getLeaseFirmPostedAds();
	}

	renderCard = (item, index) => {
		return (
			<View style={{ marginLeft: 5, marginRight: 5 }}>
				<Card
					style={{
						paddingTop: 0,
						paddingRight: 0,
						paddingLeft: 0,
						paddingBottom: 0,
						borderRadius: 20
					}}
				>
					<View
						style={[
							styles.flex_row,
							{ justifyContent: "space-between", padding: 14 }
						]}
					>
						<StyledTitle>{item.Company}</StyledTitle>
					</View>
					<HorizontalLine />
					<View
						style={[
							styles.flex_row,
							{
								paddingTop: 10,
								paddingLeft: 16,
								paddingRight: 16,
								paddingBottom: 5,
								justifyContent: "space-between"
							}
						]}
					>
						<View>
							{item.VehicleCategory && (
								<StyledPropText>Vehicle Type</StyledPropText>
							)}
							<StyledPropText>Pay Scale</StyledPropText>
						</View>
						<View style={{ alignItems: "flex-end" }}>
							{item.VehicleCategory && (
								<StyledPropText>
									{item.VehicleCategory.Name}
								</StyledPropText>
							)}
							<StyledPropText>
								{item.PaymentType.Name}
							</StyledPropText>
						</View>
					</View>
					<HorizontalLine />
					<View style={[styles.flex_row]}>
						<TouchableOpacity
							style={{
								width: "50%",
								alignItems: "center",
								padding: 14,
								borderBottomRightRadius: 20
							}}
							onPress={() =>
								NavigationService.navigate(
									"OwnerRequestJobDetails",
									{
										item,
										buttonTitle: "Approve"
									}
								)
							}
						>
							<StyledTitle style={{ color: theme.orange }}>
								Details
							</StyledTitle>
						</TouchableOpacity>
						<TouchableOpacity
							style={{
								width: "50%",
								alignItems: "center",
								padding: 14,
								backgroundColor: theme.secondary,
								borderBottomRightRadius: 20
							}}
							onPress={() =>
								NavigationService.navigate("DriverApplicants", {
									index
								})
							}
						>
							<StyledTitle style={{ color: theme.white }}>
								Applicant List
							</StyledTitle>
						</TouchableOpacity>
					</View>
				</Card>
			</View>
		);
	};

	render() {
		return (
			<View>
				<View
					style={{
						paddingTop: 22,
						backgroundColor: theme.secondThemeColor
					}}
				>
					<NavigationBar
						style={[
							styles.flex_row,
							{
								justifyContent: "space-between",
								backgroundColor: theme.secondThemeColor,
								height: 60
							}
						]}
					>
						<View style={[styles.flex_row]}>
							<TouchableOpacity
								onPress={() => this.props.navigation.pop()}
							>
								<Ionicons
									name={"ios-arrow-round-back"}
									size={30}
									color={theme.white}
								/>
							</TouchableOpacity>
							<StyledTitle
								style={{
									color: "#fff",
									fontSize: 20,
									marginLeft: 15
								}}
							>
								Posted Ads
							</StyledTitle>
						</View>
					</NavigationBar>
				</View>
				<ScrollView showsVerticalScrollIndicator={false}>
					<View style={{ padding: 16 }}>
						<View
							style={{
								position: "absolute",
								top: 0
							}}
						>
							<View
								style={{
									paddingTop: 200,
									borderStyle: "solid",
									borderRightWidth: windowWidth,
									borderTopWidth: 100,
									borderRightColor: "transparent",
									borderTopColor: theme.secondThemeColor
								}}
							/>
						</View>
						<FlatList
							data={
								this.props.leaseFirmPostedAds
									? this.props.leaseFirmPostedAds
									: []
							}
							renderItem={({ item, index }) =>
								this.renderCard(item, index)
							}
							keyExtractor={(item, index) => index}
							showsHorizontalScrollIndicator={false}
							showsVerticalScrollIndicator={false}
						/>
					</View>
				</ScrollView>
			</View>
		);
	}
}

const mapStateToProps = state => ({
	address: state.home.address,
	leaseFirmPostedAds: state.lease.leaseFirmPostedAds
});

const mapDispatchToProps = {
	setHomeScreenVisibility,
	setDeviceLocation,
	setHomeScreenNoOfWork,
	getLeaseFirmPostedAds,
	getOwnerJobDetailById
};

export default connect(mapStateToProps, mapDispatchToProps)(PostedLeaseFirm);
