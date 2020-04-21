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
	Button,
	Card,
	HorizontalLine,
	NavigationBar,
	Screen,
	ShadowLessCard,
	StyledText,
	StyledTitle
} from "../theme/styledComponent";
import {
	setHomeScreenVisibility,
	setHomeScreenNoOfWork,
	setDeviceLocation,
	setDriverEarning,
	driverApplyJob,
	filtersAndSortingDriverData
} from "../actions";
import axios from "axios";
import HomeCarousel from "../components/Home/Crousel";
import theme from "../theme/lightTheme";
import styles from "../theme/styles";
import styled from "styled-components";
import i18n from "i18n-js";
import Modal from "react-native-modal";
import FilterAndSorting from "../components/Driver/filterAndSorting";
import Ionicons from "react-native-vector-icons/dist/Ionicons";
import DriverHomeCard from "../components/Driver/driverHomeCard";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const StyledPropText = styled.Text`
	color: ${props => props.theme.textLightColor};
	margin: 5px 0px;
`;

const StyledValueText = styled.Text`
	color: ${props => props.theme.themeText};
	margin: 5px 0px;
`;

class DriverHomeCardDetailScreen extends Component {
	static navigationOptions = {
		header: null
	};

	state = {
		isModalVisible: false
	};

	toggleModal = () => {
		this.setState({ isModalVisible: !this.state.isModalVisible });
	};

	componentDidMount() {
		this.props.setDriverEarning();
	}

	/*_renderItem = (item, index) => (

	);*/

	render() {
		const dataIndex = this.props.navigation.getParam("index");
		return (
			<View style={{ flex: 1 }}>
				<View
					style={{
						//paddingTop: 22,
						backgroundColor: theme.secondThemeColor
					}}
				>
					<NavigationBar
						style={[
							styles.flex_row,
							{
								justifyContent: "space-between",
								backgroundColor: theme.secondThemeColor,
								height: 60
							}
						]}
					>
						<View style={[styles.flex_row]}>
							<TouchableOpacity
								onPress={() => this.props.navigation.pop()}
							>
								<Ionicons
									name={"ios-arrow-round-back"}
									size={30}
									color={theme.white}
								/>
							</TouchableOpacity>
							<StyledTitle
								style={{
									color: "#fff",
									fontSize: 20,
									marginLeft: 15
								}}
							>
								{this.props.navigation.getParam("title")}
								{/*{i18n.t("jobOfferTitle")}*/}
							</StyledTitle>
						</View>

						<View
							style={[styles.flex_row, { alignItems: "center" }]}
						>
							{this.props.ClientTypeId === 1 && (
								<TouchableOpacity
									onPress={() => this.toggleModal()}
								>
									<Image
										source={require("../assets/images/sort.png")}
										style={{
											width: 25,
											height: 25,
											resizeMode: "contain",
											marginRight: 10
										}}
									/>
								</TouchableOpacity>
							)}
							{this.props.ClientTypeId === 1 && (
								<TouchableOpacity
									onPress={() => this.toggleModal()}
								>
									<Image
										source={require("../assets/images/filter.png")}
										style={{
											width: 25,
											height: 25,
											resizeMode: "contain"
										}}
									/>
								</TouchableOpacity>
							)}
						</View>
					</NavigationBar>
					{this.props.ClientTypeId === 1 && (
						<Modal
							isVisible={this.state.isModalVisible}
							style={{ justifyContent: "flex-end", margin: 0 }}
						>
							<FilterAndSorting
								toggleModal={this.toggleModal}
								data={this.props.data[dataIndex].dataList}
								dataIndex={dataIndex}
								filtersAndSortingDriverData={
									this.props.filtersAndSortingDriverData
								}
							/>
						</Modal>
					)}
					<View
						style={{
							position: "absolute",
							top: 80
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
				</View>
				<ScrollView
					showsVerticalScrollIndicator={false}
					contentContainerStyle={{ flexGrow: 1 }}
				>
					<Screen style={{ backgroundColor: "transparent" }}>
						<StatusBar barStyle="light-content" />

						<FlatList
							data={this.props.data[dataIndex].filteredData}
							renderItem={({ item, index }) => (
								<DriverHomeCard
									item={item}
									index={index}
									dataIndex={dataIndex}
									driverApplyJob={this.props.driverApplyJob}
								/>
							)}
							keyExtractor={(item, index) => index}
							showsHorizontalScrollIndicator={false}
							showsVerticalScrollIndicator={false}
						/>
					</Screen>
				</ScrollView>
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

const mapDispatchToProps = {
	setHomeScreenVisibility,
	setDeviceLocation,
	setDriverEarning,
	setHomeScreenNoOfWork,
	filtersAndSortingDriverData,
	driverApplyJob
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(DriverHomeCardDetailScreen);
