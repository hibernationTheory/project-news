import {
  RECEIVE_HEADLINES,
  RECEIVE_RESOURCES,
  RECEIVE_TAGS,
  SEARCH_HEADLINES,
  SELECT_TAGS
} from "../constants/actionTypes";
import { get } from "../utils/Client";

function receiveHeadlinesAction(headlines) {
  return {
    type: RECEIVE_HEADLINES,
    payload: headlines
  };
}

export function requestHeadlinesAction() {
  return dispatch => {
    return get("api/headlines").then(headlines => {
      dispatch(receiveHeadlinesAction(headlines));
    });
  };
}

function receiveResourcesAction(resources) {
  return {
    type: RECEIVE_RESOURCES,
    payload: resources
  };
}

export function requestResourcesAction() {
  return dispatch => {
    return get("api/resources").then(resources => {
      dispatch(receiveResourcesAction(resources));
    });
  };
}

function receiveTagsAction(tags) {
  return {
    type: RECEIVE_TAGS,
    payload: tags
  };
}

export function requestTagsAction() {
  return dispatch => {
    return get("api/tags").then(tags => {
      dispatch(receiveTagsAction(tags));
    });
  };
}

export function searchHeadlinesAction(input) {
  return {
    type: SEARCH_HEADLINES,
    payload: input
  };
}

export function selectTagsAction(selectedTags) {
  return {
    type: SELECT_TAGS,
    payload: selectedTags
  };
}
