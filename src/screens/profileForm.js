import React, {Component} from 'react';
import {
  Image,
  StatusBar,
  View,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  TouchableOpacity,
  Platform,
} from 'react-native';
import {connect} from 'react-redux';
import {HorizontalLine, Screen, StyledText} from '../theme/styledComponent';
import {Formik} from 'formik';
import styles from '../theme/styles';
import Button from '../components/common/Buttons';
import {
  handleTextInput,
  withNextInputAutoFocusForm,
  withNextInputAutoFocusInput,
} from 'react-native-formik';
import {
  getPersonalDetails,
  SaveProfile,
  setImageUrl,
  saveProfileImageServer,
  setAppMessage,
} from '../actions';
import * as yup from 'yup';
import FormikTextInput from '../components/common/FormikTextInput';
const Form = withNextInputAutoFocusForm(View);
import Ionicons from 'react-native-vector-icons/dist/Ionicons';
import i18n from 'i18n-js';
import EvilIcons from 'react-native-vector-icons/dist/EvilIcons';
import {PERMISSIONS, requestMultiple} from 'react-native-permissions';
import axios from 'axios';
import {API_URL} from '../config/api_url';
import ImagePicker from 'react-native-image-picker';
import RBSheet from 'react-native-raw-bottom-sheet';

const validationSchema = yup.object({
  FirstName: yup.string().required('First Name is required'),
  Address: yup.string().required('Address is required'),
  Mobile: yup
    .string()
    .matches(/^[0-9]{10}$/, 'Type your valid 10 digits mobile no.')
    .required('First Name is required'),
  PinCode: yup
    .string()
    .matches(/^[0-9]{6}$/, 'Type your 6 digits PinCode')
    .required('First Name is required'),
});

class ProfileFormScreen extends Component {
  static navigationOptions = ({navigation}) => {
    return {
      title: i18n.t('profileDetail'),
    };
  };

  _handleSubmit = payload => {
    this.props.SaveProfile(payload);
  };

  componentDidMount() {
    this.props.getPersonalDetails();
    requestMultiple([
      PERMISSIONS.ANDROID.CAMERA,
      PERMISSIONS.ANDROID.RECORD_AUDIO,
      PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
      PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
      PERMISSIONS.IOS.CAMERA,
      PERMISSIONS.IOS.PHOTO_LIBRARY,
    ]).then(statuses => {
      /*if(statuses[PERMISSIONS.ANDROID.CAMERA]=='granted')
					ImagePicker.launchCamera(options, (response) => {
						console.log('res',response)
					})
				if(statuses[PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE]=='granted')
					ImagePicker.launchCamera(options, (response) => {
						console.log('res',response)
					})*/
    });
  }

  isEmpty = obj => {
    return Object.keys(obj).length === 0;
  };

  uploadImage = (response , saveImage,saveImageToTheServer)=> {
    axios
      .post(`${API_URL}/api/Driver/UploadMobileAttachment`, {
        data: response.data, //put here base 64 string
        type: response.type, //put file type
        fileName: response.fileName, //file name,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': '*',
        },
      })
      .then(function(imageUrl) {
        console.warn(imageUrl.data,saveImageToTheServer,saveImage)
        saveImage(imageUrl.data);
        saveImageToTheServer({
          Id: this.props.auth.ClientId,
          Name: imageUrl.data,
        });
        // set Final value here
      })
      .catch(function(error) {
        // Error will goes here
      });
  };

  render() {
    const options = {
      title: 'Select Avatar',
      customButtons: [{name: 'fb', title: 'Choose Photo from Facebook'}],
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    return (
      <ScrollView showsVerticalScrollIndicator={false}>
        <Screen style={{backgroundColor: '#f5f5f5'}}>
          <KeyboardAvoidingView
            behavior="padding"
            style={{flex: 1, justifyContent: 'space-between'}}>
            <StatusBar barStyle="dark-content" />
            <View style={[styles.flex_center, {marginBottom: 20}]}>
              <View>
                {this.props.auth.ProfileURL === '' && (
                  <EvilIcons
                    name="user"
                    color="#444"
                    size={80}
                    style={{backgroundColor: 'transparent'}}
                  />
                )}
                {this.props.auth.ProfileURL !== '' && (
                  <Image
                    source={{
                      uri: this.props.auth.ProfileURL,
                    }}
                    style={{
                      width: 100,
                      height: 100,
                      resizeMode: 'cover',
                      borderRadius: 50,
                    }}
                  />
                )}
                <View
                  style={[
                    styles.flex_center,
                    {
                      width: 40,
                      height: 40,
                      backgroundColor: '#fff',
                      borderRadius: 20,
                      bottom: 0,
                      right: -10,
                      position: 'absolute',
                      borderWidth: 1,
                      borderColor: '#aaa',
                    },
                  ]}>
                  <TouchableOpacity
                    onPress={() => {
                      console.log('this', this);
                      this.BackImage.open();
                    }}>
                    <Ionicons name={'ios-camera'} size={30} />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <HorizontalLine style={{marginBottom: 15}} />
            {!this.isEmpty(this.props.personalDetails) && (
              <Formik
                initialValues={this.props.personalDetails}
                onSubmit={(values, actions) => {
                  this._handleSubmit(values);
                }}
                validationSchema={validationSchema}>
                {props => (
                  <View style={[styles.flex_col_btwn]}>
                    <Form>
                      <FormikTextInput
                        label="First Name"
                        name="FirstName"
                        type="name"
                        formikprops={props}
                        disabled={true}
                      />
                      <FormikTextInput
                        label="Last Name"
                        name="LastName"
                        type="name"
                        formikprops={props}
                        disabled={true}
                      />
                      <FormikTextInput
                        label="Mobile Number"
                        name="Mobile"
                        type="name"
                        prefix={'+91'}
                        formikprops={props}
                        disabled={true}
                      />
                      <FormikTextInput
                        label="Email"
                        name="Email"
                        type="email"
                        multiline={true}
                        formikprops={props}
                        disabled={true}
                      />
                      <FormikTextInput
                        label="Location"
                        name="Location"
                        type="name"
                        formikprops={props}
                      />
                      <FormikTextInput
                        label="Address"
                        name="Address"
                        type="name"
                        multiline={true}
                        formikprops={props}
                      />
                      <FormikTextInput
                        label="Landmark(optional)"
                        name="Landmark"
                        type="name"
                        formikprops={props}
                      />
                      <FormikTextInput
                        label="City"
                        name="City"
                        type="name"
                        formikprops={props}
                      />
                      <FormikTextInput
                        label="PinCode"
                        name="PinCode"
                        type="name"
                        maxLength={6}
                        formikprops={props}
                      />
                      {this.props.auth.ClientTypeId === 3 && (
                        <FormikTextInput
                          label="Contact Person Name"
                          name="ContactPerson.ContactPersonName"
                          type="name"
                          formikprops={props}
                        />
                      )}
                      {this.props.auth.ClientTypeId === 3 && (
                        <FormikTextInput
                          label="Contact Person Number"
                          name="ContactPerson.ContactNumber"
                          type="name"
                          maxLength={10}
                          keyboardType={'number-pad'}
                          formikprops={props}
                        />
                      )}
                      <FormikTextInput
                        label="Any other special message(s) that you want to add(optional)"
                        name="Instruction"
                        type="name"
                        multiline={true}
                        numberOfLines={3}
                        formikprops={props}
                      />
                    </Form>
                    <View style={{marginTop: 30}}>
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
            )}
            <RBSheet
              ref={ref => {
                this.BackImage = ref;
              }}
              height={160}
              duration={250}
              customStyles={{
                container: {
                  padding: 16,
                  borderTopRightRadius: 10,
                  borderTopLeftRadius: 10,
                  draggableIcon: {
                    backgroundColor: '#000',
                  },
                  justifyContent: 'center',
                  //alignItems: "center"
                },
              }}>
              <TouchableOpacity
                onPress={() => {
                  this.BackImage.close();
                  ImagePicker.launchCamera(options, response => {
                    this.uploadImage(response,this.props.setImageUrl,this.props.saveProfileImageServer); // Same code as in above section!
                  });
                }}
                style={{
                  padding: 16,
                  borderBottomWidth: 1,
                  borderColor: '#eee',
                }}>
                <Text>Take Photo</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  this.BackImage.close();
                  ImagePicker.launchImageLibrary(options, response => {
                    this.uploadImage(response);
                  });
                }}
                style={{
                  padding: 16,
                  borderBottomWidth: 1,
                  borderColor: '#eee',
                }}>
                <Text>Existing Photo</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => this.BackImage.close()}
                style={{padding: 16}}>
                <Text style={{color: 'red'}}>Cancel</Text>
              </TouchableOpacity>
            </RBSheet>
          </KeyboardAvoidingView>
        </Screen>
      </ScrollView>
    );
  }
}

const mapStateToProps = state => ({
  personalDetails: state.main.personalDetails,
  auth: state.auth,
});

const mapDispatchToProps = {
  setAppMessage,
  setImageUrl,
  getPersonalDetails,
  saveProfileImageServer,
  SaveProfile,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileFormScreen);
