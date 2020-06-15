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
import RBSheet from "react-native-raw-bottom-sheet";
import ImageView from "react-native-image-viewing";
import FullScreenImage from "./fullScreenImage";
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

class OwnerRequestJobDetails extends React.Component {
	static navigationOptions = ({ navigation }) => {
		return {
			title: navigation.getParam("item")
				? navigation.getParam("item").Monthly?Paynavigation.getParam("item").MonthlyPay[0].VehicleType.Name:navigation.getParam("item").vehicleCompany
				: navigation.getParam("item").vehicleCompany
		};
	};

	state = {
		imageFront: "",
		isFrontImageVisible: false,
		imageBack: "",
		isBackImageVisible: false
	};

	componentDidMount() {
		const item = this.props.navigation.getParam("item");
		const license = item ? item.license?item.license : { FrontPage: "", BackPage: "" }: { FrontPage: "", BackPage: "" };
		this.setState({
			imageFront: license.FrontPage,
			imageBack: license.BackPage
		});
	}

	render() {
		const item = this.props.navigation.getParam("item");
		{console.log('data', item)}
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
											justifyContent: "space-between",
											padding: 14,
											borderTopLeftRadius: 10,
											borderTopRightRadius: 10
										}
									]}
								>
									<StyledTitle>{"Driver Name"}</StyledTitle>
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
										{item.license&&<StyledPropText>
											Licence Type
										</StyledPropText>}
										{item.license&&<StyledPropText>
											Driving Licence No.
										</StyledPropText>}
										{item.MonthlyPay&&<StyledPropText>
											Salary(Per Month)
										</StyledPropText>}
									</View>
									{console.log(
										"this isdaf",
										this.state,
										item
									)}
									<View style={{ alignItems: "flex-end" }}>
										{item.license&&<StyledPropText>
											{item.license.LicenseType.Name}
										</StyledPropText>}
										{item.license&&<StyledPropText>
											{item.license.LicenseNumber}
										</StyledPropText>}
										{item.MonthlyPay&&<StyledPropText>
											{item.MonthlyPay[0].MonthlyCharge}
										</StyledPropText>}
									</View>
								</View>

								<View
									style={[
										styles.flex_row,
										{
											justifyContent: "space-between",
											padding: 14,
											borderTopLeftRadius: 10,
											borderTopRightRadius: 10
										}
									]}
								>
									<TouchableOpacity
										onPress={() =>this.RBSheet.open()
											//this._onOpenFrontActionSheetForViewImage()
										}
									>
										<View
											style={{
												padding: 16,
												alignItems: "center"
											}}
										>
											<Image
												style={{
													width: 100,
													aspectRatio: 1.4,
													marginBottom: 7
												}}
												source={require("../../assets/images/driving-license.png")}
											/>
											<Text>Front Licence</Text>
										</View>
									</TouchableOpacity>
									<TouchableOpacity
										onPress={() =>
											this.BackImage.open()	//this._onOpenBackActionSheetForViewImage()
										}
									>
										<View
											style={{
												padding: 16,
												alignItems: "center"
											}}
										>
											<Image
												style={{
													width: 100,
													aspectRatio: 1.4,
													marginBottom: 7
												}}
												source={require("../../assets/images/driving-license.png")}
											/>
											<Text>Back Licence</Text>
										</View>
									</TouchableOpacity>
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
										{item.work&&<StyledPropText>Shifts</StyledPropText>}
										{item.work&&<StyledPropText>
											Job Type
										</StyledPropText>}
										{item.work&&<StyledPropText>
											Job Prefer Days
										</StyledPropText>}
									</View>
									{console.log("this isdaf", item)}
									<View style={{ alignItems: "flex-end" }}>
										{item.work&&<StyledPropText>
											{item.work.ShitType.Name}
										</StyledPropText>}
										{item.work&&<StyledPropText>
											{item.work.JobType.Name}
										</StyledPropText>}
										{item.work&&<StyledPropText>
											{item.work.PreferDays}
										</StyledPropText>}
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
									<StyledTitle>
										{"Driver Description"}
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
											Car Type
										</StyledPropText>
										<StyledPropText>
											Hourly Pricing
										</StyledPropText>
										<StyledPropText>
											Extra Hours Time
										</StyledPropText>
										<StyledPropText>
											Night Charges (Hour)
										</StyledPropText>
										<StyledPropText>
											Night Charges (Extra Hour)
										</StyledPropText>
									</View>
									<View style={{ alignItems: "flex-end" }}>
										<StyledPropText>
											{item.HourlyPay?item.HourlyPay[0].HourlyPrice:item.Pricing.price}
										</StyledPropText>
										<StyledPropText>
											{item.HourlyPay?item.HourlyPay[0].ExtraHours:item.Pricing.Extra}
										</StyledPropText>
										<StyledPropText>
											{item.HourlyPay?item.HourlyPay[0].NightHours:item.Pricing.Night}
										</StyledPropText>
										<StyledPropText>
											{item.HourlyPay?item.HourlyPay[0].NightExtraHours:item.Pricing.NightExtra}
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
				<RBSheet
					ref={ref => {
						this.RBSheet = ref;
					}}
					height={120}
					duration={250}
					customStyles={{
						container: {
							padding:16,
							borderTopRightRadius:10,
							borderTopLeftRadius:10,
							draggableIcon: {
								backgroundColor: "#000"
							}
							,justifyContent: "center",
							//alignItems: "center"
						}
					}}
				>
					<TouchableOpacity
						onPress={()=>this.setState({ isFrontImageVisible: true })}
						style={{padding:16,borderBottomWidth:1,borderColor:'#eee',}}
					>
						<Text>Show Front licence Image</Text>
					</TouchableOpacity>
					<TouchableOpacity
						onPress={()=>this.RBSheet.close()}
						style={{padding:16}}
					>
						<Text style={{color:'red'}}>Cancel</Text>
					</TouchableOpacity>
				</RBSheet>
				<RBSheet
					ref={ref => {
						this.BackImage = ref;
					}}
					height={120}
					duration={250}
					customStyles={{
						container: {
							padding:16,
							borderTopRightRadius:10,
							borderTopLeftRadius:10,
							draggableIcon: {
								backgroundColor: "#000"
							}
							,justifyContent: "center",
							//alignItems: "center"
						}
					}}
				>
				<TouchableOpacity
				onPress={()=>this.setState({ isBackImageVisible: true })}
				style={{padding:16,borderBottomWidth:1,borderColor:'#eee',}}
				>
					<Text>Show Back licence Image</Text>
				</TouchableOpacity>
				<TouchableOpacity
				onPress={()=>this.BackImage.close()}
				style={{padding:16}}
				>
					<Text style={{color:'red'}}>Cancel</Text>
				</TouchableOpacity>
				</RBSheet>
				<FullScreenImage
					image={this.state.imageFront}
					modalVisible={this.state.isFrontImageVisible}
					setModalVisible={() =>
						this.setState({ isFrontImageVisible: false })
					}
				/>
				<FullScreenImage
					image={this.state.imageBack}
					modalVisible={this.state.isBackImageVisible}
					setModalVisible={() =>
						this.setState({ isBackImageVisible: false })
					}
				/>
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
)(OwnerRequestJobDetails);
