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
	setAppMessage
} from "../actions";
import { Screen, StyledHeading, StyledText } from "../theme/styledComponent";

import { isEmpty } from "../helper/string";
import { Formik } from "formik";
import Button from "../components/common/Buttons";
import * as yup from "yup";
import styles from "../theme/styles";
import FormikTextInput from "../components/common/FormikTextInput";
import { withNextInputAutoFocusForm } from "react-native-formik";

const Form = withNextInputAutoFocusForm(View);

const validationSchema = yup.object({
	password: yup.string().required("Password is required"),
	confirmPassword: yup
		.string()
		.oneOf([yup.ref("password")], "Password not Matched")
		.required("Password confirm is required")
});

class CreatePasswordScreen extends Component {
	static navigationOptions = ({ navigation }) => {
		return {
			title: "Create new password"
		};
	};

	_handleSubmit = async (payload, actions) => {
		setTimeout(() => actions.setSubmitting(false), 5000);
		const res = await this.props.createPassword(
			this.props.auth.ClientId,
			payload.password
		);

		let navigate = "UserStack";
		/*if (this.props.auth.ClientTypeId === 1) navigate = "DriverStack";
		else if (this.props.auth.ClientTypeId === 2) navigate = "OwnerStack";
		else if (this.props.auth.ClientTypeId === 3) navigate = "LeaseFirm";*/

		if (res === 200) {
			this.props.setLoginSuccessFul(undefined, true);
			this.props.navigation.navigate(navigate);
		}
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
				<Screen>
					<KeyboardAvoidingView behavior="padding" enabled>
						<StatusBar barStyle="dark-content" />
						<StyledText style={{ marginBottom: 45 }}>
							create a new password and please never share it with
							anyone for safe use.
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
											label="New Password"
											name="password"
											type="password"
											formikprops={props}
											iconLeft={"mobile-phone"}
										/>
										<FormikTextInput
											label="Confirm Password"
											name="confirmPassword"
											type="password"
											formikprops={props}
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
												label="Verify and continue"
												color="secondary"
												disabled={
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
	setAppMessage
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(CreatePasswordScreen);
