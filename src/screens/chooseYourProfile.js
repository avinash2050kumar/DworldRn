import React, { Component } from "react";
import {
	Image,
	StatusBar,
	View,
	Text,
	TouchableOpacity,
	ScrollView
} from "react-native";
import { connect } from "react-redux";
import styled from "styled-components";
import Button from "../components/common/Buttons";

import styles from "../theme/styles";
import {
	Screen,
	StyledHeading,
	StyledText,
	Card,
	StyledTitle
} from "../theme/styledComponent";
import { isEmpty } from "../helper/string";
import { setChooseProfileVisibility } from "../actions";
import theme from "../theme/lightTheme";

class ChooseYourProfile extends Component {
	static navigationOptions = {
		header: null
	};

	constructor(props) {
		super(props);
		this.state = { selectedIndex: 0 };
		this.actions = [
			{
				title: "Driver",
				text:
					"Earn money by driving for us",
				image: require("../assets/images/carDriver.png"),
				onClick: () => this.setState({ selectedIndex: 0 })
			},
			{
				title: "Car Owner",
				text:
					"Lease your vehicle to earn or hire a driver",
				image: require("../assets/images/carOwner.png"),
				onClick: () => this.setState({ selectedIndex: 1 })
			},
			{
				title: "Leasing Firm",
				text:
					"Lease any vehicle or hire a driver",
				image: require("../assets/images/carLease.png"),
				onClick: () => this.setState({ selectedIndex: 2 })
			}
		];
	}

	renderCard() {
		return this.actions.map((action, index) => (
			<TouchableOpacity
				key={index}
				onPress={() => action.onClick()}
				disabled={index == this.state.selectedIndex}
			>
				<Card
					style={{
						backgroundColor:
							index == this.state.selectedIndex
								? theme.secondary
								: theme.cardBackgroundColor
					}}
				>
					<View style={[styles.flex_row]}>
						<Image
							style={{ width: 50, height: 50, marginRight: 10 }}
							source={action.image}
						/>
						<View
							style={{
								width: "80%"
							}}
						>
							<StyledTitle style={{ fontWeight: "bold" }}>
								{action.title}
							</StyledTitle>
							<View
								style={{
									flexDirection: "row",
									flexWrap: "wrap"
								}}
							>
								<StyledText
									style={{ flex: 1, flexWrap: "wrap" }}
								>
									{action.text}
								</StyledText>
							</View>
						</View>
					</View>
				</Card>
			</TouchableOpacity>
		));
	}

	render() {
		return (
			<ScrollView
				showsVerticalScrollIndicator={false}
				contentContainerStyle={{ flexGrow: 1 }}
			>
				<Screen
					style={{
						backgroundColor: "#1F253C",
						paddingTop: 45,
						flex: 1,
						height: "100%",
						justifyContent: "space-between"
					}}
				>
					<StatusBar barStyle="dark-content" />
					<View>
						<StyledHeading
							style={{ color: "#fff", marginBottom: 10 }}
						>
							Choose Your Profile
						</StyledHeading>
						<StyledText style={{ color: "#fff", marginBottom: 45 }}>
							select the category(s) applicable to you

						</StyledText>
						{this.renderCard()}
					</View>
					<Button
						onPress={() => {
							this.props.setChooseProfileVisibility(
								false,
								this.state.selectedIndex + 1
							);
							this.props.navigation.navigate("Auth");
						}}
						label={"Save"}
						color="secondary"
						style={{ marginTop: 10 }}
					/>
				</Screen>
			</ScrollView>
		);
	}
}

const mapStateToProps = state => ({});

const mapDispatchToProps = { setChooseProfileVisibility };

export default connect(mapStateToProps, mapDispatchToProps)(ChooseYourProfile);
