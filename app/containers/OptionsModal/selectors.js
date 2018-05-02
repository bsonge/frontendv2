import { createSelector } from 'reselect';

/**
 * Direct selector to the optionsModal state domain
 */
const selectOptionsModalDomain = (state) => state.get('optionsModal');

/**
 * Other specific selectors
 */


/**
 * Default selector used by OptionsModal
 */

const makeSelectOptionsModal = () => createSelector(
  selectOptionsModalDomain,
  (substate) => substate.toJS()
);

export default makeSelectOptionsModal;
export {
  selectOptionsModalDomain,
};
