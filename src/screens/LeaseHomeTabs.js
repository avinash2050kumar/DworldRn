import * as React from "react";
import { View, TouchableOpacity, StyleSheet, Image } from "react-native";
import { TabView, SceneMap } from "react-native-tab-view";
import Animated from "react-native-reanimated";
import { Constants } from "expo";
import HomeScreen from "./homeScreen";
import { connect } from "react-redux";
import ProfileScreen from "./ProfileScreen";
import i18n from "i18n-js";
import { getOwnerDashboard } from "../actions";
import OwnerHomeScreen from "./owner/onwerHomeScreen";
import LeaseHomeScreen from "./lease/homeScreen";
import PostedLeaseFirm from "./lease/postedLeaseFirm";

class LeaseHomeTabs extends React.Component {
	static navigationOptions = {
		header: null
	};

	componentDidMount() {
		this.props.getOwnerDashboard();
	}

	state = {
		index: 0,
		routes: [
			{
				key: "home",
				title: i18n.t("ownerHomeTabName1"),
				icons: require("../assets/images/home.png")
			},
			{
				key: "jobPost",
				title: i18n.t("ownerHomeTabName2"),
				icons: require("../assets/images/jobOffer.png")
			},
			/*{
				key: "applicant",
				title: i18n.t("ownerHomeTabName3"),
				icons: require("../assets/images/earning.png")
			},*/
			{
				key: "profile",
				title: i18n.t("ownerHomeTabName4"),
				icons: require("../assets/images/profile.png")
			}
		]
	};

	_handleIndexChange = index => this.setState({ index });

	_renderTabBar = props => {
		const inputRange = props.navigationState.routes.map((x, i) => i);
		return (
			<View style={styles.tabBar}>
				{props.navigationState.routes.map((route, i) => {
					const color = Animated.color(
						Animated.round(
							Animated.interpolate(props.position, {
								inputRange,
								outputRange: inputRange.map(inputIndex =>
									inputIndex === i ? 255 : 0
								)
							})
						),
						0,
						0
					);

					return (
						<TouchableOpacity
							style={styles.tabItem}
							onPress={() => this.setState({ index: i })}
						>
							<Animated.Image
								source={route.icons}
								style={[
									styles.icon,
									styles.inactive,
									{
										tintColor:
											props.navigationState.index === i
												? "#f00"
												: "#000",
										aspectRatio: 1,
										marginBottom: 5,
										resizeMode: "contain"
									}
								]}
							/>
							<Animated.Text style={{ color, fontSize: 12 }}>
								{route.title}
							</Animated.Text>
						</TouchableOpacity>
					);
				})}
			</View>
		);
	};

	_renderScene = SceneMap({
		home: LeaseHomeScreen,
		jobPost: PostedLeaseFirm,
		//applicant: OwnerHomeScreen,
		profile: ProfileScreen
	});

	render() {
		return (
			<TabView
				navigationState={this.state}
				renderScene={this._renderScene}
				renderTabBar={this._renderTabBar}
				onIndexChange={this._handleIndexChange}
				tabBarPosition={"bottom"}
			/>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1
	},
	tabBar: {
		flexDirection: "row",
		elevation: 3
	},
	tabItem: {
		flex: 1,
		alignItems: "center",
		padding: 7
	},
	inactive: {
		//color: "#939393"
	},
	icon: {
		height: 23,
		width: 23
	}
});

const mapStateToProps = state => ({
	auth: state.auth,
	ClientTypeId: state.auth.ClientTypeId
});

const mapDispatchToProps = { getOwnerDashboard };

export default connect(mapStateToProps, mapDispatchToProps)(LeaseHomeTabs);
