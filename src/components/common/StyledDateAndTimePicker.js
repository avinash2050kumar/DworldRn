import React from "react";
import styled, { withTheme } from "styled-components";
import { View, Text, Button } from "react-native";
import FontAwesome5 from "react-native-vector-icons/dist/FontAwesome5";
import DateTimePicker from "react-native-modal-datetime-picker";
import moment from "moment/moment";
import { dateFormat } from "../../config/api_url";
// react vector icons goes here

// Text inpue
const StyleTouchableOpacity = styled.TouchableOpacity`
	padding: 10px;
	border-radius: 4px;
	width: 100%;
`;

const RequiredText = styled.Text`
	color: ${props => props.theme.danger};
`;

const PlaceholderContainer = styled.View`
	flex-direction: row;
	align-items: center;
`;

const RowContainer = styled.View`
	display: flex;
	flex-direction: row;
	align-items: center;
`;

const iconColor = "#aaa";

class StyledDateAndTimePicker extends React.Component {
	state = { isDateTimePickerVisible: false };

	/* onFocus = () => {
    this.setState({ focused: true });

    if (this.props.onFocus) this.props.onFocus();
  };

  onBlur = () => {
    this.setState({
      focused: false
    });

    if (this.props.onBlur) this.props.onBlur();
  };*/

	constructor(props) {
		super(props);
		this.state = {
			isDateTimePickerVisible: false
		};
	}

	showDateTimePicker = () => {
		this.setState({
			isDateTimePickerVisible: true
		});
	};

	hideDateTimePicker = () => {
		this.setState({
			isDateTimePickerVisible: !this.state.isDateTimePickerVisible
		});
	};

	handleDatePicked = date => {
		const { format, formikprops, input, mode } = this.props;

		mode === "datetime"
			? formikprops.setFieldValue(input, moment.utc(date).format())
			: formikprops.setFieldValue(
					input,
					moment.utc(date).format(format ? format : dateFormat)
			  );

		this.setState({
			isDateTimePickerVisible: false
		});
	};

	render() {
		const {
			placeholder,
			isRequired,
			iconLeft,
			format,
			input,
			hint,
			formikprops,
			defaultValue,
			disabled,
			mode,
			...rest
		} = this.props;

		const isInValid =
			!!formikprops.touched[input] && !!formikprops.errors[input];
		return (
			<View
				style={{
					marginTop: 10,
					marginBottom: 10,
					opacity: this.props.disabled ? 0.6 : 1.0
				}}
			>
				<PlaceholderContainer>
					<Text
						style={{
							color: isInValid ? "red" : "#777",
							marginBottom: 2
						}}
					>
						{placeholder}
						{isRequired && <RequiredText>*</RequiredText>}
					</Text>
				</PlaceholderContainer>

				<RowContainer
					style={{
						borderWidth: isInValid ? 1 : 0,
						borderColor: isInValid ? "red" : "black",
						backgroundColor: "white"
					}}
				>
					{!!iconLeft && (
						<FontAwesome5
							name={iconLeft}
							size={18}
							color={iconColor}
							style={{ marginRight: 5, marginLeft: 10 }}
						/>
					)}
					<StyleTouchableOpacity onPress={this.showDateTimePicker}>
						<Text>
							{defaultValue
								? `${moment(defaultValue).format(
										format ? format : dateFormat
								  )}`
								: `${moment(formikprops.values[input]).format(
										format ? format : dateFormat
								  )}`}
						</Text>
					</StyleTouchableOpacity>
					<DateTimePicker
						isVisible={this.state.isDateTimePickerVisible}
						onConfirm={this.handleDatePicked}
						onCancel={this.hideDateTimePicker}
						datePickerModeAndroid={"spinner"}
						timePickerModeAndroid={"spinner"}
						is24Hour={false}
						{...this.props}
					/>
				</RowContainer>
				{/* {touched &&*/}
				{isInValid && (
					<Text type="small" style={{ marginTop: 4, color: "red" }}>
						{formikprops.errors[input]}
					</Text>
				)}
			</View>
		);
	}
}

export default StyledDateAndTimePicker;
