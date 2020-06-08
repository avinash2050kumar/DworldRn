import React from "react";
import styled, { withTheme } from "styled-components";
import { View, Text } from "react-native";
import FontAwesome from "react-native-vector-icons/dist/FontAwesome";
import { PascalCase } from "../../helper/regex";
import { compose } from "recompose";
import {
	handleTextInput,
	withNextInputAutoFocusInput
} from "react-native-formik";
// react vector icons goes here

// Text inpue
const TextInput = styled.TextInput`
	padding: 10px;
	border-radius: 4px;
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

const StyledTextInput = compose(
	handleTextInput,
	withNextInputAutoFocusInput
)(TextInput);

const iconColor = "#aaa";

class FormikTextInput extends React.Component {
	state = { focused: false };

	onFocus = () => {
		this.setState({ focused: true });

		if (this.props.formikprops.onFocus) this.props.formikprops.onFocus();
	};

	onBlur = () => {
		this.setState({
			focused: false
		});

		if (this.props.formikprops.onBlur) this.props.formikprops.onBlur();
	};

	_isInValid = (formikprops, input) => {
		let path =
			input.search("\\[") !== -1
				? input.split(/(\[.*?\])?(\.)/g)
				: input.split(".");
		let currentValue = formikprops.values;
		let currentValuePath = "formikprops.values";
		let currentErrorPath = "formikprops.errors";
		let currentError = formikprops.errors;

		let currentTouched = formikprops.touched;
		let currentTouchedPath = "formikprops.touched";

		path.map((loc, index) => {
			const reg = loc.split(/\[(.*?)\]/g);
			if (
				loc !== "." && index === path.length - 1
					? true
					: currentValue[loc]
			) {
				currentValue = currentValue[loc];
				currentValuePath = `${currentValuePath}.${loc}`;
			} else if (loc !== "." && loc.includes("[")) {
				currentValue = currentValue[reg[1]];
				currentValuePath = `${currentValuePath}[${reg[1]}]`;
			}
		});
		path.map(loc => {
			const reg = loc.split(/\[(.*?)\]/g);
			if (loc !== "." && currentError[loc]) {
				currentError = currentError[loc];
				currentErrorPath = `${currentErrorPath}.${loc}`;
			} else if (
				loc !== "." &&
				loc.includes("[") &&
				currentError[reg[1]]
			) {
				currentError = currentError[reg[1]];
				currentErrorPath = `${currentErrorPath}[${reg[1]}]`;
			}
		});

		path.map(loc => {
			const reg = loc.split(/\[(.*?)\]/g);
			if (loc !== "." && currentTouched[loc]) {
				currentTouched = currentTouched[loc];
				currentTouchedPath = `${currentTouchedPath}.${loc}`;
			} else if (
				loc !== "." &&
				loc.includes("[") &&
				currentTouched[reg[1]]
			) {
				currentTouched = currentTouched[reg[1]];
				currentTouchedPath = `${currentTouchedPath}[${reg[1]}]`;
			}
		});


		if (
			currentValuePath === `formikprops.values.${input}` &&
			currentErrorPath === `formikprops.errors.${input}` &&
			currentTouchedPath === `formikprops.touched.${input}`
		)
			return { isInvalid: true, error: currentError };
		return { isInvalid: false, error: currentError };
	};

	render() {
		const {
			iconRight,
			iconLeft,
			name,
			label,
			formikprops,
			editable,
			...rest
		} = this.props;

		let { placeholder, hint } = this.props;
		placeholder = PascalCase(placeholder);
		hint = PascalCase(hint);
		/*const isInValid =
			!!formikprops.touched[name] && !!formikprops.errors[name];*/
		return (
			<View
				style={{
					marginTop: 10,
					marginBottom: 10
				}}
			>
				{!!label && (
					<PlaceholderContainer>
						<Text
							style={{
								color: this._isInValid(formikprops, name)
									.isInvalid
									? "red"
									: "#777",
								marginBottom: 2
							}}
						>
							{label}
						</Text>
					</PlaceholderContainer>
				)}

				{this.props.disabled && (
					<View
						style={{
							padding: 16,
							backgroundColor: "#fff",
							opacity: this.props.disabled ? 0.5 : 1.0
						}}
					>
						<Text>{formikprops.values[name]}</Text>
					</View>
				)}

				{!this.props.disabled && (
					<RowContainer
						style={{
							borderWidth: this._isInValid(formikprops, name)
								.isInvalid
								? 1
								: 0,
							borderColor: this._isInValid(formikprops, name)
								.isInvalid
								? "red"
								: "black",
							backgroundColor: "white"
						}}
					>
						{!!iconLeft && (
							<FontAwesome
								name={iconLeft}
								size={18}
								color={iconColor}
								style={{ marginRight: 5, marginLeft: 10 }}
							/>
						)}
						<StyledTextInput
							returnKeyType={"next"}
							placeholder={label}
							style={{ width: "100%" }}
							{...this.props}
						/>
					</RowContainer>
				)}
				{this._isInValid(formikprops, name).isInvalid && (
					<Text type="small" style={{ marginTop: 4, color: "red" }}>
						{this._isInValid(formikprops, name).error}
					</Text>
				)}
			</View>
		);
	}
}

export default FormikTextInput;
