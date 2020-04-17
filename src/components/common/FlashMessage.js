import React from "react";
import { Text } from "react-native";
import { connect } from "react-redux";
import styled from "styled-components";
import MaterialCommunityIcons from "react-native-vector-icons/dist/MaterialCommunityIcons";

import theme from "../../theme/lightTheme";

const Area = styled.View`
	padding: 7px 20px 7px 15px;
	display: flex;
	flex-direction: row;
	align-items: center;
	border-radius: 30px;
	margin: 0px 20px 0px 20px;
`;

const Title = styled.Text`
	font-weight: bold;
	color: ${props => props.theme.white};
	font-size: 14px;
`;

const SubTitle = styled.Text`
	color: ${props => props.theme.white};
	font-size: 13px;
`;

const TitleContainer = styled.View`
	display: flex;
`;

class FlashMessage extends React.Component {
	render() {
		const { msg } = this.props;
		return !!msg.title || !!msg.icons ? (
			<Area
				style={{
					backgroundColor: theme[msg.color]
						? theme[msg.color]
						: "green"
				}}
			>
				{!!msg.icons && (
					<MaterialCommunityIcons
						name={msg.icons}
						size={22}
						color={"#fff"}
						style={{ marginRight: 10 }}
					/>
				)}
				<TitleContainer>
					{!!msg.title && (
						<Title>
							{typeof msg.title === "string"
								? msg.title
								: "Login Again"}
						</Title>
					)}
					{!!msg.subtitle && <SubTitle>{msg.subtitle}</SubTitle>}
				</TitleContainer>
			</Area>
		) : null;
	}
}

const mapStateToProps = state => ({ msg: state.msg });

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(FlashMessage);
