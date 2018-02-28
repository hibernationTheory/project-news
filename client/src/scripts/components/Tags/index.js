import React, { Component } from "react";
import { connect } from "react-redux";

import { selectTagsAction } from "../../actions";

import Tag from "../Tag";

class Tags extends Component {
  _handleClick = tag => {
    const currentTags = [...this.props.selectedTags];
    const tagIndex = currentTags.indexOf(tag);
    if (tagIndex > -1) {
      currentTags.splice(tagIndex, 1);
    } else {
      currentTags.push(tag);
    }

    this.props.selectTags(currentTags);
  };

  render() {
    console.log(this.props.selectedTags);
    const { tags } = this.props;
    const tagItems = Object.keys(tags).map(tag => (
      <Tag key={tag} name={tag} onClick={() => this._handleClick(tag)} />
    ));
    return <div className="tags">{tagItems}</div>;
  }
}

const mapStateToProps = state => ({
  selectedTags: state.news.selectedTags
});
const mapDispatchToProps = dispatch => ({
  selectTags: selectedTags => dispatch(selectTagsAction(selectedTags))
});

export default connect(mapStateToProps, mapDispatchToProps)(Tags);
