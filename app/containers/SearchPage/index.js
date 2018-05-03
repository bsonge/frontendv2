/**
 *
 * SearchPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Nav, NavItem, Panel, Col, Row } from 'react-bootstrap';
import ItemTable from 'components/ItemTable';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectSearchPage, { makeSelectSearchResults, makeSelectSearchType, makeSelectSearchedQuery } from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import { basicSearch } from './actions';

export class SearchPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.tableNames = ['No Results for Current Query'];
    this.handleSelect = this.handleSelect.bind(this);
    let query = props.location.search;
    if (query.length > 3) {
      query = query.slice(3);
      props.dispatch(basicSearch(query));
    }

    this.state = {
      currentTable: 0,
    };
  }

  handleSelect(table) {
    this.setState({ currentTable: table });
  }

  render() {
    // Results will be an array for advanced search
    // and an object for basic
    const needTabs = !Array.isArray(this.props.results);
    const tabs = [];
    let itemTable = null;
    if (!needTabs) {
      tabs.push(
        <NavItem eventKey={0} key={1} active>
          {this.props.searchType}
        </NavItem>
      );

      itemTable = (
        <ItemTable data={this.props.results} />
      );
    } else {
      this.tableNames = Object.keys(this.props.results);
      this.tableNames.forEach((elm, idx) => {
        if (idx === this.state.currentTable) {
          tabs.push(
            <NavItem eventKey={idx} key={idx.toString()} active>
              {elm}
            </NavItem>
          );
        } else {
          tabs.push(
            <NavItem eventKey={idx} key={idx.toString()}>
              {elm}
            </NavItem>
          );
        }
      });

      if (this.tableNames.length !== 0 && this.props.results[this.tableNames[this.state.currentTable]].length !== 0) {
        itemTable = (
          <ItemTable data={this.props.results[this.tableNames[this.state.currentTable]]} />
        );
      } else {
        itemTable = (
          <Row style={{ padding: '20px' }}>
            <Col md={6} mdOffset={3}>
              <Panel bsStyle="info">
                <Panel.Heading>
                  <Panel.Title componentClass="h3">
                    <FormattedMessage {...messages.noResults} />
                  </Panel.Title>
                </Panel.Heading>
              </Panel>
            </Col>
          </Row>
        );
      }
    }

    return (
      <div style={{ marginTop: '50px' }}>
        <Row>
          <Col xs={10} xsOffset={1}>
            <Panel bsStyle="info">
              <Panel.Body>
                <FormattedMessage
                  id="app.components.SearchPage.querySearched"
                  defaultMessage={`Showing results for search: ${this.props.searchedQuery}`}
                />
              </Panel.Body>
            </Panel>
          </Col>
        </Row>
        <Row>
          <Col xs={10} xsOffset={1}>
            <Helmet>
              <title>SearchPage</title>
              <meta name="description" content="Description of SearchPage" />
            </Helmet>
            {
              (tabs.length !== 0) ?
              (<Nav bsStyle="tabs" onSelect={(k) => this.handleSelect(k)}>
                {tabs}
              </Nav>) : ''
            }
            <Panel>
              {itemTable}
            </Panel>
          </Col>
        </Row>
      </div>
    );
  }
}

SearchPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  results: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
  ]).isRequired,
  location: PropTypes.shape({
    search: PropTypes.string.isRequired,
  }),
  searchType: PropTypes.string.isRequired,
  searchedQuery: PropTypes.string.isRequired,
};

const mapStateToProps = createStructuredSelector({
  searchpage: makeSelectSearchPage(),
  results: makeSelectSearchResults(),
  searchType: makeSelectSearchType(),
  searchedQuery: makeSelectSearchedQuery(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'searchPage', reducer });
const withSaga = injectSaga({ key: 'searchPage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(SearchPage);
