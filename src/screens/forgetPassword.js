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
import { postSignUp } from "../actions";
import { Screen, StyledHeading, StyledText } from "../theme/styledComponent";

import { isEmpty } from "../helper/string";
import { Formik } from "formik";
import Button from "../components/common/Buttons";
import * as yup from "yup";
import styles from "../theme/styles";
import FormikTextInput from "../components/common/FormikTextInput";
import { withNextInputAutoFocusForm } from "react-native-formik";

const Form = withNextInputAutoFocusForm(View);

const validationSchema = yup.object().shape({
	Mobile: yup
		.string()
		.label("Mobile")
		.required("Mobile Number is required")
});

class ForgetPasswordScreen extends Component {
	static navigationOptions = ({ navigation }) => {
		return {
			title: "Recover Password"
		};
	};

	_handleSubmit = async (payload, actions) => {
		//const res = await this.props.postSignUp(payload);
		setTimeout(
			() =>
				this.props.navigation.navigate("OtpVerificationScreen", {
					Email: payload.Email,
					Mobile: payload.Mobile
				}),
			5000
		);
	};

	render() {
		const initialState = {
			Mobile: "7903735386"
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
							Select one of any credentials which should we use
							for recover your password.
						</StyledText>
						<Formik
							initialValues={initialState}
							onSubmit={(values, actions) => {
								this._handleSubmit(values, actions);
							}}
							validationSchema={validationSchema}
						>
							{props => (
								<View style={[styles.flex_col_btwn]}>
									<Form>
										<FormikTextInput
											label={"Mobile Number"}
											name="Mobile"
											type="name"
											formikprops={props}
											keyboardType={"number-pad"}
											iconLeft={"mobile-phone"}
										/>
									</Form>
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
												label="Send Otp"
												color="secondary"
												disabled={!props.values.Mobile}
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

const mapStateToProps = state => ({});

const mapDispatchToProps = {
	postSignUp
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ForgetPasswordScreen);
