import React from "react";
import { TouchableOpacity, View, Text } from "react-native";
import styles from "../../theme/styles";
import { HorizontalLine, StyledTitle } from "../../theme/styledComponent";
import i18n from "i18n-js";
import styled from "styled-components";
import theme from "../../theme/lightTheme";
import update from "immutability-helper";
import Ionicons from "react-native-vector-icons/dist/Ionicons";
import StyledButton from "../../components/common/Buttons";

const ModelContainer = styled.View`
	border-top-left-radius: 14px;
	border-top-right-radius: 14px;
	background-color: ${props => props.theme.cardBackgroundColor};
`;

const FilterLabel = styled.Text`
	padding: 16px;
`;

const Button = styled.TouchableOpacity`
	padding: 10px;
	display: flex;
	flex-direction: row;
	align-items: center;
`;

export default class FilterAndSorting extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			filterObj: {
				sortBy: "Recent Posted",
				/*jobByTypes: [],*/
				vehicleTypes: [],
				payScale: {}
			},
			filterOptions: [
				{
					name: i18n.t("sortBy"),
					isSelected: true,
					value: "Sort By",
					options: [
						{
							name: i18n.t("recentPosted"),
							value: "Recent Posted",
							isSelected: false
						},
						{
							name: i18n.t("mostRelevant"),
							value: "Most Relevant",
							isSelected: true
						},
						{
							name: i18n.t("lastSevenDays"),
							value: "Last 7 Days",
							isSelected: false
						},
						{
							name: i18n.t("lastOneMonth"),
							value: "Last One Month",
							isSelected: false
						}
					]
				},
				/*{
					name: i18n.t("jobByTypes"),
					isSelected: false,
					value: "Job By Types",
					options: props.data
						? props.data
								.map(jobType => jobType.jobType)
								.filter(
									(value, index, self) =>
										self.indexOf(value) === index
								)
								.map(value => {
									return {
										name: value,
										value: value,
										isSelected: false
									};
								})
						: []
				},*/
				{
					name: i18n.t("vehicleTypes"),
					isSelected: false,
					value: "Vehicle Types",
					options: props.data
						? props.data
								.map(vehicle => vehicle.vehicleType)
								.filter(
									(value, index, self) =>
										self.indexOf(value) === index
								)
								.map(value => {
									return {
										name: value,
										isSelected: false
									};
								})
						: []
				},
				{
					name: i18n.t("payScale"),
					isSelected: false,
					options: []
				}
			]
		};
	}

	handleSortByRadioButton = optionIndex => {
		let currentSelectedIndex;
		this.state.filterOptions[0].options.filter((option, i) => {
			if (option.isSelected) currentSelectedIndex = i;
		});
		this.setState({
			filterObj: update(this.state.filterObj, {
				sortBy: {
					$set: this.state.filterOptions[0].options[optionIndex].value
				}
			})
		});
		return update(this.state.filterOptions, {
			[0]: {
				options: {
					[currentSelectedIndex]: { isSelected: { $set: false } },
					[optionIndex]: {
						isSelected: {
							$set: true
						}
					}
				}
			}
		});
	};

	_renderSortBy = () => {

		return (
			<View>
				{this.state.filterOptions[0].options.map(
					(option, optionIndex) =>
						option.isSelected ? (
							<Button>
								<Ionicons
									name={"ios-radio-button-on"}
									size={24}
									color={theme.secondary}
								/>
								<Text style={{ marginLeft: 10 }}>
									{option.name}
								</Text>
							</Button>
						) : (
							<Button
								onPress={() =>
									this.setState({
										filterOptions: this.handleSortByRadioButton(
											optionIndex
										)
									})
								}
							>
								<Ionicons
									name={"ios-radio-button-off"}
									size={24}
									color={theme.secondary}
								/>
								<Text style={{ marginLeft: 10 }}>
									{option.name}
								</Text>
							</Button>
						)
				)}
			</View>
		);
	};

	handleJobByTypesButton = optionIndex => {
		/*	let jobByTypes=[]
		this.state.filterOptions[1].options.filter((jobTypes,index)

		this.setState({
			filterObj: update(this.state.filterObj, {
				jobByTypes: {
					$set: this.state.filterOptions[1].options[optionIndex].value
				}
			})
		});*/
		return update(this.state.filterOptions, {
			[1]: {
				options: {
					[optionIndex]: {
						isSelected: {
							$set: !this.state.filterOptions[1].options[
								optionIndex
							].isSelected
						}
					}
				}
			}
		});
	};

	_renderJobTypes() {
		return (
			<View>
				{this.state.filterOptions[1].options.map(
					(option, optionIndex) =>
						option.isSelected ? (
							<Button
								onPress={() =>
									this.setState({
										filterOptions: this.handleJobByTypesButton(
											optionIndex
										)
									})
								}
							>
								<Ionicons
									name={"ios-checkbox"}
									size={24}
									color={theme.secondary}
								/>
								<Text style={{ marginLeft: 10 }}>
									{option.name}
								</Text>
							</Button>
						) : (
							<Button
								onPress={() =>
									this.setState({
										filterOptions: this.handleJobByTypesButton(
											optionIndex
										)
									})
								}
							>
								<Ionicons
									name={"ios-checkbox-outline"}
									size={24}
									color={theme.secondary}
								/>
								<Text style={{ marginLeft: 10 }}>
									{option.name}
								</Text>
							</Button>
						)
				)}
			</View>
		);
	}

	handleVehicleTypesButton = optionIndex => {
		return update(this.state.filterOptions, {
			[2]: {
				options: {
					[optionIndex]: {
						isSelected: {
							$set: !this.state.filterOptions[2].options[
								optionIndex
							].isSelected
						}
					}
				}
			}
		});
	};

	_renderVehicleTypes = () => {
		return (
			<View>
				{this.state.filterOptions[2].options.map(
					(option, optionIndex) =>
						option.isSelected ? (
							<Button
								onPress={() =>
									this.setState({
										filterOptions: this.handleVehicleTypesButton(
											optionIndex
										)
									})
								}
							>
								<Ionicons
									name={"ios-checkbox"}
									size={24}
									color={theme.secondary}
								/>
								<Text style={{ marginLeft: 10 }}>
									{option.name}
								</Text>
							</Button>
						) : (
							<Button
								onPress={() =>
									this.setState({
										filterOptions: this.handleVehicleTypesButton(
											optionIndex
										)
									})
								}
							>
								<Ionicons
									name={"ios-checkbox-outline"}
									size={24}
									color={theme.secondary}
								/>
								<Text style={{ marginLeft: 10 }}>
									{option.name}
								</Text>
							</Button>
						)
				)}
			</View>
		);
	};

	_handleNavBar = driverIndex => {
		let currentSelectedIndex;
		this.state.filterOptions.filter((option, i) => {
			if (option.isSelected) currentSelectedIndex = i;
		});

		driverIndex === currentSelectedIndex
			? console.log("wont change")
			: this.setState({
					filterOptions: update(this.state.filterOptions, {
						[driverIndex]: { isSelected: { $set: true } },
						[currentSelectedIndex]: { isSelected: { $set: false } }
					})
			  });
	};

	applyFilter = async () => {
		let jobByTypes = [],
			vehicleType = [];
		/*this.state.filterOptions[1].options.map(job => {
			if (job.isSelected) jobByTypes.push(job.value);
		});*/
		this.state.filterOptions[1].options.map(vehicle => {
			if (vehicle.isSelected) vehicleType.push(vehicle.name);
		});

		const filterObj = {
			...this.state.filterObj,
			/*jobByTypes: jobByTypes,*/
			vehicleTypes: vehicleType
		};
		await this.setState({ filterObj: filterObj });

		this.props.filtersAndSortingDriverData(
			this.state.filterObj,
			this.props.dataIndex
		);
		this.props.toggleModal();
	};

	render() {
		return (
			<ModelContainer>
				<View
					style={[
						styles.flex_row,
						{
							justifyContent: "space-between",
							padding: 16
						}
					]}
				>
					<StyledTitle
						style={{
							fontSize: 16
						}}
					>
						{i18n.t("sortAndFilter")}
					</StyledTitle>
					<TouchableOpacity onPress={() => this.props.toggleModal()}>
						<StyledTitle
							style={{
								color: "#ff4d39",
								padding: 5,
								fontSize: 16
							}}
						>
							X
						</StyledTitle>
					</TouchableOpacity>
				</View>
				<HorizontalLine />
				<View
					style={[
						styles.flex_row,
						{
							justifyContent: "space-between",
							alignItems: "flex-start"
						}
					]}
				>
					<View
						style={{
							width: "40%"
						}}
					>
						{this.state.filterOptions.map(
							(driverFilter, driverIndex) => (
								<TouchableOpacity
									style={{
										borderLeftColor: driverFilter.isSelected
											? theme.secondary
											: "red",
										borderLeftWidth: driverFilter.isSelected
											? 5
											: 0
									}}
									onPress={() =>
										this._handleNavBar(driverIndex)
									}
								>
									<FilterLabel>
										{driverFilter.name}
									</FilterLabel>
								</TouchableOpacity>
							)
						)}
					</View>
					<View
						style={{
							width: "60%",
							borderLeftColor: "#eee",
							borderLeftWidth: 1
						}}
					>
						{this.state.filterOptions[0].isSelected &&
							this._renderSortBy()}
						{this.state.filterOptions[1].isSelected &&
							this._renderJobTypes()}
						{this.state.filterOptions[2].isSelected &&
							this._renderVehicleTypes()}
					</View>
				</View>
				<HorizontalLine />
				<View
					style={[
						styles.flex_row,
						{ justifyContent: "space-around", padding: 8 }
					]}
				>
					<TouchableOpacity onPress={()=>{this.props.filtersAndSortingDriverData(
						{
							sortBy: "Recent Posted",
							/*jobByTypes: [],*/
							vehicleTypes: [],
							payScale: {}
						},
						this.props.dataIndex
					)
						this.props.toggleModal();}

					}>
						<Text
							style={{
								color: theme.secondary,
								fontSize: 16,
								fontWeight: "bold"
							}}
						>
							Clear All
						</Text>
					</TouchableOpacity>
					<StyledButton
						onPress={() => this.applyFilter()}
						label="Apply"
						color="secondary"
						style={{ width: "50%" }}
					/>
				</View>
			</ModelContainer>
		);
	}
}
