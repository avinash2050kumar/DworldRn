import React, { Component } from "react";
import {
	Image,
	StatusBar,
	View,
	Text,
	ScrollView,
	TouchableOpacity,
	KeyboardAvoidingView,
	FlatList
} from "react-native";
import { connect } from "react-redux";
import styled from "styled-components";

import { isEmpty } from "../../helper/string";
import styles from "../../theme/styles";
import { Formik } from "formik";
import theme from "../../theme/lightTheme";
import FormikTextInput from "../../components/common/FormikTextInput";
import { Card, Screen, StyledText } from "../../theme/styledComponent";
import Button from "../../components/common/Buttons";
import {
	ownerGetVehiclePreferences,
	saveOwnerVehiclePostDetail,
	saveLeaseFirmVehiclePreference,
	saveLeaseContractDetails
} from "../../actions";
import { withNextInputAutoFocusForm } from "react-native-formik";
import update from "immutability-helper";
import RadioButton from "../../components/common/RadioButtons";
import StyledDateAndTimePicker from "../../components/common/StyledDateAndTimePicker";
import * as yup from "yup";
import moment from "moment";

const Form = withNextInputAutoFocusForm(View);

const CheckBox = styled.TouchableOpacity`
	padding: 10px;
	display: flex;
	flex-direction: row;
	align-items: center;
`;

const RowArea = styled.View`
	display: flex;
	flex-direction: row;
	align-items: center;
	padding: 7px;
`;

class LeaseContractDetails extends Component {
	static navigationOptions = ({ navigation }) => {
		return {
			title: "Contract Details"
		};
	};

	state = {
		postLeaseFirmRequirement: {}
	};

	static getDerivedStateFromProps(props, state) {
		const isEmpty =
			Object.keys(state.postLeaseFirmRequirement).length === 0;
		if (isEmpty) {
			return {
				postLeaseFirmRequirement: props.postLeaseFirmRequirement
			};
		}

		// Return null if the state hasn't changed
		return null;
	}

	componentDidMount() {
		this.props.ownerGetVehiclePreferences();
	}

	isEmpty = obj => {
		return Object.keys(obj).length === 0;
	};

	_Submit = (values, actions) => {
		setTimeout(() => actions.setSubmitting(false), 3000);
		this.props.saveLeaseContractDetails(values);
		this.props.navigation.navigate("LeaseFirmPayScaleTabs");
		/*this.props.adsIndex == 0
			? this.props.navigation.navigate("OwnerDriverQualification")
			: this.props.navigation.navigate("OwnerDriverPayScaleTabs");*/
	};

	renderRadioButton = (vehicle, index, vehicleType, formikProps) => {
		return (
			<RowArea>
				<TouchableOpacity
					onPress={() =>
						formikProps.setFieldValue(
							"FirmVehicle.PaymentType",
							vehicle
						)
					}
				>
					<View
						style={[
							{
								height: 24,
								width: 24,
								borderRadius: 12,
								borderWidth: 2,
								borderColor: theme.radioButtons,
								alignItems: "center",
								justifyContent: "center"
							}
						]}
					>
						{vehicle.Id === vehicleType.Id ? (
							<View
								style={{
									height: 12,
									width: 12,
									borderRadius: 6,
									backgroundColor: theme.radioButtons
								}}
							/>
						) : null}
					</View>
				</TouchableOpacity>
				<Text style={{ marginLeft: 15 }}>{vehicle.Name}</Text>
			</RowArea>
		);
	};

	render() {
		return (
			<ScrollView>
				<Screen style={{ backgroundColor: theme.white }}>
					<View>
						<Text>
							Lorem Ipsum is simply dummy text of the printing and
							typesetting industry.
						</Text>
						{!this.isEmpty(this.props.postLeaseDummy) && (
							<KeyboardAvoidingView behavior="padding" enabled>
								<Formik
									initialValues={
										this.state.postLeaseFirmRequirement
									}
									onSubmit={(values, actions) => {
										this._Submit(values, actions);
									}}
								>
									{props => (
										<Form>
											<View>
												<RowArea>
													<View
														style={{ width: "49%" }}
													>
														<StyledDateAndTimePicker
															style={{
																width: "49%"
															}}
															placeholder={"Form"}
															formikprops={props}
															input={
																"FirmVehicle.FromDate"
															}
															hint={"choose date"}
															format={
																"YYYY-MM-DD"
															}
															defaultValue={moment().format(
																"L"
															)}
														/>
													</View>
													<View
														style={{ width: "49%" }}
													>
														<StyledDateAndTimePicker
															style={{
																width: "49%"
															}}
															placeholder={"To"}
															formikprops={props}
															input={
																"FirmVehicle.ToDate"
															}
															hint={"choose date"}
															format={
																"YYYY-MM-DD"
															}
															defaultValue={moment().format(
																"L"
															)}
														/>
													</View>
												</RowArea>
												<Text style={{ marginTop: 10 }}>
													Pay Scale
												</Text>
												<View
													style={{
														borderWidth: 1,
														borderColor: "#eee",
														paddingTop: 5,
														paddingBottom: 5,
														marginBottom: 10,
														marginTop: 10
													}}
												>
													{this.props.PayScale.filter(
														pay =>
															pay.Name !==
																"Weekly" &&
															pay.Name !==
																"Hourly"
													).map((vehicle, i) =>
														this.renderRadioButton(
															vehicle,
															i,
															props.values
																.FirmVehicle
																.PaymentType,
															props
														)
													)}
												</View>
											</View>
											{props.isSubmitting ? (
												<Button
													onPress={props.handleSubmit}
													label="Please Wait"
													color="secondary"
													disabled={true}
													style={{ marginTop: 20 }}
												/>
											) : (
												<Button
													onPress={props.handleSubmit}
													label="Save & Next"
													color="secondary"
													style={{ marginTop: 20 }}
												/>
											)}
										</Form>
									)}
								</Formik>
							</KeyboardAvoidingView>
						)}
					</View>
				</Screen>
			</ScrollView>
		);
	}
}

const mapStateToProps = state => ({
	postLeaseFirmRequirement: state.main.lease.postLeaseFirmRequirement,
	postLeaseDummy: state.main.lease.postLeaseDummy,
	vehicleCategories: state.main.lease.postLeaseDummy.vehicleCategories,
	PayScale: state.main.lease.postLeaseDummy.PayScale
});

const mapDispatchToProps = {
	ownerGetVehiclePreferences,
	saveOwnerVehiclePostDetail,
	saveLeaseFirmVehiclePreference,
	saveLeaseContractDetails
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(LeaseContractDetails);
