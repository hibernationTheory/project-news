import { GET_HEADLINES } from "../constants/actionTypes";

function getHeadlinesAction(source = null) {
  return {
    type: GET_HEADLINES,
    payload: source
  };
}

export function getHeadlinesAsyncAction(source = null) {
  return dispatch => {
    return new Promise(resolve => {
      setTimeout(resolve, 1000);
    }).then(() => {
      dispatch(getHeadlinesAction(source));
    });
  };
}
