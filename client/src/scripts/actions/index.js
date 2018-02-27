import {
  RECEIVE_HEADLINES,
  REQUEST_HEADLINES,
  RECEIVE_RESOURCES,
  REQUEST_RESOURCES,
  SEARCH_HEADLINES
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

export function searchHeadlinesAction(input) {
  return {
    type: SEARCH_HEADLINES,
    payload: input
  };
}
