/**
*
* ToggleView
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import { ToggleButtonGroup, ToggleButton } from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';
import messages from './messages';

class ToggleView extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props, context) {
    super(props, context);

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.props.handler(e);
  }
  render() {
    return (
      <div>
        <ToggleButtonGroup type="radio" name="options" defaultValue="list" onChange={this.handleChange}>
          <ToggleButton value="list"><FormattedMessage {...messages.list} /></ToggleButton> <ToggleButton value="table"><FormattedMessage {...messages.table} /></ToggleButton>
        </ToggleButtonGroup>
      </div>
    );
  }
}

ToggleView.propTypes = {
  handler: PropTypes.func.isRequired,
};

export default ToggleView;
