/**
*
* AdvancedOption
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import {
  Row,
  Col,
  FormGroup,
  ControlLabel,
  FormControl,
  Panel,
} from 'react-bootstrap';
// import styled from 'styled-components';
import { STRING_TYPE } from 'containers/OptionsModal/constants';
import { FormattedMessage } from 'react-intl';
import { CompareTypes } from 'utils/advancedQuery';
// import messages from './messages';

class AdvancedOption extends React.Component { // eslint-disable-line react/prefer-stateless-function
  findField(fields, field) {
    let returnObj = null;
    fields.forEach((obj) => {
      if (field === obj.value) {
        returnObj = obj;
      }
    });
    return returnObj;
  }

  renderOption(compareType) {
    switch (compareType) {
      case CompareTypes.between:
      case CompareTypes.lessThan:
      case CompareTypes.greaterThan:
        return this.renderNumericalOption(compareType);
      case CompareTypes.contains:
      case CompareTypes.startsWith:
      case CompareTypes.endsWith:
        return this.renderStringOption(compareType);
      default:
        throw new Error('Incompatible compare type');
    }
  }
  renderNumericalOption(compareType) {
    const { handleValueChange, id } = this.props;
    const data = this.props.data.data;
    switch (compareType) {
      case CompareTypes.between:
        return (
          <div>
            <Col sm={2} smOffset={1}>
              <FormGroup controlId={'formControlAdvancedOptionBetween'} >
                <ControlLabel>
                  <FormattedMessage id={'app/containers/OptionsModal/CompareTypeBetween0'} defaultMessage={'Min'} />
                </ControlLabel>
                <FormControl type="number" placeholder="0" onChange={(e) => handleValueChange(e, id, 0)} value={data[0]} />
              </FormGroup>
            </Col>
            <Col sm={2} smOffset={1}>
              <FormGroup controlId={'formControlAdvancedOptionBetween'} >
                <ControlLabel>
                  <FormattedMessage id={'app/containers/OptionsModal/CompareTypeBetween1'} defaultMessage={'Max'} />
                </ControlLabel>
                <FormControl type="number" placeholder="100" onChange={(e) => handleValueChange(e, id, 1)} value={data[1]} />
              </FormGroup>
            </Col>
          </div>
        );
      case CompareTypes.lessThan:
        return (
          <Col sm={2} smOffset={3}>
            <FormGroup controlId={'formControlAdvancedOptionLessThan'} >
              <ControlLabel>
                <FormattedMessage id={'app/containers/OptionsModal/CompareTypeLessThan'} defaultMessage={'Less Than'} />
              </ControlLabel>
              <FormControl type="number" placeholder="0" onChange={(e) => handleValueChange(e, id, 0)} value={data} />
            </FormGroup>
          </Col>
        );
      case CompareTypes.greaterThan:
        return (
          <Col sm={2} smOffset={3}>
            <FormGroup controlId={'formControlAdvancedOptionGreaterThan'} >
              <ControlLabel>
                <FormattedMessage id={'app/containers/OptionsModal/CompareTypeGreaterThan'} defaultMessage={'Greater Than'} />
              </ControlLabel>
              <FormControl type="number" placeholder="0" onChange={(e) => handleValueChange(e, id, 0)} value={data} />
            </FormGroup>
          </Col>
        );
      default:
        return (
          <Col sm={2} smOffset={3}>
            <FormGroup controlId={'formControlAdvancedOptionGreaterThan'} >
              <ControlLabel>
                <FormattedMessage id={'app/containers/OptionsModal/CompareTypeGreaterThan'} defaultMessage={'Greater Than'} />
              </ControlLabel>
              <FormControl type="number" placeholder="0" onChange={(e) => handleValueChange(e, id, 0)} value={data} />
            </FormGroup>
          </Col>
        );
    }
  }

  renderStringOption(compareType) {
    let message;
    switch (compareType) {
      case CompareTypes.contains:
        message = 'Contains';
        break;
      case CompareTypes.startsWith:
        message = 'Starts with';
        break;
      case CompareTypes.endsWith:
        message = 'Ends with';
        break;
      default:
        message = 'Contains';
        break;
    }
    const { handleValueChange, id } = this.props;
    const data = this.props.data.data;
    return (
      <Col sm={2} smOffset={3}>
        <FormGroup controlId={`formControlAdvancedOption${compareType}`} >
          <ControlLabel>
            <FormattedMessage id={`app/containers/OptionsModal/CompareType${compareType}`} defaultMessage={message} />
          </ControlLabel>
          <FormControl type="text" placeholder="Search term" onChange={(e) => handleValueChange(e, id, 0)} value={data} />
        </FormGroup>
      </Col>
    );
  }

  render() {
    const { id, dataFields, data } = this.props;
    const { handleCompareChange, handleFieldChange } = this.props;
    const fieldInfo = this.findField(dataFields, id);
    let compareOptions;
    if (fieldInfo) {
      compareOptions = fieldInfo.type === STRING_TYPE ? [
        <option value={CompareTypes.contains}>Contains</option>,
        <option value={CompareTypes.startsWith}>Starts With</option>,
        <option value={CompareTypes.endsWith}>Ends With</option>,
      ] : [
        <option value={CompareTypes.between}>Between</option>,
        <option value={CompareTypes.lessThan}>Less Than</option>,
        <option value={CompareTypes.greaterThan}>Greater Than</option>,
      ];
    }
    const fieldOptions = dataFields.map((option) => (
      <option key={`${option.value}`} value={option.value}>{option.text}</option>
    ));
    return (
      <Panel>
        <Row>
          <Col sm={4} smOffset={4}>
            <FormGroup controlId={`formControlAdvancedOption${id}`} >
              <ControlLabel>
                <FormattedMessage id={`app/containers/OptionsModal/FieldLabel${id}`} defaultMessage={'DataField'} />
              </ControlLabel>
              <FormControl componentClass="select" placeholder="DataField" value={id} onChange={(e) => handleFieldChange(e, id)}>
                <option default value="select">Select</option>
                { fieldOptions }
              </FormControl>
            </FormGroup>
          </Col>
        </Row>
        <Row>
          { fieldInfo ?
            <Col sm={4} smOffset={1}>
              <FormGroup controlId={`formControlAdvancedOption${id}`} >
                <ControlLabel>
                  <FormattedMessage id={`app/containers/OptionsModal/CompareType${id}`} defaultMessage={'Compare Type'} />
                </ControlLabel>
                <FormControl componentClass="select" placeholder="Compare Type" value={data.compareType} onChange={(e) => handleCompareChange(e, id)}>
                  {compareOptions}
                </FormControl>
              </FormGroup>
            </Col>
          : ''}
          {
            fieldInfo && this.renderOption(data.compareType)
          }
        </Row>
      </Panel>
    );
  }
}

AdvancedOption.propTypes = {
  id: PropTypes.string.isRequired,
  dataFields: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.string,
    text: PropTypes.string,
  })).isRequired,
  data: PropTypes.object.isRequired,
  handleCompareChange: PropTypes.func.isRequired,
  handleFieldChange: PropTypes.func.isRequired,
  handleValueChange: PropTypes.func.isRequired,
};

export default AdvancedOption;
