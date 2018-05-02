/**
*
* ToggleView
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import { ToggleButtonGroup, ToggleButton } from 'react-bootstrap';

class ToggleView extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props, context) {
    super(props, context);

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.props.handler(e);
  }
  render() {
    const options = this.props.options.map((value, index) =>
      <ToggleButton key={index.toString()} value={value.value}>{value.label}</ToggleButton>
    );
    return (
      <div>
        <ToggleButtonGroup type="radio" name="options" defaultValue="list" onChange={this.handleChange}>
          { options }
        </ToggleButtonGroup>
      </div>
    );
  }
}

ToggleView.propTypes = {
  options: PropTypes.array.isRequired,
  handler: PropTypes.func.isRequired,
};

export default ToggleView;
