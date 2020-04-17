import * as React from "react";
import { View, StyleSheet, Dimensions, FlatList } from "react-native";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import {
	postOwnerDriverJob,
	postOwnerVehicleFirm,
	resetOwner,
	saveOwnerDriverPayScale,
	setAppMessage,
	getOwnerJobPost
} from "../../actions";
import { connect } from "react-redux";
import OwnerDriverJobList from "./ownerDriverDetail";
import theme from "../../theme/lightTheme";
import FindAllDrivers from "./findAllDrivers";
import OwnerJobPostList from "./ownerPostedAds";
import LeasingFirmFirmList from "../lease/LeasingFirmFirmList";

const initialLayout = { width: Dimensions.get("window").width };

class OwnerJobPostTabs extends React.Component {
	static navigationOptions = ({ navigation }) => {
		return {
			title: "Job Post"
		};
	};

	state = { index: 0 };

	componentDidMount() {
		this.props.getOwnerJobPost();
	}

	renderTabBar = props => (
		<TabBar
			{...props}
			indicatorStyle={{ backgroundColor: "white" }}
			style={{ backgroundColor: theme.secondThemeColor, elevation: 0 }}
		/>
	);

	render() {
		const { navigation } = this.props;
		const routes = [
			{
				key: "requested",
				title: "Posted Ads",
				navigation
			},
			{
				key: "findDriver",
				title: "Leasing Firm",
				navigation
			}
		];

		const renderScene = SceneMap({
			requested: OwnerJobPostList,
			findDriver: LeasingFirmFirmList
		});

		const index = this.state.index;
		return (
			<TabView
				navigationState={{ index, routes }}
				renderScene={renderScene}
				onIndexChange={e => this.setState({ index: e })}
				initialLayout={initialLayout}
				renderTabBar={this.renderTabBar}
				tabStyle={{ backgroundColor: "red" }}
			/>
		);
	}
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {
	saveOwnerDriverPayScale,
	setAppMessage,
	getOwnerJobPost,
	resetOwner,
	postOwnerDriverJob,
	postOwnerVehicleFirm
};

export default connect(mapStateToProps, mapDispatchToProps)(OwnerJobPostTabs);
