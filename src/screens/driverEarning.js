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
	setDriverEarning
} from "../actions";
import axios from "axios";
import HomeCarousel from "../components/Home/Crousel";
import theme from "../theme/lightTheme";
import styles from "../theme/styles";
import * as Permissions from "expo-permissions";
import * as Location from "expo-location";
import styled from "styled-components";
import i18n from "i18n-js";

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

class DriverEarningScreen extends Component {
	componentDidMount() {
		this.props.setDriverEarning();
	}

	_renderItem = (item, index) => (
		<TouchableOpacity
			key={index}
			onPress={() => console.log("press index", index)}
			style={{ margin: 5 }}
		>
			<Card style={{ borderRadius: 20 }}>
				<StyledTitle style={{ marginBottom: 7 }}>
					{index + 1}. {item.jobName}
				</StyledTitle>
				<View
					style={{
						width: "100%",
						height: 1,
						backgroundColor: "#ddd"
					}}
				/>
				<View
					style={[
						styles.flex_row,
						{ justifyContent: "space-between" }
					]}
				>
					<View style={{ marginTop: 10 }}>
						<StyledPropText>Vehicle Type</StyledPropText>
						<StyledPropText>Owner Name</StyledPropText>
						<StyledPropText>Salary</StyledPropText>
						<StyledPropText>Join Date</StyledPropText>
						<StyledPropText>End Date</StyledPropText>
					</View>
					<View style={{ marginTop: 10, alignItems: "flex-end" }}>
						<StyledValueText>{item.vehicleType}</StyledValueText>
						<StyledValueText>{item.ownerName}</StyledValueText>
						<StyledValueText>{item.salary}</StyledValueText>
						<StyledValueText>{item.joinDate}</StyledValueText>
						<StyledValueText>{item.endDate}</StyledValueText>
					</View>
				</View>
			</Card>
		</TouchableOpacity>
	);

	render() {
		return (
			<View style={{ flex: 1 }}>
				<View
					style={{
						paddingTop: 22,
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
						<StyledTitle
							style={{
								color: "#fff",
								fontSize: 22
							}}
						>
							{i18n.t("earning")}
						</StyledTitle>
					</NavigationBar>
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
							data={this.props.earning}
							renderItem={({ item, index }) =>
								this._renderItem(item, index)
							}
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
	earning: state.driver.earning
});

const mapDispatchToProps = {
	setHomeScreenVisibility,
	setDeviceLocation,
	setDriverEarning,
	setHomeScreenNoOfWork
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(DriverEarningScreen);
