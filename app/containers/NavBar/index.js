/**
 *
 * NavBar
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { Link } from 'react-router-dom';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { makeSelectLoggedIn, makeSelectRoutes } from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import { logout } from './actions';

export class NavBar extends React.Component { // eslint-disable-line react/prefer-stateless-function
  logout() {
    this.props.dispatch(logout());
  }

  render() {
    const routes = [];
    this.props.routes.forEach((elm, idx) =>
      routes.push(
        <LinkContainer to={`/${elm}`} key={idx.toString()}>
          <NavItem key={idx.toString()}>
            <FormattedMessage id={idx.toString()} defaultMessage={elm} />
          </NavItem>
        </LinkContainer>
      )
    );

    return (
      <Navbar inverse collapseOnSelect fixedTop onSelect={this.navigate}>
        <Navbar.Header >
          <Navbar.Brand>
            <Link to="/">
              <FormattedMessage {...messages.siteTitle} />
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
            {routes}
          </Nav>
          <Nav bsStyle="pills" pullRight>
            {
              this.props.loggedIn ?
                <LinkContainer to="/">
                  <NavItem eventKey={1} onClick={() => this.logout()}>
                    <FormattedMessage {...messages.logOut} />
                  </NavItem>
                </LinkContainer> :
                <LinkContainer to="/login">
                  <NavItem eventKey={2}>
                    <FormattedMessage {...messages.logIn} />
                  </NavItem>
                </LinkContainer>
            }
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

NavBar.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
  routes: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  loggedIn: makeSelectLoggedIn(),
  routes: makeSelectRoutes(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps, null, { pure: false });

const withReducer = injectReducer({ key: 'navBar', reducer });
const withSaga = injectSaga({ key: 'navBar', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(NavBar);
