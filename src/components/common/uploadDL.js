import React, { Component } from "react";
import {
	Image,
	StatusBar,
	View,
	Text,
	ScrollView,
	KeyboardAvoidingView, TouchableOpacity
} from "react-native";
import { connect } from "react-redux";
import styled from "styled-components";
import RBSheet from "react-native-raw-bottom-sheet";
//import * as ImagePicker from "expo-image-picker";
//import * as Permissions from "expo-permissions";
//import { connectActionSheet } from "@expo/react-native-action-sheet";
import ImagePicker from 'react-native-image-picker';

import * as yup from "yup";
import { withNextInputAutoFocusForm } from "react-native-formik";
import { Card, StyledText, StyledTitle } from "../../theme/styledComponent";
import styles from "../../theme/styles";
import Button from "./Buttons";
import theme from "../../theme";
import ImageView from "react-native-image-viewing";
import { API_URL } from "../../config/api_url";
import axios from "axios";
import FullScreenImage from "../../screens/owner/fullScreenImage";
import {PERMISSIONS, requestMultiple} from "react-native-permissions";
import Geolocation from "@react-native-community/geolocation";

// @connectActionSheet
class UploadDL extends Component {
	static navigationOptions = ({ navigation }) => {
		return {
			title: "Expriences / DL"
		};
	};

	state = { image: "", isVisible: false };

	componentDidMount() {
		requestMultiple([PERMISSIONS.ANDROID.CAMERA,PERMISSIONS.ANDROID.RECORD_AUDIO,PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,PERMISSIONS.IOS.CAMERA,PERMISSIONS.IOS.PHOTO_LIBRARY]).then(
			(statuses) => {
				/*if(statuses[PERMISSIONS.ANDROID.CAMERA]=='granted')
					ImagePicker.launchCamera(options, (response) => {
						console.log('res',response)
					})
				if(statuses[PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE]=='granted')
					ImagePicker.launchCamera(options, (response) => {
						console.log('res',response)
					})*/
			},
		);
	}

	uploadImage=(response,formikprops,input)=>{
		axios.post(`${API_URL}/api/Driver/UploadMobileAttachment`, {
			data:response.data,    //put here base 64 string
			type:response.type,              //put file type
			fileName:response.fileName    //file name,
			, headers: {
			'Access-Control-Allow-Origin': '*',
			'Access-Control-Allow-Headers': '*',
		},
		})
			.then(function (imageUrl) {
				formikprops.setFieldValue(`license.${input}`,imageUrl.data)
			})
			.catch(function (error) {
				console.log('error',error);
			});
	}

	render() {
		const {
			title,
			image,
			description,
			formikprops,
			input,
			url
		} = this.props;

		const options = {
			title: 'Select Avatar',
			customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
			storageOptions: {
				skipBackup: true,
				path: 'images',
			},
		};

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
					{/*<Button
						onPress={() => console.log('action sheet')}//this._onOpenActionSheet()}
						label="Upload"
						color="faceBook"
						icon={"upload"}
						iconColor={"#fff"}
					/>*/}
						{formikprops.values.license[input] ? (
						<Button
							onPress={() =>
								this.BackFront.open()
							}
							label="View"
							color="faceBook"
							icon={"eye"}
							iconColor={"#fff"}
						/>
					) : (
						<Button
							onPress={() => this.BackImage.open()}
							label="Upload"
							color="faceBook"
							icon={"upload"}
							iconColor={"#fff"}
						/>)}
				</View>
				<RBSheet
					ref={ref => {
						this.BackFront= ref;
					}}
					height={250}
					duration={250}
					customStyles={{
						container: {
							padding:16,
							borderTopRightRadius:10,
							borderTopLeftRadius:10,
							draggableIcon: {
								backgroundColor: "#000"
							}
							,justifyContent: "center",
							//alignItems: "center"
						}
					}}
				>
					<TouchableOpacity
						onPress={()=>{this.BackFront.close();
						this.props._setVisiblity(true, this.props.url)}}
						style={{padding:16,borderBottomWidth:1,borderColor:'#eee',}}
					>
						<Text>Show Image</Text>
					</TouchableOpacity>
					<TouchableOpacity
						onPress={()=>{this.BackFront.close();ImagePicker.launchCamera(options, (response) => {
							this.uploadImage(response,formikprops,input)	// Same code as in above section!
						})}}
						style={{padding:16,borderBottomWidth:1,borderColor:'#eee',}}
					>
						<Text>Take Photo</Text>
					</TouchableOpacity>
					<TouchableOpacity
						onPress={()=>{this.BackFront.close();ImagePicker.launchImageLibrary(options, (response) => {
							this.uploadImage(response,formikprops,input)
						})}}
						style={{padding:16,borderBottomWidth:1,borderColor:'#eee',}}
					>
						<Text>Existing Photo</Text>
					</TouchableOpacity>
					<TouchableOpacity
						onPress={()=>this.BackFront.close()}
						style={{padding:16}}
					>
						<Text style={{color:'red'}}>Cancel</Text>
					</TouchableOpacity>
				</RBSheet>
				<RBSheet
					ref={ref => {
						this.BackImage = ref;
					}}
					height={160}
					duration={250}
					customStyles={{
						container: {
							padding:16,
							borderTopRightRadius:10,
							borderTopLeftRadius:10,
							draggableIcon: {
								backgroundColor: "#000"
							}
							,justifyContent: "center",
							//alignItems: "center"
						}
					}}
				>
					<TouchableOpacity
						onPress={()=>{this.BackImage.close();ImagePicker.launchCamera(options, (response) => {
							this.uploadImage(response,formikprops,input)	// Same code as in above section!
						})}}
						style={{padding:16,borderBottomWidth:1,borderColor:'#eee',}}
					>
						<Text>Take Photo</Text>
					</TouchableOpacity>
					<TouchableOpacity
						onPress={()=>{this.BackImage.close();ImagePicker.launchImageLibrary(options, (response) => {
							this.uploadImage(response,formikprops,input)
						})}}
						style={{padding:16,borderBottomWidth:1,borderColor:'#eee',}}
					>
						<Text>Existing Photo</Text>
					</TouchableOpacity>
					<TouchableOpacity
						onPress={()=>this.BackImage.close()}
						style={{padding:16}}
					>
						<Text style={{color:'red'}}>Cancel</Text>
					</TouchableOpacity>
				</RBSheet>
				<FullScreenImage
					image={this.state.image}
					modalVisible={this.state.isVisible}
					setModalVisible={() =>
						this.setState({ isVisible: false })
					}
				/>
			</Card>
		);
	}
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(UploadDL);
