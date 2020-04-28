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
import { driverGetKMPay, saveDriverKMInfo } from "../../actions";
import { Formik } from "formik";
import FormikTextInput from "../common/FormikTextInput";
import styles from "../../theme/styles";
import { withNextInputAutoFocusForm } from "react-native-formik";
import * as yup from "yup";import AntDesign from "react-native-vector-icons/dist/AntDesign";
import Store from "../../store";
import Selector from "react-native-easy-select";

const validationSchema = yup.object().shape({
	KMPay: yup.array().of(
		yup.object().shape({
			DayCharge: yup.string().required("DayCharge is required"),
			//ExtraHours: yup.string().required("Extra Hours Time is required"),
			NightCharge: yup
				.string()
				.required("Night Charges is required"),
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

class DriverKMPay extends Component {
	static navigationOptions = ({ navigation }) => {
		return {
			title: "Pay Scale"
		};
	};

	state = {
		kmPay: {},
		isCardVisible: false,
		dummy: {
			ClientId: Store().store.getState().auth.ClientId,
			KMPayId: 0,
			VehicleType: {Id: 1, Name: "HatchBack"},
			DayCharge: 0,
			NightCharge: 0
		}
	};

	static getDerivedStateFromProps(props, state) {
		const isEmpty = Object.keys(state.kmPay).length === 0;
		if (isEmpty) {
			return {
				kmPay: props.kmPay
			};
		}

		// Return null if the state hasn't changed
		return null;
	}

	componentDidMount() {
		this.props.driverGetKMPay();
	}

	isEmpty = obj => {
		return Object.keys(obj).length === 0;
	};

	_Submit = (values, actions) => {
		setTimeout(() => actions.setSubmitting(false), 3000);
		this.props.saveDriverKMInfo({ KM: values.KMPay });
	};

	renderDriverKMPay = (item, index) => {
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
						<Text>DayPricing :</Text>
						<Text>Rs. {item.DayCharge}</Text>
					</View>

					<View
						style={[
							styles.flex_row,
							{
								justifyContent: "space-between"
							}
						]}
					>
						<Text>Night Price </Text>
						<Text>Rs {item.NightCharge}</Text>
					</View>
				</View>
			</Card>
		);
	};

	render() {
		return (
			<View>
				{!this.isEmpty(this.state.kmPay) && this.state.isCardVisible ? (
					<KeyboardAvoidingView behavior="padding" enabled>
						<Formik
							initialValues={this.state.kmPay}
							onSubmit={(values, actions) => {
								this._Submit(values, actions);
							}}
							validationSchema={validationSchema}
						>
							{props => (
								<Form>{this.state.isCardVisible&&props.values.KMPay.length===0&&props.setFieldValue(
									"KMPay",
									[
										...props.values
											.KMPay,
										this.state.dummy
									]
								)}
									{props.values.KMPay.map((km, index) => (
										<View
											style={{
												marginBottom: 15,
												borderBottomColor:
													theme.secondary,
												borderBottomWidth:
													props.values.KMPay.length -
														1 ===
													index
														? 0
														: 1
											}}
										>
											<Selector
												theme="dropdown" // Default: 'simple'
												items={this.state.kmPay.VehicleList
													? this.state.kmPay.VehicleList.map(
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

												defaultValue={`${props.values.KMPay[index]
													.VehicleType.Name}`} // Set default value
												placeholder="Shifts"

												placeholderContainerStyle={{ paddingVertical:15,marginTop:10}}
												iconStyle={{ tintColor: 'black' }}
												onChange={(value) =>{
													let i = 0
													props.values
														.VehicleList.map((val,index)=> {if(val.Name===value)i=index})
													props.setFieldValue(
														`KMPay[${index}].VehicleType`,
														props.values
															.VehicleList[i]
													)
												}}
											/>
											<FormikTextInput
												label="Day Pricing"
												name={`KMPay[${index}].DayCharge`}
												type="name"
												defaultValue={
													props.values.KMPay[index]
														.DayCharge + ""
												}
												formikprops={props}
												keyboardType={"number-pad"}
											/>

											<FormikTextInput
												label="Night Price "
												name={`KMPay[${index}].NightCharge`}
												type="name"
												defaultValue={
													props.values.KMPay[index]
														.NightCharge + ""
												}
												formikprops={props}
												keyboardType={"number-pad"}
											/>

											{props.values.KMPay.length - 1 ===
												index && (
												<TouchableOpacity
													onPress={() => {
														props.setFieldValue(
															"KMPay",
															[
																...props.values
																	.KMPay,
																this.state.dummy
															]
														);
													}}
												>
													<StyledText
														style={{
															color:
																theme.primary,
															fontSize: 14,
															marginBottom: 15
														}}
													>
														+ Add more Description{" "}
													</StyledText>
												</TouchableOpacity>
											)}
										</View>
									))}

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
							data={this.state.kmPay.KMPay}
							renderItem={({ item, index }) =>
								this.renderDriverKMPay(item, index)
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

const mapStateToProps = state => ({ kmPay: state.main.payScale.kmPay });

const mapDispatchToProps = { driverGetKMPay, saveDriverKMInfo };

export default connect(mapStateToProps, mapDispatchToProps)(DriverKMPay);
