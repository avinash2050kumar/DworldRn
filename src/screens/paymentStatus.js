import React from 'react';
import {View, Text,Image} from 'react-native';
import styled from 'styled-components';
import {Screen} from '../theme/styledComponent';
import theme from '../theme/lightTheme';

const Title = styled.Text`
  font-size: 25px;
  color: #fa6400;
`;

export default class PaymentStatus extends React.Component {
  render() {
    const amount = this.props.navigation.getParam('amount');
    const isSuccess = this.props.navigation.getParam('isSuccess');
    const text = this.props.navigation.getParam('text');
    const transactionId = this.props.navigation.getParam('transactionId');
    console.log('this', amount, isSuccess, text, transactionId);
    return (
      <Screen style={{backgroundColor:'#fff'}}>
        {isSuccess && (
          <View
            style={{
              flex:1,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image
              source={require('../assets/images/paymentsuccess.png')}
              style={{
                height: '50%',
                aspectRatio:1,
                resizeMode: 'contain',
              }}
            />
            <Text style={{fontSize: 24, color: theme.secondary}}>
              {text}
            </Text>
            {transactionId && (
              <Text style={{color: theme.textColor}}>
                Transaction Number:{transactionId}
              </Text>
            )}
            <Text style={{color: theme.textColor, marginTop: 30}}>
              Amount paid:
              <Text style={{color: theme.secondary}}>{amount / 100}</Text>
            </Text>
          </View>
        )}
        {!isSuccess && (
          <View
            style={{
              flex:1,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image
              source={require('../assets/images/paymentFail.png')}
              style={{
                height: '50%',
                aspectRatio: 1,
                resizeMode: 'contain',
              }}
            />
            <Text style={{fontSize: 24, color: theme.secondary}}>
              {text}
            </Text>
            {transactionId && (
              <Text style={{color: theme.textColor}}>
                Transaction Number:{transactionId}
              </Text>
            )}
            <Text style={{color: theme.textColor, marginTop: 30}}>
              Amount paid:
              <Text style={{color: theme.secondary}}>{amount / 100}</Text>
            </Text>
          </View>
        )}
      </Screen>
    );
  }
}
