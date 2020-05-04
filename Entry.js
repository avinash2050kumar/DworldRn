import React, { Component } from "react";
import { connect, Provider } from "react-redux";
import FlashMessage from "react-native-flash-message";
import {View, Text, Image} from "react-native";

import theme from "./src/theme";
import NavigationRoot from "./src/config/Navigator";
import NavigationService from "./src/config/NavigationService";
import { showMessage, hideMessage } from "react-native-flash-message";
import i18n from "i18n-js";
import en from "./src/helper/Language/english";
import hi from "./src/helper/Language/hindi";
import ta from "./src/helper/Language/tamil";
import te from "./src/helper/Language/telugu";
import kn from "./src/helper/Language/Kannada";
import NetInfo from "@react-native-community/netinfo";
import Feather from "react-native-vector-icons/dist/Feather";
import NetworkManager from "./src/helper/internetInfo";
import Ionicons from "react-native-vector-icons/dist/Ionicons";

class Entry extends Component {
  constructor(props) {
    super(props);
    NetworkManager.RegisterConnectionChangeCallback((isAvailable)=>{this.setState({isConnected:isAvailable})})
  }

  state = { count: 0, message: "" , isConnected:true};

  //handleInternet=(isAvailable)=>{this.setState({isConnected:isAvailable}); if(isAvailable)NavigationService.navigate('NoInternet')}
//(isAvailable)=>{this.setState({isConnected:isAvailable}); if(isAvailable)NavigationService.navigate('NoInternet')}
  componentDidMount() {
    i18n.translations = {
      en,
      hi,
      ta,
      te,
      kn
    };

    // Set the locale once at the beginning of your app.
    i18n.locale = this.props.language.langCode || "en";
    // When a value is missing from a language it'll fallback to another language with the key present.
    i18n.fallbacks = true;

  this.setState({isConnected:NetworkManager.IsInternetAvailable})

  }

  async componentWillReceiveProps(nextProps, nextContext) {
    i18n.translations = {
      en,
      hi,
      ta,
      te,
      kn
    };

    // Set the locale once at the beginning of your app.
    i18n.locale = nextProps.language.langCode || "en";
    // When a value is missing from a language it'll fallback to another language with the key present.
    i18n.fallbacks = true;

    const { message, description, type } = nextProps.msg;
    await this.setState({ count: this.state.count + 1 });
    if (this.state.count != 1) {
   /*   if (this.state.message !== message)*/
        showMessage({
          message,
          description,
          type,
          icon: "auto",
          duration: 3000
        });
      this.setState({ message: message });
    }
  }



  render() {
    return (
        <View style={{ flex: 1 }}>
          {!this.state.isConnected &&<View style={{flex:1,alignItems:'center', justifyContent:'center'}}>
            <Ionicons
                name={"wifi-off"}
                size={100}
                color={theme.secondary}
            />
          <Text style={{fontSize:22,marginTop:10}}>No Internet</Text>
         </View>}
          {this.state.isConnected &&<NavigationRoot
              ref={navigatorRef => {
                NavigationService.setTopLevelNavigator(navigatorRef);
              }}
          />}
          <FlashMessage
              position="top"
              textStyle={{ color: theme.white }}
          />
        </View>
    );
  }
}

const mapStateToProps = state => ({ msg: state.msg, language: state.language });

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Entry);
