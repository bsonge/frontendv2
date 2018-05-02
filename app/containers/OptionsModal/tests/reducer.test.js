
import { fromJS } from 'immutable';
import optionsModalReducer from '../reducer';

describe('optionsModalReducer', () => {
  it('returns the initial state', () => {
    expect(optionsModalReducer(undefined, {})).toEqual(fromJS({}));
  });
});
