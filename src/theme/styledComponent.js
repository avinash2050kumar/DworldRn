import styled from "styled-components";
import { cardBorderRadius, cardPadding } from "../helper/styles";

export const Card = styled.View`
	padding: ${cardPadding};
	border-radius: ${cardBorderRadius};
	margin: 10px 0px;
	background-color: ${props => props.theme.cardBackgroundColor};
	box-shadow: 8px 12px 15px #888;
	elevation: 5;
`;

export const RowContainer = styled.View`
	display: flex;
	flex-direction: row;
	align-items: center;
`;

export const ColumnContainer = styled.View`
	display: flex;
	flex-direction: column;
	align-items: center;
`;

export const NavigationBar = styled.View`
	height: 60px;
	width: 100%;
	padding: 0px 20px;
	border-bottom-width: 1px;
	border-color: #eee;
`;

export const ShadowLessCard = styled.View`
	padding: ${cardPadding};
	border-radius: ${cardBorderRadius};
	margin: 10px 0px;
	background-color: ${props => props.theme.cardBackgroundColor};
`;

export const Screen = styled.View`
	display: flex;
	flex: 1;
	padding: 16px;
	background-color: ${props => props.theme.backgroundColor};
`;

export const ClickableCard = styled.TouchableOpacity`
	display: flex;
	flex-direction: column;
	margin: 0px 0px 20px 0px;
	border-radius: 70px;
`;

export const Header = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background-color:${props => props.theme.cardHeaderBackground}
  padding:10px;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
`;

export const Content = styled.View`
	padding: 16px;
	background-color: ${props => props.theme.backgroundColor};
	border-bottom-left-radius: 10px;
	border-bottom-right-radius: 10px;
`;

export const Footer = styled.View`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-evenly;
	flex-wrap: wrap;
	margin: 5px 0px 20px 0px;
`;

export const Field = styled.View``;

export const StyledTitle = styled.Text`
	font-size: 16px;
`;

export const StyledText = styled.Text`
	font-size: 14px;
`;

export const StyledHeading = styled.Text`
	font-size: 20px;
`;

export const Button = styled.TouchableOpacity`
	background-color: ${props => props.theme.cardBackgroundColor};
	border: 1px solid ${props => props.theme.primary};
	border-radius: 10px;
`;

export const ButtonLabel = styled.Text`
	padding: 7px 20px;
	font-size: 14px;
	color: ${props => props.theme.primary};
`;

export const Label = styled.Text`
	color: ${props => props.theme.labelColor};
`;
export const HorizontalLine = styled.View`
	width: 100%;
	height: 1px;
	background-color: #ddd;
`;
