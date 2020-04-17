import React from "react";
import { connect } from "react-redux";
import { View, Text } from "react-native";
import Navigation from "./src/config/Navigator";
import NavigationService from "./src/config/NavigationService";
import styled, { ThemeProvider } from "styled-components";
import NetInfo from "@react-native-community/netinfo";
import { showMessage, hideMessage } from "react-native-flash-message";
import FlashMessage from "react-native-flash-message";

import theme from "./src/theme";

const FlashMessageContainer = styled.View`
  position: absolute;
  align-self: center;
  top: 10px;
  background-color: transparent;
  z-index: 30;
`;

class Entry extends React.Component {
  state = {
    connection_Status: ""
  };

  constructor(props) {
    super(props);
    this.state = {
      isConnected: false,count: 0
    };
  }
  async componentWillReceiveProps(nextProps, nextContext) {
    const { message, description, type } = nextProps.msg;

    await this.setState({ count: this.state.count + 1 });
    if (this.state.count != 1) showMessage({
      message,
      description,
      type,
      icon: "auto",
      duration: 3000
    });
  }

  componentDidMount() {
    NetInfo.fetch().then(state => {
      !state.isConnected
        ? showMessage({
            message: "No Internet",
            description: "Please connect your device to internet",
            type: "danger",
            icon: "auto",
            duration: 10000
          })
        : null;
      this.setState({ isConnected: state.isConnected });
    });
    NetInfo.addEventListener("connectionChange", this.handleConnectionChange);
  }

  componentWillUnmount() {
    NetInfo.removeEventListener(
      "connectionChange",
      this.handleConnectionChange
    );
  }

  handleConnectionChange = () => {
    NetInfo.fetch().then(state => {
      if (state.isConnected === false) {
        showMessage({
          message: "No Internet",
          description: "Please connect your device to internet",
          type: "danger",
          icon: "auto",
          duration: 10000
        });
      }
      this.setState({ isConnected: state.isConnected });
    });
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Navigation
          ref={navigatorRef => {
            NavigationService.setTopLevelNavigator(navigatorRef);
          }}
        />
        <FlashMessage position="top" textStyle={{ color: theme.white }} />
      </View>
    );
  }
}

const mapStateToProps = state => ({ msg: state.msg });

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Entry);
