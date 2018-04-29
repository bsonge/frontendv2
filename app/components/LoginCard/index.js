/**
*
* LoginCard
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import { Well, FormControl, FormGroup, ControlLabel, Button } from 'react-bootstrap';

class LoginCard extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.results = {};
    this.submit = this.submit.bind(this);
    this.changeForm = this.changeForm.bind(this);
    this.state = {
      toggle: 'Register',
      current: 'Login',
    };
  }
  changeForm() {
    if (this.state.toggle === 'Register') {
      this.setState({ toggle: 'Login', current: 'Register' });
    } else {
      this.setState({ toggle: 'Register', current: 'Login' });
    }
  }
  submit(refs) {
    const formResults = (this.state.current === 'Login') ? {
      username: refs.username.value,
      password: refs.password.value,
    } : {
      username: refs.username.value,
      password: refs.password.value,
      firstName: refs.firstName.value,
      lastName: refs.lastName.value,
    };
    const formType = (this.state.current === 'Login') ? 'login' : 'register';
    this.props.handler(formType, formResults);
  }
  render() {
    // map the ref
    const loginForm = (
      <FormGroup>
        <ControlLabel>Username</ControlLabel>
        <FormControl type="email" name="username" placeholder="example@example.com" inputRef={(ref) => { this.results.username = ref; }} />
        <ControlLabel>Password</ControlLabel>
        <FormControl type="password" name="password" placeholder="**********" inputRef={(ref) => { this.results.password = ref; }} />
      </FormGroup>);

    const registrationForm = (
      <FormGroup>
        <ControlLabel>Username</ControlLabel>
        <FormControl type="email" name="username" placeholder="example@example.com" inputRef={(ref) => { this.results.username = ref; }} />
        <ControlLabel>Password</ControlLabel>
        <FormControl type="password" name="password" placeholder="**********" inputRef={(ref) => { this.results.password = ref; }} />
        <ControlLabel>First Name</ControlLabel>
        <FormControl type="text" name="firstName" placeholder="John" inputRef={(ref) => { this.results.firstName = ref; }} />
        <ControlLabel>LastName</ControlLabel>
        <FormControl type="text" name="lastName" placeholder="Doe" inputRef={(ref) => { this.results.lastName = ref; }} />
      </FormGroup>);

    const form = (this.state.toggle === 'Register') ? loginForm : registrationForm;

    return (
      <div>
        <Well bsSize="small">
          <Well bsSize="small">{this.state.current}</Well>
          <form onSubmit={(evt) => { evt.preventDefault(); this.submit(this.results); }}>
            { form }
            <Button type="submit" bsStyle="primary">Submit</Button>
            <br />
            <br />
            <Button bsStyle="link" onClick={() => this.changeForm()}>Click here to {this.state.toggle}</Button>
          </form>
        </Well>
      </div>
    );
  }
}

LoginCard.propTypes = {
  handler: PropTypes.func.isRequired,
};

export default LoginCard;
