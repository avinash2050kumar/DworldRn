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
import { connectActionSheet } from "@expo/react-native-action-sheet";
import ImageView from "react-native-image-viewing";
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

class LeaseFirmOwnerDetails extends React.Component {
	static navigationOptions = ({ navigation }) => {
		return {
			title: "Owner Details"
		};
	};

	render() {
		const item = this.props.navigation.getParam("item");
		console.log("items", item);
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
									marginBottom: 15
								}}
							>
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
											Vehicle Type
										</StyledPropText>
										<StyledPropText>
											Owner Name
										</StyledPropText>
										<StyledPropText>
											Contact Number
										</StyledPropText>
										<StyledPropText>
											Insantive(Per Month)
										</StyledPropText>
									</View>

									<View style={{ alignItems: "flex-end" }}>
										<StyledPropText>
											{item.vhicle.VehicleType.Name}
										</StyledPropText>
										<StyledPropText>
											{item.Name}
										</StyledPropText>
										<StyledPropText>
											{item.Mobile}
										</StyledPropText>
										<StyledPropText>
											{item.pay.Price}
										</StyledPropText>
									</View>
								</View>
							</Card>
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
										{"Vehicle Details"}
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
									</View>
									<View style={{ alignItems: "flex-end" }}>
										<StyledPropText>
											{item.vhicle.VehicleCategory.Name}
										</StyledPropText>
										<StyledPropText>
											{item.vhicle.Company}
										</StyledPropText>
										<StyledPropText>
											{item.vhicle.VehicleType.Name}
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
)(LeaseFirmOwnerDetails);
