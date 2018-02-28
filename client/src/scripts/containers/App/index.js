import React, { Component } from "react";
import { connect } from "react-redux";

import {
  requestHeadlinesAction,
  requestResourcesAction,
  searchHeadlinesAction,
  requestTagsAction
} from "../../actions";
import Client from "../../utils/Client";

import Tags from "../../components/Tags";

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
      return <NewsItem key={url} title={title} description={description} />;
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
    this.props.requestTags();
  };

  _onChange = e => {
    const value = e.target.value;
    this.props.searchHeadlines(value);
  };

  _processHeadlines = searchQuery => {
    const { headlines, resources } = this.props;
    if (headlines.length === 0 || Object.keys(resources).length === 0) {
      return {};
    }

    const headlinesByResource = {};
    headlines.forEach(headline => {
      if (!headlinesByResource[headline.source.id]) {
        headlinesByResource[headline.source.id] = [];
      }

      // filter based on search query.
      searchQuery = searchQuery.toLowerCase();
      if (
        searchQuery &&
        headline.description.toLowerCase().indexOf(searchQuery) < 0 &&
        headline.title.toLowerCase().indexOf(searchQuery) < 0
      ) {
        return;
      }

      headlinesByResource[headline.source.id].push(headline);
    });

    const headlinesByIdeology = {};
    Object.keys(headlinesByResource).forEach(resource => {
      const ideology = resources[resource].ideology;
      if (!headlinesByIdeology[ideology]) {
        headlinesByIdeology[ideology] = [];
      }
      headlinesByIdeology[ideology].push(...headlinesByResource[resource]);
    });

    return headlinesByIdeology;
  };

  render = () => {
    const { searchQuery, tags } = this.props;
    const headlinesByIdeology = this._processHeadlines(searchQuery);

    return (
      <div className="app">
        <input type="text" onChange={this._onChange} value={searchQuery} />
        <Tags tags={tags} />
        <div className="app__body">
          {headlinesByIdeology.liberal && (
            <NewsBox news={headlinesByIdeology.liberal} />
          )}
          {headlinesByIdeology.conservative && (
            <NewsBox news={headlinesByIdeology.conservative} />
          )}
        </div>
      </div>
    );
  };
}

const mapStateToProps = state => ({
  headlines: state.news.headlines,
  resources: state.news.resources,
  searchQuery: state.news.searchQuery,
  tags: state.news.tags
});
const mapDispatchToProps = dispatch => ({
  requestHeadlines: () => dispatch(requestHeadlinesAction()),
  requestResources: () => dispatch(requestResourcesAction()),
  requestTags: () => dispatch(requestTagsAction()),
  searchHeadlines: input => dispatch(searchHeadlinesAction(input))
});

const AppConnected = connect(mapStateToProps, mapDispatchToProps)(App);

export default AppConnected;
