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
	postSignUp,
	createPassword,
	setLoginSuccessFul,
	setAppMessage,
	resetPassword
} from "../actions";
import { Screen, StyledHeading, StyledText } from "../theme/styledComponent";

import { isEmpty } from "../helper/string";
import { Formik } from "formik";
import Button from "../components/common/Buttons";
import * as yup from "yup";
import styles from "../theme/styles";
import FormikTextInput from "../components/common/FormikTextInput";
import { withNextInputAutoFocusForm } from "react-native-formik";
import i18n from "i18n-js";

const Form = withNextInputAutoFocusForm(View);

const validationSchema = yup.object({
	password: yup.string().required("Password is required"),
	confirmPassword: yup
		.string()
		.oneOf([yup.ref("password")], "Password not Matched")
		.required("Password confirm is required")
});

class ChangePasswordScreen extends Component {
	static navigationOptions = ({ navigation }) => {
		return {
			title: i18n.t("profileScreenLeaseOption6")
		};
	};

	_handleSubmit = async (payload, actions) => {
		setTimeout(() => actions.setSubmitting(false), 5000);
		const resetPasswordPayload = Object.assign(
			{},
			{ OldPassword: payload.oldPassword, NewPassword: payload.password }
		);

		const res = await this.props.resetPassword(resetPasswordPayload);

		if (res) {
			this.props.navigation.pop();
		}
	};

	render() {
		const initialState = {
			oldPassword: "",
			password: "",
			confirmPassword: ""
		};
		const { mobileNo, email } = this.props;

		return (
			<ScrollView
				showsVerticalScrollIndicator={false}
				contentContainerStyle={{ flexGrow: 1 }}
			>
				<Screen>
					<KeyboardAvoidingView behavior="padding" enabled>
						<StatusBar barStyle="dark-content" />
						<StyledText style={{ marginBottom: 15 }}>
							Please update your password here
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
											label="Old Password"
											name="oldPassword"
											type="password"
											formikprops={props}
											iconLeft={"lock"}
										/>
										<FormikTextInput
											label="New Password"
											name="password"
											type="password"
											formikprops={props}
											iconLeft={"lock"}
										/>
										<FormikTextInput
											label="Confirm Password"
											name="confirmPassword"
											type="password"
											formikprops={props}
											iconLeft={"lock"}
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
												label="Verify and continue"
												color="secondary"
												disabled={
													!props.values.oldPassword ||
													!props.values.password ||
													!props.values.password
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
	createPassword,
	setLoginSuccessFul,
	setAppMessage,
	resetPassword
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ChangePasswordScreen);
