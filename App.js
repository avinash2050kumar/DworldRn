import React, { Component } from "react";
import { ThemeProvider } from "styled-components";
import { Provider } from "react-redux";

import theme from "./src/theme";
import Store from "./src/store/";
import Entry from "./Entry";

class App extends Component {
  render() {
    // For hide warning message
    console.disableYellowBox = true;

    // To show Network call on console
    XMLHttpRequest = GLOBAL.originalXMLHttpRequest
      ? GLOBAL.originalXMLHttpRequest
      : GLOBAL.XMLHttpRequest;

    // fetch logger
    global._fetch = fetch;
    global.fetch = function(uri, options, ...args) {
      return global._fetch(uri, options, ...args).then(response => {
        console.log("Fetch", { request: { uri, options, ...args }, response });
        return response;
      });
    };

    return (
      <Provider store={Store}>
        <ThemeProvider theme={theme}>
          <Entry />
        </ThemeProvider>
      </Provider>
    );
  }
}

export default App;
