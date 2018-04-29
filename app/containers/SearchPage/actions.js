/*
 *
 * SearchPage actions
 *
 */

import {
  DEFAULT_ACTION,
  BASIC_SEARCH,
  ERROR_SEARCH,
  SEARCH_RESULTS,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function basicSearch(query) {
  return {
    type: BASIC_SEARCH,
    query,
  };
}

export function errorSearch(err) {
  return {
    type: ERROR_SEARCH,
    err,
  };
}

export function searchResults(payload) {
  return {
    type: SEARCH_RESULTS,
    payload,
  };
}
