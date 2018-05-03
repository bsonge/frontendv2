import { createSelector } from 'reselect';

/**
 * Direct selector to the helpPage state domain
 */
const selectHelpPageDomain = (state) => state.get('helpPage');

/**
 * Other specific selectors
 */


/**
 * Default selector used by HelpPage
 */

const makeSelectHelpPage = () => createSelector(
  selectHelpPageDomain,
  (substate) => substate.toJS()
);

export default makeSelectHelpPage;
export {
  selectHelpPageDomain,
};
