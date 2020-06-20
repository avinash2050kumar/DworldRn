import React, {Component} from 'react';
import {
  StatusBar,
  View,
  ScrollView,
  KeyboardAvoidingView,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import {connect} from 'react-redux';
import Constants from 'expo-constants';
import {
  Card,
  NavigationBar,
  Screen,
  ShadowLessCard,
  StyledText,
  StyledTitle,
} from '../../theme/styledComponent';
import {
  setHomeScreenVisibility,
  setHomeScreenNoOfWork,
  setDeviceLocation,
  checkSubscription,
  setAppMessage,
} from '../../actions';
import axios from 'axios';
import HomeCarousel from '../../components/Home/Crousel';
import theme from '../../theme/lightTheme';
import styles from '../../theme/styles';
import * as Permissions from 'expo-permissions';
//import * as Location from "expo-location";
import i18n from 'i18n-js';
import NavigationService from '../../config/NavigationService';
import styled from 'styled-components';
import AdPostModal from './adPostModal';
import {PERMISSIONS, requestMultiple} from 'react-native-permissions';
import Geolocation from '@react-native-community/geolocation';

const AddPostButton = styled.TouchableOpacity`
  padding: 16px;
  width: 90%;
  align-self: center;
  margin: 15px 0px;
  align-items: center;
  border-radius: 15px;
  border-color: ${props => props.theme.buttonColor};
  border-width: 1px;
`;

class OwnerHomeScreen extends Component {
  static navigationOptions = ({navigation}) => {
    return {
      title: navigation.getParam('title'),
    };
  };

  state = {
    location: 'Unable to fetch your location',
    errorMessage: null,
    isDriverPostFullVisible: false,
    isLeasingJobPostFullVisible: false,
    modalVisible: false,
  };

  componentDidMount() {
    this.props.setHomeScreenNoOfWork();
    requestMultiple([
      PERMISSIONS.IOS.LOCATION_ALWAYS,
      PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
    ]).then(statuses => {
      console.log('Camera', statuses[PERMISSIONS.IOS.LOCATION_ALWAYS]);
      if (statuses[PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION] == 'granted')
        Geolocation.getCurrentPosition(location => {
          axios
            .get(
              `https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.coords.latitude},${location.coords.longitude}&key=AIzaSyDVo9Zmn86bAlIMz4pxCqUeDdn0Gm2I4pw`,
            )
            .then(response => {
              this.props.setDeviceLocation(location, response.data.results[0]);
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
              this.props.setDeviceLocation(location, response.data.results[0]);
            });

          this.setState({location});
        });
    });
  }

  _handleSubmit = payload => {
    this.props.setAppMessage('Sending', 'Try to send Successfully', 'success');
  };

  color = index => {
    const colors = [
      'rgba(0, 203, 153, 0.6)',
      'rgba(255, 116, 116, 0.6)',
      'rgba(92, 183, 248, 0.6)',
      'rgba(250, 197, 75, 0.6)',
      'rgba(146, 60, 180, 0.6)',
      'rgba(173, 190, 82, 0.6)',
    ];
    return colors[index];
  };

  _renderItem = (item, index, route) => (
    <TouchableOpacity
      key={index}
      style={{
        width: '30%',
      }}
      onPress={() =>
        NavigationService.navigate(route, {
          item,
          JobAddId: item.JobAddId,
          index: index,
        })
      }>
      <ShadowLessCard
        style={{
          width: '100%',
          alignItems: 'center',
          justifyContent: 'space-around',
          backgroundColor: this.color(index !== 0 ? index % 5 : 0),
        }}>
        <View style={[styles.flex_row, {marginTop: 7}]}>
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: 25,
              color: 'rgba(41, 39, 95, 0.77)',
            }}>
            {item.AplicantCount}
          </Text>
          <Text
            style={{
              fontSize: 11,
              marginLeft: 5,
              marginTop: 5,
              color: 'rgba(41, 39, 95, 0.77)',
            }}>
            Applicants
          </Text>
        </View>
        <Text
          style={{
            fontSize: 14,
            marginLeft: 5,
            color: 'rgba(41, 39, 95, 0.77)',
          }}>
          {item.CarCompany}
        </Text>
      </ShadowLessCard>
    </TouchableOpacity>
  );

  isEmpty = obj => {
    return Object.keys(obj).length === 0;
  };

  setModalVisible = () => this.setState({modalVisible: false});

  render() {
    const {ownerDashBoard} = this.props;
    let text = 'Waiting..';
    if (this.state.errorMessage) {
      text = this.state.errorMessage;
    } else if (this.state.location) {
      text = JSON.stringify(this.state.location);
    }
    const {address} = this.props;
    return (
      <View>
        <NavigationBar
          style={[
            styles.flex_row,
            {
              justifyContent: 'space-between',
            },
          ]}>
          <TouchableOpacity
            onPress={() => NavigationService.navigate('ManualLocationScreen')}>
            <View style={[styles.flex_row, {alignItems: 'center'}]}>
              <Image
                source={require('../../assets/images/Location.png')}
                style={{
                  width: 25,
                  height: 25,
                  resizeMode: 'contain',
                }}
              />
              <View style={{marginLeft: 10, width: '75%'}}>
                <Text style={{color: theme.textLightColor}}>You are here</Text>
                <Text numberOfLines={1}>
                  {this.props.home.isManualAddress
                    ? `${address.location?address.location:''}` //${address.Address1?address.Address1:''},${address.Address2?address.Address2:''},
                    : address
                    ? address.formatted_address
                    : 'unable to get Location'}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        </NavigationBar>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Screen style={{backgroundColor: '#fff'}}>
            <StatusBar barStyle="dark-content" />
            <HomeCarousel />
            <AddPostButton
              onPress={async () => {
                const res = await this.props.checkSubscription();
                res.data
                  ? this.setState({modalVisible: true})
                  : this.handleBuySubscription();
              }}>
              <Text style={{color: theme.buttonColor}}>+Post New Ad</Text>
            </AddPostButton>
            <AdPostModal
              modalVisible={this.state.modalVisible}
              setModalVisible={this.setModalVisible}
              navigation={this.props.navigation}
            />
            <StyledTitle style={{marginTop: 20}}>
              Job Ads For Driver
            </StyledTitle>
            {!this.isEmpty(ownerDashBoard) && (
              <View style={{paddingBottom: 50}}>
                <FlatList
                  data={
                    this.state.isDriverPostFullVisible
                      ? ownerDashBoard.DriverJob
                      : ownerDashBoard.DriverJob.slice(0, 6)
                  }
                  columnWrapperStyle={{
                    margin: '1%',
                    justifyContent: 'space-between',
                  }}
                  renderItem={({item, index}) =>
                    this._renderItem(item, index, 'OwnerJobTabs')
                  }
                  ListFooterComponent={() =>
                    ownerDashBoard.DriverJob.length > 6 ? (
                      <TouchableOpacity
                        style={{alignSelf: 'flex-end'}}
                        onPress={() =>
                          this.setState({
                            isDriverPostFullVisible: !this.state
                              .isDriverPostFullVisible,
                          })
                        }>
                        <Text style={{color: '#4eacbb'}}>
                          {ownerDashBoard.DriverJob.length === 0
                            ? 'No Data'
                            : this.state.isDriverPostFullVisible
                            ? 'Show Less'
                            : 'Show more'}
                        </Text>
                      </TouchableOpacity>
                    ) : null
                  }
                  extraData={this.state.isDriverPostFullVisible}
                  keyExtractor={(item, index) => index}
                  numColumns={3}
                  showsHorizontalScrollIndicator={false}
                  showsVerticalScrollIndicator={false}
                />
                <StyledTitle style={{marginTop: 20}}>
                  Job Ads for leasing Firm
                </StyledTitle>
                <FlatList
                  data={
                    this.state.isLeasingJobPostFullVisible
                      ? ownerDashBoard.LeasingJob
                      : ownerDashBoard.LeasingJob.slice(0, 6)
                  }
                  columnWrapperStyle={{
                    margin: '1%',
                    justifyContent: 'space-between',
                  }}
                  renderItem={({item, index}) =>
                    this._renderItem(item, index, 'OwnerLeaseFirmTabs')
                  }
                  ListFooterComponent={() =>
                    ownerDashBoard.LeasingJob.length > 6 ? (
                      <TouchableOpacity
                        style={{alignSelf: 'flex-end'}}
                        onPress={() =>
                          this.setState({
                            isLeasingJobPostFullVisible: !this.state
                              .isLeasingJobPostFullVisible,
                          })
                        }>
                        <Text style={{color: '#4eacbb'}}>
                          {ownerDashBoard.LeasingJob.length === 0
                            ? 'No Data'
                            : this.state.isLeasingJobPostFullVisible
                            ? 'Show Less'
                            : 'Show more'}
                        </Text>
                      </TouchableOpacity>
                    ) : null
                  }
                  extraData={this.state.isLeasingJobPostFullVisible}
                  keyExtractor={(item, index) => index}
                  numColumns={3}
                  showsHorizontalScrollIndicator={false}
                  showsVerticalScrollIndicator={false}
                />
              </View>
            )}
          </Screen>
        </ScrollView>
      </View>
    );
  }

  handleBuySubscription() {
    this.props.setAppMessage(
      'Error',
      "You Don't have enough ads left",
      'danger',
    );
    NavigationService.navigate('BuySubscription');
  }
}

const mapStateToProps = state => ({
  ownerDashBoard: state.home.ownerDashBoard,
  address: state.home.address,
  home: state.home,
});

const mapDispatchToProps = {
  setHomeScreenVisibility,
  setDeviceLocation,
  setHomeScreenNoOfWork,
  checkSubscription,
  setAppMessage,
};

export default connect(mapStateToProps, mapDispatchToProps)(OwnerHomeScreen);
