/*
 *
 * SearchPage reducer
 *
 */

import { fromJS } from 'immutable';
import {
  DEFAULT_ACTION,
  ERROR_SEARCH,
  SEARCH_RESULTS,
} from './constants';

const initialState = fromJS({
  searchResults: {},
  searchType: '',
  searchedQuery: '',
  err: {
    errored: false,
    msg: '',
  },
});

function searchPageReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case ERROR_SEARCH:
      return state
        .setIn(['err', 'errored'], true)
        .setIn(['err', 'msg'], action.err);
    case SEARCH_RESULTS:
      return state
        .set('searchResults', fromJS(action.payload))
        .setIn(['err', 'errored'], false)
        .set('searchType', action.searchType)
        .set('searchedQuery', action.query);
    default:
      return state;
  }
}

export default searchPageReducer;
