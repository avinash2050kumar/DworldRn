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
import { postSignUp, setLoginSuccessFul } from "../actions";
import { Screen, StyledHeading, StyledText } from "../theme/styledComponent";

import { isEmpty } from "../helper/string";
import { Formik } from "formik";
import Button from "../components/common/Buttons";
import * as yup from "yup";
import styles from "../theme/styles";
import * as Facebook from "expo-facebook";
import theme from "../theme/lightTheme";
import { withNextInputAutoFocusForm } from "react-native-formik";
import FormikTextInput from "../components/common/FormikTextInput";
import * as Google from "expo-google-app-auth";

const Form = withNextInputAutoFocusForm(View);

const validationSchema = yup.object().shape({
	Email: yup
		.string()
		.required("Email is not valid")
		.label("Email")
		.email(),
	FirstName: yup
		.string()
		.label("FirstName")
		.required("First Name is required"),
	LastName: yup
		.string()
		.label("LastName")
		.required("Last Name is required"),
	Mobile: yup
		.string()
		.label("Mobile")
		.required("Mobile Number is required")
});

class SignUpScreen extends Component {
	static navigationOptions = ({ navigation }) => {
		return {
			title: "Sign Up"
		};
	};

	_handleSubmit = async (payload, actions) => {
		setTimeout(() => actions.setSubmitting(false), 5000);
		const res = await this.props.postSignUp(payload);
		this.props.setLoginSuccessFul(res, false);

		if (res)
			this.props.navigation.navigate("OtpVerificationScreen", {
				Email: payload.Email,
				Mobile: payload.Mobile
			});
	};

	_googleLogin = async () => {
		const config = {
			iosClientId: `35124116827-f6j6ue4j0c3obphpndm24npatto7rmp6.apps.googleusercontent.com`,
			androidClientId: `35124116827-dpgetvd80tgm2364i8c0bpnmiis03quj.apps.googleusercontent.com`
		};
		const res = await Google.logInAsync(config);

		const { type, accessToken } = res;
		if (type === "success") {
			/* Log-Out */
			await Google.logOutAsync({ accessToken, ...config });
			/* `accessToken` is now invalid and cannot be used to get data from the Google API with HTTP requests */
		}
	};

	_faceBookLogin = async () => {
		try {
			await Facebook.initializeAsync("2880136255379048");
			const res = await Facebook.logInWithReadPermissionsAsync({
				permissions: ["public_profile"]
			});
			const {
				type,
				token,
				expires,
				permissions,
				declinedPermissions
			} = res;
			if (type === "success") {
				// Get the user's name using Facebook's Graph API
				const response = await fetch(
					`https://graph.facebook.com/me?access_token=${token}&fields=id,name,link,locale,location,birthday,hometown,middle_name,relationship_status,religion,likes,photos,last_name,gender,first_name,email,about,picture`
				);
				Alert.alert("Logged in!", `Hi ${await response.json()}!`);
			} else {
				// type === 'cancel'
			}
		} catch (e) {
			alert(`Facebook Login Error:`);
		}
	};

	render() {
		const initialState = {
			FirstName: "New",
			LastName: "User",
			Email: "avinash2050kumar@gmail.com",
			ClientTypeId: 1,
			Mobile: "7903735386"
		};
		return (
			<ScrollView
				showsVerticalScrollIndicator={false}
				contentContainerStyle={{ flexGrow: 1 }}
			>
				<Screen>
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
										label="First Name"
										name="FirstName"
										type="name"
										formikprops={props}
										keyboardType={"email-address"}
										iconLeft={"user"}
									/>
									<FormikTextInput
										label="Last Name"
										name="LastName"
										type="name"
										formikprops={props}
										iconLeft={"user"}
									/>
									<FormikTextInput
										label="Mobile"
										name="Mobile"
										type="name"
										formikprops={props}
										keyboardType={"number-pad"}
										iconLeft={"mobile-phone"}
										maxlength={10}
									/>
									<FormikTextInput
										label="Email"
										name="Email"
										type="email"
										formikprops={props}
										keyboardType={"email-address"}
										iconLeft={"user"}
									/>

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
											label="Send Otp"
											color="secondary"
											disabled={
												!props.values.Email ||
												!props.values.LastName ||
												!props.values.Mobile ||
												!props.values.FirstName
											}
										/>
									)}
								</Form>
							)}
						</Formik>
						<View style={[styles.flex_column]}>
							<StyledText
								style={{ marginBottom: 25, marginTop: 25 }}
							>
								Or Continue with a social Account
							</StyledText>
							<Button
								onPress={() => this._faceBookLogin()}
								label="Facebook"
								color="faceBook"
								style={{ width: "100%", marginTop: 10 }}
								icon={"facebook-box"}
								iconColor={"#fff"}
							/>
							<Button
								onPress={() => this._googleLogin()}
								label="Gmail"
								color="white"
								style={{ width: "100%", marginTop: 10 }}
								icon={"gmail"}
								iconColor={"#ff3d38"}
							/>
						</View>

						<View>
							<StyledText style={{ marginTop: 25 }}>
								Already have an account?{" "}
								{
									<StyledText
										style={{
											color: theme.secondary,
											fontSize: 16
										}}
										onPress={() =>
											this.props.navigation.navigate(
												"LoginScreen"
											)
										}
									>
										Sign In
									</StyledText>
								}
							</StyledText>
							<StyledText
								style={{ marginBottom: 45, marginTop: 20 }}
							>
								By creating an account you agree to our{" "}
								{
									<StyledText
										style={{
											color: theme.privacyPolicy,
											fontSize: 16
										}}
										onPress={() => console.log("Terms")}
									>
										Terms of Use
									</StyledText>
								}{" "}
								and{" "}
								{
									<StyledText
										style={{
											color: theme.privacyPolicy,
											fontSize: 16
										}}
										onPress={() => console.log("Policy")}
									>
										Privace Policy
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
	postSignUp,
	setLoginSuccessFul
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUpScreen);
