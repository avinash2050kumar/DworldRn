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

const Form = withNextInputAutoFocusForm(View);

const CheckBox = styled.TouchableOpacity`
	padding: 10px;
	display: flex;
	flex-direction: row;
	align-items: center;
`;

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

	_Submit = (values, actions) => {
		setTimeout(() => actions.setSubmitting(false), 3000);

		this.props.driverSaveVehiclePreferences({
			vehicleCategory: values.vehicleCategory
		});
	};

	render() {
		return (
			<Screen style={{ backgroundColor: theme.white }}>
				<View>
					{!this.isEmpty(this.state.vehiclePreferences) && (
						<KeyboardAvoidingView behavior="padding" enabled>
							<Formik
								initialValues={this.state.vehiclePreferences}
								onSubmit={(values, actions) => {
									this._Submit(values, actions);
								}}
							>
								{props => (
									<Form>
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
												placeholder="Shifts"

												placeholderContainerStyle={{ paddingVertical:15,marginTop:10}}
												iconStyle={{ tintColor: 'black' }}
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
											{props.values.vehicleCategory.VehicleType.map(
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
