import React, { Component } from "react";
import Client from "../utils/Client";

/*
 *  App View Component
 */
class App extends Component {
  constructor(...props) {
    super(...props);

    this.state = {
      value: "hello server"
    };

    this.onChange = this.onChange.bind(this);
    this.onClick = this.onClick.bind(this);
  }

  onChange(evt) {
    this.setState({
      value: evt.target.value
    });
  }

  onClick() {
    const val = this.state.value;

    Client.search(val).then(result => {
      console.log(result);
    });
  }

  render() {
    return (
      <div className="App">
        <div className="input-field">
          <input
            type="text"
            value={this.state.value}
            onChange={this.onChange}
          />
          <button onClick={this.onClick.bind(this)}>Test API</button>
        </div>
      </div>
    );
  }
}

export default App;
