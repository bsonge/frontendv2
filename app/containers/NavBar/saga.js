import { call, takeLatest } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import { basicSearch as basicSearchSaga } from 'containers/SearchPage/saga';
import { basicSearch as basicSearchAction } from 'containers/SearchPage/actions';

export function* search(action) {
  if (action.payload.pathname === '/search') {
    let query = action.payload.search;
    if (query.length > 3) {
      query = query.slice(3);
      yield call(basicSearchSaga, basicSearchAction(query));
    }
  }
}

// Individual exports for testing
export default function* defaultSaga() {
  yield takeLatest(LOCATION_CHANGE, search);
}
