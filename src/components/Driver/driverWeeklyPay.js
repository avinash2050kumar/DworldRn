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
import { Dropdown } from "react-native-material-dropdown";
import update from "immutability-helper";
import Button from "../common/Buttons";
import { driverGetWeeklyPay, saveDriverWeeklyInfo } from "../../actions";
import { Formik } from "formik";
import FormikTextInput from "../common/FormikTextInput";
import styles from "../../theme/styles";
import { withNextInputAutoFocusForm } from "react-native-formik";
import * as yup from "yup";import AntDesign from "react-native-vector-icons/dist/AntDesign";
import Store from "../../store";

const validationSchema = yup.object().shape({
	HourlyPay: yup.array().of(
		yup.object().shape({
			HourlyPrice: yup.string().required("Hourly Pricing is required"),
			ExtraHours: yup.string().required("Extra Hours Time is required"),
			NightHours: yup
				.string()
				.required("Night Charges (Hour) is required"),
			NightExtraHours: yup
				.string()
				.required("Night Charges (Extra Hour) is required")
		})
	)
});

const Card = styled.View`
	border-radius: 10px;
	margin: 10px 0px;
	background-color: #f1f3f6;
`;

const Form = withNextInputAutoFocusForm(View);

class DriverWeeklyPay extends Component {
	static navigationOptions = ({ navigation }) => {
		return {
			title: "Pay Scale"
		};
	};

	state = {
		weeklyPay: {},
		isCardVisible: false,

		dummy: {
			ClientId: Store().store.getState().auth.ClientId,
			WeeklyPayId: 0,
			VehicleType: {
				Id: 0,
				Name: "Choose"
			},
			WeeklyPrice: 0,
			Holiday: 1,
			ExtraHours: 0,
			NightHours: 0,
			NightExtraHours: 0
		}
	};

	static getDerivedStateFromProps(props, state) {
		const isEmpty = Object.keys(state.weeklyPay).length === 0;
		if (isEmpty) {
			return {
				weeklyPay: props.weeklyPay
			};
		}

		// Return null if the state hasn't changed
		return null;
	}

	componentDidMount() {
		this.props.driverGetWeeklyPay();
	}

	isEmpty = obj => {
		return Object.keys(obj).length === 0;
	};

	_Submit = (values, actions) => {
		setTimeout(() => actions.setSubmitting(false), 3000);

		this.props.saveDriverWeeklyInfo({ weekly: values.WeeklyPay });
	};

	renderDriverWeeklyPay = (item, index) => {
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
						<Text>Weekly Pricing : :</Text>
						<Text>Rs. {item.WeeklyPrice}</Text>
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
						<Text>Night Charges (Extr Hour)</Text>
						<Text>Rs {item.NightExtraHours}</Text>
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
				{!this.isEmpty(this.state.weeklyPay) &&
				this.state.isCardVisible ? (
					<KeyboardAvoidingView behavior="padding" enabled>
						<Formik
							initialValues={this.state.weeklyPay}
							onSubmit={(values, actions) => {
								this._Submit(values, actions);
							}}
							validationSchema={validationSchema}
						>
							{props => (
								<Form>
									{props.values.WeeklyPay.map(
										(weekly, index) => (
											<View
												style={{
													marginBottom: 15,
													borderBottomColor:
														theme.secondary,
													borderBottomWidth:
														props.values.WeeklyPay
															.length -
															1 ===
														index
															? 0
															: 1
												}}
											>
												<Dropdown
													onChangeText={(
														value,
														i,
														data
													) =>
														props.setFieldValue(
															`WeeklyPay[${index}].VehicleType`,
															props.values
																.VehicleList[i]
														)
													}
													label="Driver Description"
													data={
														this.state.weeklyPay
															.VehicleList
															? this.state.weeklyPay.VehicleList.map(
																	vehicle => {
																		return {
																			...vehicle,
																			value:
																				vehicle.Name
																		};
																	}
															  )
															: []
													}
													value={
														props.values.WeeklyPay[
															index
														].VehicleType.Name
													}
												/>

												<FormikTextInput
													label="Weekly Pricing"
													name={`WeeklyPay[${index}].WeeklyPrice`}
													type="name"
													defaultValue={
														props.values.WeeklyPay[
															index
														].WeeklyPrice + ""
													}
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
															`WeeklyPay[${index}].Holiday`,
															props.values
																.Holiday[i].No
														)
													}
													label="Holidays"
													data={
														this.state.weeklyPay
															.Holiday
															? this.state.weeklyPay.Holiday.map(
																	holiday => {
																		return {
																			...holiday,
																			value:
																				holiday.Name
																		};
																	}
															  )
															: []
													}
													value={
														props.values.WeeklyPay[
															index
														].Holiday + " Days"
													}
												/>
												<FormikTextInput
													label="Extra Hours"
													name={`WeeklyPay[${index}].ExtraHours`}
													type="name"
													defaultValue={
														props.values.WeeklyPay[
															index
														].ExtraHours + ""
													}
													formikprops={props}
													keyboardType={"number-pad"}
												/>
												<FormikTextInput
													label="Night Charges (Extra Hour)"
													name={`WeeklyPay[${index}].NightExtraHours`}
													type="name"
													defaultValue={
														props.values.WeeklyPay[
															index
														].NightExtraHours + ""
													}
													formikprops={props}
													keyboardType={"number-pad"}
												/>

												{props.values.WeeklyPay.length -
													1 ===
													index && (
													<TouchableOpacity
														onPress={() =>
															props.setFieldValue(
																"WeeklyPay",
																[
																	...props
																		.values
																		.WeeklyPay,
																	Object.assign(
																		{},
																		this
																			.state
																			.dummy,
																		{
																			WeeklyPayId: 0
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
							data={this.state.weeklyPay.WeeklyPay}
							renderItem={({ item, index }) =>
								this.renderDriverWeeklyPay(item, index)
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

const mapStateToProps = state => ({ weeklyPay: state.main.payScale.weeklyPay });

const mapDispatchToProps = { driverGetWeeklyPay, saveDriverWeeklyInfo };

export default connect(mapStateToProps, mapDispatchToProps)(DriverWeeklyPay);
