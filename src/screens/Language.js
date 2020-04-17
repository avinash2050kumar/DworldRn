import React, { Component } from "react";
import {
	StatusBar,
	View,
	ScrollView,
	KeyboardAvoidingView,
	Text,
	FlatList,
	TouchableOpacity,
	Image
} from "react-native";
import { connect } from "react-redux";
import Constants from "expo-constants";
import {
	Card,
	Screen,
	ShadowLessCard,
	StyledText,
	StyledTitle
} from "../theme/styledComponent";
import { setAppLanguage } from "../actions";
import axios from "axios";
import HomeCarousel from "../components/Home/Crousel";
import theme from "../theme/lightTheme";
import styles from "../theme/styles";
import * as Permissions from "expo-permissions";
import * as Location from "expo-location";
import i18n from "i18n-js";
import Button from "../components/common/Buttons";
import language from "../reducer/languageReducer";
import NavigationService from "../config/NavigationService";

class LanguageScreen extends Component {
	static navigationOptions = ({ navigation }) => {
		return {
			title: i18n.t("chooseYourLanguage")
		};
	};

	static getDerivedStateFromProps(props, state) {
		if (props.language.langIndex !== state.selectedIndex) {
			return {
				selectedIndex: props.language.langIndex,
				selectedLanguage: props.language.language
			};
		}

		// Return null if the state hasn't changed
		return null;
	}

	state = {
		selectedIndex: 12,
		selectedLanguage: "English",
		language: [
			{ name: i18n.t("english"), title: "English", code: "en" },
			{ name: i18n.t("hindi"), title: "Hindi", code: "hi" },
			{ name: i18n.t("tamil"), title: "Tamil", code: "ta" },
			{ name: i18n.t("telugu"), title: "Telugu", code: "te" },
			{ name: i18n.t("kannada"), title: "Kannada", code: "kn" },
			{ name: i18n.t("marathi"), title: "Marathi", code: "ma" }
		]
	};

	_renderItem = (item, index) => (
		<TouchableOpacity
			key={index}
			style={{
				padding: 2
			}}
			onPress={() => {
				this.setState({ selectedIndex: index });
				this.props.setAppLanguage(item.title, index, item.code);
				NavigationService.navigate("SplashSrn");
			}}
		>
			<Card
				style={{
					marginTop: 2,
					backgroundColor:
						this.state.selectedIndex === index
							? theme.secondary
							: theme.cardBackgroundColor
				}}
			>
				<Text
					style={{
						fontWeight: "bold",
						fontSize: 14,
						color: "rgba(41, 39, 95, 0.77)"
					}}
				>
					{item.name}
				</Text>
			</Card>
		</TouchableOpacity>
	);

	render() {
		return (
			<ScrollView showsVerticalScrollIndicator={false}>
				<Screen style={{ backgroundColor: "#fff" }}>
					<StatusBar barStyle="dark-content" />
					<FlatList
						data={this.state.language}
						renderItem={({ item, index }) =>
							this._renderItem(item, index)
						}
						keyExtractor={(item, index) => index}
						showsHorizontalScrollIndicator={false}
						showsVerticalScrollIndicator={false}
					/>
				</Screen>
			</ScrollView>
		);
	}
}

const mapStateToProps = state => ({ language: state.language });

const mapDispatchToProps = {
	setAppLanguage
};

export default connect(mapStateToProps, mapDispatchToProps)(LanguageScreen);
