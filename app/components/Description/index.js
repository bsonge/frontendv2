/**
*
* Description: This displays an inputted message.  If you put in a short and long message, it will display
* the short by default and a more button that switches it to the long one.
*
* Parameters: Name = a string that identifies the formatted messages
*             Text = an array that can contain one or more of the following: short, long, and header
*
*/

import React from 'react';

import PropType from 'prop-types';
import { Panel, Button } from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';

class Description extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = { expanded: false };
    this.flip = this.flip.bind(this);
  }
  flip() {
    const old = this.state.expanded;
    this.setState({ expanded: !old });
  }
  render() {
    const { short, long, header } = this.props.text;
    const button = <Button className="pull-right" bsStyle="link" onClick={() => { this.flip(); }}>{this.state.expanded ? 'Less' : 'More' }</Button>;
    const body = () => {
      if (short && long) { // if both are defined
        return (<Panel.Body><FormattedMessage id={`app.components.Description.${this.props.name}B`} defaultMessage={this.state.expanded ? long : short} />{button}</Panel.Body>);
      } else if (!short) {
        return (<Panel.Body><FormattedMessage id={`app.components.Description.${this.props.name}L`} defaultMessage={long} /></Panel.Body>);
      }
      return (<Panel.Body><FormattedMessage id={`app.components.Description.${this.props.name}S`} defaultMessage={short} /></Panel.Body>);
    };
    return (
      <div {...this.props.innerStyle}>
        {header ? <Panel.Heading><FormattedMessage id={`app.components.Description.${this.props.name}H`} defaultMessage={header} /></Panel.Heading> : ''}
        {body()}
      </div>
    );
  }
}

Description.propTypes = {
  text: PropType.shape({
    short: PropType.string,
    long: PropType.string,
    header: PropType.string,
  }).isRequired,
  innerStyle: PropType.object,
  name: PropType.string.isRequired,
};

export default Description;
