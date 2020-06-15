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
/*import * as Facebook from "expo-facebook";*/
import theme from "../theme/lightTheme";
import { withNextInputAutoFocusForm } from "react-native-formik";
import FormikTextInput from "../components/common/FormikTextInput";
import {GoogleSignin, statusCodes} from "react-native-google-signin";
import {AccessToken, LoginButton,LoginManager,GraphRequest,GraphRequestManager} from "react-native-fbsdk";
import NavigationService from "../config/NavigationService";
/*import * as Google from "expo-google-app-auth";*/

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


	signIn = async (props) => {
		try {
			await GoogleSignin.hasPlayServices();
			const userInfo = await GoogleSignin.signIn();
			const { type, accessToken, user } = userInfo;
			const googleInfo = Object.assign(
				{},
				{
					FirstName: user.givenName,
					LastName: user.familyName,
					Email: user.email,
					ClientTypeId: this.props.clientTypeId,
					Mobile: "0000000000",
					IsLoginBySocialMedia: true,
					password: null,
				}
			);
			this._handleSocialMedia(googleInfo, props);
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
	}


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

	_handleSocialMedia = async (payload, actions) => {
		setTimeout(() => actions.setSubmitting(false), 5000);
		const res = await this.props.postSignUp(payload);
		this.props.setLoginSuccessFul(res, false);

		if (res)
			this.props.navigation.navigate("CreatePasswordScreen", {
				Email: payload.Email,
				Mobile: payload.Mobile
			});
	};



	handleFacebookLogin (props) {
		const handleFacebookResponse=(err,success)=>{
			console.log('err', 'success',err,success)
			const facebookInfo = Object.assign(
				{},
				{
					FirstName: success.first_name,
					LastName: success.last_name,
					Email: success.email,
					ClientTypeId: this.props.clientTypeId,
					Mobile: "0000000000",
					IsLoginBySocialMedia: true
				}
			);
			this._handleSocialMedia(facebookInfo, props);
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
									string: 'id, email,name,first_name,last_name,picture.type(large)'
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

	/*_googleLogin = async () => {
		const config = {
			iosClientId: `35124116827-f6j6ue4j0c3obphpndm24npatto7rmp6.apps.googleusercontent.com`,
			androidClientId: `35124116827-dpgetvd80tgm2364i8c0bpnmiis03quj.apps.googleusercontent.com`
		};
		const res = await Google.logInAsync(config);

		const { type, accessToken } = res;
		if (type === "success") {
			/!* Log-Out *!/
			await Google.logOutAsync({ accessToken, ...config });
			/!* `accessToken` is now invalid and cannot be used to get data from the Google API with HTTP requests *!/
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
	};*/

	render() {
		const initialState = {
			FirstName: "",
			LastName: "",
			Email: "",
			ClientTypeId: this.props.clientTypeId,
			Mobile: ""
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
									)}<View style={[styles.flex_column]}>
									<StyledText
										style={{ marginBottom: 25, marginTop: 25 }}
									>
										Or Continue with a social Account
									</StyledText>
									<Button
										onPress={()=>this.handleFacebookLogin(props)/*this._faceBookLogin()*/}
										label="Facebook"
										color="faceBook"
										style={{ width: "100%", marginTop: 10 }}
										icon={"facebook-box"}
										iconColor={"#fff"}
									/>
									<Button
										onPress={() =>	this.signIn(props)/*this._googleLogin()*/}
										label="Gmail"
										color="white"
										style={{ width: "100%", marginTop: 10 }}
										icon={"gmail"}
										iconColor={"#ff3d38"}
									/>
								</View>
								</Form>
							)}
						</Formik>


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
										onPress={() => NavigationService.navigate('TermsAndCondition')}
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
										onPress={() => NavigationService.navigate('PrivacyPolicy')}
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

const mapStateToProps = state => ({clientTypeId:state.profileVisibility.clientTypeId});

const mapDispatchToProps = {
	postSignUp,
	setLoginSuccessFul
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUpScreen);
