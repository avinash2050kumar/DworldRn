import React from 'react';
import {View, Text, ScrollView, FlatList, TouchableOpacity} from 'react-native';
import i18n from 'i18n-js';
import styled from 'styled-components';
import {
  ColumnContainer,
  HorizontalLine,
  RowContainer,
  Screen,
  StyledTitle,
} from '../theme/styledComponent';
import theme from '../theme/lightTheme';
import {cardBorderRadius, cardPadding} from '../helper/styles';
import styles from '../theme/styles';
import RazorpayCheckout from 'react-native-razorpay';
import Store from '../store';
import {getUserSubscription, saveSubscription} from '../actions';
import {connect} from 'react-redux';
import NavigationService from '../config/NavigationService';

const NoOfAdsText = styled.Text`
  color: ${props => props.theme.themeText};
  font-size: 20px;
  margin-top: 15px;
  font-weight: bold;
`;

const TabCard = styled.View`
  padding: 7px 10px;
  border-radius: 5px;
`;

const Card = styled.View`
  border-radius: 10px;
  margin: 10px 0px;
  background-color: ${props => props.theme.cardBackgroundColor};
  box-shadow: 8px 12px 15px #888;
  elevation: 5;
`;

const BuyNowButton = styled.TouchableOpacity`
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
  background-color: ${prop => prop.theme.secondary};
`;

class BuySubscription extends React.Component {
  static navigationOptions = ({navigation}) => {
    return {
      title: i18n.t('buyAPlan'),
    };
  };

  constructor(props) {
    super(props);
    this.state = {selectedIndex: 0};
    this.tabs = [
      {name: 'Basic Plan'},
      {name: 'Premium Plan'},
      {name: 'Custom Plan'},
    ];
    this.action = [
      {
        name: 'Basic Plan',
        id: 1,
        data: [
          {
            packageName: 'Package available for 30 days',
            noOfAds: 1,
            amount: '₹​199',
            days: 30,
            price: 19900,
          },
          {
            packageName: 'Package available for 3 Months',
            noOfAds: 2,
            amount: '₹​399',
            days: 90,
            price: 39900,
          },
          {
            packageName: 'Package available for 6 Months',
            noOfAds: 4,
            amount: '₹​799',
            days: 180,
            price: 79900,
          },
          {
            packageName: 'Package available for 1 Year',
            noOfAds: 12,
            amount: '₹​799',
            days: 365,
            price: 79900,
          },
        ],
      },
      {
        name: 'Premium Plan',
        id: 2,
        data: [
          {
            packageName: 'Package available for 30 days',
            noOfAds: 1,
            amount: '₹​199',
            days: 30,
            price: 19900,
          },
          {
            packageName: 'Package available for 3 Months',
            noOfAds: 2,
            amount: '₹​399',
            days: 90,
            price: 39900,
          },
        ],
      },
      {
        name: 'Custom Plan',
        id: 3,
        data: [
          {
            packageName: 'Package available for 1 Day',
            noOfAds: 1,
            amount: '₹​40',
            days: 1,
            price: 4000,
          },
          {
            packageName: 'Package available for 1 Day',
            noOfAds: 2,
            amount: '₹​60',
            days: 1,
            price: 6000,
          },
          {
            packageName: 'Package available for 1 Day',
            noOfAds: 3,
            amount: '₹​100',
            days: 1,

            price: 10000,
          },
          {
            packageName: 'Package available for 1 Day',
            noOfAds: 4,
            amount: '₹​125',
            price: 12500,
            days: 1,
          },
          {
            packageName: 'Package available for 2 Days',
            noOfAds: 5,
            amount: '₹​150',
            days: 2,
            price: 15000,
          },
          {
            packageName: 'Package available for 2 Days',
            noOfAds: '6+',
            amount: '₹​199',
            days: 2,
            price: 19900,
          },
          {
            packageName: 'Package available for 2 Days',
            noOfAds: 1,
            amount: '₹​50',
            days: 2,
            price: 5000,
          },
          {
            packageName: 'Package available for 2 Days',
            noOfAds: 2,
            amount: '₹​80',
            days: 2,
            price: 8000,
          },
          {
            packageName: 'Package available for 2 Days',
            noOfAds: 3,
            amount: '₹​130',
            days: 2,
            price: 13000,
          },
          {
            packageName: 'Package available for 2 Days',
            noOfAds: 4,
            amount: '₹​150',
            days: 2,
            price: 15000,
          },
        ],
      },
    ];
  }

  _renderTab = (item, index) => {
    return (
      <TouchableOpacity onPress={() => this.setState({selectedIndex: index})}>
        <TabCard
          style={{
            backgroundColor:
              this.state.selectedIndex == index ? theme.primary : '#efefef',
          }}>
          <Text
            style={{
              color: this.state.selectedIndex == index ? 'white' : '#888',
            }}>
            {item.name}
          </Text>
        </TabCard>
      </TouchableOpacity>
    );
  };

  renderCard = (item, index) => {
    return (
      <Card
        style={{
          elevation: 1,
          boxShadow: '1px 1px 1px #ccc',
          borderWidth: 1,
          borderColor: '#eee',
        }}>
        <View
          style={{
            paddingLeft: 16,
            paddingRight: 16,
            paddingTop: 16,
          }}>
          <StyledTitle>{item.packageName}</StyledTitle>
          <HorizontalLine style={{marginTop: 10}} />
          <RowContainer style={{padding: 10, justifyContent: 'space-between'}}>
            <ColumnContainer>
              <Text>Numbers of ads</Text>
              <NoOfAdsText>{item.noOfAds}</NoOfAdsText>
            </ColumnContainer>
            <ColumnContainer>
              <Text>Amount</Text>
              <NoOfAdsText>{item.amount}</NoOfAdsText>
            </ColumnContainer>
          </RowContainer>
        </View>
        <BuyNowButton
          style={{
            borderBottomRightRadius: 10,
            borderBottomLeftRadius: 10,
          }}
          onPress={() => {
            const {
              FirstName,
              LastName,
              Mobile,
              Email,
            } = Store().store.getState().auth;
            var options = {
              description: 'Dworld',
              image: require('../assets/images/traveo.jpg') /*https://i.imgur.com/3g7nmJC.png',*/,
              currency: 'INR',
              key: 'rzp_test_tFZq3APEo2OP2O',
              amount: `${item.price}`,
              name: `${FirstName ? FirstName : ''} ${LastName ? LastName : ''}`,
              prefill: {
                email: Email,
                contact: Mobile,
                name: 'Razorpay Software',
              },
              theme: {color: theme.secondary},
            };
            RazorpayCheckout.open(options)
              .then(async data => {
                // handle success
                const save = {
                  ClientId: this.props.ClientId,
                  SuscriptionType: {
                    Id: this.action[this.state.selectedIndex].id,
                    Name: this.action[this.state.selectedIndex].name,
                  },
                  TotalAddCount: item.noOfAds,
                  TotalDays: item.days,
                  PaymentId: data.razorpay_payment_id,
                };
                const res = await this.props.saveSubscription(save);
                console.log('res', res, data);
                NavigationService.navigate('PaymentStatus', {
                  amount: item.price,
                  transactionId: data.razorpay_payment_id,
                  isSuccess: true,
                  text: 'Payment Successful!',
                });
                res.status === 200
                  ? this.props.getUserSubscription()
                  : console.log('Oh god');
                res.status === 200
                  ? this.props.navigation.pop()
                  : console.log('Oh gosdfgd');
              })
              .catch(error => {
                // handle failure
                NavigationService.navigate('PaymentStatus', {
                  amount: item.price,
                  transactionId: undefined,
                  isSuccess: false,
                  text: 'Ordered Cancel!',
                });
              });
          }}>
          <Text
            style={{
              color: 'white',
              fontWeight: 'bold',
              fontSize: 16,
            }}>
            Buy Now
          </Text>
        </BuyNowButton>
      </Card>
    );
  };

  render() {
    return (
      <Screen style={{backgroundColor: theme.white}}>
        <View
          style={[
            styles.flex_row,
            {
              justifyContent: 'space-between',
              marginBottom: 15,
            },
          ]}>
          {this.tabs.map((tab, index) => this._renderTab(tab, index))}
        </View>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{flexGrow: 1}}>
          <FlatList
            data={this.action[this.state.selectedIndex].data}
            renderItem={({item, index}) => this.renderCard(item, index)}
            keyExtractor={(item, index) => index}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
          />
        </ScrollView>
      </Screen>
    );
  }
}

const mapStateToProps = state => ({
  workSchedules: state.main.workSchedules,
  ClientId: state.auth.ClientId,
});

const mapDispatchToProps = {getUserSubscription, saveSubscription};

export default connect(mapStateToProps, mapDispatchToProps)(BuySubscription);
