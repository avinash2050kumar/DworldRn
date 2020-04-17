import React, { Component, useState } from "react";
import {
	Image,
	StatusBar,
	View,
	Text,
	ScrollView,
	KeyboardAvoidingView,
	Alert,
	SafeAreaView,
	StyleSheet
} from "react-native";
import { connect } from "react-redux";
import styled from "styled-components";
import { postSignUp, resendOtp, otpVerification } from "../actions";
import { Screen, StyledHeading, StyledText } from "../theme/styledComponent";

import { isEmpty } from "../helper/string";
import { Formik } from "formik";
import Button from "../components/common/Buttons";
import * as yup from "yup";
import theme from "../theme/lightTheme";
import CountDown from "react-native-countdown-component";
import {
	CodeField,
	Cursor,
	useBlurOnFulfill,
	useClearByFocusCell
} from "react-native-confirmation-code-field";

const validationSchema = yup.object().shape({});
const CELL_COUNT = 4;

class OtpVerificationScreen extends Component {
	static navigationOptions = ({ navigation }) => {
		return {
			title: "OTP Verification"
		};
	};

	state = {
		isDisabled: true,
		isResendVisible: false,
		timer: 90,
		otp: ""
	};

	OtpContainer = () => {
		const [value, setValue] = useState("");
		const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
		const [props, getCellOnLayoutHandler] = useClearByFocusCell({
			value,
			setValue
		});
		return (
			<SafeAreaView style={otpStyles.root}>
				<CodeField
					ref={ref}
					{...props}
					value={value}
					onChangeText={otp => {
						setValue(otp);
						this.setState({ otp });
					}}
					cellCount={CELL_COUNT}
					rootStyle={otpStyles.codeFiledRoot}
					keyboardType="number-pad"
					renderCell={({ index, symbol, isFocused }) => (
						<Text
							key={index}
							style={[
								otpStyles.cell,
								isFocused && otpStyles.focusCell
							]}
							onLayout={getCellOnLayoutHandler(index)}
						>
							{symbol || (isFocused ? <Cursor /> : null)}
						</Text>
					)}
				/>
			</SafeAreaView>
		);
	};

	_handleSubmit = async (payload, actions) => {
		const res = await this.props.otpVerification(
			this.props.auth.ClientId,
			this.state.otp
		);

		setTimeout(() => actions.setSubmitting(false), 3000);
		if (res === "SUCCESS")
			this.props.navigation.navigate("CreatePasswordScreen");
	};

	_resendOtp = async () => {
		const res = await this.props.resendOtp(this.props.auth.ClientId);
		this.setState({
			isResendVisible: false,
			timer: Math.floor(Math.random() * 21) + 70
		});
	};

	render() {
		const initialState = {
			otp: "1234"
		};
		const { mobileNo, email } = this.props;
		const { Email, Mobile } = this.props.navigation.state.params;
		return (
			<ScrollView
				showsVerticalScrollIndicator={false}
				contentContainerStyle={{ flexGrow: 1 }}
			>
				<Screen>
					<StatusBar barStyle="dark-content" />
					<KeyboardAvoidingView behavior="padding" enabled>
						<StyledText style={{ marginBottom: 45 }}>
							We have sent OTP to your registered{" "}
							{Mobile ? `mobile number +91${Mobile}` : ""}{" "}
							{Email ? `and email: ${Email}` : ""}
						</StyledText>
						<Formik
							initialValues={initialState}
							onSubmit={(values, actions) => {
								this._handleSubmit(values, actions);
							}}
							validationSchema={validationSchema}
						>
							{props => (
								<View>
									<View style={{ alignSelf: "center" }}>
										{this.OtpContainer()}
										<Text
											s
											style={{
												marginTop: 20,
												color: "#aaa",
												alignSelf: "center"
											}}
										>
											Please wait while we sent you OTP.
										</Text>
										<CountDown
											until={this.state.timer}
											size={18}
											onFinish={() =>
												this.setState({
													isResendVisible: true
												})
											}
											digitStyle={{
												borderWidth: 1,
												borderColor: theme.secondary
											}}
											digitTxtStyle={{
												color: theme.secondary
											}}
											timeToShow={["M", "S"]}
											timeLabels={{ m: "MM", s: "SS" }}
											style={{ marginTop: 12 }}
											timeLabelStyle={{
												color: theme.secondary
											}}
										/>
										<Text
											style={{
												marginTop: 10,
												padding: 16,
												color: this.state
													.isResendVisible
													? theme.secondary
													: "#aaa",
												alignSelf: "center"
											}}
											onPress={() => {
												this._resendOtp();
											}}
										>
											Resend OTP
										</Text>
									</View>
									<View style={{ marginTop: 30 }}>
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
												label="Verify and continue"
												color="secondary"
												disabled={
													this.state.otp.length != 4
												}
											/>
										)}
									</View>
								</View>
							)}
						</Formik>
					</KeyboardAvoidingView>
				</Screen>
			</ScrollView>
		);
	}
}

const mapStateToProps = state => ({ auth: state.auth });

const mapDispatchToProps = {
	postSignUp,
	resendOtp,
	otpVerification
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(OtpVerificationScreen);

const otpStyles = StyleSheet.create({
	root: { padding: 5 },
	title: { textAlign: "center", fontSize: 30 },
	codeFiledRoot: { marginTop: 20 },
	cell: {
		width: 40,
		height: 40,
		lineHeight: 38,
		fontSize: 24,
		borderWidth: 2,
		borderColor: theme.secondary,
		color: theme.secondary,
		textAlign: "center"
	},
	focusCell: {
		borderColor: theme.secondary
	}
});
