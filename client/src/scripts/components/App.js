import React, { Component } from "react";
import { connect } from "react-redux";

import { requestHeadlinesAction, requestResourcesAction } from "../actions";
import Client from "../utils/Client";

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

class NewsBox extends Component {
  render() {
    const { news } = this.props;
    const newsItems = news.map(newsItem => {
      const { description, title, url } = newsItem;
      return <NewsItem key={url} title={title} description={url} />;
    });
    return <div className="newsbox">{newsItems}</div>;
  }
}

/*
 *  App View Component
 */
class App extends Component {
  componentDidMount = () => {
    this.props.requestHeadlines();
    this.props.requestResources();
  };

  _processHeadlines = () => {
    const { headlines, resources } = this.props;
    if (headlines.length === 0 || Object.keys(resources).length === 0) {
      return {};
    }

    const headlinesByResource = {};
    headlines.forEach(headline => {
      if (!headlinesByResource[headline.source.id]) {
        headlinesByResource[headline.source.id] = [];
      }
      headlinesByResource[headline.source.id].push(headline);
    });

    const headlinesByCategory = {};
    Object.keys(headlinesByResource).forEach(resource => {
      const category = resources[resource].category;
      if (!headlinesByCategory[category]) {
        headlinesByCategory[category] = [];
      }
      headlinesByCategory[category].push(...headlinesByResource[resource]);
    });

    return headlinesByCategory;
  };

  render = () => {
    const headlinesByCategory = this._processHeadlines();
    console.log(headlinesByCategory);

    return (
      <div className="App">
        {headlinesByCategory.conservative && (
          <NewsBox news={headlinesByCategory.conservative} />
        )}
        {headlinesByCategory.liberal && (
          <NewsBox news={headlinesByCategory.liberal} />
        )}
      </div>
    );
  };
}

const mapStateToProps = state => ({
  headlines: state.news.headlines,
  resources: state.news.resources
});
const mapDispatchToProps = dispatch => ({
  requestHeadlines: () => dispatch(requestHeadlinesAction()),
  requestResources: () => dispatch(requestResourcesAction())
});

const AppConnected = connect(mapStateToProps, mapDispatchToProps)(App);

export default AppConnected;
