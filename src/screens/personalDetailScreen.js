import React, {Component} from 'react';
import {
  Image,
  StatusBar,
  View,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {connect} from 'react-redux';
import {Screen, StyledText} from '../theme/styledComponent';
import {Formik} from 'formik';
import styles from '../theme/styles';
import Button from '../components/common/Buttons';
import {
  handleTextInput,
  withNextInputAutoFocusForm,
  withNextInputAutoFocusInput,
} from 'react-native-formik';
import {setAppMessage, getPersonalDetails, SaveProfile} from '../actions';
import * as yup from 'yup';
import FormikTextInput from '../components/common/FormikTextInput';
import Store from '../store';
import NavigationService from '../config/NavigationService';
const Form = withNextInputAutoFocusForm(View);

const validationSchema = yup.object({
  FirstName: yup
    .string()
    .nullable()
    .required('First Name is required'),
  LastName: yup
    .string()
    .nullable()
    .required('First Name is required'),
  Address: yup
    .string()
    .nullable()
    .required('Address is required'),
  Mobile: yup
    .string()
    .nullable()
    .matches(/^[0-9]{10}$/, 'Type your valid 10 digits mobile no.')
    .required('First Name is required'),
  PinCode: yup
    .string()
    .nullable()
    .matches(/^[0-9]{6}$/, 'Type your 6 digits PinCode')
    .required('First Name is required'),
});

class PersonalDetailScreen extends Component {
  static navigationOptions = ({navigation}) => {
    return {
      title: navigation.getParam('title'),
    };
  };

  componentDidMount() {
    this.props.getPersonalDetails();
  }

  _handleSubmit = async payload => {
    const {ClientTypeId} = Store().store.getState().auth;
    const res = await this.props.SaveProfile(payload);
    if (res && res.status === 200 && ClientTypeId === 1)
      NavigationService.navigate('ExperiencesDLScreen');
    if (res && res.status === 200 && ClientTypeId === 2)
      this.props.navigation.pop();
    if (res && res.status === 200 && ClientTypeId === 3)
      NavigationService.navigate('PostRequirementsFirm');
  };

  isEmpty = obj => {
    return Object.keys(obj).length === 0;
  };

  render() {
    return (
      <ScrollView showsVerticalScrollIndicator={false}>
        <Screen style={{backgroundColor: '#f1f1f1'}}>
          <KeyboardAvoidingView
            behavior="padding"
            style={{flex: 1, justifyContent: 'space-between'}}>
            <StatusBar barStyle="dark-content" />
            <StyledText style={{marginBottom: 15}}>
              Enter you details. these details are visible to everyone who are
              viewing your profile
            </StyledText>
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
                        label="Landmark(Optional)"
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
                        label="Any other special message(s) that you want to add(optional)
"
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
                        disabled={false}
                      />
                      {/*)}*/}
                    </View>
                  </View>
                )}
              </Formik>
            )}
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

const mapDispatchToProps = {setAppMessage, getPersonalDetails, SaveProfile};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PersonalDetailScreen);
