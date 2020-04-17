import React, { Component } from "react";
import { Image, StatusBar, View, Text, ScrollView } from "react-native";
import { connect } from "react-redux";
import styled from "styled-components";

import { isEmpty } from "../helper/string";
import DriverPayScale from "../components/Driver/payScale";
import OwnerHomeTabs from "./OwnerHomeTabs";
import LeaseHomeTabs from "./LeaseHomeTabs";

const Screen = styled.View`
	display: flex;
	flex: 1;
	justify-content: center;
	align-items: center;
	background-color: ${props => props.theme.splashScreenBackground};
`;

class PayScaleScreen extends Component {
	static navigationOptions = ({ navigation }) => {
		return {
			title: "Pay Scale"
		};
	};

	render() {
		switch (this.props.ClientTypeId) {
			case 1:
				return <DriverPayScale />;
			case 2:
				return <OwnerHomeTabs />;
			case 3:
				return <LeaseHomeTabs />;
			default:
				return <DriverPayScale />;
		}
	}
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(PayScaleScreen);
