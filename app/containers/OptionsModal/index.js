/**
 *
 * OptionsModal
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Modal,
         Row,
         Button,
         Col,
         FormGroup,
         ControlLabel,
         FormControl,
         Panel,
       } from 'react-bootstrap';


import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectOptionsModal from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

export class OptionsModal extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.helper = this.props.helper;
  }


  render() {
    const data = Object.keys(this.helper.currentQuery).map((key, idx) => (
      <Panel key={key}>
        <Row>
          <Col sm={4} smOffset={4}>
            <FormGroup controlId={`formControlAdvancedOption${key + idx.toString()}`} >
              <ControlLabel>
                <FormattedMessage id={`app/containers/OptionsModal/FieldLabel${key}`} defaultMessage={'DataField'} />
              </ControlLabel>
              <FormControl componentClass="select" placeholder="DataField">
                <option value="Totally a field">Field</option>
                <option value="Totally a different field">Other Field</option>
              </FormControl>
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col sm={4} smOffset={1}>
            <FormGroup controlId={`formControlAdvancedOption${key + idx.toString()}`} >
              <ControlLabel>
                <FormattedMessage id={`app/containers/OptionsModal/CompareType${key}`} defaultMessage={'Compare Type'} />
              </ControlLabel>
              <FormControl componentClass="select" placeholder="Compare Type">
                <option value="Totally a field">between</option>
                <option value="Totally a different field">less than</option>
              </FormControl>
            </FormGroup>
          </Col>
          {
            idx === 1 ?
            (<Col sm={2} smOffset={3}>
              <FormGroup controlId={`formControlAdvancedOption${key + idx.toString()}`} >
                <ControlLabel>
                  <FormattedMessage id={`app/containers/OptionsModal/CompareType${key}`} defaultMessage={'Min'} />
                </ControlLabel>
                <FormControl type="number" placeholder="0" />
              </FormGroup>
            </Col>)
            :
            (<div><Col sm={2} smOffset={1}>
              <FormGroup controlId={`formControlAdvancedOption${key + idx.toString()}`} >
                <ControlLabel>
                  <FormattedMessage id={`app/containers/OptionsModal/CompareType${key}`} defaultMessage={'Min'} />
                </ControlLabel>
                <FormControl type="number" placeholder="0" />
              </FormGroup>
            </Col>
              <Col sm={2} smOffset={1}>
                <FormGroup controlId={`formControlAdvancedOption${key + idx.toString()}`} >
                  <ControlLabel>
                    <FormattedMessage id={`app/containers/OptionsModal/CompareType${key}`} defaultMessage={'Max'} />
                  </ControlLabel>
                  <FormControl type="number" placeholder="100" />
                </FormGroup>
              </Col></div>)
          }
        </Row>
      </Panel>)
    );
    return (
      <Modal
        show={this.props.show}
        onHide={this.props.onHide}
        bsSize="large"
        aria-labelledby="contained-modal-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-lg">
            <FormattedMessage {...messages.header} />
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col sm={5} smOffset={1}>
              <Button bsStyle="success">Add Search Option</Button>
            </Col>
            <Col sm={3} smOffset={3} >
              <Button bsStyle="primary">Save Options</Button>
            </Col>
          </Row>
          <Row>
            <Col sm={4} smOffset={4}>
              <FormGroup controlId={'formControlAdvancedOptionmodel'} >
                <ControlLabel>
                  <FormattedMessage id={'app/containers/OptionsModal/ModelLabel'} defaultMessage={'Model Field'} />
                </ControlLabel>
                <FormControl componentClass="select" placeholder="ModelName">
                  <option value="Totally a model">Field</option>
                  <option value="Totally a different model">Other model</option>
                </FormControl>
              </FormGroup>
            </Col>
          </Row>
          { data }
        </Modal.Body>
      </Modal>
    );
  }
}

OptionsModal.propTypes = {
  dispatch: PropTypes.func,
  show: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired,
  helper: PropTypes.object.isRequired,
};

const mapStateToProps = createStructuredSelector({
  optionsmodal: makeSelectOptionsModal(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'optionsModal', reducer });
const withSaga = injectSaga({ key: 'optionsModal', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(OptionsModal);
