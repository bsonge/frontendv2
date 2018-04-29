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
  ADVANCED_SEARCH,
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

export function advancedSearch(modelName, serializedQuery) {
  return {
    type: ADVANCED_SEARCH,
    model: modelName,
    query: serializedQuery,
  };
}

export function errorSearch(err) {
  return {
    type: ERROR_SEARCH,
    err,
  };
}

export function searchResults(payload, searchType) {
  return {
    type: SEARCH_RESULTS,
    payload,
    searchType,
  };
}
