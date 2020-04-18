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
	saveLeaseFirmVehiclePreference
} from "../../actions";
import { withNextInputAutoFocusForm } from "react-native-formik";
import update from "immutability-helper";
import RadioButton from "../../components/common/RadioButtons";
import StyledDateAndTimePicker from "../../components/common/StyledDateAndTimePicker";
import * as yup from "yup";
import Selector from "react-native-easy-select";

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

const validationSchema = yup.object().shape({
	FirmVehicle: yup.object().shape({
		Company: yup
			.string()
			.required("Company Name is required")
			.label("Company Name"),
		VehicleCount: yup
			.string()
			.required("No of vehicle is required")
			.label("No of vehicle")
	})
});

class PostRequirementsFirm extends Component {
	static navigationOptions = ({ navigation }) => {
		return {
			title: "Vehicle Preference"
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
		this.props.saveLeaseFirmVehiclePreference(values);
		this.props.navigation.navigate("LeaseContractDetails");
	};

	renderRadioButton = (vehicle, index, vehicleType, formikProps) => {
		return (
			<RowArea>
				<TouchableOpacity
					onPress={() =>
						formikProps.setFieldValue(
							"FirmVehicle.VehicleType",
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
									validationSchema={validationSchema}
								>
									{props => (
										<Form>
											<View>
												<Selector
													theme="dropdown" // Default: 'simple'
													items={	this.props
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
														: []}

													// Specify key
													valueKey="value" // Default: 'value'
													labelKey="value" // Default: 'label'

													defaultValue={`${props.values.FirmVehicle
														.VehicleCategory
														.Name}`} // Set default value
													placeholder="Vehicle Category"

													placeholderContainerStyle={{ paddingVertical:15,marginTop:10}}
													iconStyle={{ tintColor: 'black' }}
													onChange={(value) =>{
														let i = 0
														this.props
															.vehicleCategories.map((val,index)=> {if(val.VehicleCategoryName===value)i=index})
														props.setFieldValue(
															`FirmVehicle.VehicleCategory`,
															Object.assign(
																{},
																{
																	Id: this
																		.props
																		.vehicleCategories[
																		i
																		]
																		.VehicleCategoryId,
																	Name: this
																		.props
																		.vehicleCategories[
																		i
																		]
																		.VehicleCategoryName,
																	VehicleType: this
																		.props
																		.vehicleCategories[
																		i
																		]
																		.VehicleType
																}
															)
														)

													}}
												/>
												{console.log('weel',props.values)}

												<FormikTextInput
													label="Company"
													name="FirmVehicle.Company"
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
													{props.values.FirmVehicle.VehicleCategory.VehicleType.map(
														(vehicle, i) =>
															this.renderRadioButton(
																vehicle,
																i,
																props.values
																	.FirmVehicle
																	.VehicleType,
																props
															)
													)}
												</View>
												{/*<FormikTextInput
													label="MFG Year"
													name="vehicle.MFGYear"
													type="name"
													formikprops={props}
													keyboardType={"number-pad"}
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
												</RowArea>*/}
												<FormikTextInput
													label="Location"
													name="FirmVehicle.Location"
													type="name"
													formikprops={props}
												/>
												<FormikTextInput
													label="Number of Vechile Required"
													name="FirmVehicle.VehicleCount"
													type="name"
													formikprops={props}
													keyboardType={"number-pad"}
												/>
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
	saveLeaseFirmVehiclePreference
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(PostRequirementsFirm);
