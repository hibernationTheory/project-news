import React, { Component } from "react";

class Tag extends Component {
  render() {
    return (
      <button className="tag" onClick={this.props.onClick}>
        {this.props.name}
      </button>
    );
  }
}

export default Tag;
