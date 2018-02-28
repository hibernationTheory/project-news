import React, { Component } from "react";

class NewsItem extends Component {
  render() {
    return (
      <div className="newsbox-item">
        <div>{this.props.title}</div>
        <div>{this.props.description}</div>
      </div>
    );
  }
}

export default NewsItem;
