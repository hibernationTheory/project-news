import { combineReducers } from "redux";
import {
  RECEIVE_HEADLINES,
  RECEIVE_RESOURCES,
  RECEIVE_TAGS,
  SEARCH_HEADLINES,
  SELECT_TAGS
} from "../constants/actionTypes";

const defaultState = {
  headlines: [],
  resources: {},
  searchQuery: "",
  tags: {},
  selectedTags: []
};

const newsReducer = (state = defaultState, action) => {
  switch (action.type) {
    case RECEIVE_HEADLINES:
      return { ...state, headlines: action.payload };
    case RECEIVE_RESOURCES:
      return { ...state, resources: action.payload };
    case RECEIVE_TAGS:
      return { ...state, tags: action.payload };
    case SEARCH_HEADLINES:
      return { ...state, searchQuery: action.payload };
    case SELECT_TAGS:
      return { ...state, selectedTags: action.payload };
    default:
      return state;
  }
};

const logReducer = (state = {}, action) => {
  console.log(action);
  return state;
};

const rootReducer = combineReducers({
  news: newsReducer,
  log: logReducer
});

export default rootReducer;
