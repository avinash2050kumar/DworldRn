import React, { Component } from "react";
import {
	Image,
	StatusBar,
	View,
	Text,
	ScrollView,
	KeyboardAvoidingView
} from "react-native";
import { connect } from "react-redux";
import styled from "styled-components";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";
import { connectActionSheet } from "@expo/react-native-action-sheet";

import * as yup from "yup";
import { withNextInputAutoFocusForm } from "react-native-formik";
import { Card, StyledText, StyledTitle } from "../../theme/styledComponent";
import styles from "../../theme/styles";
import Button from "./Buttons";
import theme from "../../theme";
import ImageView from "react-native-image-viewing";
import { API_URL } from "../../config/api_url";
import axios from "axios";

@connectActionSheet
class UploadDL extends Component {
	static navigationOptions = ({ navigation }) => {
		return {
			title: "Expriences / DL"
		};
	};

	state = { image: "", isVisible: false };

	_uploadImage = async img_uri => {
		let base_url = `${API_URL}/api/Driver/UploadLicense`;
		/*let uploadData = new FormData();
		uploadData.append("submit", "ok");
		uploadData.append("file", {
			type: "image/jpg",
			uri: img_uri,
			name: "avinash.jpg"
		});*/

		const traveourl =
			"https://traveodevapi.azurewebsites.net/api/Attachment/UploadAttachment";

		var data = new FormData();
		data.append("file", {
			uri: img_uri,
			name: "file",
			type: "image/jpg"
		});

		fetch(traveourl, {
			headers: {
				Accept: "application/json",
				"Content-Type": "multipart/form-data",
				LoginId: 1068,
				EmployeeId: 1068,
				UserToken: "F74DF7B7-DF75-4A8C-B1B7-2190D945909A",
				CompanyId: 1005
			},
			method: "POST",
			body: data
		})
			.then(async response => {
				console.log("succ ");
				console.log(await response.json());
			})
			.catch(err => {
				console.log("err ");
				console.log(err);
			});

		/*	fetch(base_url, {
			method: "post",
			body: uploadData
		})
			.then(response => {
				console.log("resp,", response);
				response.json();
			})
			.then(response => console.log("success", response))
			.catch(e => console.log("error", e));*/
	};

	_onOpenActionSheet = () => {
		let options = ["Take Photo", "Existing Photo", "Cancel"];
		let cancelButtonIndex = 2;

		this.props.showActionSheetWithOptions(
			{
				options,
				cancelButtonIndex
			},
			async buttonIndex => {
				const options = {
					mediaTypes: "Images"
				};
				switch (buttonIndex) {
					case 0:
						{
							const { status } = await Permissions.askAsync(
								Permissions.CAMERA_ROLL
							);
							const {
								status: cameraPermissionStatus
							} = await Permissions.askAsync(Permissions.CAMERA);
							if (
								status === "granted" &&
								cameraPermissionStatus === "granted"
							) {
								let result = await ImagePicker.launchCameraAsync(
									options
								);
								if (result) {
									this._uploadImage(result.uri);
								}
							} else {
								return null;
							}
						}
						break;
					case 1:
						{
							const { status } = await Permissions.askAsync(
								Permissions.CAMERA_ROLL
							);
							if (status === "granted") {
								let result = await ImagePicker.launchImageLibraryAsync(
									options
								);
								if (result) {
									this._uploadImage(result.uri);
								}
							} else {
								return null;
							}
						}
						break;
					default:
						return null;
				}
			}
		);
	};

	_onOpenActionSheetForViewImage = () => {
		let options = ["Show Image", "Cancel"];
		let cancelButtonIndex = 2;

		this.props.showActionSheetWithOptions(
			{
				options,
				cancelButtonIndex
			},
			async buttonIndex => {
				const options = {
					mediaTypes: "Images"
				};
				switch (buttonIndex) {
					case 0:
						this.props._setVisiblity(true, this.props.url);
						break;

					default:
						return null;
				}
			}
		);
	};

	render() {
		const {
			title,
			image,
			description,
			formikprops,
			input,
			url
		} = this.props;

		return (
			<Card style={[styles.flex_row]}>
				<View style={{ padding: 16 }}>
					<Image
						source={image}
						style={{
							marginRight: 5,
							width: 60,
							tintColor: formikprops.values.license[input]
								? theme.primary
								: theme.secondary
						}}
						resizeMode={"contain"}
					/>
				</View>
				<View style={{ flex: 1 }}>
					<StyledTitle>{title} </StyledTitle>
					<StyledText
						style={{
							marginTop: 7,
							marginBottom: 4
						}}
					>
						{description}
					</StyledText>
					<Button
						onPress={() => this._onOpenActionSheet()}
						label="Upload"
						color="faceBook"
						icon={"upload"}
						iconColor={"#fff"}
					/>
					{/*	{formikprops.values.license[input] ? (
						<Button
							onPress={() =>
								this._onOpenActionSheetForViewImage()
							}
							label="View"
							color="faceBook"
							icon={"eye"}
							iconColor={"#fff"}
						/>
					) : (
						<Button
							onPress={() => this._onOpenActionSheet()}
							label="Upload"
							color="faceBook"
							icon={"upload"}
							iconColor={"#fff"}
						/>
					)}*/}
				</View>
			</Card>
		);
	}
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(UploadDL);
