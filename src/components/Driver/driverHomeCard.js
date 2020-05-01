import React from "react";
import { TouchableOpacity, View } from "react-native";
import { Card, HorizontalLine, StyledTitle } from "../../theme/styledComponent";
import styles from "../../theme/styles";
import theme from "../../theme/lightTheme";
import styled from "styled-components";
import NavigationService from "../../config/NavigationService";

const StyledPropText = styled.Text`
	color: ${props => props.theme.textLightColor};
	margin: 5px 0px;
`;

const StyledValueText = styled.Text`
	color: ${props => props.theme.themeText};
	margin: 5px 0px;
`;

export default class DriverHomeCard extends React.PureComponent {
	render() {
		const { item, index, dataIndex, driverApplyJob } = this.props;
		return (
			<View style={{ marginLeft: 5, marginRight: 5 }}>
				<Card
					style={{
						paddingTop: 0,
						paddingRight: 0,
						paddingLeft: 0,
						paddingBottom: 0,
						borderRadius: 20
					}}
				>
					<View
						style={[
							styles.flex_row,
							{ justifyContent: "space-between", padding: 14 }
						]}
					>
						<StyledTitle>{`Job No ${index + 1}`}</StyledTitle>
						<StyledTitle>{item.titleValue}</StyledTitle>
					</View>
					<HorizontalLine />
					<View
						style={[
							styles.flex_row,
							{
								paddingTop: 10,
								paddingLeft: 16,
								paddingRight: 16,
								paddingBottom: 5,
								justifyContent: "space-between"
							}
						]}
					>
						<View>
							{item.list.map(datalist => (
								<StyledPropText>{datalist.name}</StyledPropText>
							))}
						</View>
						<View style={{ alignItems: "flex-end" }}>
							{item.list.map(datalist => (
								<StyledPropText>
									{datalist.value}
								</StyledPropText>
							))}
						</View>
					</View>
					<HorizontalLine />
					<View style={[styles.flex_row]}>
						<TouchableOpacity
							style={{
								width: "50%",
								alignItems: "center",
								padding: 14,
								borderBottomRightRadius: 20
							}}
							onPress={() =>
								NavigationService.navigate(
									"JobDescriptionScreen",
									{
										dataListIndex: index,
										dataIndex: dataIndex
									}
								)
							}
						>
							<StyledTitle style={{ color: theme.orange }}>
								Details
							</StyledTitle>
						</TouchableOpacity>
						<TouchableOpacity
							style={{
								width: "50%",
								alignItems: "center",
								padding: 14,
								backgroundColor: theme.secondary,
								borderBottomRightRadius: 20,
								opacity:item.IsApplied?0.65:1
							}}
							onPress={() => driverApplyJob(item.JobId)}
							disabled={item.IsApplied}
						>
							<StyledTitle style={{ color: theme.white }}>
								{item.IsApplied?'Applied':'Apply Job'}
							</StyledTitle>
						</TouchableOpacity>
					</View>
				</Card>
			</View>
		);
	}
}
