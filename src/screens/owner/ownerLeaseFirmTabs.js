import * as React from "react";
import { View, StyleSheet, Dimensions, FlatList } from "react-native";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import {
	postOwnerDriverJob,
	postOwnerVehicleFirm,
	resetOwner,
	saveOwnerDriverPayScale,
	setAppMessage
} from "../../actions";
import { connect } from "react-redux";
import OwnerDriverJobList from "./ownerDriverDetail";
import theme from "../../theme/lightTheme";
import FindAllDrivers from "./findAllDrivers";
import OwnerLeaseFirmList from "./ownerLeaseFirmList";
import FindAllLeaseFirm from "./findAllLeaseFirm";

const initialLayout = { width: Dimensions.get("window").width };

class OwnerLeaseFirmTabs extends React.Component {
	static navigationOptions = ({ navigation }) => {
		return {
			title: navigation.getParam("item").CarName
				? navigation.getParam("item").CarName
				: ""
			/*header: {
				//tintColor: myNewTextColor,
				style: {
					backgroundColor: "red"
				}
			}*/
		};
	};

	state = { index: 0 };

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
				title: "Requested",
				item: navigation.getParam("item")
			},
			{
				key: "findFirm",
				title: "Find Firm",
				item: navigation.getParam("item")
			}
		];

		console.log("value is ", this.props);

		const renderScene = SceneMap({
			requested: OwnerLeaseFirmList,
			findFirm: FindAllLeaseFirm
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

const mapStateToProps = state => ({
	postAdsDriver: state.main.owner.postAdsDriver,
	postAdsDriverDummy: state.main.owner.postAdsDriverDummy,
	vehicleCategories: state.main.owner.postAdsDriverDummy.vehicleCategories,
	ShiftType: state.main.owner.postAdsDriverDummy.ShiftType,
	JobType: state.main.owner.postAdsDriverDummy.JobType,
	adsIndex: state.main.owner.adsIndex
});

const mapDispatchToProps = {
	saveOwnerDriverPayScale,
	setAppMessage,
	resetOwner,
	postOwnerDriverJob,
	postOwnerVehicleFirm
};

export default connect(mapStateToProps, mapDispatchToProps)(OwnerLeaseFirmTabs);

const styles = StyleSheet.create({
	scene: {
		flex: 1
	}
});
