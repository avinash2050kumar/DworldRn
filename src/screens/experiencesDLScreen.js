import React, { Component } from "react";
import {
	Image,
	StatusBar,
	View,
	Text,
	ScrollView,
	KeyboardAvoidingView
} from "react-native";
import { connect } from "react-redux";
import styled from "styled-components";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";
import { connectActionSheet } from "@expo/react-native-action-sheet";

import { isEmpty } from "../helper/string";
import Button from "../components/common/Buttons";
import { Screen, StyledText } from "../theme/styledComponent";
import { Formik } from "formik";
import styles from "../theme/styles";
import FormikTextInput from "../components/common/FormikTextInput";
import * as yup from "yup";
import { withNextInputAutoFocusForm } from "react-native-formik";
import UploadDL from "../components/common/uploadDL";
import { getExperience } from "../actions";
import { Dropdown } from "react-native-material-dropdown";
import ImageView from "react-native-image-viewing";
const Form = withNextInputAutoFocusForm(View);

const validationSchema = yup.object({
	firstName: yup.string().required("First Name is required")
});

class ExperiencesDLScreen extends Component {
	static navigationOptions = ({ navigation }) => {
		return {
			title: "Expriences / DL"
		};
	};

	state = { image: "", experiences: {}, isVisible: false, data: [] };

	static getDerivedStateFromProps(props, state) {
		const isEmpty = Object.keys(state.experiences).length === 0;
		if (isEmpty) {
			return {
				experiences: props.experiences
			};
		}

		// Return null if the state hasn't changed
		return null;
	}

	componentDidMount() {
		this.props.getExperience();
	}

	isEmpty = obj => {
		return Object.keys(obj).length === 0;
	};

	_Submit = (values, actions) => {
		setTimeout(() => actions.setSubmitting(false), 3000);

		this.props.saveDriverMonthlyInfo({ monthly: values.MonthlyPay });
	};

	_setVisiblity = async (value, data) => {
		await this.setState({
			data: data ? data : this.state.data,
			isVisible: value
		});
	};

	render() {
		const initialState = {
			DrivingLicenceNumber: "BR00121",
			DrivingLicenceType: "4 Wheeler"
		};

		return (
			<ScrollView showsVerticalScrollIndicator={false}>
				<Screen style={{ backgroundColor: "#fff" }}>
					{!this.isEmpty(this.state.experiences) && (
						<KeyboardAvoidingView
							behavior="padding"
							style={{ flex: 1, justifyContent: "space-between" }}
						>
							<StatusBar barStyle="dark-content" />
							<StyledText style={{ marginBottom: 15 }}>
								Lorem Ipsum is simply dummy text of the printing
								and typesetting industry. ,
							</StyledText>

							<Formik
								initialValues={this.state.experiences}
								onSubmit={(values, actions) => {
									this._Submit(values, actions);
								}}
								validationSchema={validationSchema}
							>
								{props => (
									<View style={[styles.flex_col_btwn]}>
										<Form>
											<FormikTextInput
												label="Driving Licence Number"
												name="license.LicenseNumber"
												type="name"
												formikprops={props}
											/>
											<Dropdown
												onChangeText={(
													value,
													i,
													data
												) =>
													props.setFieldValue(
														`license.LicenseType`,
														props.values
															.licenseType[i]
													)
												}
												label="Driving Licence Type"
												data={
													this.state.experiences
														.licenseType
														? this.state.experiences.licenseType.map(
																license => {
																	return {
																		...license,
																		value:
																			license.Name
																	};
																}
														  )
														: []
												}
												value={
													props.values.license
														.LicenseType.Name
												}
											/>
											<UploadDL
												formikprops={props}
												input={"FrontPage"}
												_setVisiblity={
													this._setVisiblity
												}
												title={"Driving Licence Front"}
												url={[
													Object.assign(
														{},
														{
															uri:
																props.values
																	.license
																	.FrontPage
														}
													)
												]}
												image={require("../assets/images/license.png")}
												description={
													"Upload the front side which has your photo."
												}
											/>
											<UploadDL
												formikprops={props}
												_setVisiblity={
													this._setVisiblity
												}
												input={"BackPage"}
												title={"Driving Licence Back"}
												image={require("../assets/images/license.png")}
												url={[
													Object.assign(
														{},
														{
															uri:
																props.values
																	.license
																	.BackPage
														}
													)
												]}
												description={
													"Upload the back side which has your photo."
												}
											/>
										</Form>
										<View style={{ marginTop: 30 }}>
											<Button
												onPress={props.handleSubmit}
												label="Save & Next"
												color="secondary"
												disabled={false}
											/>
											{/*)}*/}
										</View>
									</View>
								)}
							</Formik>
						</KeyboardAvoidingView>
					)}
					<ImageView
						style={{
							position: "absolute",
							width: "100%",
							flex: 1,
							height: "100%"
						}}
						images={this.state.data}
						imageIndex={0}
						visible={this.state.isVisible}
						onRequestClose={() => this._setVisiblity(false)}
					/>
				</Screen>
			</ScrollView>
		);
	}
}

const mapStateToProps = state => ({ experiences: state.main.experiences });

const mapDispatchToProps = { getExperience };

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ExperiencesDLScreen);
