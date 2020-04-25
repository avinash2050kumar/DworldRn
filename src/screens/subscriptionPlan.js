import React from "react";
import {
	View,
	Text,
	ScrollView,
	FlatList,
	TouchableOpacity
} from "react-native";
import i18n from "i18n-js";
import styled from "styled-components";
import {
	ColumnContainer,
	HorizontalLine,
	RowContainer,
	Screen,
	StyledTitle
} from "../theme/styledComponent";
import theme from "../theme/lightTheme";
import { cardBorderRadius, cardPadding } from "../helper/styles";
import styles from "../theme/styles";
import RazorpayCheckout from 'react-native-razorpay';
import Store from "../store";

const NoOfAdsText = styled.Text`
	color: ${props => props.theme.themeText};
	font-size: 20px;
	margin-top: 15px;
	font-weight: bold;
`;

const TabCard = styled.View`
	padding: 7px 10px;
	border-radius: 5px;
`;

const Card = styled.View`
	border-radius: 10px;
	margin: 10px 0px;
	background-color: ${props => props.theme.cardBackgroundColor};
	box-shadow: 8px 12px 15px #888;
	elevation: 5;
`;

const BuyNowButton = styled.TouchableOpacity`
	padding: 10px;
	display: flex;
	align-items: center;
	justify-content: center;
	margin-top: 10px;
	background-color: ${prop => prop.theme.secondary};
`;

export default class SubscriptionPlan extends React.Component {
	static navigationOptions = ({ navigation }) => {
		return {
			title: i18n.t("profileScreenLeaseOption2")
		};
	};

	constructor(props) {
		super(props);
		this.state = { selectedIndex: 0 };
		this.tabs = [
			{ name: "Basic Plan" },
			{ name: "Premium Plan" },
			{ name: "Custom Plan" }
		];
		this.action = [
			{
				name: "Basic Plan",
				data: [
					{
						packageName: "Package available for 30 days",
						noOfAds: 1,
						amount: "₹​199",
						price:19900
					},
					{
						packageName: "Package available for 3 Months",
						noOfAds: 2,
						amount: "₹​399",
						price:39900
					},
					{
						packageName: "Package available for 6 Months",
						noOfAds: 4,
						amount: "₹​799",
						price:79900
					},
					{
						packageName: "Package available for 1 Year",
						noOfAds: 12,
						amount: "₹​799",
						price:79900
					}
				]
			},
			{
				name: "Premium Plan",
				data: [
					{
						packageName: "Package available for 30 days",
						noOfAds: 1,
						amount: "₹​199",
						price:19900
					},
					{
						packageName: "Package available for 3 Months",
						noOfAds: 2,
						amount: "₹​399",
						price:39900
					}
				]
			},
			{
				name: "Custom Plan",
				data: [
					{
						packageName: "Package available for 1 Day",
						noOfAds: 1,
						amount: "₹​40",
						price:4000
					},{
						packageName: "Package available for 1 Day",
						noOfAds: 2,
						amount: "₹​60",
					    price:6000

					},{
						packageName: "Package available for 1 Day",
						noOfAds: 3,
						amount: "₹​100",

					price:10000
					},{
						packageName: "Package available for 1 Day",
						noOfAds: 4,
						amount: "₹​125",
						price:12500
					},{
						packageName: "Package available for 2 Days",
						noOfAds: 5,
						amount: "₹​150",
					price:15000
					},{
						packageName: "Package available for 2 Days",
						noOfAds: '6+',
						amount: "₹​199",
						price:19900

					},{
						packageName: "Package available for 2 Days",
						noOfAds: 1,
						amount: "₹​50",
						price:5000
					},{
						packageName: "Package available for 2 Days",
						noOfAds: 2,
						amount: "₹​80",
						price:8000

					},{
						packageName: "Package available for 2 Days",
						noOfAds: 3,
						amount: "₹​130",
						price:13000
					},{
						packageName: "Package available for 2 Days",
						noOfAds: 4,
						amount: "₹​150",
					price:15000
					},
				]
			}
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

	renderCard = (item, index) => {
		return (
			<Card
				style={{
					elevation: 1,
					boxShadow: "1px 1px 1px #ccc",
					borderWidth: 1,
					borderColor: "#eee"
				}}
			>
				<View
					style={{
						paddingLeft: 16,
						paddingRight: 16,
						paddingTop: 16
					}}
				>
					<StyledTitle>{item.packageName}</StyledTitle>
					<HorizontalLine style={{ marginTop: 10 }} />
					<RowContainer
						style={{ padding: 10, justifyContent: "space-between" }}
					>
						<ColumnContainer>
							<Text>Numbers of ads</Text>
							<NoOfAdsText>{item.noOfAds}</NoOfAdsText>
						</ColumnContainer>
						<ColumnContainer>
							<Text>Amount</Text>
							<NoOfAdsText>{item.amount}</NoOfAdsText>
						</ColumnContainer>
					</RowContainer>
				</View>
				<BuyNowButton
					style={{
						borderBottomRightRadius: 10,
						borderBottomLeftRadius: 10
					}}
					onPress={() => {
						const { FirstName,LastName,Mobile,Email } = Store().store.getState().auth;
						var options = {
							description: 'Dworld',
							image: require('../assets/images/traveo.jpg'), /*https://i.imgur.com/3g7nmJC.png',*/
							currency: 'INR',
							key: "rzp_test_tFZq3APEo2OP2O",
							amount: `${item.price}`,
							name: `${FirstName?FirstName:''} ${LastName?LastName:''}`,
							prefill: {
								email: Email,
								contact: Mobile,
								name: 'Razorpay Software'
							},
							theme: {color: theme.secondary}
						}
						RazorpayCheckout.open(options).then((data) => {
							// handle success
							console.log(JSON.stringify(data))
							alert(`Success: ${data.razorpay_payment_id}`);
						}).catch((error) => {
							// handle failure
							alert(`Error: Cancelled order`);
						});
					}}
				>
					<Text
						style={{
							color: "white",
							fontWeight: "bold",
							fontSize: 16
						}}
					>
						Buy Now
					</Text>
				</BuyNowButton>
			</Card>
		);
	};

	render() {
		return (
			<Screen style={{ backgroundColor: theme.white }}>
				<View
					style={[
						styles.flex_row,
						{
							justifyContent: "space-between",
							marginBottom: 15
						}
					]}
				>
					{this.tabs.map((tab, index) => this._renderTab(tab, index))}
				</View>
				<ScrollView
					showsVerticalScrollIndicator={false}
					contentContainerStyle={{ flexGrow: 1 }}
				>
					<FlatList
						data={this.action[this.state.selectedIndex].data}
						renderItem={({ item, index }) =>
							this.renderCard(item, index)
						}
						keyExtractor={(item, index) => index}
						showsHorizontalScrollIndicator={false}
						showsVerticalScrollIndicator={false}
					/>
				</ScrollView>
			</Screen>
		);
	}
}
