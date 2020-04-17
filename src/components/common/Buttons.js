import React from "react";
import styled from "styled-components";import MaterialCommunityIcons from "react-native-vector-icons/dist/MaterialCommunityIcons";
import { View } from "react-native";
import styles from "../../theme/styles";

const BG = styled.TouchableOpacity`
	padding: 12px 12px;
	display: flex;
	flex-direction: row;
	align-items: center;
	border-radius: 8px;
	justify-content: space-around;
	background-color: ${props =>
		props.color ? props.theme[props.color] : props.theme.secondary};
	${props => (props.disabled ? `opacity:0.5` : null)}
	${props => (props.block ? `width:100%` : null)}
`;

const Label = styled.Text`
  color:${props => (props.color === "white" ? "#000" : "#fff")}
  
  font-size:16px;
  `;

export default ({
	label,
	size,
	icon,
	iconColor,
	component,
	color,
	...rest
}) => {
	let content;

	content = (
		<View style={[styles.flex_row]}>
			{icon && (
				<MaterialCommunityIcons
					name={icon}
					size={22}
					color={iconColor ? iconColor : "#000"}
					style={{ marginRight: 10 }}
				/>
			)}
			<Label color={color} size={size}>
				{label}
			</Label>
		</View>
	);

	return (
		<BG size={size} color={color} {...rest}>
			{content}
			{component ? component : null}
		</BG>
	);
};
