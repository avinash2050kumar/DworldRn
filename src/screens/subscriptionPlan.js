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
	StyledTitle,

} from "../theme/styledComponent";
import theme from "../theme/lightTheme";
import { cardBorderRadius, cardPadding } from "../helper/styles";
import styles from "../theme/styles";
import RazorpayCheckout from 'react-native-razorpay';
import Store from "../store";
import {getUserSubscription} from "../actions";
import {connect} from "react-redux";
import moment from "moment";
import Button from "../components/common/Buttons";
import NavigationService from "../config/NavigationService";

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

class SubscriptionPlan extends React.Component {
	static navigationOptions = ({ navigation }) => {
		return {
			title: i18n.t("profileScreenLeaseOption2")
		};
	};

	constructor(props) {
		super(props);
	}

	componentDidMount() {
		this.props.getUserSubscription()
	}

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
					<StyledTitle>{item.SuscriptionType.Name}</StyledTitle>
					<HorizontalLine style={{ marginTop: 10 }} />
					<ColumnContainer
						style={{ padding: 16, justifyContent: "space-between" }}
					>
						<RowContainer style={{justifyContent:'space-between',width:'100%'}}>
							<Text>Numbers of ads</Text>
							<Text>{item.TotalAddCount}</Text>
						</RowContainer>
						<RowContainer style={{justifyContent:'space-between',width:'100%'}}>
							<Text>Remaining Ads</Text>
							<Text>{item.RemainingAddCount}</Text>
						</RowContainer>
						<RowContainer style={{justifyContent:'space-between',width:'100%'}}>
							<Text>Expire On</Text>
							<Text>{moment(item.ExpireDate).format('DD MMM YYYY')}</Text>
						</RowContainer>
					</ColumnContainer>
				</View>
			</Card>
		);
	};

	render() {
		const {userSubscription}=this.props
		return (
			<Screen style={{ backgroundColor: theme.white }}>
				<ScrollView
					showsVerticalScrollIndicator={false}
					contentContainerStyle={{ flexGrow: 1 }}
				>
					{userSubscription.length===0&&<View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
						<Text style={{fontWeight:'bold', fontSize:16}}>You don't have any subcription plan</Text>
						<Button
							onPress={()=> NavigationService.navigate('BuySubscription')}
							label="BUY A PLAN"
							color="secondary"
							style={{marginTop:10,paddingLeft:25,paddingRight:25}}
						/>
					</View>}
					{userSubscription.length!==0&&<FlatList
						data={userSubscription?userSubscription:[]}
						renderItem={({ item, index }) =>
							this.renderCard(item, index)
						}
						keyExtractor={(item, index) => index}
						showsHorizontalScrollIndicator={false}
						showsVerticalScrollIndicator={false}
					/>}
				</ScrollView>
			</Screen>
		);
	}
}


const mapStateToProps = state => ({ userSubscription: state.subscription.userSubscription});

const mapDispatchToProps = { getUserSubscription};

export default connect(mapStateToProps, mapDispatchToProps)(SubscriptionPlan);

