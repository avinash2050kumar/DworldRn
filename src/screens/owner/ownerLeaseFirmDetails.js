import React from "react";
import {
	Dimensions,
	FlatList,
	Image,
	ScrollView,
	StatusBar,
	Text,
	TouchableOpacity,
	View
} from "react-native";
import { Card, HorizontalLine, StyledTitle } from "../../theme/styledComponent";
import styles from "../../theme/styles";
import theme from "../../theme/lightTheme";
import styled from "styled-components";
import {
	login,
	setHomeScreenVisibility,
	setLoginSuccessFul
} from "../../actions";
import { connect } from "react-redux";
import { NavigationBar, Screen } from "../../theme/styledComponent";
import Button from "../../components/common/Buttons";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const StyledPropText = styled.Text`
	color: ${props => props.theme.themeText};
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

class OwnerLeaseFirmDetails extends React.Component {
	static navigationOptions = ({ navigation }) => {
		return {
			title: navigation.getParam("item")
				? navigation.getParam("item").vhicle?navigation.getParam("item").vhicle.VehicleType.Name:navigation.getParam("item").VehicleType.Name
				: "Detail"
		};
	};

	componentDidMount() {
		const item = this.props.navigation.getParam("item");
	}

	render() {
		const item = this.props.navigation.getParam("item");
		console.log('alsdkjfmasfd',item)


		return (
			<View style={{ flex: 1 }}>
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
									borderRadius: 20,
									elevation: 0,
									backgroundColor: "#F1F3F6"
								}}
							>
								<View
									style={[
										styles.flex_row,
										{
											justifyContent: "space-between",
											padding: 14,
											backgroundColor: "#E7F3FD",
											borderTopLeftRadius: 10,
											borderTopRightRadius: 10
										}
									]}
								>
									<StyledTitle>
										{"Vehicle Detail"}
									</StyledTitle>
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
										<StyledPropText>
											Vehicle Category
										</StyledPropText>
										<StyledPropText>Company</StyledPropText>
										<StyledPropText>
											Vehicle Type
										</StyledPropText>
										<StyledPropText>
											MFG Year
										</StyledPropText>
										<StyledPropText>Status</StyledPropText>
										<StyledPropText>From</StyledPropText>
										<StyledPropText>To</StyledPropText>
									</View>
									<View style={{ alignItems: "flex-end" }}>
										<StyledPropText>
											{item.vhicle?item.vhicle.VehicleCategory.Name:item.VehicleCategory.Name}
										</StyledPropText>
										<StyledPropText>
											{item.vhicle?item.vhicle.Company:item.Company}
										</StyledPropText>
										<StyledPropText>
											{item.vhicle?item.vhicle.VehicleType.Name:item.VehicleType.Name}
										</StyledPropText>
										<StyledPropText>
											MFG Year
										</StyledPropText>
										<StyledPropText>Status</StyledPropText>
										<StyledPropText>From</StyledPropText>
										<StyledPropText>To</StyledPropText>
									</View>
								</View>
							</Card>
							<StyledTitle style={{ marginTop: 15 }}>
								{"Pay Scale"}
							</StyledTitle>
							<Card
								style={{
									paddingTop: 0,
									paddingRight: 0,
									paddingLeft: 0,
									paddingBottom: 0,
									borderRadius: 20,
									elevation: 0,
									backgroundColor: "#F1F3F6"
								}}
							>
								<View
									style={[
										styles.flex_row,
										{
											justifyContent: "space-between",
											padding: 14,
											backgroundColor: "#E7F3FD",
											borderTopLeftRadius: 10,
											borderTopRightRadius: 10
										}
									]}
								>
									<StyledTitle>{"Work Schedule"}</StyledTitle>
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
										<StyledPropText>Shifts</StyledPropText>
										<StyledPropText>
											Job Type
										</StyledPropText>
										<StyledPropText>
											Job Prefer Days
										</StyledPropText>
									</View>
									<View style={{ alignItems: "flex-end" }}>
										<StyledPropText>Shift</StyledPropText>
										<StyledPropText>
											Job Prefer Days
										</StyledPropText>
										<StyledPropText>
											Job Prefer Days
										</StyledPropText>
									</View>
								</View>
							</Card>
							<Button
								label={
									this.props.navigation.getParam(
										"buttonTitle"
									)
										? this.props.navigation.getParam(
												"buttonTitle"
										  )
										: "No title"
								}
							/>
						</View>
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
	data: state.home.work.data
});

const mapDispatchToProps = {};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(OwnerLeaseFirmDetails);
