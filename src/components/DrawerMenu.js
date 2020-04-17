import React from "react";
import styled from "styled-components/native";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { DrawerItems } from "react-navigation";
import { connect } from "react-redux";
import MaterialCommunityIcons from "react-native-vector-icons/dist/MaterialCommunityIcons";

const DrawerWrapper = styled.View`
	background-color: ${props => props.theme.primary};
	height: 160px;
	justify-content: flex-end;
	flex-direction: column;
	padding-top: 40px;
	padding-left: 20px;
	padding-bottom: 20px;
`;

const DrawerTitle = styled.Text`
	color: white;
	font-size: 16;
`;

const DrawerSub = styled.Text`
	color: #ddd;
	font-size: 12;
`;

const DrawerItemsCont = styled.View`
	display: flex;
	flex-direction: column;
	align-items: flex-start;
`;

const DrawerItem = styled.View`
	padding: 16px;
	width: 100%;
	display: flex;
	flex-direction: row;
	align-items: center;
`;

const ItemLabel = styled.Text`
	margin-left: 16px;
	font-size: 16px;
	font-weight: bold;
`;

const drawerActiveBackgroundColor = "#fd4452";
const drawerInActiveBackgroundColor = "#888";

class DrawerMenu extends React.PureComponent {
	constructor(props) {
		super(props);
	}

	renderItem = (
		route,
		renderIcon,
		getLabel,
		onItemPress,
		activeItemKey,
		index
	) => {
		const activeTintColor = "#fd4452";
		const inactiveTintColor = "#888";
		const focused = activeItemKey === route.key;
		const color = focused ? activeTintColor : inactiveTintColor;
		const backgroundColor = focused
			? drawerActiveBackgroundColor
			: drawerInActiveBackgroundColor;
		const scene = { route, index, focused, tintColor: color };
		const icon = renderIcon(scene);
		const label = getLabel(scene);
		return (
			<TouchableOpacity
				key={route.key}
				onPress={() => {
					onItemPress({ route, focused });
				}}
				delayPressIn={0}
			>
				<DrawerItem>
					{icon ? (
						<MaterialCommunityIcons
							name={icon}
							size={20}
							color={backgroundColor}
						/>
					) : null}
					{typeof label === "string" ? (
						<ItemLabel style={{ color: backgroundColor }}>
							{label}
						</ItemLabel>
					) : (
						label
					)}
				</DrawerItem>
			</TouchableOpacity>
		);
	};

	render() {
		const { auth } = this.props;
		const {
			navigation: { state, navigate },
			items,
			activeItemKey,
			activeTintColor,
			activeBackgroundColor,
			inactiveTintColor,
			inactiveBackgroundColor,
			getLabel,
			renderIcon,
			onItemPress,
			style,
			labelStyle
		} = this.props;

		return (
			<ScrollView showsVerticalScrollIndicator={false}>
				<View>
					{/*<DrawerWrapper>
						<Entypo
							name={"user"}
							color={"#fff"}
							size={50}
							style={{ marginBottom: 15 }}
						/>
						<DrawerTitle>{auth.UserName}</DrawerTitle>
						<DrawerSub>{auth.email}</DrawerSub>
					</DrawerWrapper>*/}

					<DrawerItemsCont>
						{items.map((route: NavigationRoute, index: number) => {
							/*For private route only */
							if (true
							/*	(auth.isTravelAdmin &&
									route.key === "TripAdmin") ||
								(auth.isFinanceAdmin &&
									route.key === "Finance") ||
								(auth.isAdmin && route.key === "Setting") ||
								(auth.isAnalytics && route.key === "Analytics")*/
							) {
								return this.renderItem(
									route,
									renderIcon,
									getLabel,
									onItemPress,
									activeItemKey,
									index
								);
							} /* For all Remaining routes */ else if (
								route.key === "Home" ||
								route.key === "Claim" ||
								route.key === "Trips" ||
								route.key === "Approval" ||
								route.key === "Logout"
							) {
								return this.renderItem(
									route,
									renderIcon,
									getLabel,
									onItemPress,
									activeItemKey,
									index
								);
							} else {
							}
						})}
					</DrawerItemsCont>
				</View>
			</ScrollView>
		);
	}
}

const mapStateToProps = state => ({ auth: state.auth });

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(DrawerMenu);
