import React, { Component } from "react";
import { Image, StatusBar, View } from "react-native";
import { connect } from "react-redux";
import styled from "styled-components";

import { isEmpty } from "../helper/string";

const Screen = styled.View`
	display: flex;
	flex: 1;
	justify-content: center;
	align-items: center;
	background-color: ${props => props.theme.splashScreenBackground};
`;

class SplashScreen extends Component {
	static navigationOptions = {
		header: null
	};

	componentDidMount() {
		setTimeout(() => {
			if (this.props.isIntroVisible)
				this.props.navigation.navigate("Intro");
			else if (this.props.isChooseProfileVisible)
				this.props.navigation.navigate("ChooseYourProfile");
			else if (!this.props.auth.isLoginSuccessFul)
				this.props.navigation.navigate("Auth");
			else if (this.props.isHomeScreenVisible)
				this.props.navigation.navigate("UserStack");
			else if (this.props.auth.ClientTypeId === 1)
				this.props.navigation.navigate("MainScreen");
		}, 1000);
	}

	render() {
		return (
			<Screen style={{ backgroundColor: "#243164" }}>
				<StatusBar barStyle="dark-content" />
				<Image
					source={require("../assets/images/logo.png")}
					style={{
						//tintColor: "red",
						height: 70,
						width: 258,
						marginBottom: 10
					}}
				/>
			</Screen>
		);
	}
}

const mapStateToProps = state => ({
	isIntroVisible: state.intro.isIntroVisible,
	auth: state.auth,
	ClientTypeId: state.auth.ClientTypeId,
	isChooseProfileVisible: state.profileVisibility.isChooseProfileVisible,
	isHomeScreenVisible: state.home.isHomeScreenVisible
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(SplashScreen);
