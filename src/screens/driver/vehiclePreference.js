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
// import { Dropdown } from "react-native-material-dropdown";
import FormikTextInput from "../../components/common/FormikTextInput";
import { Card, Screen, StyledText } from "../../theme/styledComponent";
import Button from "../../components/common/Buttons";
import {
	driverGetVehiclePreferences,
	driverSaveVehiclePreferences
} from "../../actions";
import { withNextInputAutoFocusForm } from "react-native-formik";
import update from "immutability-helper";
import Selector from "react-native-easy-select";
import * as yup from "yup";
import NavigationService from "../../config/NavigationService";

const Form = withNextInputAutoFocusForm(View);

const CheckBox = styled.TouchableOpacity`
	padding: 10px;
	display: flex;
	flex-direction: row;
	align-items: center;
`;

const validationSchema = yup.object().shape({
			vehicleCategory: yup.object().shape({
				VehicleCategoryName: yup.string().required("Vehicle Category is required")

		})
})

class VehiclePreference extends Component {
	static navigationOptions = ({ navigation }) => {
		return {
			title: "Vehicle Preference"
		};
	};

	state = {
		vehiclePreferences: {}
	};

	static getDerivedStateFromProps(props, state) {
		const isEmpty = Object.keys(state.vehiclePreferences).length === 0;
		if (isEmpty) {
			return {
				vehiclePreferences: props.vehiclePreferences
			};
		}

		// Return null if the state hasn't changed
		return null;
	}

	componentDidMount() {
		this.props.driverGetVehiclePreferences();
	}

	isEmpty = obj => {
		return Object.keys(obj).length === 0;
	};

	_Submit = async (values, actions) => {
		setTimeout(() => actions.setSubmitting(false), 3000);

		const res = await this.props.driverSaveVehiclePreferences({
			vehicleCategory: values.vehicleCategory
		});

		if(res.status==200)
			NavigationService.navigate('Home')
	};

	render() {
		return (
			<Screen style={{ backgroundColor: theme.white }}>
				{console.log('vehicle Pref',this.state)}
				<View>
					{!this.isEmpty(this.state.vehiclePreferences) && (
						<KeyboardAvoidingView behavior="padding" enabled>
							<Formik
								initialValues={this.state.vehiclePreferences}
								onSubmit={(values, actions) => {
									this._Submit(values, actions);
								}}
								validationSchema={validationSchema}
							>
								{props => (
									<Form>
										{console.log('value',props.values)}
										<View>
											<Selector
												theme="dropdown" // Default: 'simple'
												items={this.state
													.vehiclePreferences
													.vehicleCategoryDropdown
													? this.state.vehiclePreferences.vehicleCategoryDropdown.map(
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

												defaultValue={`${props.values.vehicleCategory
													.VehicleCategoryName}`} // Set default value
												placeholder="Vehicle Category"
												placeholderStyle={{color:props.errors.vehicleCategory? props.errors.vehicleCategory.VehicleCategoryName?'red':'#444':'#444' }}
												placeholderContainerStyle={{ paddingVertical:15,marginTop:10 ,
													borderColor:props.errors.vehicleCategory? props.errors.vehicleCategory.VehicleCategoryName?'red':'#aaa':'#aaa' }}
												iconStyle={{ tintColor:props.errors.vehicleCategory? props.errors.vehicleCategory.VehicleCategoryName?'red':'black':'black' }}
												onChange={(value) =>{
													let i = 0
													props.values
														.vehicleCategoryDropdown.map((val,index)=> {if(val.VehicleCategoryName===value)i=index})
													props.setFieldValue(
														`vehicleCategory`,
														props.values
															.vehicleCategoryDropdown[
															i
															]
													)

												}}
											/>
											{props.values.vehicleCategoryDropdown.filter(dropdown=>dropdown.VehicleCategoryId===props.values.vehicleCategory.VehicleCategoryId)[0].VehicleType.map(
												(vehicle, i) => (
													<CheckBox
														onPress={() =>
															props.values.vehicleCategory.VehicleType.filter(type=>
																type.Id===vehicle.Id).length>0?
																props.setFieldValue(
																	`vehicleCategory.VehicleType`,
																	props.values.vehicleCategory.VehicleType.filter(type=>
																		type.Id!==vehicle.Id)
																):props.setFieldValue(
																	`vehicleCategory.VehicleType`,
																	[...props.values.vehicleCategory.VehicleType,vehicle]
																)

														}
													>{props.values.vehicleCategory.VehicleType.filter(type=>
														type.Id===vehicle.Id).length>0?<Ionicons
															name={
																"ios-checkbox"
															}
															size={24}
															color={
																theme.primary
															}
														/>:<Ionicons
															name={
																"ios-checkbox-outline"
															}
															size={24}
															color={
																theme.primary
															}
														/>
														}
														<Text
															style={{
																marginLeft: 10
															}}
														>
															{vehicle.Name}
														</Text>
													</CheckBox>
												)
											)}
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
		);
	}
}

const mapStateToProps = state => ({
	vehiclePreferences: state.main.vehiclePreferences
});

const mapDispatchToProps = {
	driverGetVehiclePreferences,
	driverSaveVehiclePreferences
};

export default connect(mapStateToProps, mapDispatchToProps)(VehiclePreference);
