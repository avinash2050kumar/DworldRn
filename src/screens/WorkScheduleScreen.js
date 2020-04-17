import React, { Component } from "react";
import {
	Image,
	StatusBar,
	View,
	Text,
	ScrollView,
	KeyboardAvoidingView
} from "react-native";
import { connect } from "react-redux";
import { getWorkSchedule, postWorkSchedule } from "../actions";
import styled from "styled-components";

import { isEmpty } from "../helper/string";
import { Screen, StyledText, StyledTitle } from "../theme/styledComponent";
import theme from "../theme/lightTheme";
import { Dropdown } from "react-native-material-dropdown";
import Ionicons from "react-native-vector-icons/dist/Ionicons";
import update from "immutability-helper";
import Button from "../components/common/Buttons";

const CheckBox = styled.TouchableOpacity`
	padding: 10px;
	display: flex;
	flex-direction: row;
	align-items: center;
`;

class WorkScheduleScreen extends Component {
	static navigationOptions = ({ navigation }) => {
		return {
			title: "Work Schedule"
		};
	};

	state = {
		workSchedules: {}
	};

	static getDerivedStateFromProps(props, state) {
		const isEmpty = Object.keys(state.workSchedules).length === 0;
		if (isEmpty) {
			return {
				workSchedules: props.workSchedules
			};
		}

		// Return null if the state hasn't changed
		return null;
	}

	componentDidMount() {
		this.props.getWorkSchedule();
	}

	isEmpty = obj => {
		return Object.keys(obj).length === 0;
	};

	_renderCheckBox = (value, title, text) => {
		return value ? (
			<CheckBox
				onPress={() =>
					this.setState(
						update(this.state, {
							workSchedules: { [title]: { $set: false } }
						})
					)
				}
			>
				<Ionicons
					name={"ios-checkbox"}
					size={24}
					color={theme.primary}
				/>
				<Text style={{ marginLeft: 10 }}>{text}</Text>
			</CheckBox>
		) : (
			<CheckBox
				onPress={() =>
					this.setState(
						update(this.state, {
							workSchedules: { [title]: { $set: true } }
						})
					)
				}
			>
				<Ionicons
					name={"ios-checkbox-outline"}
					size={24}
					color={theme.primary}
				/>
				<Text style={{ marginLeft: 10 }}>{text}</Text>
			</CheckBox>
		);
	};

	render() {
		const { workSchedules } = this.state;
		return (
			<ScrollView
				showsVerticalScrollIndicator={false}
				contentContainerStyle={{ flexGrow: 1 }}
			>
				<Screen style={{ backgroundColor: theme.white }}>
					<StatusBar barStyle="dark-content" />
					<StyledText style={{ marginBottom: 15 }}>
						Lorem Ipsum is simply dummy text of the printing and
						typesetting industry. ,
					</StyledText>
					{!this.isEmpty(workSchedules) && (
						<View>
							<Dropdown
								onChangeText={(value, index, data) =>
									this.setState(
										update(this.state, {
											workSchedules: {
												ShitType: {
													$set: this.state
														.workSchedules
														.ShitTypeData[index]
												}
											}
										})
									)
								}
								label="Shifts"
								data={
									workSchedules.ShitTypeData
										? workSchedules.ShitTypeData.map(
												shift => {
													return {
														...shift,
														value: shift.Name
													};
												}
										  )
										: []
								}
								value={workSchedules.ShitType.Name}
							/>
							<Dropdown
								onChangeText={(value, index, data) =>
									this.setState(
										update(this.state, {
											workSchedules: {
												JobType: {
													$set: this.state
														.workSchedules
														.JobTypeData[index]
												}
											}
										})
									)
								}
								label="Job Type"
								data={
									workSchedules.JobTypeData
										? workSchedules.JobTypeData.map(
												jobtype => {
													return {
														...jobtype,
														value: jobtype.Name
													};
												}
										  )
										: []
								}
								value={workSchedules.JobType.Name}
							/>
							<StyledTitle style={{ marginTop: 15 }}>
								Custom Days
							</StyledTitle>
							{this._renderCheckBox(
								workSchedules.IsSun,
								"IsSun",
								"Sunday"
							)}
							{this._renderCheckBox(
								workSchedules.IsMon,
								"IsMon",
								"Monday"
							)}
							{this._renderCheckBox(
								workSchedules.IsTue,
								"IsTue",
								"Tuesday"
							)}
							{this._renderCheckBox(
								workSchedules.IsWed,
								"IsWed",
								"Wednesday"
							)}
							{this._renderCheckBox(
								workSchedules.IsThu,
								"IsThu",
								"Thursday"
							)}
							{this._renderCheckBox(
								workSchedules.IsFri,
								"IsFri",
								"Friday"
							)}
							{this._renderCheckBox(
								workSchedules.IsSat,
								"IsSat",
								"Saturday"
							)}
							<Button
								onPress={() =>
									this.props.postWorkSchedule(
										this.state.workSchedules
									)
								}
								label="Save & Next"
								color="secondary"
								disabled={false}
							/>
						</View>
					)}
				</Screen>
			</ScrollView>
		);
	}
}

const mapStateToProps = state => ({ workSchedules: state.main.workSchedules });

const mapDispatchToProps = { getWorkSchedule, postWorkSchedule };

export default connect(mapStateToProps, mapDispatchToProps)(WorkScheduleScreen);
