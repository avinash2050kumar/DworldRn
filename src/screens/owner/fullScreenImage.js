import React from "react";
import { Text, FlatList, TouchableOpacity, View, Image } from "react-native";
import styled from "styled-components";
import { connect } from "react-redux";

const Screen = styled.View`
	padding: 16px;
	background-color: #000;
	margin: 0px 0px 40px 0px;
`;

const HeaderRow = styled.View`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
`;

const Modal = styled.Modal`
	padding: 16px;
`;

const Label = styled.Text`
	font-size: 18px;
	color: #fff;
	font-weight: bold;
`;

class FullScreenImage extends React.PureComponent {
	render() {
		const { modalVisible, setModalVisible, image } = this.props;
		return (
			<Modal
				animationType="slide"
				transparent={false}
				visible={modalVisible}
				onRequestClose={() => {
					setModalVisible(false);
				}}
			>
				<Screen>
					<HeaderRow>
						<Label></Label>
						<TouchableOpacity
							onPress={() => setModalVisible(false)}
						>
							<View style={{ padding: 10 }}>
								<Label>X</Label>
							</View>
						</TouchableOpacity>
					</HeaderRow>
					<Image
						style={{ height: "100%" }}
						source={{
							uri: image
						}}
						resizeMode="contain"
					/>
				</Screen>
			</Modal>
		);
	}
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(FullScreenImage);
