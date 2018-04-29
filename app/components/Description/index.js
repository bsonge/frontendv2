/**
*
* Description
*
*/

import React from 'react';
// import styled from 'styled-components';

import PropTypes from 'prop-types';
import { Panel } from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';
import messages from './messages';

class Description extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <Panel>
        <Panel.Heading><FormattedMessage {...messages.header} /></Panel.Heading>
        <Panel.Body>{this.props.description}</Panel.Body>
      </Panel>
    );
  }
}

Description.propTypes = {
  description: PropTypes.string.isRequired,
};

export default Description;
