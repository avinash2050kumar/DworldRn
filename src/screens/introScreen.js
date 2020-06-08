import React from 'react';
import {TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/dist/Ionicons';
import {StyleSheet, View, Text, Image} from 'react-native';
import {connect} from 'react-redux';
import AppIntroSlider from 'react-native-app-intro-slider';
import {setIntroVisibility} from '../actions';

const styles = StyleSheet.create({
  buttonCircle: {
    width: 40,
    height: 40,
    backgroundColor: 'rgba(0, 0, 0, .2)',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 320,
    height: 320,
  },
});

const slides = [
  {
    key: 'somethun',
    title: 'Welcome to D-World',
    titleStyle: {color: '#00cb99', fontSize: 26},
    textStyle: {color: '#232323', marginBottom: 55, width: '80%'},
    text:
      'Let’s quickly take a look at some of the amazing features in this app',
    image: require('../assets/images/intro0.jpg'),
    backgroundColor: '#fff',
  },
  {
    key: 'somethun-dos',
    title: 'Discover more',
    text: 'Explore a new world for all the driving needs',
    titleStyle: {color: '#00cb99', fontSize: 26},
    textStyle: {color: '#232323', marginBottom: 55, width: '80%'},
    image: require('../assets/images/intro1.png'),
    backgroundColor: '#fff',
  },
  {
    key: 'somethun1',
    title: 'Best deals',
    text: 'Get the best driver or vehicle deals around your location.',
    titleStyle: {color: '#00cb99', fontSize: 26},
    textStyle: {color: '#232323', marginBottom: 55, width: '80%'},
    image: require('../assets/images/intro2.jpg'),
    backgroundColor: '#fff',
  },
  {
    key: 'somethun1',
    title: 'Start Earning',
    text: 'Choose to drive for us or lease your vehicle to start earning.',
    titleStyle: {color: '#00cb99', fontSize: 26},
    textStyle: {color: '#232323', marginBottom: 55, width: '80%'},
    image: require('../assets/images/intro3.png'),
    backgroundColor: '#fff',
  },
];

class IntroScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  _renderItem = ({item}) => {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'space-around',
          alignItems: 'center',
        }}>
        <Text style={item.titleStyle}>{item.title}</Text>

        <Image
          source={item.image}
          style={{width: '80%', resizeMode: 'contain', marginBottom: 55}}
        />
        <Text style={item.textStyle}>{item.text}</Text>
      </View>
    );
  };

  _renderNextButton = () => {
    return (
      <View style={styles.buttonCircle}>
        <Ionicons
          name="md-arrow-round-forward"
          color="rgba(255, 255, 255, .9)"
          size={24}
          style={{backgroundColor: 'transparent'}}
        />
      </View>
    );
  };
  _renderDoneButton = () => {
    return (
      <TouchableOpacity
        onPress={() => {
          this.props.setIntroVisibility(false);
          this.props.navigation.navigate('ChooseYourProfile');
        }}>
        <View style={styles.buttonCircle}>
          <Ionicons
            name="md-checkmark"
            color="rgba(255, 255, 255, .9)"
            size={24}
            style={{backgroundColor: 'transparent'}}
          />
        </View>
      </TouchableOpacity>
    );
  };
  render() {
    return (
      <AppIntroSlider
        slides={slides}
        renderItem={this._renderItem}
        renderDoneButton={this._renderDoneButton}
        renderNextButton={this._renderNextButton}
        activeDotStyle={{backgroundColor: 'rgba(0, 0, 0, .9)'}}
      />
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {
  setIntroVisibility,
};

export default connect(mapStateToProps, mapDispatchToProps)(IntroScreen);
