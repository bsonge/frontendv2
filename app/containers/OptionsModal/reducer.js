/*
 *
 * OptionsModal reducer
 *
 */

import { fromJS } from 'immutable';
import {
  DEFAULT_ACTION,
  MODEL_DETAIL_RESULTS,
  MODEL_DETAIL_ERROR,
} from './constants';

const initialState = fromJS({
  modelDetails: {},
  error: {
    errored: false,
    msg: '',
  },
});

function optionsModalReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case MODEL_DETAIL_RESULTS:
      return state
        .setIn(['err', 'errored'], false)
        .setIn(['modelDetails', `${action.modelName}`], fromJS(action.payload));
    case MODEL_DETAIL_ERROR:
      return state
        .setIn(['err', 'error'], true)
        .setIn(['err', 'msg'], action.err);
    default:
      return state;
  }
}

export default optionsModalReducer;
