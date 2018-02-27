import React, { Component } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Provider } from "react-redux";

import configureStore from "./scripts/store";

import App from "./scripts/components/App";
import "./styles/styles.css";

const store = configureStore();

class Main extends Component {
  render() {
    return (
      <Router>
        <Provider store={store}>
          <div>
            <Route path="/" component={App} />
          </div>
        </Provider>
      </Router>
    );
  }
}

ReactDOM.render(<Main />, document.getElementById("root"));
