import React from "react";
import { View, TouchableOpacity, Text } from "react-native";

import theme from "../../theme/lightTheme";
import styled from "styled-components";

const RowArea = styled.View`
	display: flex;
	flex-direction: row;
	align-items: center;
	padding: 7px;
`;

const RadioButton = ({ props, selected, onSelect, index }) => {
	return (
		<RowArea>
			<TouchableOpacity onPress={() => onSelect(props, index)}>
				<View
					style={[
						{
							height: 24,
							width: 24,
							borderRadius: 12,
							borderWidth: 2,
							borderColor: theme.radioButtons,
							alignItems: "center",
							justifyContent: "center"
						},
						props.style
					]}
				>
					{props === selected ? (
						<View
							style={{
								height: 12,
								width: 12,
								borderRadius: 6,
								backgroundColor: theme.radioButtons
							}}
						/>
					) : null}
				</View>
			</TouchableOpacity>
			<Text style={{ marginLeft: 15 }}>{props}</Text>
		</RowArea>
	);
};

export default RadioButton;
