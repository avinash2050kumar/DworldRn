import React from "react";
import {
	Dimensions,
	FlatList,
	Image,
	ScrollView,
	StatusBar,
	TouchableOpacity,
	View
} from "react-native";
import {
	Button,
	Card,
	HorizontalLine,
	StyledTitle
} from "../theme/styledComponent";
import styles from "../theme/styles";
import theme from "../theme/lightTheme";
import styled from "styled-components";
import { login, setHomeScreenVisibility, setLoginSuccessFul } from "../actions";
import { connect } from "react-redux";
import { NavigationBar, Screen } from "../theme/styledComponent";
import Ionicons from "react-native-vector-icons/dist/Ionicons";
import Modal from "react-native-modal";
import FilterAndSorting from "../components/Driver/filterAndSorting";
import DriverHomeCard from "../components/Driver/driverHomeCard";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const StyledPropText = styled.Text`
	color: ${props => props.theme.textLightColor};
	margin: 5px 0px;
`;

const StyledValueText = styled.Text`
	color: ${props => props.theme.themeText};
	margin: 5px 0px;
	line-height: 30px;
`;

const DataContainer = styled.View`
	display: flex;
	flex-direction: row;
	align-items: center;
	padding: 10px 16px 5px 16px;
	justify-content: space-between;
`;

class JobOfferDescriptionScreen extends React.Component {
	static navigationOptions = {
		header: null
	};

	render() {
		const dataIndex = this.props.navigation.getParam("dataIndex");
		const item = this.props.data[dataIndex];
		const details = item;
		return (
			<View style={{ flex: 1 }}>
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
								Job Description
								{/*{i18n.t("jobOfferTitle")}*/}
							</StyledTitle>
						</View>
					</NavigationBar>
					<View
						style={{
							position: "absolute",
							top: 80
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
				</View>
				<ScrollView
					showsVerticalScrollIndicator={false}
					contentContainerStyle={{ flexGrow: 1 }}
				>
					<Screen style={{ backgroundColor: "transparent" }}>
						<StatusBar barStyle="light-content" />
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
										{
											justifyContent: "space-between",
											padding: 14
										}
									]}
								>
									<StyledTitle>{"Job"}</StyledTitle>
									<StyledTitle>{item.titleValue}</StyledTitle>
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
										{item.list.map(datalist => (
											<StyledPropText>
												{datalist.name}
											</StyledPropText>
										))}
									</View>
									<View style={{ alignItems: "flex-end" }}>
										{item.list.map(datalist => (
											<StyledPropText>
												{datalist.value}
											</StyledPropText>
										))}
									</View>
								</View>
							</Card>
						</View>
						<Card
							style={{
								marginLeft: 5,
								marginRight: 5
							}}
						>
							<StyledValueText style={{ fontSize: 18 }}>
								Vehicle Details
							</StyledValueText>
							<DataContainer>
								<View>
									<StyledValueText>
										{details.vehicleCategory
											? "Vehicle Category" + "\n"
											: ""}
										{details.company
											? "Company" + "\n"
											: ""}
										{details.model ? "Model" + "\n" : ""}
										{details.vehicleType
											? "Vehicle Type" + "\n"
											: ""}
										{details.mgfYear
											? "MFG Year" + "\n"
											: ""}
										{details.fromTime ? "From" + "\n" : ""}
										{details.toTime ? "To" + "\n" : ""}
										{details.status ? "Status" + "\n" : ""}
									</StyledValueText>
								</View>
								<View style={{ alignItems: "flex-end" }}>
									<StyledValueText
										style={{ textAlign: "right" }}
									>
										{details.vehicleCategory
											? details.vehicleCategory + "\n"
											: ""}
										{details.company
											? details.company + "\n"
											: ""}
										{details.model
											? details.model + "\n"
											: ""}
										{details.vehicleType
											? details.vehicleType + "\n"
											: ""}
										{details.mgfYear
											? details.mgfYear + "\n"
											: ""}
										{details.fromTime
											? details.fromTime + "\n"
											: ""}
										{details.toTime
											? details.toTime + "\n"
											: ""}
										{details.status
											? details.status + "\n"
											: ""}
									</StyledValueText>
								</View>
							</DataContainer>
							<StyledValueText
								style={{ fontSize: 18, marginTop: 20 }}
							>
								Driver Experience
							</StyledValueText>
							<DataContainer>
								<View>
									<StyledValueText>
										{details.drivingLicenceType
											? "Driving Licence Type" + "\n"
											: ""}
										{details.workExperience
											? "Work Expricence" + "\n"
											: ""}
									</StyledValueText>
								</View>
								<View style={{ alignItems: "flex-end" }}>
									<StyledValueText
										style={{ textAlign: "right" }}
									>
										{details.drivingLicenceType
											? details.drivingLicenceType + "\n"
											: ""}
										{details.workExperience
											? details.workExperience + "\n"
											: ""}
									</StyledValueText>
								</View>
							</DataContainer>
							<StyledValueText
								style={{ fontSize: 18, marginTop: 20 }}
							>
								Work Schedule
							</StyledValueText>
							<DataContainer>
								<View>
									<StyledValueText>
										{details.shift ? "Shifts" + "\n" : ""}
										{details.jobType
											? "Job Type" + "\n"
											: ""}
										{details.jobPreferDays
											? "Job Prefer Days" + "\n"
											: ""}
									</StyledValueText>
								</View>
								<View style={{ alignItems: "flex-end" }}>
									<StyledValueText
										style={{ textAlign: "right" }}
									>
										{details.shift
											? details.shift + "\n"
											: ""}
										{details.jobType
											? details.jobType + "\n"
											: ""}
										{details.jobPreferDays
											? details.jobPreferDays + "\n"
											: ""}
									</StyledValueText>
								</View>
							</DataContainer>
						</Card>

						<Card
							style={{
								marginLeft: 5,
								marginRight: 5
							}}
						>
							<StyledValueText
								style={{ fontSize: 18, marginTop: 20 }}
							>
								Pay Scale
							</StyledValueText>
							<DataContainer>
								<View>
									<StyledValueText>
										{details.carType
											? "Car Type" + "\n"
											: ""}
										{details.pricing.pricingName
											? "Pricing" + "\n"
											: ""}
										{details.pricing.Extra
											? "Extra Hours Time" + "\n"
											: ""}
										{details.pricing.Night
											? "Night Charges (Hour)" + "\n"
											: ""}
										{details.pricing.NightExtra
											? "Night Charges (Extr Hour)" + "\n"
											: ""}
										{details.pricing.Holidays
											? "Holidays" + "\n"
											: ""}
									</StyledValueText>
								</View>
								<View style={{ alignItems: "flex-end" }}>
									<StyledValueText
										style={{ textAlign: "right" }}
									>
										{details.carType
											? details.carType + "\n"
											: ""}
										{details.pricing.pricingName
											? details.pricing.pricingName + "\n"
											: ""}
										{details.pricing.Extra
											? details.pricing.Extra + "\n"
											: ""}
										{details.pricing.Night
											? details.pricing.Night + "\n"
											: ""}
										{details.pricing.NightExtra
											? details.pricing.NightExtra + "\n"
											: ""}
										{details.pricing.Holidays
											? details.pricing.Holidays + "\n"
											: ""}
									</StyledValueText>
								</View>
							</DataContainer>
						</Card>
					</Screen>
				</ScrollView>
			</View>
		);
	}
}

const mapStateToProps = state => ({
	home: state.home,
	earning: state.driver.earning,
	ClientTypeId: state.auth.ClientTypeId,
	data: state.home.driverJobOffer
});

const mapDispatchToProps = {};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(JobOfferDescriptionScreen);
