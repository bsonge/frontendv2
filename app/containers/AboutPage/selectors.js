import { createSelector } from 'reselect';

/**
 * Direct selector to the aboutPage state domain
 */
const selectAboutPageDomain = (state) => state.get('aboutPage');

/**
 * Other specific selectors
 */


/**
 * Default selector used by AboutPage
 */

const makeSelectAboutPage = () => createSelector(
  selectAboutPageDomain,
  (substate) => substate.toJS()
);

export default makeSelectAboutPage;
export {
  selectAboutPageDomain,
};
