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
import { goBack } from 'react-router-redux';
import { Navbar, Nav, NavItem, FormGroup, FormControl, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import arrowLeft from '@fortawesome/fontawesome-free-solid/faArrowLeft';
import { Link } from 'react-router-dom';
import { makeSelectLocation } from 'containers/App/selectors';
import { basicSearch } from 'containers/SearchPage/actions';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { makeSelectLoggedIn, makeSelectRoutes } from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import { logout } from './actions';


/**
 * This will act as the nav bar that will handle the global data
 * It will transform when on the search route to show a search bar
 */
export class NavBar extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.search = null;
    this.submit = this.submit.bind(this);
  }

  logout() {
    this.props.dispatch(logout());
  }

  submit() {
    if (this.search !== null) {
      this.props.dispatch(basicSearch(this.search.value));
    }
  }

  render() {
    const contents = [];
    const isSearch = this.props.location.pathname === '/search';
    if (!isSearch) {
      this.props.routes.forEach((elm, idx) =>
        contents.push(
          <LinkContainer to={`/${elm}`} key={idx.toString()}>
            <NavItem key={idx.toString()}>
              <FormattedMessage id={idx.toString()} defaultMessage={elm} />
            </NavItem>
          </LinkContainer>
        )
      );
    }

    return (
      <Navbar inverse collapseOnSelect fixedTop onSelect={this.navigate}>
        <Navbar.Header>
          {
            isSearch ?
              (
                <FontAwesomeIcon icon={arrowLeft} size="3x" color="white" onClick={() => this.props.dispatch(goBack())} />
              ) :
              (
                <Navbar.Brand>
                  <Link to="/">
                    <FormattedMessage {...messages.siteTitle} />
                  </Link>
                </Navbar.Brand>
              )
          }
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          {
            isSearch ?
              (
                <Navbar.Form pullLeft key={1}>
                  <form onSubmit={(evt) => { evt.preventDefault(); this.submit(); }} >
                    <FormGroup>
                      <FormControl type="text" placeholder="Search" inputRef={(ref) => { this.search = ref; }} />{' '}
                      <Button type="submit">Submit</Button>
                    </FormGroup>
                  </form>
                </Navbar.Form>
              ) :
              (
                <Nav>
                  { contents }
                </Nav>
              )
          }
          <Nav pullRight>
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
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
};

const mapStateToProps = createStructuredSelector({
  loggedIn: makeSelectLoggedIn(),
  routes: makeSelectRoutes(),
  location: makeSelectLocation(),
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
