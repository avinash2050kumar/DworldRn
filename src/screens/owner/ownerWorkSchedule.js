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
import {Card, Screen, StyledText, StyledTitle} from "../../theme/styledComponent";
import Button from "../../components/common/Buttons";
import { saveOwnerWorkSchedule } from "../../actions";
import { withNextInputAutoFocusForm } from "react-native-formik";
import update from "immutability-helper";
import RadioButton from "../../components/common/RadioButtons";
import TextInput from "react-native-web/src/exports/TextInput";
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

class OwnerDriverWorkSchedule extends Component {
	static navigationOptions = ({ navigation }) => {
		return {
			title: "Work Shifts"
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
		this.props.saveOwnerWorkSchedule(values);
		this.props.navigation.navigate("OwnerDriverPayScaleTabs");
	};

	renderCheckBox = (input, props, text, first, second) => {
		return (
			<CheckBox
				onPress={() =>
				props.setFieldValue(input, !props.values[first][second])
				}
			>
				{props.values[first][second] && (
					<Ionicons
						name={"ios-checkbox"}
						size={24}
						color={theme.primary}
					/>
				)}
				{!props.values[first][second] && (
					<Ionicons
						name={"ios-checkbox-outline"}
						size={24}
						color={theme.primary}
					/>
				)}
				<Text
					style={{
						marginLeft: 10
					}}
				>
					{text}
				</Text>
			</CheckBox>
		);
	};

	render() {
		return (
			<ScrollView>
				<Screen style={{ backgroundColor: theme.white }}>
					<View>
						<Text>
							Lorem Ipsum is simply dummy text of the printing and
							typesetting industry.s
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
													items={this.props.ShiftType
														? this.props.ShiftType.map(
															work => {
																return {
																	...work,
																	value:
																	work.Name
																};
															}
														)
														: []}

													// Specify key
													valueKey="value" // Default: 'value'
													labelKey="value" // Default: 'label'
													defaultValue={props.values.work
														.ShitType.Name.toString()}
													placeholder="Shifts"

													placeholderContainerStyle={{ paddingVertical:15,marginTop:15}}
													iconStyle={{ tintColor: 'black' }}
													onChange={(value) =>{
														let i = 0
														this.props.ShiftType.map((val,index)=> {if(val.Name===value)i=index})
														props.setFieldValue(
															`work.ShitType`,
															this.props.ShiftType[
																i
																]
														)
													}}
												/>
											</View>
											{props.values.work.PreferDays !=this.getDaysString(props) ?
											props.setFieldValue('work.PreferDays',this.getDaysString(props)):
											console.log('Propdfsgafgs',props.values.work
												.JobType.Name.toString(),props.values)}
											<View>
												<Selector
													theme="dropdown" // Default: 'simple'
													items={this.props.JobType
														? this.props.JobType.map(
															job => {
																return {
																	...job,
																	value:
																	job.Name
																};
															}
														)
														: []}

													// Specify key
													valueKey="value" // Default: 'value'
													labelKey="value" // Default: 'label'

													defaultValue={props.values.work
														.JobType.Name.toString()}
													placeholder="Job Type"

													placeholderContainerStyle={{ paddingVertical:15,marginTop:15}}
													iconStyle={{ tintColor: 'black' }}
													onChange={(value) =>{
														let i = 0
														this.props.JobType.map((val,index)=> {if(val.Name===value)i=index})
														props.setFieldValue(
															`work.JobType`,
															this.props.JobType[
																i
																]
														)
													}}
												/>
												<View>
													<StyledTitle style={{ marginTop: 20,marginBottom:10, }}>
														Custom Days
													</StyledTitle>
												{this.renderCheckBox(
													"work.IsSun",
													props,
													"Sunday",
													"work",
													"IsSun"
												)}
												{this.renderCheckBox(
													"work.IsMon",
													props,
													"Monday",
													"work",
													"IsMon"
												)}
												{this.renderCheckBox(
													"work.IsTue",
													props,
													"Tuesday",
													"work",
													"IsTue"
												)}
												{this.renderCheckBox(
													"work.ISWed",
													props,
													"Wednesday",
													"work",
													"ISWed"
												)}
												{this.renderCheckBox(
													"work.IsThu",
													props,
													"Thursday",
													"work",
													"IsThu"
												)}
												{this.renderCheckBox(
													"work.IsFri",
													props,
													"Friday",
													"work",
													"IsFri"
												)}
												{this.renderCheckBox(
													"work.IsSat",
													props,
													"Saturday",
													"work",
													"IsSat"
												)}</View>
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

	getDaysString(props) {
		const {IsFri,IsMon,IsSat,IsSun,IsThu,IsTue,	ISWed} = props.values.work
		let day ='';

		day= IsMon? day+'Mon,':day
		day= IsTue? day+'Tues,':day
		day= ISWed? day+'Wed,':day
		day= IsThu? day+'Thu,':day
		day= IsFri? day+'Fri,':day
		day= IsSat? day+'Sat,,':day
		day= IsSun? day+'Sun':day

		console.log('day',day,IsFri,IsMon,IsSat,IsSun,IsThu,IsTue,	ISWed)
		return day
	}
}

const mapStateToProps = state => ({
	postAdsDriver: state.main.owner.postAdsDriver,
	postAdsDriverDummy: state.main.owner.postAdsDriverDummy,
	ShiftType: state.main.owner.postAdsDriverDummy.ShiftType,
	JobType: state.main.owner.postAdsDriverDummy.JobType
});

const mapDispatchToProps = {
	saveOwnerWorkSchedule
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(OwnerDriverWorkSchedule);
