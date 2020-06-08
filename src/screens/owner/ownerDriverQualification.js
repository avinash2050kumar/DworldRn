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
//import { Dropdown } from "react-native-material-dropdown";
import FormikTextInput from "../../components/common/FormikTextInput";
import { Card, Screen, StyledText } from "../../theme/styledComponent";
import Button from "../../components/common/Buttons";
import { saveOwnerDriverQualification } from "../../actions";
import { withNextInputAutoFocusForm } from "react-native-formik";
import update from "immutability-helper";
import RadioButton from "../../components/common/RadioButtons";
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

class OwnerDriverQualification extends Component {
	static navigationOptions = ({ navigation }) => {
		return {
			title: "Driver Qualification"
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

	_Submit = (values, actions) => {
		setTimeout(() => actions.setSubmitting(false), 3000);
		this.props.saveOwnerDriverQualification(values);
		this.props.navigation.navigate("OwnerDriverWorkSchedule");
	};

	render() {
		return (
			<ScrollView>
				<Screen style={{ backgroundColor: theme.white }}>
					<View>
						<Text>
							Enter your preferred experience for your driver
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
												<Selector
													theme="dropdown" // Default: 'simple'
													items={	this.props.LicenseType
														? this.props.LicenseType.map(
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

													defaultValue={`${props.values.DL
														.LicenseType.Name}`} // Set default value
													placeholder="License Type"

													placeholderContainerStyle={{ paddingVertical:15,marginTop:10}}
													iconStyle={{ tintColor: 'black' }}
													onChange={(value) =>{
														let i = 0
														this.props
															.LicenseType.map((val,index)=> {if(val.Name===value)i=index})
														props.setFieldValue(
															`DL.LicenseType`,
															this.props
																.LicenseType[i]
														)

													}}
												/>
												<FormikTextInput
													label="Enter preferred driving experience."
													name="DL.ExperienceYear"
													type="name"
													formikprops={props}
													placeholder={
														"Please enter not of years"
													}
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
	postAdsDriver: state.main.owner.postAdsDriver,
	postAdsDriverDummy: state.main.owner.postAdsDriverDummy,
	LicenseType: state.main.owner.postAdsDriverDummy.LicenseType
});

const mapDispatchToProps = {
	saveOwnerDriverQualification
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(OwnerDriverQualification);
