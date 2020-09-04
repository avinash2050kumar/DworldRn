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
// import * as Facebook from "expo-facebook";
import theme from "../theme/lightTheme";
import FormikTextInput from "../components/common/FormikTextInput";
import { withNextInputAutoFocusForm } from "react-native-formik";
// import * as Google from "expo-google-app-auth";

import { LoginButton, AccessToken ,GraphRequest,LoginManager,GraphRequestManager} from 'react-native-fbsdk';
import { GoogleSignin, GoogleSigninButton , statusCodes} from 'react-native-google-signin';

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

	componentDidMount() {
		GoogleSignin.configure({
			scopes: ['https://www.googleapis.com/auth/drive.readonly'], // what API you want to access on behalf of the user, default is email and profile
			webClientId: '983653217725-g145s4r24hfccpu5ppa754uffbrdr83l.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
			offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
			//hostedDomain: '', // specifies a hosted domain restriction
			//loginHint: '', // [iOS] The user's ID, or email address, to be prefilled in the authentication UI if possible. [See docs here](https://developers.google.com/identity/sign-in/ios/api/interface_g_i_d_sign_in.html#a0a68c7504c31ab0b728432565f6e33fd)
			forceConsentPrompt: true, // [Android] if you want to show the authorization prompt at each login.
			//accountName: '', // [Android] specifies an account name on the device that should be used
			//iosClientId: '<FROM DEVELOPER CONSOLE>', // [iOS] optional, if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)
		});
	}

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


	initUser =async (token) => {
		console.log('token',token)
console.log('value', await fetch(
	`https://graph.facebook.com/me/?fields=id,email,birthday,hometown,picture.height(600),name&access_token=${token}`
))
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
		this._handleSubmit(facebookInfo, props);
	}

	render() {
		const initialState = {
			loginId: "",
			password: "",
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
							Please enter your email/mobile number and password to sign
							in
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
												this.handleFacebookLogin(props)
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
												this.signIn(props)
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



	handleFacebookLogin (props) {
		const handleFacebookResponse=(err,success)=>{
			const facebookInfo = Object.assign(
				{},
				{
					loginId: success.email,
					password: null,
					IsLoginBySocialMedia: true
				}
			);
			this._handleSubmit(facebookInfo, props);
		}
		LoginManager.logInWithPermissions(['public_profile', 'email', ]).then(
			function (result) {
				if (result.isCancelled) {
					console.log('Login cancelled')
				} else {
					AccessToken.getCurrentAccessToken().then((data) => {
						console.log('data',data)
						const { accessToken } = data
						const infoRequest = new GraphRequest('/me', {
							accessToken: accessToken,
							parameters: {
								fields: {
									string: 'id, email,name, picture.type(large)'
								}
							}
						},handleFacebookResponse);
						// Execute the graph request created above
					new GraphRequestManager().addRequest(infoRequest).start();
					}).catch(e=>console.log('catch',e))
				}
			},
			function (error) {
				console.log('Login fail with error: ' + error)
			}
		)
	}

	signIn = async (props) => {
		try {
			await GoogleSignin.hasPlayServices();
			const userInfo = await GoogleSignin.signIn();
			console.log(userInfo,'userInfo')
			const { type, accessToken, user } = userInfo;
			const googleInfo = Object.assign(
				{},
				{
					loginId: user.email,
					password: null,
					IsLoginBySocialMedia: true
				}
			);
			this._handleSubmit(googleInfo, props);
		} catch (error) {
			if (error.code === statusCodes.SIGN_IN_CANCELLED) {
				// user cancelled the login flow
			} else if (error.code === statusCodes.IN_PROGRESS) {
				// operation (f.e. sign in) is in progress already
			} else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
				// play services not available or outdated
			} else {
				console.log(error,'eror')
			}
		}
	};
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {
	login,
	setLoginSuccessFul,
	setHomeScreenVisibility
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
