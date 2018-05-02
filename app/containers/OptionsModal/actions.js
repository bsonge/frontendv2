/*
 *
 * OptionsModal actions
 *
 */

import {
  DEFAULT_ACTION,
  MODEL_DETAILS,
  MODEL_DETAIL_RESULTS,
  MODEL_DETAIL_ERROR,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function modelDetails(modelName) {
  return {
    type: MODEL_DETAILS,
    model: modelName,
  };
}

export function modelDetailResults(payload, modelName) {
  return {
    type: MODEL_DETAIL_RESULTS,
    model: modelName,
    payload,
  };
}

export function modelDetailError(err) {
  return {
    type: MODEL_DETAIL_ERROR,
    err,
  };
}
