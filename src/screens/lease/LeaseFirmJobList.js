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
	requestedLeaseFirmDetailById,
	getOwnerJobDetailById, applyFirmJob, approveFirmOffer
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

class LeaseFirmJobList extends Component {
	state = {};

	componentDidMount() {
		this.props.requestedLeaseFirmDetailById(this.props.route.item.JobAddId);
	}

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
						<StyledTitle>{item.Name}</StyledTitle>
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
							<StyledPropText>Vehicle Type</StyledPropText>
							<StyledPropText>Salary</StyledPropText>
						</View>
						<View style={{ alignItems: "flex-end" }}>
							<StyledPropText>
								{item.vhicle.VehicleType.Name}
							</StyledPropText>
							<StyledPropText>
								₹ {item.pay.Price}
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
									"LeaseFirmJobDetails",
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
								borderBottomRightRadius: 20,
								opacity:item.IsApproved?0.65:1
							}}
							disabled={item.IsApproved}
							onPress={()=>this.props.approveFirmOffer(this.props.route.item.JobAddId)}>
							<StyledTitle style={{ color: theme.white }}>
								{item.IsApproved?'Approved':'Approve'}
							</StyledTitle>
						</TouchableOpacity>
					</View>
				</Card>
			</View>
		);
	};

	render() {
		console.log('prp',this.props)
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
						data={this.props.job ? this.props.job.FirmList : []}
						renderItem={({ item, index }) =>
							this.renderCard(item, index)
						}
						ListFooterComponent={()=>this.props.findLeaseOwnerFirm?null:<Card style={{
							paddingTop: 30,
							marginLeft:10,
							marginRight:10,
							paddingRight: 20,
							paddingLeft: 20,
							paddingBottom: 30,
							borderRadius: 20,
							justifyContent:'center',
							alignItems:'center'
						}}><Text style={{fontSize:16}}>No Data Found</Text></Card>}
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
	address: state.home.address,
	job: state.lease.job
});

const mapDispatchToProps = {
	setHomeScreenVisibility,
	requestedLeaseFirmDetailById,
	setDeviceLocation,
	setHomeScreenNoOfWork,
	getOwnerJobDetailById,
	applyFirmJob,
	approveFirmOffer
};

export default connect(mapStateToProps, mapDispatchToProps)(LeaseFirmJobList);
