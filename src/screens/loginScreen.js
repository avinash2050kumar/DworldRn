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
import { login, setLoginSuccessFul, setHomeScreenVisibility } from "../actions";
import { Screen, StyledHeading, StyledText } from "../theme/styledComponent";

import { isEmpty } from "../helper/string";
import { Formik } from "formik";
import Button from "../components/common/Buttons";
import * as yup from "yup";
import styles from "../theme/styles";
import * as Facebook from "expo-facebook";
import theme from "../theme/lightTheme";
import FormikTextInput from "../components/common/FormikTextInput";
import { withNextInputAutoFocusForm } from "react-native-formik";
import * as Google from "expo-google-app-auth";

const Form = withNextInputAutoFocusForm(View);

const validationSchema = yup.object().shape({
	loginId: yup
		.string()
		.required("Email/Mobile is not valid")
		.label("Email/Mobile"),

	password: yup
		.string()
		.label("Password")
		.required("Password is required")
});

class LoginScreen extends Component {
	static navigationOptions = ({ navigation }) => {
		return {
			title: "Sign In"
		};
	};

	_handleSubmit = async (payload, actions) => {
		setTimeout(() => actions.setSubmitting(false), 3000);
		const res = await this.props.login(
			payload.loginId,
			payload.password,
			payload.IsLoginBySocialMedia
		);

		let navigate = "UserStack";
		/*if (res.ClientTypeId === 1) navigate = "UserStack";*/
		/*else if (res.ClientTypeId === 2) navigate = "OwnerStack";
		else if (res.ClientTypeId === 3) navigate = "LeaseFirm";*/
		if (res) {
			this.props.setLoginSuccessFul(res, true);
			this.props.setHomeScreenVisibility(true);
			this.props.navigation.navigate(navigate);
		}
	};

	_googleLogin = async () => {
		const config = {
			expoClientId: `YOUR_WEB_CLIENT_ID`,
			iosClientId: `35124116827-f6j6ue4j0c3obphpndm24npatto7rmp6.apps.googleusercontent.com`,
			androidClientId: `35124116827-dpgetvd80tgm2364i8c0bpnmiis03quj.apps.googleusercontent.com`
		};
		const res = await Google.logInAsync(config);

		const { type, accessToken, user } = res;
		const googleInfo = Object.assign(
			{},
			{
				loginId: user.email,
				password: null,
				IsLoginBySocialMedia: true
			}
		);
		this._handleSubmit(googleInfo, props);

		if (type === "success") {
			/* Log-Out */
			await Google.logOutAsync({ accessToken, ...config });
			/* `accessToken` is now invalid and cannot be used to get data from the Google API with HTTP requests */
		}
	};

	_faceBookLogin = async props => {
		try {
			await Facebook.initializeAsync("2880136255379048");
			const {
				type,
				token,
				expires,
				permissions,
				declinedPermissions
			} = await Facebook.logInWithReadPermissionsAsync({
				permissions: ["public_profile", "email"]
			});
			if (type === "success") {
				// Get the user's name using Facebook's Graph API
				const response = await fetch(
					`https://graph.facebook.com/me/?fields=id,email,birthday,hometown,picture.height(600),name&access_token=${token}`
				);
				const res = await response.json();
				const facebookInfo = Object.assign(
					{},
					{
						loginId: res.email,
						password: null,
						IsLoginBySocialMedia: true
					}
				);
				console.log("faceboo", facebookInfo);
				this._handleSubmit(facebookInfo, props);
			} else {
				// type === 'cancel'
			}
		} catch ({ message }) {
			alert(`Facebook Login Error: ${message}`);
		}
	};

	render() {
		const initialState = {
			loginId: "sandeep@singh.com",
			password: "raju@123",
			IsLoginBySocialMedia: false
		};

		return (
			<ScrollView
				showsVerticalScrollIndicator={false}
				contentContainerStyle={{ flexGrow: 1 }}
			>
				<Screen style={{ paddingTop: 15 }}>
					<StatusBar barStyle="dark-content" />
					<KeyboardAvoidingView behavior="padding" enabled>
						<StyledText style={{ marginBottom: 45 }}>
							Find the job on Djobs. You are only few steps away
							from bunch of jobs
						</StyledText>
						<Formik
							initialValues={initialState}
							onSubmit={(values, actions) => {
								this._handleSubmit(values, actions);
							}}
							validationSchema={validationSchema}
						>
							{props => (
								<Form>
									<FormikTextInput
										label={"Email/Mobile"}
										name="loginId"
										type="name"
										formikprops={props}
										iconLeft={"user"}
									/>
									<FormikTextInput
										label={"Password"}
										name="password"
										type="password"
										formikprops={props}
										iconLeft={"lock"}
									/>
									<StyledText
										style={{
											color: theme.privacyPolicy,
											fontSize: 16,
											marginBottom: 50,
											paddingLeft: 16,
											paddingRight: 16,
											alignSelf: "flex-end"
										}}
										onPress={() =>
											this.props.navigation.navigate(
												"ForgetPasswordScreen"
											)
										}
									>
										Forgot Password ?
									</StyledText>

									{props.isSubmitting ? (
										<Button
											onPress={props.handleSubmit}
											label="Please Wait"
											color="secondary"
											disabled={true}
										/>
									) : (
										<Button
											onPress={props.handleSubmit}
											label="Sign In"
											color="secondary"
											disabled={
												!props.values.loginId ||
												!props.values.password
											}
										/>
									)}
									<View style={[styles.flex_column]}>
										<StyledText
											style={{
												marginBottom: 25,
												marginTop: 25
											}}
										>
											Or Continue with a social Account
										</StyledText>
										<Button
											onPress={() =>
												this._faceBookLogin(props)
											}
											label="Facebook"
											color="faceBook"
											style={{
												width: "100%",
												marginTop: 10
											}}
											icon={"facebook-box"}
											iconColor={"#fff"}
										/>
										<Button
											onPress={() =>
												this._googleLogin(props)
											}
											label="Gmail"
											color="white"
											style={{
												width: "100%",
												marginTop: 10
											}}
											icon={"gmail"}
											iconColor={"#ff3d38"}
										/>
									</View>
								</Form>
							)}
						</Formik>

						<View>
							<StyledText
								style={{ marginTop: 25, marginBottom: 45 }}
							>
								Don't have an account?{" "}
								{
									<StyledText
										style={{
											color: theme.secondary,
											fontSize: 16
										}}
										onPress={() =>
											this.props.navigation.navigate(
												"SignUpScreen"
											)
										}
									>
										Sign Up
									</StyledText>
								}
							</StyledText>
						</View>
					</KeyboardAvoidingView>
				</Screen>
			</ScrollView>
		);
	}
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {
	login,
	setLoginSuccessFul,
	setHomeScreenVisibility
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
