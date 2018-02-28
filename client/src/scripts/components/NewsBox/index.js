import React, { Component } from "react";

import NewsItem from "../NewsItem";

class NewsBox extends Component {
  render() {
    const { news } = this.props;
    const newsItems = news.map(newsItem => {
      const { description, title, url } = newsItem;
      return <NewsItem key={url} title={title} description={description} />;
    });

    return <div className="news-box">{newsItems}</div>;
  }
}

export default NewsBox;
