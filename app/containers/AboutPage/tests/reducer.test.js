
import { fromJS } from 'immutable';
import aboutPageReducer from '../reducer';

describe('aboutPageReducer', () => {
  it('returns the initial state', () => {
    expect(aboutPageReducer(undefined, {})).toEqual(fromJS({}));
  });
});
