import React from "react";
import { TouchableOpacity } from "react-native";
import Ionicons from "react-native-vector-icons/dist/Ionicons";
import { StyleSheet, View } from "react-native";
import { connect } from "react-redux";
import AppIntroSlider from "react-native-app-intro-slider";
import { setIntroVisibility } from "../actions";

const styles = StyleSheet.create({
	buttonCircle: {
		width: 40,
		height: 40,
		backgroundColor: "rgba(0, 0, 0, .2)",
		borderRadius: 20,
		justifyContent: "center",
		alignItems: "center"
	},
	image: {
		width: 320,
		height: 320
	}
});

const slides = [
	{
		key: "somethun",
		title: "Easy to get a job",
		titleStyle: { color: "#00cb99" },
		textStyle: { color: "#232323" },
		text:
			"Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
		image: require("../assets/images/building.png"),
		backgroundColor: "#fff"
	},
	{
		key: "somethun-dos",
		title: "Easy to get a job",
		text:
			"Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
		titleStyle: { color: "#00cb99" },
		textStyle: { color: "#232323" },
		image: require("../assets/images/driver.png"),
		backgroundColor: "#fff"
	},
	{
		key: "somethun1",
		title: "Easy to get a job",
		text:
			"Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
		titleStyle: { color: "#00cb99" },
		textStyle: { color: "#232323" },
		image: require("../assets/images/driver.png"),
		backgroundColor: "#fff"
	}
];

class IntroScreen extends React.Component {
	static navigationOptions = {
		header: null
	};

	_renderNextButton = () => {
		return (
			<View style={styles.buttonCircle}>
				<Ionicons
					name="md-arrow-round-forward"
					color="rgba(255, 255, 255, .9)"
					size={24}
					style={{ backgroundColor: "transparent" }}
				/>
			</View>
		);
	};
	_renderDoneButton = () => {
		return (
			<TouchableOpacity
				onPress={() => {
					this.props.setIntroVisibility(false);
					this.props.navigation.navigate("ChooseYourProfile");
				}}
			>
				<View style={styles.buttonCircle}>
					<Ionicons
						name="md-checkmark"
						color="rgba(255, 255, 255, .9)"
						size={24}
						style={{ backgroundColor: "transparent" }}
					/>
				</View>
			</TouchableOpacity>
		);
	};
	render() {
		return (
			<AppIntroSlider
				slides={slides}
				renderDoneButton={this._renderDoneButton}
				renderNextButton={this._renderNextButton}
				activeDotStyle={{ backgroundColor: "rgba(0, 0, 0, .9)" }}
			/>
		);
	}
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {
	setIntroVisibility
};

export default connect(mapStateToProps, mapDispatchToProps)(IntroScreen);
