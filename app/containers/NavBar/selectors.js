import { createSelector } from 'reselect';

/**
 * Direct selector to the navBar state domain
 */
const selectNavBarDomain = (state) => state.get('navBar');

/**
 * Other specific selectors
 */
const makeSelectLoggedIn = () => createSelector(
  selectNavBarDomain,
  (substate) => substate.getIn(['user', 'loggedIn'])
);

const makeSelectRoutes = () => createSelector(
 selectNavBarDomain,
 (substate) => substate.get('prymaryRoutes')
);

const makeSelectToken = () => createSelector(
 selectNavBarDomain,
 (substate) => substate.getIn(['user', 'token'])
);

/**
 * Default selector used by NavBar
 */

const makeSelectNavBar = () => createSelector(
  selectNavBarDomain,
  (substate) => substate.toJS()
);

export default makeSelectNavBar;
export {
  selectNavBarDomain,
  makeSelectLoggedIn,
  makeSelectRoutes,
  makeSelectToken,
};
