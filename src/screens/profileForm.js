import React, { Component } from "react";
import {
	Image,
	StatusBar,
	View,
	Text,
	ScrollView,
	KeyboardAvoidingView,
	Platform
} from "react-native";
import { connect } from "react-redux";
import { HorizontalLine, Screen, StyledText } from "../theme/styledComponent";
import { Formik } from "formik";
import styles from "../theme/styles";
import Button from "../components/common/Buttons";
import {
	handleTextInput,
	withNextInputAutoFocusForm,
	withNextInputAutoFocusInput
} from "react-native-formik";
import { getPersonalDetails, SaveProfile, setAppMessage } from "../actions";
import * as yup from "yup";
import FormikTextInput from "../components/common/FormikTextInput";
const Form = withNextInputAutoFocusForm(View);
import Ionicons from "react-native-vector-icons/dist/Ionicons";
import i18n from "i18n-js";

const validationSchema = yup.object({
	FirstName: yup.string().required("First Name is required"),
	Address: yup.string().required("Address is required"),
	Mobile: yup
		.string()
		.matches(/^[0-9]{10}$/, "Type your valid 10 digits mobile no.")
		.required("First Name is required"),
	PinCode: yup
		.string()
		.matches(/^[0-9]{6}$/, "Type your 6 digits PinCode")
		.required("First Name is required")
});

class ProfileFormScreen extends Component {
	static navigationOptions = ({ navigation }) => {
		return {
			title: i18n.t("profileDetail")
		};
	};

	_handleSubmit = payload => {
		this.props.SaveProfile(payload);
	};

	componentDidMount() {
		this.props.getPersonalDetails();
	}

	isEmpty = obj => {
		return Object.keys(obj).length === 0;
	};

	render() {
		return (
			<ScrollView showsVerticalScrollIndicator={false}>
				<Screen style={{ backgroundColor: "#f5f5f5" }}>
					<KeyboardAvoidingView
						behavior="padding"
						style={{ flex: 1, justifyContent: "space-between" }}
					>
						<StatusBar barStyle="dark-content" />
						<View
							style={[styles.flex_center, { marginBottom: 20 }]}
						>
							<View>
								<Image
									source={{
										uri:
											"https://2.bp.blogspot.com/-k1HziBxBYuE/Tg0EwSo5B6I/AAAAAAAABwk/pHENBUKyr-s/s565/SBX701_HKL_Fist_of_Fury_DVD%255B1%255D.jpg"
									}}
									style={{
										width: 100,
										height: 100,
										resizeMode: "cover",
										borderRadius: 50
									}}
								/>
								<View
									style={[
										styles.flex_center,
										{
											width: 40,
											height: 40,
											backgroundColor: "#fff",
											borderRadius: 20,
											bottom: 0,
											right: -10,
											position: "absolute",
											borderWidth: 1,
											borderColor: "#aaa"
										}
									]}
								>
									<Ionicons name={"ios-camera"} size={30} />
								</View>
							</View>
						</View>
						<HorizontalLine style={{ marginBottom: 15 }} />
						{!this.isEmpty(this.props.personalDetails) && (
							<Formik
								initialValues={this.props.personalDetails}
								onSubmit={(values, actions) => {
									this._handleSubmit(values);
								}}
								validationSchema={validationSchema}
							>
								{props => (
									<View style={[styles.flex_col_btwn]}>
										<Form>
											<FormikTextInput
												label="First Name"
												name="FirstName"
												type="name"
												formikprops={props}
												disabled={true}
											/>
											<FormikTextInput
												label="Last Name"
												name="LastName"
												type="name"
												formikprops={props}
												disabled={true}
											/>
											<FormikTextInput
												label="Mobile Number"
												name="Mobile"
												type="name"
												prefix={"+91"}
												formikprops={props}
												disabled={true}
											/>
											<FormikTextInput
												label="Email"
												name="Email"
												type="email"
												multiline={true}
												formikprops={props}
												disabled={true}
											/>
											<FormikTextInput
												label="Location"
												name="Location"
												type="name"
												formikprops={props}
											/>
											<FormikTextInput
												label="Address"
												name="Address"
												type="name"
												multiline={true}
												formikprops={props}
											/>
											<FormikTextInput
												label="Landmark"
												name="Landmark"
												type="name"
												formikprops={props}
											/>
											<FormikTextInput
												label="City"
												name="City"
												type="name"
												formikprops={props}
											/>
											<FormikTextInput
												label="PinCode"
												name="PinCode"
												type="name"
												maxLength={6}
												formikprops={props}
											/>
											<FormikTextInput
												label="Instruction"
												name="Instruction"
												type="name"
												multiline={true}
												numberOfLines={3}
												formikprops={props}
											/>
										</Form>
										<View style={{ marginTop: 30 }}>
											<Button
												onPress={props.handleSubmit}
												label="Save & Next"
												color="secondary"
												disabled={props.isSubmitting}
											/>
											{/*)}*/}
										</View>
									</View>
								)}
							</Formik>
						)}
					</KeyboardAvoidingView>
				</Screen>
			</ScrollView>
		);
	}
}

const mapStateToProps = state => ({
	personalDetails: state.main.personalDetails
});

const mapDispatchToProps = { setAppMessage, getPersonalDetails, SaveProfile };

export default connect(mapStateToProps, mapDispatchToProps)(ProfileFormScreen);
