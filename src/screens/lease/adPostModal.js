import React from "react";
import {
	Text,
	FlatList,
	TouchableOpacity,
	View,
	Dimensions,
	Image
} from "react-native";
import styled from "styled-components";
import { connect } from "react-redux";
import NavigationService from "../../config/NavigationService";
import { setAdsIndex } from "../../actions";

const cardWidth = `${Dimensions.get("window").width / 2.2 - 34}px`;

const Screen = styled.TouchableOpacity`
	display: flex;
	flex: 1;
	justify-content: center;
	padding: 16px;
	background-color: rgba(0, 0, 0, 0.7);
	margin: 0px 0px 0px 0px;
`;

const HeaderRow = styled.View`
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	margin: 0px 0px 20px 0px;
`;

const Modal = styled.Modal`
	padding: 16px;
`;

const Label = styled.Text`
	font-size: 18px;
	color: ${props => props.theme.titleColor};
	font-weight: bold;
`;

const Area = styled.View`
  padding: 16px;  
  border-radius: 10px;
  display: flex;
  background-color: ${props => props.theme.backgroundColor}
  justify-content: center;
`;

const SingleItemArea = styled.TouchableOpacity`
 padding:16px
 display:flex;
 justify-content:center;
 align-items:center
 margin: 5px;
 width: ${cardWidth};
 height:${cardWidth};
 border-radius:10px;
 background-color:${props => props.theme.cardBackgroundColor}
`;

class AdPostModal extends React.PureComponent {
	state = {
		data: [
			{
				name: "Driver",
				title: "Post a Ads for Driver",
				route: "PostAdsByOwner",
				param: { title: "Post a Ads for drivers", index: 0 },
				icons: require("../../assets/images/Group11.png")
			},
			{
				name: "Vehicle",
				title: "Post a Ads for Vehicle",
				route: "PostAdsByOwner",
				param: { title: "Post a Ads for Vehicle", index: 1 },
				icons: require("../../assets/images/Group16.png")
			}
		],
		modalVisible: false
	};

	_keyExtractor = (item, index) => index.toString();

	selectedImage = () => {};

	_onSelected = async (item, index) => {
		if (item.name === "Driver") {
			this.props.setModalVisible();
			NavigationService.navigate(item.route, item.param);
		}
		if (item.name === "Vehicle") {
			this.props.setModalVisible();
			NavigationService.navigate(item.route, item.param);
		}
	};

	_renderAttachmentItem = (item, index) => {
		return (
			<SingleItemArea onPress={() => this._onSelected(item, index)}>
				<Image style={{}} source={item.icons} />
				<Text style={{ textAlign: "center", marginTop: 8 }}>
					{item.title}
				</Text>
			</SingleItemArea>
		);
	};

	render() {
		const { modalVisible, setModalVisible, onSelect } = this.props;
		return (
			<Modal
				animationType="slide"
				transparent={true}
				visible={modalVisible}
				onRequestClose={() => {
					setModalVisible(false);
				}}
			>
				<Screen onPress={() => setModalVisible(false)}>
					<TouchableOpacity
						// underlayColor={"rgba(238,238,238,1)"}
						activeOpacity={1}
					>
						<Area>
							<HeaderRow>
								<Label>Post a ADS</Label>
							</HeaderRow>
							<FlatList
								style={{ width: "100%" }}
								columnWrapperStyle={{
									justifyContent: "space-between"
								}}
								renderItem={({ item, index }) =>
									this._renderAttachmentItem(item, index)
								}
								data={this.state.data}
								keyExtractor={this._keyExtractor}
								windowSize={15}
								numColumns={3}
								maxToRenderPerBatch={100}
								showsHorizontalScrollIndicator={false}
								showsVerticalScrollIndicator={false}
							/>
						</Area>
					</TouchableOpacity>
				</Screen>
			</Modal>
		);
	}
}

const mapStateToProps = state => ({});

const mapDispatchToProps = { setAdsIndex };

export default connect(mapStateToProps, mapDispatchToProps)(AdPostModal);
