import { takeLatest, call, put } from 'redux-saga/effects';
import { API_URL } from 'containers/App/constants';
import request from 'utils/request';

import { MODEL_DETAILS } from './constants';
import { modelDetailResults, modelDetailError } from './actions';

export function* modelDetails(action) {
  const modelName = `${action.model}`;
  const requestUrl = `${API_URL}/model/?name=${modelName}`;
  const options = {
    method: 'GET',
  };

  try {
    const data = yield call(request, requestUrl, options);
    if (data.success) {
      yield put(modelDetailResults(data.payload, modelName));
    } else {
      throw new Error(data.err);
    }
  } catch (err) {
    yield put(modelDetailError(err));
  }
}

// Individual exports for testing
export default function* defaultSaga() {
  yield takeLatest(MODEL_DETAILS, modelDetails);
}
