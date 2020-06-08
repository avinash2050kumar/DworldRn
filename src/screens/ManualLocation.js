import React, {Component, useState} from 'react';
import {
  Image,
  StatusBar,
  View,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  Alert,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {connect} from 'react-redux';
import styled from 'styled-components';
import {
  postSignUp,
  resendOtp,
  otpVerification,
  setDeviceLocation,
} from '../actions';
import {
  Card,
  RowContainer,
  Screen,
  StyledHeading,
  StyledText,
} from '../theme/styledComponent';
import {Formik} from 'formik';
import Button from '../components/common/Buttons';
import * as yup from 'yup';
import NavigationService from '../config/NavigationService';
import {PERMISSIONS, requestMultiple} from 'react-native-permissions';
import Geolocation from '@react-native-community/geolocation';
import axios from 'axios';
import FormikTextInput from '../components/common/FormikTextInput';
import {withNextInputAutoFocusForm} from 'react-native-formik';
import AutoComplete from '../components/common/AutoComplete';
const Form = withNextInputAutoFocusForm(View);

const validationSchema = yup.object().shape({});

class ManualLocationScreen extends Component {
  static navigationOptions = ({navigation}) => {
    return {
      title: 'Address',
    };
  };

  state = {
    isDisabled: true,
    isResendVisible: false,
    timer: 90,
    searchText: '',
    data: [
      {Name: 'Ahmedabad,India', Id: 11191},
      {Name: 'Guwahati,India', Id: 10498},
    ],
    otp: '',
  };

  _onChangeText = async searchText => {
    const res = await axios.get(
      `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${searchText}&key=AIzaSyDVo9Zmn86bAlIMz4pxCqUeDdn0Gm2I4pw`,
    );
    console.log(res.data?res.data.predictions:[]);
    await this.setState({searchText,data:res.data?res.data.predictions:[]});
    this.props.onChange(this.state.searchText);
  };

  _handleSubmit = async (payload, actions) => {
    this.props.setDeviceLocation(
      {
        mocked: false,
        timestamp: 1590249396666,
        coords: {
          speed: 0,
          heading: 0,
          accuracy: 603,
          altitude: 0,
          longitude: -122.0839702,
          latitude: 37.4219944,
        },
      },
      {
        ...payload,
        formatted_address: `${payload.Address1},${payload.Address2},${payload.city},${payload.State},${payload.ZipCode}`,
      },
      true,
    );
    NavigationService.pop(1);
  };

  render() {
    const {address} = this.props;
    const initialState = {
      Address1: address.Address1 ? address.Address1 : '',
      Address2: address.Address2 ? address.Address2 : '',
      State: address.State ? address.State : '',
      city: address.city ? address.city : '',
      ZipCode: address.ZipCode ? address.ZipCode : '',
    };
    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{flexGrow: 1}}>
        <Screen>
          <StatusBar barStyle="dark-content" />
          {this.props.address && (
            <Card>
              <StyledText style={{padding: 10}}>
                {this.props.address.formatted_address}
              </StyledText>
              <Button
                onPress={() => {
                  this.fixAddress();
                  NavigationService.pop(1);
                }}
                label="Select"
                color="secondary"
                style={{minWidth: '40%', width: '40%', alignSelf: 'flex-end'}}
              />
            </Card>
          )}
          {!this.props.address && (
            <Button
              onPress={() => this.fixAddress()}
              label="Auto Detect"
              color="secondary"
              style={{minWidth: '40%'}}
            />
          )}
          <KeyboardAvoidingView behavior="padding" enabled>
            <Formik
              initialValues={initialState}
              onSubmit={(values, actions) => {
                this._handleSubmit(values, actions);
              }}
              validationSchema={validationSchema}>
              {props => (
                <Card style={{marginTop: 30}}>
                  {console.log('state', props)}
                  <Form>
                    <FormikTextInput
                      label="Address 1"
                      name="Address1"
                      type="name"
                      formikprops={props}
                    />
                    <FormikTextInput
                      label="Address 2"
                      name="Address2"
                      type="name"
                      formikprops={props}
                    />
                    <AutoComplete
                      autoCapitalize="none"
                      autoCorrect={false}
                      containerStyle={{
                        flex: 1,
                        left: 0,
                        position: 'relative',
                        right: 0,
                        top: 0,
                        zIndex: 0,
                      }}
                      data={this.state.data}
                      defaultValue={this.state.query}
                      onChangeText={searchText =>
                        this._onChangeText(searchText)
                      }
                      hint={'eg. Kormangala'}
                      placeholder="Location"
                      inputContainerStyle={{borderWidth: 0, padding: 10}}
                      renderItem={({item, index}) => (
                        <TouchableOpacity
                          onPress={() => {
                            this.setState({query: item.Name});
                            this._onSelect(item);
                          }}>
                          <Text style={styles.itemText}>
                            {JSON.stringify(item.description)}
                          </Text>
                        </TouchableOpacity>
                      )}
                    />
                    <Button
                      onPress={props.handleSubmit}
                      label="Select"
                      color="secondary"
                      style={{
                        minWidth: '40%',
                        width: '40%',
                        alignSelf: 'flex-end',
                      }}
                    />
                  </Form>
                </Card>
              )}
            </Formik>
          </KeyboardAvoidingView>
        </Screen>
      </ScrollView>
    );
  }

  fixAddress = () => {
    console.log('vlaue');
    requestMultiple([
      PERMISSIONS.IOS.LOCATION_ALWAYS,
      PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
    ]).then(statuses => {
      if (statuses[PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION] == 'granted')
        Geolocation.getCurrentPosition(location => {
          axios
            .get(
              `https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.coords.latitude},${location.coords.longitude}&key=AIzaSyDVo9Zmn86bAlIMz4pxCqUeDdn0Gm2I4pw`,
            )
            .then(response => {
              this.props.setDeviceLocation(
                location,
                response.data.results[0],
                false,
              );
            });

          this.setState({location});
        });
      if (statuses[PERMISSIONS.IOS.LOCATION_ALWAYS] == 'granted')
        Geolocation.getCurrentPosition(location => {
          axios
            .get(
              `https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.coords.latitude},${location.coords.longitude}&key=AIzaSyDVo9Zmn86bAlIMz4pxCqUeDdn0Gm2I4pw`,
            )
            .then(response => {
              this.props.setDeviceLocation(
                location,
                response.data.results[0],
                false,
              );
            });

          this.setState({location});
        });
    });
  };
}

const mapStateToProps = state => ({
  address: state.home.address,
});

const mapDispatchToProps = {
  setDeviceLocation,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ManualLocationScreen);
