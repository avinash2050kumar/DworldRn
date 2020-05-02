import React, { Component } from "react";
import { Image, StatusBar, View } from "react-native";
import { connect } from "react-redux";
import styled from "styled-components";
import { setLogout, resetAuth, resetDriver ,resetProfileVisibility,resetHome,resetMainScreen,resetSubscription} from "../actions";
import { Screen } from "../theme/styledComponent";

import { isEmpty } from "../helper/string";
import NavigationService from "../config/NavigationService";

class LogoutScreen extends Component {
	static navigationOptions = {
		//To hide the ActionBar/NavigationBar
		header: null
	};

	componentDidMount() {}

	render() {
		this.props.setLogout();
		this.props.resetAuth();
		this.props.resetDriver();
		this.props.navigation.navigate("SplashSrn");
		this.props.resetHome()
		this.props.resetMainScreen()
		this.props.resetSubscription()
		this.props.resetProfileVisibility()
		return (
			<Screen>
				<StatusBar barStyle="dark-content" />
			</Screen>
		);
	}
}

const mapStateToProps = state => ({
	/*token: state.auth.token */
});

const mapDispatchToProps = {
	setLogout,
	resetAuth,resetProfileVisibility,
	resetDriver,resetHome,resetMainScreen,resetSubscription
};

export default connect(mapStateToProps, mapDispatchToProps)(LogoutScreen);
