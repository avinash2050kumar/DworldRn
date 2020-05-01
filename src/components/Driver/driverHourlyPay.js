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
import { driverGetHourlyPay, saveDriverHourlyInfo } from "../../actions";
import { Formik } from "formik";
import FormikTextInput from "../common/FormikTextInput";
import styles from "../../theme/styles";
import { withNextInputAutoFocusForm } from "react-native-formik";
import * as yup from "yup";import AntDesign from "react-native-vector-icons/dist/AntDesign";
import Store from "../../store";
import Selector from "react-native-easy-select";
import NavigationService from "../../config/NavigationService";

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

class DriverHourlyPay extends Component {
	static navigationOptions = ({ navigation }) => {
		return {
			title: "Pay Scale"
		};
	};

	state = {
		hourlyPay: {},
		isCardVisible: false,
		dummy: {
			ClientId: Store().store.getState().auth.ClientId,
			HourlyPayId: 0,
			VehicleType: {Id: 1, Name: "HatchBack"},
			HourlyPrice: 0,
			ExtraHours: 0,
			NightHours: 0,
			NightExtraHours: 0
		}
	};

	static getDerivedStateFromProps(props, state) {
		const isEmpty = Object.keys(state.hourlyPay).length === 0;
		if (isEmpty) {
			return {
				hourlyPay: props.hourlyPay,
			};
		}

		// Return null if the state hasn't changed
		return null;
	}

	componentDidMount() {
		this.props.driverGetHourlyPay();
	}

	isEmpty = obj => {
		return Object.keys(obj).length === 0;
	};

	_Submit = async (values, actions) => {
		setTimeout(() => actions.setSubmitting(false), 3000);

		const res = await this.props.saveDriverHourlyInfo({ Hourly: values.HourlyPay });
		if(res.status==200)
		{this.props.driverGetHourlyPay();
		NavigationService.navigate('VehiclePreferenceScreen')}
	};

	renderDriverHourlyPay = (item, index) => {
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
						<Text>Hourly Pricing :</Text>
						<Text>Rs. {item.HourlyPrice}</Text>
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
						<Text>Night CHarges (Hour)</Text>
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
						<Text>Night Charges (Extr Hour)</Text>
						<Text>{item.NightExtraHours}</Text>
					</View>
				</View>
			</Card>
		);
	};

	render() {
		return (
			<View>
				{!this.isEmpty(this.state.hourlyPay) &&
				this.state.isCardVisible ? (
					<KeyboardAvoidingView behavior="padding" enabled>
						<Formik
							initialValues={this.state.hourlyPay}
							onSubmit={(values, actions) => {
								this._Submit(values, actions);
							}}
							validationSchema={validationSchema}
						>
							{props => (
								<Form>
									{this.state.isCardVisible&&props
										.values
										.HourlyPay.length===0&&props.setFieldValue(
										"HourlyPay",
										[
											...props
												.values
												.HourlyPay,
											this.state
												.dummy
										]
									)}
									{props.values.HourlyPay.map(
										(hourly, index) => (
											<View
												style={{
													marginBottom: 15,
													borderBottomColor:
														theme.secondary,
													borderBottomWidth:
														props.values.HourlyPay
															.length -
															1 ===
														index
															? 0
															: 1
												}}
											><Selector
												theme="dropdown" // Default: 'simple'
												items={this.state.hourlyPay
													.VehicleList
													? this.state.hourlyPay.VehicleList.map(
														vehicle => {
															return {
																...vehicle,
																value:
																vehicle.Name
															};
														}
													)
													: []}

												valueKey="value"
												labelKey="value"

												defaultValue={`${props.values.HourlyPay[
													index
													].VehicleType.Name}`} // Set default value
												placeholder="Shifts"

												placeholderContainerStyle={{ paddingVertical:15,marginTop:10}}
												iconStyle={{ tintColor: 'black' }}
												onChange={(value) =>{
													let i = 0
													props.values
														.VehicleList.map((val,index)=> {if(val.Name===value)i=index})
													props.setFieldValue(
														`HourlyPay[${index}].VehicleType`,
														props.values
															.VehicleList[i]
													)
												}}
											/>
												<FormikTextInput
													label="Hourly Pricing"
													name={`HourlyPay[${index}].HourlyPrice`}
													type="name"
													defaultValue={
														props.values.HourlyPay[
															index
														].HourlyPrice + ""
													}
													formikprops={props}
													keyboardType={"number-pad"}
												/>
												<FormikTextInput
													label="Extra Hours Time"
													name={`HourlyPay[${index}].ExtraHours`}
													type="name"
													defaultValue={
														props.values.HourlyPay[
															index
														].ExtraHours + ""
													}
													formikprops={props}
													keyboardType={"number-pad"}
												/>
												<FormikTextInput
													label="Night Charges (Hour)"
													name={`HourlyPay[${index}].NightHours`}
													type="name"
													defaultValue={
														props.values.HourlyPay[
															index
														].NightHours + ""
													}
													formikprops={props}
													keyboardType={"number-pad"}
												/>
												<FormikTextInput
													label="Night Charges (Extra Hour)"
													name={`HourlyPay[${index}].NightExtraHours`}
													type="name"
													defaultValue={
														props.values.HourlyPay[
															index
														].NightExtraHours + ""
													}
													formikprops={props}
													keyboardType={"number-pad"}
												/>
												{props.values.HourlyPay.length -
													1 ===
													index && (
													<TouchableOpacity
														onPress={() =>
															props.setFieldValue(
																"HourlyPay",
																[
																	...props
																		.values
																		.HourlyPay,
																	this.state
																		.dummy
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
							data={this.state.hourlyPay.HourlyPay}
							renderItem={({ item, index }) =>
								this.renderDriverHourlyPay(item, index)
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

const mapStateToProps = state => ({ hourlyPay: state.main.payScale.hourlyPay , VehicleList: state.main.payScale.VehicleList});

const mapDispatchToProps = { driverGetHourlyPay, saveDriverHourlyInfo };

export default connect(mapStateToProps, mapDispatchToProps)(DriverHourlyPay);
