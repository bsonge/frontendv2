import { call, takeLatest, put } from 'redux-saga/effects';
import { API_URL } from 'containers/App/constants';
import request from 'utils/request';

import { BASIC_SEARCH } from './constants';
import { searchResults, errorSearch } from './actions';

export function* basicSearch(action) {
  const requestUrl = `${API_URL}/search/basic?q=${action.query}`;
  const options = {
    method: 'GET',
  };

  try {
    const data = yield call(request, requestUrl, options);
    yield put(searchResults(data));
  } catch (err) {
    yield put(errorSearch(err));
  }
}

// Individual exports for testing
export default function* defaultSaga() {
  yield takeLatest(BASIC_SEARCH, basicSearch);
}
