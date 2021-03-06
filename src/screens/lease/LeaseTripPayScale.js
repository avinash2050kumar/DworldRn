import React, {Component} from 'react';
import {
  Image,
  StatusBar,
  View,
  Text,
  ScrollView,
  FlatList,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';
import {connect} from 'react-redux';
import styled from 'styled-components';
import theme from '../../theme/lightTheme';
import {Screen, StyledText, StyledTitle} from '../../theme/styledComponent';
// import { Dropdown } from "react-native-material-dropdown";
import update from 'immutability-helper';
import Button from '../../components/common/Buttons';
import {
  saveLeasePayScale,
  saveLeaseFirmPost,
  getLeaseDashBoard,
} from '../../actions';
import {Formik} from 'formik';
import FormikTextInput from '../../components/common/FormikTextInput';
import styles from '../../theme/styles';
import {withNextInputAutoFocusForm} from 'react-native-formik';
import * as yup from 'yup';
import Selector from 'react-native-easy-select';
import NavigationService from '../../config/NavigationService';

const validationSchema = yup.object().shape({
  Price: yup.string().required('Price is required'),
  night: yup.string().required('Night is required'),
});

const Card = styled.View`
  border-radius: 10px;
  margin: 10px 0px;
  background-color: #f1f3f6;
`;

const Form = withNextInputAutoFocusForm(View);

class LeaseTripPayScale extends Component {
  static navigationOptions = ({navigation}) => {
    return {
      title: 'Pay Scale',
    };
  };

  state = {
    FirmPay: {},
    isCardVisible: false,
  };

  static getDerivedStateFromProps(props, state) {
    const isEmpty = Object.keys(state.FirmPay).length === 0;
    if (isEmpty) {
      return {
        FirmPay: props.FirmPay,
      };
    }

    // Return null if the state hasn't changed
    return null;
  }

  isEmpty = obj => {
    return Object.keys(obj).length === 0;
  };

  _Submit = async (values, actions) => {
    setTimeout(() => actions.setSubmitting(false), 3000);

    this.props.saveLeasePayScale(values);
    const res = await this.props.saveLeaseFirmPost();
    if (res.status === 200) {
      this.props.getLeaseDashBoard();
      NavigationService.popToTop();
    }
  };

  render() {
    return (
      <View>
        {!this.isEmpty(this.state.FirmPay) && (
          <KeyboardAvoidingView behavior="padding" enabled>
            <Formik
              initialValues={this.state.FirmPay}
              onSubmit={(values, actions) => {
                this._Submit(values, actions);
              }}
              validationSchema={validationSchema}>
              {props => (
                <Form>
                  {console.log('asdfasdf', props.values)}
                  <View
                    style={{
                      marginBottom: 15,
                      borderBottomColor: theme.secondary,
                    }}>
                    {/*<Selector
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
                      defaultValue={`${props.values.VehicleType.Name}`} // Set default value
                      placeholder="Vehicle Description"
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
                          `VehicleType`,
                          Object.assign(
                            {},
                            {
                              Id: this.props.vehicleCategories[i]
                                .VehicleCategoryId,
                              Name: this.props.vehicleCategories[i]
                                .VehicleCategoryName,
                              VehicleType: this.props.vehicleCategories[i]
                                .VehicleType,
                            },
                          ),
                        );
                      }}
                    />*/}

                    <FormikTextInput
                      label="Price Per day(In Rupee)"
                      name={`Price`}
                      type="name"
                      defaultValue={props.values.Price + ''}
                      formikprops={props}
                      keyboardType={'number-pad'}
                    />
                    <FormikTextInput
                      label="Price Per Night(In Rupee)"
                      name={`night`}
                      type="name"
                      defaultValue={props.values.night + ''}
                      formikprops={props}
                      keyboardType={'number-pad'}
                    />
                  </View>

                  {props.isSubmitting ? (
                    <Button
                      onPress={props.handleSubmit}
                      label="Please Wait"
                      color="secondary"
                      disabled={true}
                    />
                  ) : (
                    <Button
                      onPress={props.handleSubmit}
                      label="Save & Next"
                      color="secondary"
                    />
                  )}
                </Form>
              )}
            </Formik>
          </KeyboardAvoidingView>
        )}
      </View>
    );
  }
}

const mapStateToProps = state => ({
  FirmPay: state.main.lease.postLeaseFirmRequirement.FirmPay,
  vehicleCategories: state.main.lease.postLeaseDummy.vehicleCategories,
});

const mapDispatchToProps = {
  saveLeasePayScale,
  saveLeaseFirmPost,
  getLeaseDashBoard,
};

export default connect(mapStateToProps, mapDispatchToProps)(LeaseTripPayScale);
