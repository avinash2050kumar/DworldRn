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
	setDeviceLocation,
	getOwnerJobDetailById
} from "../../actions";
import axios from "axios";
import HomeCarousel from "../../components/Home/Crousel";
import theme from "../../theme/lightTheme";
import styles from "../../theme/styles";
import NavigationService from "../../config/NavigationService";
import styled from "styled-components";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const StyledPropText = styled.Text`
	color: ${props => props.theme.textLightColor};
	margin: 5px 0px;
`;

class LeasingFirmFirmList extends Component {
	state = {};

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
									"OwnerLeaseFirmDetails",
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
								NavigationService.navigate(
									"LeaseFirmApplicant",
									{ index }
								)
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
						data={this.props.job ? this.props.job : []}
						renderItem={({ item, index }) =>
							this.renderCard(item, index)
						}
						keyExtractor={(item, index) => index}
						showsHorizontalScrollIndicator={false}
						showsVerticalScrollIndicator={false}
					/>
				</View>
			</ScrollView>
		);
	}
}

const mapStateToProps = state => ({
	ownerDashBoard: state.home.ownerDashBoard,
	address: state.home.address,
	job: state.owner.jobPost.FirmJob
});

const mapDispatchToProps = {
	setHomeScreenVisibility,
	setDeviceLocation,
	setHomeScreenNoOfWork,
	getOwnerJobDetailById
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(LeasingFirmFirmList);
