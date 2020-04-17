import React from "react";
import Tooltip from "react-native-walkthrough-tooltip";
import { Text, TouchableHighlight, View, TouchableOpacity } from "react-native";
import theme from "../../theme/lightTheme";
import styled from "styled-components";

const Area = styled.View`
	display: flex;
	flex-direction: row;
	margin: 0px;
`;

const Label = styled.Text`
	font-size: 16px;
`;
//  color: ${props => props.theme.labelColor};

export default class ToolTips extends React.Component {
	state = {
		toolTipVisible: false
	};

	render() {
		const { placeholder, component } = this.props;
		return (
			<Area>
				{placeholder && <Label>{placeholder} : </Label>}
				<Tooltip
					isVisible={this.state.toolTipVisible}
					content={this.props.content}
					placement="top"
					onClose={() => this.setState({ toolTipVisible: false })}
				>
					<TouchableOpacity
						onPress={() => this.setState({ toolTipVisible: true })}
					>
						{component}
					</TouchableOpacity>
				</Tooltip>
			</Area>
		);
	}
}
