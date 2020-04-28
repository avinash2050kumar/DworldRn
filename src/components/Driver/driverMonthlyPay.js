import React, { Component } from "react";
import {
	Image,
	StatusBar,
	View,
	Text,
	ScrollView,
	FlatList,
	TouchableOpacity,
	KeyboardAvoidingView
} from "react-native";
import { connect } from "react-redux";
import styled from "styled-components";
import theme from "../../theme/lightTheme";
import { Screen, StyledText, StyledTitle } from "../../theme/styledComponent";
// import { Dropdown } from "react-native-material-dropdown";
import update from "immutability-helper";
import Button from "../common/Buttons";
import { driverGetMonthlyPay, saveDriverMonthlyInfo } from "../../actions";
import { Formik } from "formik";
import FormikTextInput from "../common/FormikTextInput";
import styles from "../../theme/styles";
import { withNextInputAutoFocusForm } from "react-native-formik";
import * as yup from "yup";import AntDesign from "react-native-vector-icons/dist/AntDesign";
import Store from "../../store";
import Selector from "react-native-easy-select";
import NavigationService from "../../config/NavigationService";

const validationSchema = yup.object().shape({
	MonthlyPay: yup.array().of(
		yup.object().shape({
			MonthlyCharge: yup.string().required("MonthlyCharge is required"),
			ExtraHours: yup.string().required("Extra Hours Time is required"),
			NightHours: yup
				.string()
				.required("Night Charges (Hour) is required"),
			/*NightExtraHours: yup
				.string()
				.required("Night Charges (Extra Hour) is required")*/
		})
	)
});

const Card = styled.View`
	border-radius: 10px;
	margin: 10px 0px;
	background-color: #f1f3f6;
`;

const Form = withNextInputAutoFocusForm(View);

class DriverMonthlyPay extends Component {
	static navigationOptions = ({ navigation }) => {
		return {
			title: "Pay Scale"
		};
	};

	state = {
		monthlyPay: {},
		isCardVisible: false,

		dummy: {
			ClientId: Store().store.getState().auth.ClientId,
			MonthlyPayId: 0,
			VehicleType: {Id: 1, Name: "HatchBack"},
			MonthlyCharge: 0,
			Holiday: 1,
			ExtraHours: 0,
			NightHours: 0
		}
	};

	static getDerivedStateFromProps(props, state) {
		const isEmpty = Object.keys(state.monthlyPay).length === 0;
		if (isEmpty) {
			return {
				monthlyPay: props.monthlyPay
			};
		}

		// Return null if the state hasn't changed
		return null;
	}

	componentDidMount() {
		this.props.driverGetMonthlyPay();
	}

	isEmpty = obj => {
		return Object.keys(obj).length === 0;
	};

	_Submit = async (values, actions) => {
		setTimeout(() => actions.setSubmitting(false), 3000);

		const res = await this.props.saveDriverMonthlyInfo({ monthly: values.MonthlyPay });
		if(res.status==200)
			NavigationService.navigate('VehiclePreferenceScreen')
	};

	renderDriverMonthlyPay = (item, index) => {
		return (
			<Card style={{ marginRight: 5, marginLeft: 5, padding: 0 }}>
				<View
					style={[
						styles.flex_row,
						{
							justifyContent: "space-between",
							backgroundColor: "#E7F3FD",
							padding: 12,
							borderTopLeftRadius: 10,
							borderTopRightRadius: 10
						}
					]}
				>
					<Text>Drive Description </Text>
					<View style={[styles.flex_row]}>
						<TouchableOpacity
							onPress={() =>
								this.setState({ isCardVisible: true })
							}
						>
							<AntDesign
								name={"edit"}
								size={18}
								color={"#555"}
								style={{ marginRight: 5, marginLeft: 10 }}
							/>
						</TouchableOpacity>
						<TouchableOpacity>
							<AntDesign
								name={"delete"}
								size={18}
								color={"#FA6400"}
								style={{ marginRight: 5, marginLeft: 10 }}
							/>
						</TouchableOpacity>
					</View>
				</View>
				<View style={{ padding: 12, backgroundColor: "#F1F3F6" }}>
					<View
						style={[
							styles.flex_row,
							{
								justifyContent: "space-between"
							}
						]}
					>
						<Text>Car Type</Text>
						<Text>{item.VehicleType.Name}</Text>
					</View>
					<View
						style={[
							styles.flex_row,
							{
								justifyContent: "space-between"
							}
						]}
					>
						<Text>Monthly Pricing :</Text>
						<Text>Rs. {item.MonthlyCharge}</Text>
					</View>
					<View
						style={[
							styles.flex_row,
							{
								justifyContent: "space-between"
							}
						]}
					>
						<Text>Extra Hours Time :</Text>
						<Text>Rs {item.ExtraHours}</Text>
					</View>
					<View
						style={[
							styles.flex_row,
							{
								justifyContent: "space-between"
							}
						]}
					>
						<Text>Night Charges (Extra Hour)</Text>
						<Text>Rs {item.NightHours}</Text>
					</View>
					<View
						style={[
							styles.flex_row,
							{
								justifyContent: "space-between"
							}
						]}
					>
						<Text>Holidays</Text>
						<Text>{item.Holiday}</Text>
					</View>
				</View>
			</Card>
		);
	};

	render() {
		return (
			<View>
				{!this.isEmpty(this.state.monthlyPay) &&
				this.state.isCardVisible ? (
					<KeyboardAvoidingView behavior="padding" enabled>
						<Formik
							initialValues={this.state.monthlyPay}
							onSubmit={(values, actions) => {
								this._Submit(values, actions);
							}}
							validationSchema={validationSchema}
						>
							{props => (
								<Form>{this.state.isCardVisible&&props
									.values
									.MonthlyPay.length===0&&props.setFieldValue(
									"MonthlyPay",
									[
										...props
											.values
											.MonthlyPay,
										Object.assign(
											{},
											this
												.state
												.dummy,
											{
												MonthlyPayId: 0
											}
										)
									]
								)}
									{props.values.MonthlyPay.map(
										(weekly, index) => (
											<View
												style={{
													marginBottom: 15,
													borderBottomColor:
														theme.secondary,
													borderBottomWidth:
														props.values.MonthlyPay
															.length -
															1 ===
														index
															? 0
															: 1
												}}
											><Selector
												theme="dropdown" // Default: 'simple'
												items={this.state.monthlyPay
													.VehicleList
													? this.state.monthlyPay.VehicleList.map(
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

												defaultValue={`${props.values.MonthlyPay[
													index
													].VehicleType.Name}`} // Set default value
												placeholder="Driver Description"

												placeholderContainerStyle={{ paddingVertical:15,marginTop:10}}
												iconStyle={{ tintColor: 'black' }}
												onChange={(value) =>{
													let i = 0
													props.values
														.VehicleList.map((val,index)=> {if(val.Name===value)i=index})
													props.setFieldValue(
														`MonthlyPay[${index}].VehicleType`,
														props.values
															.VehicleList[i]
													)
												}}
											/>

												{console.log('value', props.values)}

												<FormikTextInput
													label="Monthly Pricing"
													name={`MonthlyPay[${index}].MonthlyCharge`}
													type="name"
													defaultValue={
														props.values.MonthlyPay[
															index
														].MonthlyCharge + ""
													}
													formikprops={props}
													keyboardType={"number-pad"}
												/>
												<Selector
													theme="dropdown" // Default: 'simple'
													items={this.state.monthlyPay
														.Holiday
														? this.state.monthlyPay.Holiday.map(
															holiday => {
																return {
																	...holiday,
																	value:
																	holiday.Name
																};
															}
														)
														: []}

													// Specify key
													valueKey="value" // Default: 'value'
													labelKey="value" // Default: 'label'

													defaultValue={`${	props.values.MonthlyPay[
														index
														].Holiday + " Days"}`} // Set default value
													placeholder="Holidays"

													placeholderContainerStyle={{ paddingVertical:15,marginTop:10}}
													iconStyle={{ tintColor: 'black' }}
													onChange={(value) =>{
														let i = 0
														props.values
															.Holiday.map((val,index)=> {if(val.Name===value)i=index})
														props.setFieldValue(
															`MonthlyPay[${index}].Holiday`,
															props.values
																.Holiday[i].No
														)
													}}
												/>
												<FormikTextInput
													label="Extra Hours"
													name={`MonthlyPay[${index}].ExtraHours`}
													type="name"
													defaultValue={
														props.values.MonthlyPay[
															index
														].ExtraHours + ""
													}
													formikprops={props}
													keyboardType={"number-pad"}
												/>
												<FormikTextInput
													label="Night Charges (Hour)"
													name={`MonthlyPay[${index}].NightHours`}
													type="name"
													defaultValue={
														props.values.MonthlyPay[
															index
														].NightHours + ""
													}
													formikprops={props}
													keyboardType={"number-pad"}
												/>

												{props.values.MonthlyPay
													.length -
													1 ===
													index && (
													<TouchableOpacity
														onPress={() =>
															props.setFieldValue(
																"MonthlyPay",
																[
																	...props
																		.values
																		.MonthlyPay,
																	Object.assign(
																		{},
																		this
																			.state
																			.dummy,
																		{
																			MonthlyPayId: 0
																		}
																	)
																]
															)
														}
													>
														<StyledText
															style={{
																color:
																	theme.primary,
																fontSize: 14,
																marginBottom: 15
															}}
														>
															+ Add more
															Description{" "}
														</StyledText>
													</TouchableOpacity>
												)}
											</View>
										)
									)}

									{props.isSubmitting ? (
										<Button
											onPress={props.handleSubmit}
											label="Please Wait"
											color="secondary"
											disabled={true}
										/>
									) : (
										<Button
											onPress={props.handleSubmit}
											label="Save & Next"
											color="secondary"
										/>
									)}
								</Form>
							)}
						</Formik>
					</KeyboardAvoidingView>
				) : (
					<View>
						<FlatList
							data={this.state.monthlyPay.MonthlyPay}
							renderItem={({ item, index }) =>
								this.renderDriverMonthlyPay(item, index)
							}
							keyExtractor={(item, index) => index}
							showsHorizontalScrollIndicator={false}
							showsVerticalScrollIndicator={false}
						/>
						<Button
							onPress={() =>
								this.setState({ isCardVisible: true })
							}
							label="Add more"
							color="secondary"
						/>
					</View>
				)}
			</View>
		);
	}
}

const mapStateToProps = state => ({
	monthlyPay: state.main.payScale.monthlyPay
});

const mapDispatchToProps = { driverGetMonthlyPay, saveDriverMonthlyInfo };

export default connect(mapStateToProps, mapDispatchToProps)(DriverMonthlyPay);
