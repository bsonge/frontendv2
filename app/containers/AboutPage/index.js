/**
 *
 * AboutPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import Description from 'components/Description';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectAboutPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

export class AboutPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    const desc = 'ChemMOA (or Chemical Mode of Action) is a database designed to store and catalouge scientific studies relating to chemicals and toxicity.  This website is owned and operate by the United States Environment Protection Agency (EPA)* with the purpose of catalogueing chemicals and toxicity information, targets, ane experiments relating to such information.\n\n\n\n';

    return (
      <div>
        <Helmet>
          <title>About ChemMOA</title>
          <meta name="description" content="Description of AboutPage" />
        </Helmet>
        <Description long={desc} />
        <br /><br />
        <div style={{ fontSize: '.5em' }} ><FormattedMessage {...messages.disclaimer} /></div>
      </div>
    );
  }
}

AboutPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  aboutpage: makeSelectAboutPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'aboutPage', reducer });
const withSaga = injectSaga({ key: 'aboutPage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(AboutPage);
