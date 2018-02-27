import React, { Component } from "react";
import { connect } from "react-redux";

import { getHeadlinesAsyncAction } from "../actions";
import Client from "../utils/Client";

// class NewsItem extends Component {
//   render() {
//     return (
//       <div className="newsbox-item">
//         <div>{this.props.title}</div>
//         <div>{this.props.description}</div>
//       </div>
//     );
//   }
// }

// class NewsBox extends Component {
//   render() {
//     return <div className="newsbox" />;
//   }
// }

/*
 *  App View Component
 */
class App extends Component {
  componentDidMount() {
    this.props.getHeadlines();
  }

  render() {
    return <div className="App" />;
  }
}

const mapStateToProps = null;
const mapDispatchToProps = dispatch => ({
  getHeadlines: source => dispatch(getHeadlinesAsyncAction(source))
});

const AppConnected = connect(mapStateToProps, mapDispatchToProps)(App);

export default AppConnected;
