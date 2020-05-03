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
	postOwnerVehicleFirm,
	resetOwner,
	saveOwnerDriverPayScale,
	setAppMessage
} from "../../actions";
import { withNextInputAutoFocusForm } from "react-native-formik";
import NavigationService from "../../config/NavigationService";
import Selector from "react-native-easy-select";
import * as yup from "yup";

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
	price:yup.object().shape({
		price: yup.string().required("Monthly Price is required"),
		Night: yup.string().required("Night Price is required"),
		Extra: yup.string().required("Extra Hour is required"),
	})

});

class OwnerDriverMonthlyPayScale extends Component {
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
									this._Submit(values, actions,this.props.adsIndex);
								}}
								validationSchema={validationSchema}
							>
								{props => (
									<Form>
										{console.log('ohol',props.values)}
										<View>
											<Selector
												theme="dropdown" // Default: 'simple'
												items={	this.props.VehicleType
													? this.props.VehicleType.map(
														vehicle => {
															return {
																...vehicle,
																value:
																vehicle.Name
															};
														}
													)
													: []}

												// Specify key
												valueKey="value" // Default: 'value'
												labelKey="value" // Default: 'label'

												defaultValue={`${	props.values.price
													.VehicleType.Name}`} // Set default value
												placeholder="Driver Description"

												placeholderContainerStyle={{ paddingVertical:15,marginTop:10}}
												iconStyle={{ tintColor: 'black' }}
												onChange={(value) =>{
													let i = 0
													this.props
														.VehicleType.map((val,index)=> {if(val.Name===value)i=index})
													props.setFieldValue(
														`price.VehicleType`,
														Object.assign({
															Id: this.props
																.VehicleType[
																i
																].Id,
															Name: this.props
																.VehicleType[
																i
																]
																.Name
														})
													)

												}}
											/>
											{/*<Selector
												theme="dropdown" // Default: 'simple'
												items={	this.props.vehicleCategories
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

												defaultValue={`${	props.values.price
													.VehicleType.Name}`} // Set default value
												placeholder="Driver Description"

												placeholderContainerStyle={{ paddingVertical:15,marginTop:10}}
												iconStyle={{ tintColor: 'black' }}
												onChange={(value) =>{
													let i = 0
													this.props
														.vehicleCategories.map((val,index)=> {if(val.VehicleCategoryName===value)i=index})
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

												}}
											/>*/}
											{console.log('weel',props.values)}
											<FormikTextInput
												label="Monthly Pricing"
												name="price.price"
												type="name"
												formikprops={props}
												keyboardType={"number-pad"}
											/>
											<FormikTextInput
												label="Holiday (in days)"
												name="price.holiday"
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
	VehicleType: state.main.owner.postAdsDriverDummy.VehicleType,
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
)(OwnerDriverMonthlyPayScale);
