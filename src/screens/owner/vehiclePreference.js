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
import Ionicons from "react-native-vector-icons/dist/Ionicons";
import { Formik } from "formik";
import theme from "../../theme/lightTheme";
import { Dropdown } from "react-native-material-dropdown";
import FormikTextInput from "../../components/common/FormikTextInput";
import { Card, Screen, StyledText } from "../../theme/styledComponent";
import Button from "../../components/common/Buttons";
import {
	ownerGetVehiclePreferences,
	saveOwnerVehiclePostDetail
} from "../../actions";
import { withNextInputAutoFocusForm } from "react-native-formik";
import update from "immutability-helper";
import RadioButton from "../../components/common/RadioButtons";
import StyledDateAndTimePicker from "../../components/common/StyledDateAndTimePicker";

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

class OwnerVehiclePreference extends Component {
	static navigationOptions = ({ navigation }) => {
		return {
			title: "Vehicle Preference"
		};
	};

	state = {
		postAdsDriver: {}
	};

	static getDerivedStateFromProps(props, state) {
		const isEmpty = Object.keys(state.postAdsDriver).length === 0;
		if (isEmpty) {
			return {
				postAdsDriver: props.postAdsDriver
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
		this.props.saveOwnerVehiclePostDetail(values);
		this.props.adsIndex == 0
			? this.props.navigation.navigate("OwnerDriverQualification")
			: this.props.navigation.navigate("OwnerDriverPayScaleTabs");
	};

	renderRadioButton = (pay, index, payType, formikProps) => {
		return (
			<RowArea>
				<TouchableOpacity
					onPress={() =>
						formikProps.setFieldValue("vehicle.PaymentType", pay)
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
						{pay.Id === payType.Id ? (
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
				<Text style={{ marginLeft: 15 }}>{pay.Name}</Text>
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
						{!this.isEmpty(this.props.postAdsDriverDummy) && (
							<KeyboardAvoidingView behavior="padding" enabled>
								<Formik
									initialValues={this.state.postAdsDriver}
									onSubmit={(values, actions) => {
										this._Submit(values, actions);
									}}
								>
									{props => (
										<Form>
											<View>
												<Dropdown
													onChangeText={(
														value,
														i,
														data
													) =>
														props.setFieldValue(
															`vehicle.vehicleCategory`,
															this.props
																.vehicleCategories[
																i
															]
														)
													}
													label="Vehicle Category"
													data={
														this.props
															.vehicleCategories
															? this.props.vehicleCategories.map(
																	vehicle => {
																		return {
																			...vehicle,
																			value:
																				vehicle.VehicleCategoryName
																		};
																	}
															  )
															: []
													}
													value={
														props.values.vehicle
															.vehicleCategory
															.VehicleCategoryName
													}
												/>
												<FormikTextInput
													label="Company"
													name="vehicle.vehicleCompany"
													type="name"
													formikprops={props}
												/>
												<Text style={{ marginTop: 10 }}>
													Vehicle Type
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
													{props.values.vehicle.vehicleCategory.VehicleType.map(
														(vehicle, i) => (
															<CheckBox
																onPress={() =>
																	console.log(
																		"Check bax"
																	)
																}
															>
																<Ionicons
																	name={
																		"ios-checkbox"
																	}
																	size={24}
																	color={
																		theme.primary
																	}
																/>
																<Text
																	style={{
																		marginLeft: 10
																	}}
																>
																	{
																		vehicle.Name
																	}
																</Text>
															</CheckBox>
														)
													)}
												</View>
												<FormikTextInput
													label="MFG Year"
													name="vehicle.MFGYear"
													type="name"
													formikprops={props}
													keyboardType={"number-pad"}
												/>
												<Dropdown
													onChangeText={(
														value,
														i,
														data
													) =>
														props.setFieldValue(
															`vehicle.Status`,
															props.values.vehicle
																.StatusDropDown[
																i
															].name
														)
													}
													label="Status"
													data={
														props.values.vehicle
															.StatusDropDown
															? props.values.vehicle.StatusDropDown.map(
																	vehicle => {
																		return {
																			...vehicle
																		};
																	}
															  )
															: []
													}
													value={
														props.values.vehicle
															.Status
															? "Available"
															: "Not Available"
													}
												/>
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
													{this.props.PayScale.map(
														(pay, i2) =>
															this.renderRadioButton(
																pay,
																i2,
																props.values
																	.vehicle
																	.PaymentType,
																props
															)
													)}
												</View>
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
																"vehicle.FromDate"
															}
															hint={"choose date"}
															format={
																"YYYY-MM-DD"
															}
															defaultValue={
																props.values
																	.vehicle
																	.FromDate
															}
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
																"vehicle.Todate"
															}
															hint={"choose date"}
															format={
																"YYYY-MM-DD"
															}
															defaultValue={
																props.values
																	.vehicle
																	.Todate
															}
														/>
													</View>
												</RowArea>
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
	postAdsDriver: state.main.owner.postAdsDriver,
	postAdsDriverDummy: state.main.owner.postAdsDriverDummy,
	vehicleCategories: state.main.owner.postAdsDriverDummy.vehicleCategories,
	PayScale: state.main.owner.postAdsDriverDummy.PayScale,
	adsIndex: state.main.owner.adsIndex
});

const mapDispatchToProps = {
	ownerGetVehiclePreferences,
	saveOwnerVehiclePostDetail
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(OwnerVehiclePreference);
