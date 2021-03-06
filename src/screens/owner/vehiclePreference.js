import React, {Component} from 'react';
import {
  Image,
  StatusBar,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  FlatList,
  TextInput,
} from 'react-native';
import {connect} from 'react-redux';
import styled from 'styled-components';

import {isEmpty} from '../../helper/string';
import styles from '../../theme/styles';
import Ionicons from 'react-native-vector-icons/dist/Ionicons';
import {Formik} from 'formik';
import theme from '../../theme/lightTheme';
// import { Dropdown } from "react-native-material-dropdown";
import FormikTextInput from '../../components/common/FormikTextInput';
import {Card, Screen, StyledText} from '../../theme/styledComponent';
import Button from '../../components/common/Buttons';
import {
  ownerGetVehiclePreferences,
  saveOwnerVehiclePostDetail,
  setOwnerVehicleCompany,
  ownerAddNewVehicle,
} from '../../actions';
import {withNextInputAutoFocusForm} from 'react-native-formik';
import update from 'immutability-helper';
import RadioButton from '../../components/common/RadioButtons';
import StyledDateAndTimePicker from '../../components/common/StyledDateAndTimePicker';
import Selector from 'react-native-easy-select';
import MaterialIcons from 'react-native-vector-icons/dist/MaterialIcons';

const Form = withNextInputAutoFocusForm(View);

const CheckBox = styled.TouchableOpacity`
  padding: 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const RowArea = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 7px;
`;

class OwnerVehiclePreference extends Component {
  static navigationOptions = ({navigation}) => {
    return {
      title: 'Vehicle Preference',
    };
  };

  state = {
    postAdsDriver: {},
    newVehicle: '',
  };

  static getDerivedStateFromProps(props, state) {
    const isEmpty = Object.keys(state.postAdsDriver).length === 0;
    if (isEmpty) {
      return {
        postAdsDriver: props.postAdsDriver,
      };
    }

    // Return null if the state hasn't changed
    return null;
  }

  componentDidMount() {
    this.props.ownerGetVehiclePreferences();
    this.props.setOwnerVehicleCompany();
  }

  isEmpty = obj => {
    return Object.keys(obj).length === 0;
  };

  _Submit = (values, actions) => {
    setTimeout(() => actions.setSubmitting(false), 3000);
    this.props.saveOwnerVehiclePostDetail(values);
    this.props.adsIndex == 0
      ? this.props.navigation.navigate('OwnerDriverQualification')
      : this.props.navigation.navigate('OwnerDriverPayScaleTabs');
  };

  renderRadioButton = (pay, index, payType, formikProps) => {
    return (
      <RowArea>
        <TouchableOpacity
          onPress={() => formikProps.setFieldValue('vehicle.PaymentType', pay)}>
          <View
            style={[
              {
                height: 24,
                width: 24,
                borderRadius: 12,
                borderWidth: 2,
                borderColor: theme.radioButtons,
                alignItems: 'center',
                justifyContent: 'center',
              },
            ]}>
            {pay.Id === payType.Id ? (
              <View
                style={{
                  height: 12,
                  width: 12,
                  borderRadius: 6,
                  backgroundColor: theme.radioButtons,
                }}
              />
            ) : null}
          </View>
        </TouchableOpacity>
        <Text style={{marginLeft: 15}}>{pay.Name}</Text>
      </RowArea>
    );
  };

  render() {
    return (
      <ScrollView>
        <Screen style={{backgroundColor: theme.white}}>
          <View>
            <Text>
              Select the default vehicle, location and number of vehicles
              required.
            </Text>
            {!this.isEmpty(this.props.postAdsDriverDummy) && (
              <KeyboardAvoidingView behavior="padding" enabled>
                <Formik
                  initialValues={this.state.postAdsDriver}
                  onSubmit={(values, actions) => {
                    this._Submit(values, actions);
                  }}>
                  {props => (
                    <Form>
                      <View>
                        {console.log('logrt', props)}
                        <Selector
                          theme="dropdown" // Default: 'simple'
                          items={
                            this.props.vehicleCategories
                              ? this.props.vehicleCategories.map(vehicle => {
                                  return {
                                    ...vehicle,
                                    value: vehicle.VehicleCategoryName,
                                  };
                                })
                              : []
                          }
                          // Specify key
                          valueKey="value" // Default: 'value'
                          labelKey="value" // Default: 'label'
                          defaultValue={`${props.values.vehicle.vehicleCategory.VehicleCategoryName}`} // Set default value
                          placeholder="Vehicle Category"
                          placeholderContainerStyle={{
                            paddingVertical: 15,
                            marginTop: 10,
                          }}
                          iconStyle={{tintColor: 'black'}}
                          onChange={value => {
                            let i = 0;
                            this.props.vehicleCategories.map((val, index) => {
                              if (val.VehicleCategoryName === value) i = index;
                            });
                            props.setFieldValue(
                              `vehicle.vehicleCategory`,
                              this.props.vehicleCategories[i],
                            );
                          }}
                        />
                        <Selector
                          theme="dropdown" // Default: 'simple'
                          items={this.props.vehicleCompany.map(vehicle => {
                            return {
                              ...vehicle,
                              value: vehicle.Name,
                            };
                          })}
                          // Specify key
                          valueKey="value" // Default: 'value'
                          labelKey="value" // Default: 'label'
                          defaultValue={`${props.values.vehicle.vehicleCompany}`} // Set default value
                          placeholder="Vehicle Company"
                          placeholderContainerStyle={{
                            paddingVertical: 15,
                            marginTop: 10,
                          }}
                          iconStyle={{tintColor: 'black'}}
                          onChange={value => {
                            let i = 0;
                            this.props.vehicleCompany.map((val, index) => {
                              if (val.Name === value) i = index;
                            });
                            props.setFieldValue(
                              `vehicle.vehicleCompany`,

                              this.props.vehicleCompany[i].Name,
                            );
                          }}
                        />
                        <FormikTextInput
                          label="Company"
                          name="vehicle.vehicleCompany"
                          type="name"
                          formikprops={props}
                        />
                        <Text style={{marginTop: 10}}>Vehicle Type</Text>
                        <View
                          style={{
                            borderWidth: 1,
                            borderColor: '#eee',
                            paddingTop: 5,
                            paddingBottom: 5,
                            marginBottom: 10,
                            marginTop: 10,
                          }}>
                          {console.log(
                            'yaha kar de bas',
                            this.props.vehicleCategories.filter(
                              dropdown =>
                                dropdown.VehicleCategoryId ===
                                props.values.vehicle.vehicleCategory
                                  .VehicleCategoryId,
                            )[0].VehicleType,
                          )}
                          {this.props.vehicleCategories
                            .filter(
                              dropdown =>
                                dropdown.VehicleCategoryId ===
                                props.values.vehicle.vehicleCategory
                                  .VehicleCategoryId,
                            )[0]
                            .VehicleType.map((vehicle, i) => (
                              <CheckBox
                                onPress={() =>
                                  props.values.vehicle.vehicleCategory.VehicleType.filter(
                                    type => type.Id === vehicle.Id,
                                  ).length > 0
                                    ? props.setFieldValue(
                                        `vehicle.vehicleCategory.VehicleType`,
                                        props.values.vehicle.vehicleCategory.VehicleType.filter(
                                          type => type.Id !== vehicle.Id,
                                        ),
                                      )
                                    : props.setFieldValue(
                                        `vehicle.vehicleCategory.VehicleType`,
                                        [
                                          ...props.values.vehicle
                                            .vehicleCategory.VehicleType,
                                          vehicle,
                                        ],
                                      )
                                }>
                                {props.values.vehicle.vehicleCategory.VehicleType.filter(
                                  vehicl => vehicl.Id === vehicle.Id,
                                ).length > 0 ? (
                                  <MaterialIcons
                                    name={'check-box'}
                                    size={24}
                                    color={theme.primary}
                                  />
                                ) : (
                                  <MaterialIcons
                                    name={'check-box-outline-blank'}
                                    size={24}
                                    color={theme.primary}
                                  />
                                )}
                                <Text
                                  style={{
                                    marginLeft: 10,
                                  }}>
                                  {vehicle.Name}
                                </Text>
                              </CheckBox>
                            ))}
                        </View>
                        {props.values.vehicle.vehicleCategory
                          .VehicleCategoryName === 'Other' && (
                          <View
                            style={[
                              styles.flex_row,
                              {justifyContent: 'space-between'},
                            ]}>
                            <TextInput
                              style={{width: '80%'}}
                              placeholder={'Add new vehicle type here'}
                              onChangeText={text =>
                                this.setState({newVehicle: text})
                              }
                              value={this.state.newVehicle}
                            />
                            <Button
                              onPress={() => this.AddVehicle(props)}
                              label="Add"
                              disabled={this.state.newVehicle.length === 0}
                              color="secondary"
                            />
                          </View>
                        )}
                        <FormikTextInput
                          label="Accepting vehicles beyond the age of"
                          name="vehicle.MFGYear"
                          type="name"
                          formikprops={props}
                          keyboardType={'number-pad'}
                        />
                        <Selector
                          theme="dropdown" // Default: 'simple'
                          items={
                            props.values.vehicle.StatusDropDown
                              ? props.values.vehicle.StatusDropDown.map(
                                  vehicle => {
                                    return {
                                      ...vehicle,
                                    };
                                  },
                                )
                              : []
                          }
                          // Specify key
                          valueKey="value" // Default: 'value'
                          labelKey="value" // Default: 'label'
                          defaultValue={`${
                            props.values.vehicle.Status
                              ? 'Available'
                              : 'Not Available'
                          }`} // Set default value
                          placeholder="Status"
                          placeholderContainerStyle={{
                            paddingVertical: 15,
                            marginTop: 10,
                          }}
                          iconStyle={{tintColor: 'black'}}
                          onChange={value => {
                            let i = 0;
                            props.values.vehicle.StatusDropDown.map(
                              (val, index) => {
                                if (val.value === value) i = index;
                              },
                            );
                            props.setFieldValue(
                              `vehicle.Status`,
                              props.values.vehicle.StatusDropDown[i].name,
                            );
                          }}
                        />
                        <Text style={{marginTop: 10}}>Pay Scale</Text>
                        <View
                          style={{
                            borderWidth: 1,
                            borderColor: '#eee',
                            paddingTop: 5,
                            paddingBottom: 5,
                            marginBottom: 10,
                            marginTop: 10,
                          }}>
                          {this.props.adsIndex == 0 &&
                            this.props.PayScale.map((pay, i2) =>
                              this.renderRadioButton(
                                pay,
                                i2,
                                props.values.vehicle.PaymentType,
                                props,
                              ),
                            )}
                          {this.props.adsIndex == 1 &&
                            this.props.PayScale.filter(
                              data =>
                                data.Name !== 'Hourly' &&
                                data.Name !== 'Weekly',
                            ).map((pay, i2) =>
                              this.renderRadioButton(
                                pay,
                                i2,
                                props.values.vehicle.PaymentType,
                                props,
                              ),
                            )}
                        </View>
                        <Text style={{marginTop: 20}}>
                          Duration of contract
                        </Text>
                        {console.log('vehicle preference', props.values)}
                        <View style={{paddingTop: 15}}>
                          <Selector
                            theme="dropdown" // Default: 'simple'
                            items={props.values.year}
                            // Specify key
                            valueKey="value" // Default: 'value'
                            labelKey="value" // Default: 'label'
                            defaultValue={`${props.values.vehicle.FromDate} Years`} // Set default value
                            placeholder="Select Year"
                            onChange={value => {
                              let i = 0;
                              props.values.year.map((val, index) => {
                                if (val.value === value) i = index;
                              });
                              props.setFieldValue(
                                `vehicle.FromDate`,
                                props.values.year[i].name,
                              );
                            }}
                          />
                          <View style={{marginTop: 10, marginBottom: 15}}>
                            <Selector
                              theme="dropdown" // Default: 'simple'
                              items={props.values.months}
                              // Specify key
                              valueKey="value" // Default: 'value'
                              labelKey="value" // Default: 'label'
                              defaultValue={`${props.values.vehicle.Todate} months`} // Set default value
                              placeholder="Select Months"
                              onChange={value => {
                                let i = 0;
                                props.values.months.map((val, index) => {
                                  if (val.value === value) i = index;
                                });
                                props.setFieldValue(
                                  `vehicle.Todate`,
                                  props.values.months[i].name,
                                );
                              }}
                            />
                          </View>
                        </View>
                        {/*<RowArea>
                          <View style={{width: '49%'}}>
                            <StyledDateAndTimePicker
                              style={{
                                width: '49%',
                              }}
                              placeholder={'Form'}
                              formikprops={props}
                              input={'vehicle.FromDate'}
                              hint={'choose date'}
                              format={'YYYY-MM-DD'}
                              defaultValue={props.values.vehicle.FromDate}
                            />
                          </View>
                          <View style={{width: '49%'}}>
                            <StyledDateAndTimePicker
                              style={{
                                width: '49%',
                              }}
                              placeholder={'To'}
                              formikprops={props}
                              input={'vehicle.Todate'}
                              hint={'choose date'}
                              format={'YYYY-MM-DD'}
                              defaultValue={props.values.vehicle.Todate}
                            />
                          </View>
                        </RowArea>*/}
                      </View>
                      {props.isSubmitting ? (
                        <Button
                          onPress={props.handleSubmit}
                          label="Please Wait"
                          color="secondary"
                          disabled={true}
                          style={{marginTop: 20}}
                        />
                      ) : (
                        <Button
                          onPress={props.handleSubmit}
                          label="Save & Next"
                          color="secondary"
                          style={{marginTop: 20}}
                        />
                      )}
                    </Form>
                  )}
                </Formik>
              </KeyboardAvoidingView>
            )}
          </View>
        </Screen>
      </ScrollView>
    );
  }
  AddVehicle = async props => {
    const res = await this.props.ownerAddNewVehicle(this.state.newVehicle);
    await props.setFieldValue(
      'vehicle.vehicleCategory.VehicleType',
      props.values.vehicle.vehicleCategory.VehicleType.concat([res]),
    );
    await this.setState({newVehicle: ''});
  };
}

const mapStateToProps = state => ({
  postAdsDriver: state.main.owner.postAdsDriver,
  postAdsDriverDummy: state.main.owner.postAdsDriverDummy,
  vehicleCompany: state.main.owner.vehicleCompany,
  vehicleCategories: state.main.owner.postAdsDriverDummy.vehicleCategories,
  PayScale: state.main.owner.postAdsDriverDummy.PayScale,
  adsIndex: state.main.owner.adsIndex,
});

const mapDispatchToProps = {
  ownerGetVehiclePreferences,
  saveOwnerVehiclePostDetail,
  setOwnerVehicleCompany,
  ownerAddNewVehicle,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(OwnerVehiclePreference);
