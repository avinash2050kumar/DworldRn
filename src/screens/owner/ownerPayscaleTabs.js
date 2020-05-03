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
import OwnerDriverHourlyPayScale from "./ownerDriverHourlyPayScale";
import OwnerDriverWeeklyPayScale from "./ownerDriverWeeklyPayScale";
import OwnerDriverMonthlyPayScale from "./ownerDriverMonthlyPayScale";
import OwnerDriverKmPayScale from "./OwnerDriverKmPayScale";
import OwnerDriverTripPayScale from "./ownerDriverTripPayScale";

const TabCard = styled.View`
	padding: 7px 15px;
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
		this.action = [];
	}

	componentDidMount() {
		this.props.PayScale.map((pay, i) => {
			if (pay.Name === this.props.postAdsDriver.vehicle.PaymentType.Name)
				this.setState({ selectedIndex: pay.Id });
		});
		this.props.adsIndex===0?this.action=this.props.PayScale:
			this.action=this.props.PayScale.filter(data=>data.Name!=="Hourly"&&data.Name!=="Weekly")
	}

	_renderTab = (item, index) => {
		return (
			<TabCard
				style={{
					backgroundColor:
						this.state.selectedIndex == item.Id
							? theme.primary
							: "#efefef"
				}}
			>
				<Text
					style={{
						color:
							this.state.selectedIndex == item.Id ? "white" : "#888"
					}}
				>
					{item.Name}
				</Text>
			</TabCard>
		);
	};

	render() {
		console.log('this.',this.props,this.action,this.state)
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
					{this.state.selectedIndex === 3 && (
						<OwnerDriverMonthlyPayScale />
					)}
					{this.state.selectedIndex === 4 && (
						<OwnerDriverKmPayScale />
					)}
					{this.state.selectedIndex === 5 && (
						<OwnerDriverTripPayScale />
					)}
					{this.state.selectedIndex === 1 && (
					<OwnerDriverHourlyPayScale />
					)}
					{this.state.selectedIndex === 2 && (
						<OwnerDriverWeeklyPayScale />
					)}
				</Screen>
			</ScrollView>
		);
	}
}

const mapStateToProps = state => ({
	postAdsDriver: state.main.owner.postAdsDriver,
	PayScale: state.main.owner.postAdsDriverDummy.PayScale,
	adsIndex:state.main.owner.adsIndex
});

const mapDispatchToProps = {};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(OwnerDriverPayScaleTabs);
