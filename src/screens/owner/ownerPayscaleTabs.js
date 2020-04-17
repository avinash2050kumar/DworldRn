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
import styles from "../../theme/styles";
import OwnerDriverHourlyPayScale from "./ownerDriverHourlyPayScale";
import OwnerDriverWeeklyPayScale from "./ownerDriverWeeklyPayScale";
import OwnerDriverMonthlyPayScale from "./ownerDriverMonthlyPayScale";
import OwnerDriverKmPayScale from "./OwnerDriverKmPayScale";
import OwnerDriverTripPayScale from "./ownerDriverTripPayScale";

const TabCard = styled.View`
	padding: 7px 10px;
	border-radius: 5px;
`;

class OwnerDriverPayScaleTabs extends Component {
	static navigationOptions = ({ navigation }) => {
		return {
			title: "Pay Scale"
		};
	};

	constructor(props) {
		super(props);
		this.state = { selectedIndex: 0 };
		this.action = props.PayScale;
	}

	componentDidMount() {
		this.props.PayScale.map((pay, i) => {
			if (pay.Name === this.props.postAdsDriver.vehicle.PaymentType.Name)
				this.setState({ selectedIndex: i });
		});
	}

	_renderTab = (item, index) => {
		return (
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
							this.state.selectedIndex == index ? "white" : "#888"
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
								justifyContent: "space-between",
								marginBottom: 15
							}
						]}
					>
						{this.action.map((tab, index) =>
							this._renderTab(tab, index)
						)}
					</View>

					{this.state.selectedIndex === 0 && (
						<OwnerDriverHourlyPayScale />
					)}
					{this.state.selectedIndex === 1 && (
						<OwnerDriverWeeklyPayScale />
					)}
					{this.state.selectedIndex === 2 && (
						<OwnerDriverMonthlyPayScale />
					)}
					{this.state.selectedIndex === 3 && (
						<OwnerDriverKmPayScale />
					)}
					{this.state.selectedIndex === 4 && (
						<OwnerDriverTripPayScale />
					)}
				</Screen>
			</ScrollView>
		);
	}
}

const mapStateToProps = state => ({
	postAdsDriver: state.main.owner.postAdsDriver,
	PayScale: state.main.owner.postAdsDriverDummy.PayScale
});

const mapDispatchToProps = {};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(OwnerDriverPayScaleTabs);
