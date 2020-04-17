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
import update from "immutability-helper";
import styles from "../../theme/styles";
import LeaseMonthlyPayScale from "./leaseMonthlyPayScale";
import LeaseKmPayScale from "./LeaseKmPayScale";
import LeaseTripPayScale from "./LeaseTripPayScale";

const TabCard = styled.View`
	padding: 7px 20px;
	border-radius: 5px;
	margin: 0px 8px;
`;

class LeaseFirmPayScaleTabs extends Component {
	static navigationOptions = ({ navigation }) => {
		return {
			title: "Pay Scale"
		};
	};

	constructor(props) {
		super(props);
		this.state = { selectedIndex: 3 };
		this.action = props.PayScale;
	}

	componentDidMount() {
		this.props.PayScale.map((pay, i) => {
			if (
				pay.Name ===
				this.props.postLeaseFirmRequirement.FirmVehicle.PaymentType.Name
			)
				this.setState({ selectedIndex: pay.Id });
		});
	}

	_renderTab = (item, index) => {
		return (
			<TabCard
				style={{
					backgroundColor:
						this.state.selectedIndex === item.Id
							? theme.primary
							: "#efefef"
				}}
			>
				<Text
					style={{
						color:
							this.state.selectedIndex === item.Id
								? "white"
								: "#888"
					}}
				>
					{item.Name}
				</Text>
			</TabCard>
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
								justifyContent: "flex-start",
								marginBottom: 15
							}
						]}
					>
						{this.action
							.filter(
								pay =>
									pay.Name !== "Weekly" &&
									pay.Name !== "Hourly"
							)
							.map((tab, index) => this._renderTab(tab, index))}
					</View>
					{this.state.selectedIndex === 3 && <LeaseMonthlyPayScale />}
					{this.state.selectedIndex === 4 && <LeaseKmPayScale />}
					{this.state.selectedIndex === 5 && <LeaseTripPayScale />}
				</Screen>
			</ScrollView>
		);
	}
}

const mapStateToProps = state => ({
	postLeaseFirmRequirement: state.main.lease.postLeaseFirmRequirement,
	postLeaseDummy: state.main.lease.postLeaseDummy,
	vehicleCategories: state.main.lease.postLeaseDummy.vehicleCategories,
	PayScale: state.main.lease.postLeaseDummy.PayScale
});

const mapDispatchToProps = {};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(LeaseFirmPayScaleTabs);
