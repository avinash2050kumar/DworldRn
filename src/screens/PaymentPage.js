import React from "react";
import { ScrollView, View } from "react-native";
import { Screen } from "../theme/styledComponent";
import { WebView } from "react-native-webview";
import i18n from "i18n-js";

export default class PaymentScreen extends React.Component {
	static navigationOptions = ({ navigation }) => {
		return {
			title: "Pay"
		};
	};

	/*	onMessage = e => {
		console.log("on message", e);
	};

	removeSplashScreen = () => console.log("onRemove Splash Screen");

	loadingError = () => console.log("Loading Error");

	onUrlChange = (url, value, etx) =>
		console.log("url change", url, value, etx);*/

	render() {
		return (
			<WebView
				source={{ uri: "http://13.234.18.178:3000" }}
				automaticallyAdjustContentInsets={true}
			/>
		);
	}
}
