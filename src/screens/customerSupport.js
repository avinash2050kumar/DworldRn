import React, { Component } from "react";
import {
	Image,
	StatusBar,
	View,
	Text,
	ScrollView,
	KeyboardAvoidingView,
	Alert
} from "react-native";
import { connect } from "react-redux";
import styled from "styled-components";
import {
} from "../actions";
import { Screen, StyledHeading, StyledText } from "../theme/styledComponent";

import { isEmpty } from "../helper/string";
import { Formik } from "formik";
import Button from "../components/common/Buttons";
import * as yup from "yup";
import styles from "../theme/styles";
import theme from "../theme/lightTheme";

 class CustomerSupportScreen extends Component {
	static navigationOptions = ({ navigation }) => {
		return {
			title: "Customer Support"
		};
	};

	render() {
		const initialState = {
			password: "",
			confirmPassword: ""
		};
		const { mobileNo, email } = this.props;

		return (
			<ScrollView
				showsVerticalScrollIndicator={false}
				contentContainerStyle={{ flexGrow: 1 }}
			>
				<Screen style={{ backgroundColor: "#fff" }}>
					<KeyboardAvoidingView behavior="padding" enabled>
						<StatusBar barStyle="dark-content" />
						<StyledText style={{ marginBottom: 45 }}>
							Hi {this.props.personalDetails.FirstName} {this.props.personalDetails.LastName}

						</StyledText>

						<View
							style={{
								padding: 16,
								borderRadius: 7,
								backgroundColor: theme.cardDisabledColor,
								marginBottom: 15,
								alignItems: "center"
							}}
						>
							<Text
								style={{
									color: theme.secondThemeColor,
									fontWeight: "bold"
								}}
							>
								+91 98685767343
							</Text>
						</View>
						<View
							style={{
								padding: 16,
								borderRadius: 7,
								backgroundColor: theme.cardDisabledColor,
								alignItems: "center"
							}}
						>
							<Text
								style={{
									color: theme.secondThemeColor,
									fontWeight: "bold"
								}}
							>
								support@djobs.com
							</Text>
						</View>
					</KeyboardAvoidingView>
				</Screen>
			</ScrollView>
		);
	}
}

const mapStateToProps = state => ({
	personalDetails:state.main.personalDetails
});


export default connect(mapStateToProps,{})(CustomerSupportScreen);
