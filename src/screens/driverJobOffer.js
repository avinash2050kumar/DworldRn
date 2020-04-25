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
	setHomeScreenNoOfWork,
	setDriverEarning,
	driverApplyJob,
	driverGetJobOffer,
	filtersAndSortingDriverData
} from "../actions";
import theme from "../theme/lightTheme";
import styles from "../theme/styles";
import styled from "styled-components";
import i18n from "i18n-js";
import Modal from "react-native-modal";
import FilterAndSorting from "../components/Driver/filterAndSorting";
import DriverJobOfferCard from "../components/Driver/jobOfferCard";

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

class DriverJOBOfferScreen extends Component {
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
		this.props.driverGetJobOffer();
	}

	/*_renderItem = (item, index) => (

	);*/

	render() {
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
							{/*	<TouchableOpacity
								onPress={() => this.props.navigation.pop()}
							>
								<Ionicons
									name={"ios-arrow-round-back"}
									size={30}
									color={theme.white}
								/>
							</TouchableOpacity>*/}
							<StyledTitle
								style={{
									color: "#fff",
									fontSize: 20,
									marginLeft: 15
								}}
							>
								{i18n.t("jobOffer")}
							</StyledTitle>
						</View>
					</NavigationBar>
					<View
						style={{
							position: "absolute",
							top: 58
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
							data={this.props.driverJobOffer}
							renderItem={({ item, index }) => (
								<DriverJobOfferCard item={item} index={index} driverApplyJob={(e)=>console.log('e',e)} />
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
	driverJobOffer: state.home.driverJobOffer
});

const mapDispatchToProps = {
	setDriverEarning,
	setHomeScreenNoOfWork,
	filtersAndSortingDriverData,
	driverApplyJob,
	driverGetJobOffer
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(DriverJOBOfferScreen);
