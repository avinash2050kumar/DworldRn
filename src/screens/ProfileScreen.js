import React, { Component } from "react";
import {
	StatusBar,
	View,
	ScrollView,
	FlatList,
	TouchableOpacity,
	Image
} from "react-native";
import { connect } from "react-redux";
import {
	NavigationBar,
	Screen,
	StyledText,
	StyledTitle
} from "../theme/styledComponent";
import {} from "../actions";
import styles from "../theme/styles";
import ChangePasswordScreen from "./changePassword";
import NavigationService from "../config/NavigationService";
import i18n from "i18n-js";
import theme from "../theme/lightTheme";

class ProfileScreen extends Component {
	static navigationOptions = ({ navigation }) => {
		return {
			title: i18n.t("profile")
		};
	};

	constructor(props) {
		super(props);
		this.action = [
			{
				data: [
					{
						icon: require("../assets/images/identification.png"),
						name: i18n.t("profileScreenDriverOption1"),
						route: "MainScreen"
					},
					{
						icon: require("../assets/images/policy.png"),
						name: i18n.t("profileScreenDriverOption2"),
						route: "Policy"
					},
					{
						icon: require("../assets/images/language.png"),
						name: i18n.t("chooseLanguage"),
						route: "LanguageScreen"
					},
					{
						icon: require("../assets/images/partner.png"),
						name: i18n.t("profileScreenDriverOption3")
					},
					{
						icon: require("../assets/images/support.png"),
						name: i18n.t("profileScreenDriverOption4"),
						route: "CustomerSupportScreen"
					},

					{
						icon: require("../assets/images/forgot.png"),
						name: i18n.t("profileScreenDriverOption5"),
						route: "ChangePasswordScreen"
					}
				]
			},
			{
				data: [
					{
						icon: require("../assets/images/identification.png"),
						name: i18n.t("profileScreenOwnerOption1"),
						route: "MainScreen"
					},
					{
						icon: require("../assets/images/subscription.png"),
						name: i18n.t("profileScreenOwnerOption2"),
						route: "SubscriptionPlan"
					},
					{
						icon: require("../assets/images/language.png"),
						name: i18n.t("chooseLanguage"),
						route: "LanguageScreen"
					},
					{
						icon: require("../assets/images/policy.png"),
						name: i18n.t("profileScreenOwnerOption3"),
						route: "Policy"
					},
					{
						icon: require("../assets/images/partner.png"),
						name: i18n.t("profileScreenOwnerOption4")
					},
					{
						icon: require("../assets/images/support.png"),
						name: i18n.t("profileScreenOwnerOption5"),
						route: "CustomerSupportScreen"
					},
					{
						icon: require("../assets/images/forgot.png"),
						name: i18n.t("profileScreenOwnerOption6"),
						route: "ChangePasswordScreen"
					}
				]
			},
			{
				data: [
					{
						icon: require("../assets/images/identification.png"),
						name: i18n.t("profileScreenLeaseOption1"),
						route: "MainScreen"
					},
					{
						icon: require("../assets/images/subscription.png"),
						name: i18n.t("profileScreenLeaseOption2"),
						route: "SubscriptionPlan"
					},
					{
						icon: require("../assets/images/language.png"),
						name: i18n.t("chooseLanguage"),
						route: "LanguageScreen"
					},
					{
						icon: require("../assets/images/policy.png"),
						name: i18n.t("profileScreenLeaseOption3"),
						route: "Policy"
					},
					{
						icon: require("../assets/images/partner.png"),
						name: i18n.t("profileScreenLeaseOption4")
					},
					{
						icon: require("../assets/images/support.png"),
						name: i18n.t("profileScreenLeaseOption5"),
						route: "CustomerSupportScreen"
					},
					{
						icon: require("../assets/images/forgot.png"),
						name: i18n.t("profileScreenLeaseOption6"),
						route: "ChangePasswordScreen"
					}
				]
			}
		];
	}

	_renderItem = (item, index) => (
		<TouchableOpacity
			key={index}
			style={{ marginTop: 10, marginBottom: 10 }}
			onPress={() =>
				item.route
					? NavigationService.navigate(item.route)
					: console.log("press index", index)
			}
		>
			<View style={[styles.flex_row]}>
				<Image
					source={item.icon}
					style={{
						width: 30,
						aspectRatio: 1,
						resizeMode: "contain",
						marginRight: 15
					}}
				/>
				<StyledTitle>{item.name}</StyledTitle>
			</View>
		</TouchableOpacity>
	);

	render() {
		const {
			FirstName,
			LastName,
			Email,
			Mobile
		} = this.props.personalDetails;
		return (
			<View style={{ /*paddingTop: 22 */}}>
				<NavigationBar
					style={[
						styles.flex_row,
						{
							justifyContent: "space-between"
						}
					]}
				>
					<StyledTitle
						style={{
							color: theme.secondThemeColor,
							fontSize: 22
						}}
					>
						{i18n.t("profile")}
					</StyledTitle>
					<TouchableOpacity
						onPress={() =>
							NavigationService.navigate("LogoutScreen")
						}
					>
						<StyledTitle
							style={{
								color: theme.primary,
								fontSize: 16
							}}
						>
							{i18n.t("logout")}
						</StyledTitle>
					</TouchableOpacity>
				</NavigationBar>
				<ScrollView showsVerticalScrollIndicator={false}>
					<Screen style={{ backgroundColor: "#fff" }}>
						<StatusBar barStyle="dark-content" />
						<View
							style={[
								styles.flex_row,
								{ justifyContent: "space-between" }
							]}
						>
							<View
								style={[
									styles.flex_row,
									{ justifyContent: "space-between" }
								]}
							>
								<View
									style={{
										marginRight: 15,
										marginBottom: 7,
										borderRadius: 40
									}}
								>
									<Image
										source={{
											uri:
												"https://2.bp.blogspot.com/-k1HziBxBYuE/Tg0EwSo5B6I/AAAAAAAABwk/pHENBUKyr-s/s565/SBX701_HKL_Fist_of_Fury_DVD%255B1%255D.jpg"
										}}
										style={{
											width: 80,
											height: 80,
											resizeMode: "cover",
											borderRadius: 40
										}}
									/>
								</View>
								<View>
									<StyledTitle>
										{FirstName
											? FirstName
											: "" + " " + LastName
											? LastName
											: ""}
									</StyledTitle>
									<StyledText style={{ color: "#aaa" }}>
										{Email ? Email : ""}
									</StyledText>
									<StyledTitle>
										{Mobile ? Mobile : ""}
									</StyledTitle>
								</View>
							</View>
							<TouchableOpacity
								onPress={() =>
									NavigationService.navigate(
										"ProfileFormScreen"
									)
								}
							>
								<View style={{ alignItems: "flex-end" }}>
									<Image
										source={require("../assets/images/edit.png")}
										style={{
											width: 30,
											height: 30,
											resizeMode: "contain"
										}}
									/>
								</View>
							</TouchableOpacity>
						</View>
						<View
							style={{
								width: "100%",
								height: 1,
								backgroundColor: "#ddd"
							}}
						/>
						<FlatList
							data={
								this.action[this.props.auth.ClientTypeId - 1]
									.data
							}
							renderItem={({ item, index }) =>
								this._renderItem(item, index)
							}
							keyExtractor={(item, index) => index}
							showsHorizontalScrollIndicator={false}
							showsVerticalScrollIndicator={false}
							initialNumToRender={40}
							windowSize={15}
							numColumns={1}
							maxToRenderPerBatch={100}
						/>
					</Screen>
				</ScrollView>
			</View>
		);
	}
}

const mapStateToProps = state => ({
	home: state.home,
	auth: state.auth,
	langCode: state.language.langCode,
	personalDetails: state.main.personalDetails
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen);
