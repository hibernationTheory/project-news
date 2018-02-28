import React, { Component } from "react";

class NewsItem extends Component {
  render() {
    return (
      <div className="news-item">
        <div className="news-item__title">{this.props.title}</div>
        <div className="news-item__description">{this.props.description}</div>
      </div>
    );
  }
}

export default NewsItem;
