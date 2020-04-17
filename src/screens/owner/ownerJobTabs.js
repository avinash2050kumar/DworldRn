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

const initialLayout = { width: Dimensions.get("window").width };

class OwnerJobTabs extends React.Component {
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
		console.log("this is value", this.props);
		const routes = [
			{
				key: "requested",
				title: "Requested",
				item: navigation.getParam("item")
			},
			{
				key: "findDriver",
				title: "Find Driver",
				item: navigation.getParam("item")
			}
		];

		const renderScene = SceneMap({
			requested: OwnerDriverJobList,
			findDriver: FindAllDrivers
		});

		const index = this.state.index;
		return (
			<View style={{ paddingTop: 22 }}>
				<TabView
					navigationState={{ index, routes }}
					renderScene={renderScene}
					onIndexChange={e => this.setState({ index: e })}
					initialLayout={initialLayout}
					renderTabBar={this.renderTabBar}
					tabStyle={{ backgroundColor: "red" }}
				/>
			</View>
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

export default connect(mapStateToProps, mapDispatchToProps)(OwnerJobTabs);

const styles = StyleSheet.create({
	scene: {
		flex: 1
	}
});
