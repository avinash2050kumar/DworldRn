import React, {Component} from 'react';
import {
  Image,
  StatusBar,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {connect} from 'react-redux';
import styled from 'styled-components';
import Button from '../components/common/Buttons';

import styles from '../theme/styles';
import {
  Screen,
  StyledHeading,
  StyledText,
  Card,
  StyledTitle,
} from '../theme/styledComponent';
import {isEmpty} from '../helper/string';
import {
  setChooseProfileVisibility,
  setClientIdProfile,
  setClientId,
  upgradeRole,
} from '../actions';
import theme from '../theme/lightTheme';

class ProfileSwitch extends Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);
    this.state = {
      IsDriver: props.auth.IsDriver,
      IsLeasingFirm: props.auth.IsLeasingFirm,
      IsOwner: props.auth.IsOwner,
      selectedIndex: 0,
      upgradeIndex: 0,
      upgradeLoading: false,
    };
    this.actions = [];
    this.upgrade = [];
    if (props.auth.IsDriver)
      this.actions.push({
        title: 'Driver',
        text: 'Earn money by driving for us',
        image: require('../assets/images/carDriver.png'),
        name: 'IsDriver',
        index: 1,
        onClick: () =>
          this.setState({IsDriver: !this.state.IsDriver, selectedIndex: 1}),
      });

    if (props.auth.IsOwner)
      this.actions.push({
        title: 'Car Owner',
        text: 'Lease your vehicle to earn or hire a driver',
        image: require('../assets/images/carOwner.png'),
        name: 'IsOwner',
        index: 2,
        onClick: () =>
          this.setState({IsOwner: !this.state.IsOwner, selectedIndex: 2}),
      });

    if (props.auth.IsLeasingFirm)
      this.actions.push({
        title: 'Leasing Firm',
        text: 'Lease any vehicle or hire a driver',
        image: require('../assets/images/carLease.png'),
        name: 'IsLeasingFirm',
        index: 3,
        onClick: () =>
          this.setState({
            IsLeasingFirm: !this.state.IsLeasingFirm,
            selectedIndex: 3,
          }),
      });
    if (!props.auth.IsDriver)
      this.upgrade.push({
        title: 'Driver',
        text: 'Earn money by driving for us',
        image: require('../assets/images/carDriver.png'),
        name: 'IsDriver',
        index: 1,
        onClick: () => this.setState({upgradeIndex: 1}),
      });

    if (!props.auth.IsOwner)
      this.upgrade.push({
        title: 'Car Owner',
        text: 'Lease your vehicle to earn or hire a driver',
        image: require('../assets/images/carOwner.png'),
        name: 'IsOwner',
        index: 2,
        onClick: () => this.setState({upgradeIndex: 2}),
      });

    if (!props.auth.IsLeasingFirm)
      this.upgrade.push({
        title: 'Leasing Firm',
        text: 'Lease any vehicle or hire a driver',
        image: require('../assets/images/carLease.png'),
        name: 'IsLeasingFirm',
        index: 3,
        onClick: () =>
          this.setState({
            upgradeIndex: 3,
          }),
      });
  }

  componentDidMount() {
    this.setState({selectedIndex: this.actions[0].index});
  }

  renderCard(data, selectedIndex) {
    return data.map((action, index) => (
      <TouchableOpacity
        key={index}
        onPress={() => action.onClick()}
        disabled={action.index == this.state[selectedIndex]}>
        <Card
          style={{
            backgroundColor:
              action.index === this.state[selectedIndex]
                ? theme.secondary
                : theme.cardBackgroundColor,
          }}>
          <View style={[styles.flex_row]}>
            <Image
              style={{width: 50, height: 50, marginRight: 10}}
              source={action.image}
            />
            <View
              style={{
                width: '80%',
              }}>
              <StyledTitle style={{fontWeight: 'bold'}}>
                {action.title}
              </StyledTitle>
              <View
                style={{
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                }}>
                <StyledText style={{flex: 1, flexWrap: 'wrap'}}>
                  {action.text}
                </StyledText>
              </View>
            </View>
          </View>
        </Card>
      </TouchableOpacity>
    ));
  }

  upgradeCall = async () => {
    this.setState({upgradeLoading: true});
    setTimeout(() => {
      this.setState({upgradeLoading: false});
    }, 7000);
    const res = await this.props.upgradeRole(this.state.upgradeIndex);
    /* if (res == 200)*/ this.props.navigation.navigate('SplashSrn');
  };

  render() {
    const {IsDriver, IsLeasingFirm, IsOwner, setClientIdProfile} = this.state;
    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{flexGrow: 1}}>
        <Screen
          style={{
            backgroundColor: '#1F253C',
            paddingTop: 45,
            flex: 1,
            height: '100%',
            justifyContent: 'space-between',
          }}>
          <StatusBar barStyle="dark-content" />
          <View>
            <StyledHeading style={{color: '#fff', marginBottom: 10}}>
              Choose Your Profile
            </StyledHeading>
            <StyledText style={{color: '#fff', marginBottom: 35}}>
              Available Profile
            </StyledText>
            {this.renderCard(this.actions, 'selectedIndex')}
            {this.upgrade.length > 0 && (
              <StyledText
                style={{color: '#fff', marginTop: 20, marginBottom: 10}}>
                Upgrade to
              </StyledText>
            )}
            {this.renderCard(this.upgrade, 'upgradeIndex')}
          </View>
          <View>
            {this.state.upgradeIndex !== 0 && (
              <Button
                onPress={() => this.upgradeCall()}
                label={`Upgrade to ${
                  this.state.upgradeIndex === 1
                    ? 'Driver'
                    : this.state.upgradeIndex === 2
                    ? 'Car Owner'
                    : 'Leasing Firm'
                }`}
                color={'secondary'}
                style={{marginTop: 10}}
                disabled={this.state.upgradeLoading}
              />
            )}
            <Button
              onPress={() => {
                if (IsDriver || IsLeasingFirm || IsOwner) {
                  this.props.setChooseProfileVisibility(false, this.state);
                  this.props.setClientIdProfile(this.state.selectedIndex);
                  this.props.navigation.navigate('SplashSrn');
                }
              }}
              label={'Next'}
              color={'secondary'}
              style={{marginTop: 10}}
              disabled={!IsDriver && !IsLeasingFirm && !IsOwner}
            />
          </View>
        </Screen>
      </ScrollView>
    );
  }
}

const mapStateToProps = state => ({auth: state.auth});

const mapDispatchToProps = {
  setChooseProfileVisibility,
  setClientId,
  setClientIdProfile,
  upgradeRole,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileSwitch);
