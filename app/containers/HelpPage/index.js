/**
 *
 * HelpPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectHelpPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

export class HelpPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
        <Helmet>
          <title>HelpPage</title>
          <meta name="description" content="Description of HelpPage" />
        </Helmet>
        <FormattedMessage {...messages.header} />
      </div>
    );
  }
}

HelpPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  helppage: makeSelectHelpPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'helpPage', reducer });
const withSaga = injectSaga({ key: 'helpPage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(HelpPage);
