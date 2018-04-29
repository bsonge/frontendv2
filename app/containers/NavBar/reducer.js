/*
 *
 * NavBar reducer
 *
 */

import { fromJS } from 'immutable';
import {
  DEFAULT_ACTION,
  LOG_IN_SUCCESS,
  LOG_IN_ERROR,
  LOG_OUT,
} from './constants';

const initialState = fromJS({
  prymaryRoutes: ['about', 'help', 'search'],
  user: {
    loggedIn: false,
    role: '',
    token: '',
  },
  err: {
    errored: false,
    msg: '',
  },
});

function navBarReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case LOG_IN_SUCCESS:
      return state
        .setIn(['user', 'token'], action.token)
        .setIn(['user', 'loggedIn'], true)
        .setIn(['user', 'role'], action.role)
        .setIn(['err', 'errored'], false);
    case LOG_IN_ERROR:
      return state
        .setIn(['err', 'msg'], action.err)
        .setIn(['err', 'errored'], true);
    case LOG_OUT:
      return state
        .setIn(['user', 'token'], '')
        .setIn(['user', 'loggedIn'], false)
        .setIn(['user', 'role'], '');
    default:
      return state;
  }
}

export default navBarReducer;
