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

import { isEmpty } from "../helper/string";
import Button from "../components/common/Buttons";
import { Screen, StyledText } from "../theme/styledComponent";
import { Formik } from "formik";
import styles from "../theme/styles";
import FormikTextInput from "../components/common/FormikTextInput";
import * as yup from "yup";
import { withNextInputAutoFocusForm } from "react-native-formik";
import UploadDL from "../components/common/uploadDL";
import { getExperience ,SaveExperience,saveExperienceAndDl} from "../actions";
// import { Dropdown } from "react-native-material-dropdown";
import ImageView from "react-native-image-viewing";
import Selector from "react-native-easy-select";
import NavigationService from "../config/NavigationService";
import Store from "../store";
const Form = withNextInputAutoFocusForm(View);


class ExperiencesDLScreen extends Component {
	static navigationOptions = ({ navigation }) => {
		return {
			title: "Expriences / DL"
		};
	};

	state = { image: "", experiences: {}, isVisible: false, data: [] };

	static getDerivedStateFromProps(props, state) {
		const isEmpty = Object.keys(state.experiences).length === 0;
		if (isEmpty) {
			return {
				experiences: props.experiences
			};
		}

		// Return null if the state hasn't changed
		return null;
	}

	componentDidMount() {
		this.props.getExperience();
	}

	isEmpty = obj => {
		return Object.keys(obj).length === 0;
	};

	_Submit = async (values, actions) => {
		const { ClientId } = Store().store.getState().auth;
		setTimeout(() => actions.setSubmitting(false), 3000);
		this.props.SaveExperience(values.license)
		const res = await this.props.saveExperienceAndDl(Object.assign({},values.license,{ClientId}))
		if(res.status ===200)
        NavigationService.navigate('WorkScheduleScreen')
	};

	_setVisiblity = async (value, data) => {
		await this.setState({
			data: data ? data : this.state.data,
			isVisible: value
		});
	};

	render() {
		const initialState = {
			DrivingLicenceNumber: "BR00121",
			DrivingLicenceType: "4 Wheeler"
		};

		return (
			<ScrollView showsVerticalScrollIndicator={false}>
				<Screen style={{ backgroundColor: "#fff" }}>
					{!this.isEmpty(this.state.experiences) && (
						<KeyboardAvoidingView
							behavior="padding"
							style={{ flex: 1, justifyContent: "space-between" }}
						>
							<StatusBar barStyle="dark-content" />
							<StyledText style={{ marginBottom: 15 }}>
								Lorem Ipsum is simply dummy text of the printing
								and typesetting industry. ,
							</StyledText>

							<Formik
								initialValues={this.state.experiences}
								onSubmit={(values, actions) => {
									console.log('deakh')
									this._Submit(values, actions);
								}}
							>
								{props => (
									<View style={[styles.flex_col_btwn]}>
										{console.log('experience dl screen',!this.isEmpty(this.state.experiences),this.state.experiences,props.values.license
											.LicenseType)}
										<Form>
											<FormikTextInput
												label="Driving Licence Number"
												name="license.LicenseNumber"
												type="name"
												formikprops={props}
											/>
											<Selector
												theme="dropdown" // Default: 'simple'
												items={this.state.experiences
													.licenseType
													? this.state.experiences.licenseType.map(
														license => {
															return {
																...license,
																value:
																license.Name
															};
														}
													)
													: []}

												// Specify key
												valueKey="value" // Default: 'value'
												labelKey="value" // Default: 'label'

												defaultValue={`${props.values.license
													.LicenseType.Name}`} // Set default value
												placeholder="Driving Licence Type"

												placeholderContainerStyle={{ paddingVertical:15,marginTop:10}}
												iconStyle={{ tintColor: 'black' }}
												onChange={(value) =>{
													let i = 0
													props.values
														.licenseType.map((val,index)=> {if(val.Name===value)i=index})
													props.setFieldValue(
														`license.LicenseType`,
														props.values
															.licenseType[i]
													)

												}}
											/>
											<UploadDL
												formikprops={props}
												input={"FrontPage"}
												_setVisiblity={
													this._setVisiblity
												}
												title={"Driving Licence Front"}
												url={[
													Object.assign(
														{},
														{
															uri:
																props.values
																	.license
																	.FrontPage
														}
													)
												]}
												image={require("../assets/images/license.png")}
												description={
													"Upload the front side which has your photo."
												}
											/>
											<UploadDL
												formikprops={props}
												_setVisiblity={
													this._setVisiblity
												}
												input={"BackPage"}
												title={"Driving Licence Back"}
												image={require("../assets/images/license.png")}
												url={[
													Object.assign(
														{},
														{
															uri:
																props.values
																	.license
																	.BackPage
														}
													)
												]}
												description={
													"Upload the back side which has your photo."
												}
											/>
										</Form>
										<View style={{ marginTop: 30 }}>
											<Button
												onPress={props.handleSubmit}
												label="Save & Next"
												color="secondary"
												disabled={props.isSubmitting}
											/>
											{/*)}*/}
										</View>
									</View>
								)}
							</Formik>
						</KeyboardAvoidingView>
					)}
					<ImageView
						style={{
							position: "absolute",
							width: "100%",
							flex: 1,
							height: "100%"
						}}
						images={this.state.data}
						imageIndex={0}
						visible={this.state.isVisible}
						onRequestClose={() => this._setVisiblity(false)}
					/>
				</Screen>
			</ScrollView>
		);
	}
}

const mapStateToProps = state => ({ experiences: state.main.experiences });

const mapDispatchToProps = { getExperience,SaveExperience ,saveExperienceAndDl};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ExperiencesDLScreen);
