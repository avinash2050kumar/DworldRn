import React, { Component } from "react";
import {
	Image,
	StatusBar,
	View,
	Text,
	ScrollView,
	FlatList,
	TouchableOpacity
} from "react-native";
import { connect } from "react-redux";
import styled from "styled-components";
import theme from "../../theme/lightTheme";
import { Screen, StyledText, StyledTitle } from "../../theme/styledComponent";
import { Dropdown } from "react-native-material-dropdown";
import update from "immutability-helper";
import Button from "../common/Buttons";
import DriverHourlyPay from "./driverHourlyPay";
import styles from "../../theme/styles";
import DriverWeeklyPay from "./driverWeeklyPay";
import DriverMonthlyPay from "./driverMonthlyPay";
import DriverTripPay from "./driverTripPay";
import DriverKMPay from "./driverKmPay";

const TabCard = styled.View`
	padding: 7px 10px;
	border-radius: 5px;
`;

class PayScaleScreen extends Component {
	static navigationOptions = ({ navigation }) => {
		return {
			title: "Pay Scale"
		};
	};

	constructor(props) {
		super(props);
		this.state = { selectedIndex: 4 };
		this.action = [
			{ name: "HOURLY" },
			{ name: "WEEKLY" },
			{ name: "MONTHLY" },
			{ name: "KM" },
			{ name: "TRIP" }
		];
	}

	_renderTab = (item, index) => {
		return (
			<TouchableOpacity
				onPress={() => this.setState({ selectedIndex: index })}
			>
				<TabCard
					style={{
						backgroundColor:
							this.state.selectedIndex == index
								? theme.primary
								: "#efefef"
					}}
				>
					<Text
						style={{
							color:
								this.state.selectedIndex == index
									? "white"
									: "#888"
						}}
					>
						{item.name}
					</Text>
				</TabCard>
			</TouchableOpacity>
		);
	};

	render() {
		return (
			<ScrollView
				showsVerticalScrollIndicator={false}
				contentContainerStyle={{ flexGrow: 1 }}
			>
				<Screen style={{ backgroundColor: theme.white }}>
					<StatusBar barStyle="dark-content" />
					<StyledText style={{ marginBottom: 15 }}>
						Lorem Ipsum is simply dummy text of the printing and
						typesetting industry.
					</StyledText>
					<View
						style={[
							styles.flex_row,
							{
								justifyContent: "space-between",
								marginBottom: 15
							}
						]}
					>
						{this.action.map((tab, index) =>
							this._renderTab(tab, index)
						)}
					</View>

					{this.state.selectedIndex === 0 && <DriverHourlyPay />}
					{this.state.selectedIndex === 1 && <DriverWeeklyPay />}
					{this.state.selectedIndex === 2 && <DriverMonthlyPay />}
					{this.state.selectedIndex === 3 && <DriverKMPay />}
					{this.state.selectedIndex === 4 && <DriverTripPay />}
				</Screen>
			</ScrollView>
		);
	}
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(PayScaleScreen);
