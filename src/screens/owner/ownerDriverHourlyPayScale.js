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
// import { Dropdown } from "react-native-material-dropdown";
import FormikTextInput from "../../components/common/FormikTextInput";
import { Card, Screen, StyledText } from "../../theme/styledComponent";
import Button from "../../components/common/Buttons";
import {
	postOwnerDriverJob,
	resetOwner,
	saveOwnerDriverPayScale,
	setAppMessage,
	postOwnerVehicleFirm
} from "../../actions";
import { withNextInputAutoFocusForm } from "react-native-formik";
import NavigationService from "../../config/NavigationService";

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

class OwnerDriverHourlyPayScale extends Component {
	static navigationOptions = ({ navigation }) => {
		return {
			title: "Work Schedule"
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

	isEmpty = obj => {
		return Object.keys(obj).length === 0;
	};

	_Submit = async (values, actions, adsIndex) => {
		setTimeout(() => actions.setSubmitting(false), 3000);
		this.props.saveOwnerDriverPayScale(values);
		const {
			isVehicleDetailFilled,
			isDriverQualificationFilled,
			isWorkScheduleFilled,
			isPayScaleFilled
		} = this.props.postAdsDriver;
		let shouldPost = false;

		if (adsIndex === 0) {
			if (
				isVehicleDetailFilled &&
				isDriverQualificationFilled &&
				isWorkScheduleFilled &&
				isPayScaleFilled
			)
				shouldPost = true;
		} else if (adsIndex === 1) {
			if (isVehicleDetailFilled && isPayScaleFilled) shouldPost = true;
		}

		if (shouldPost === false) {
			this.props.setAppMessage(
				"Error",
				"Please fill other detail to continue",
				"danger"
			);
		}

		if (shouldPost) {
			const res =
				adsIndex === 0
					? await this.props.postOwnerDriverJob()
					: await this.props.postOwnerVehicleFirm();
			this.props.resetOwner();
			if (res === 200) NavigationService.navigate("Home");
		}
	};

	render() {
		return (
			<ScrollView>
				<View>
					{!this.isEmpty(this.props.postAdsDriverDummy) && (
						<KeyboardAvoidingView behavior="padding" enabled>
							<Formik
								initialValues={this.state.postAdsDriver}
								onSubmit={(values, actions) => {
									this._Submit(
										values,
										actions,
										this.props.adsIndex
									);
								}}
							>
								{props => (
									<Form>
										<View>
											{console.log("value", props.values)}
											{/*<Dropdown
												onChangeText={(
													value,
													i,
													data
												) =>
													props.setFieldValue(
														`price.VehicleType`,
														Object.assign({
															Id: this.props
																.vehicleCategories[
																i
															].VehicleCategoryId,
															Name: this.props
																.vehicleCategories[
																i
															]
																.VehicleCategoryName
														})
													)
												}
												label="Driver Description"
												data={
													this.props.vehicleCategories
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
													props.values.price
														.VehicleType.Name
												}
											/>*/}
											<FormikTextInput
												label="Hourly Pricing"
												name="price.price"
												type="name"
												formikprops={props}
												keyboardType={"number-pad"}
											/>
											<FormikTextInput
												label="Extra Hours"
												name="price.Extra"
												type="name"
												formikprops={props}
												keyboardType={"number-pad"}
											/>
											<FormikTextInput
												label="Night Charges (Hour)"
												name="price.Night"
												type="name"
												formikprops={props}
												keyboardType={"number-pad"}
											/>
											<FormikTextInput
												label="Night Charges (Extra Hour)"
												name="price.NightExtra"
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
												style={{
													marginTop: 20
												}}
											/>
										) : (
											<Button
												onPress={props.handleSubmit}
												label="Save & Next"
												color="secondary"
												style={{
													marginTop: 20
												}}
											/>
										)}
									</Form>
								)}
							</Formik>
						</KeyboardAvoidingView>
					)}
				</View>
			</ScrollView>
		);
	}
}

const mapStateToProps = state => ({
	postAdsDriver: state.main.owner.postAdsDriver,
	postAdsDriverDummy: state.main.owner.postAdsDriverDummy,
	vehicleCategories: state.main.owner.postAdsDriverDummy.vehicleCategories,
	ShiftType: state.main.owner.postAdsDriverDummy.ShiftType,
	JobType: state.main.owner.postAdsDriverDummy.JobType,
	adsIndex: state.main.owner.adsIndex
});

const mapDispatchToProps = {
	saveOwnerDriverPayScale,
	setAppMessage,
	resetOwner,
	postOwnerDriverJob,
	postOwnerVehicleFirm
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(OwnerDriverHourlyPayScale);
