import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import * as actions from '../../actions';

class SignUp extends Component {

  handleFormSubmit({ email, password }) {
    // Call action creator to sign up user!
    this.props.signUpUser(email, password);
  }

  renderAlert() {
    if ( this.props.errorMessage ) {
      return (
        <div className="alert alert-danger">
          <strong>Oops! </strong> { this.props.errorMessage }
        </div>
      );
    }
  }

  render() {
    const { handleSubmit, fields: { email, password, passwordConfirm }} = this.props;
    return (
      <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
        <fieldset className="form-group">
          <label>Email</label>
          <input className="form-control" type="text" { ...email} />
          { email.touched && email.error && <div className="error">{email.error}</div>}
        </fieldset>
        <fieldset className="form-group">
          <label>Password</label>
          <input className="form-control" type="password" { ...password} />
          { password.touched && password.error && <div className="error">{password.error}</div> }
        </fieldset>
        <fieldset className="form-group">
          <label>Confirm Password</label>
          <input className="form-control" type="password" { ...passwordConfirm} />
          { passwordConfirm.touched && passwordConfirm.error && <div className="error">{passwordConfirm.error}</div> }
        </fieldset>
        { this.renderAlert() }
        <button className="btn btn-primary" type="submit">Sign up!</button>
      </form>
    );
  }
}

function validate(values) {
  const errors = {};
  if ( !values.email )
    errors.email = 'Email required';
  if ( !values.password)
    errors.password = 'Password required';
  if ( !values.passwordConfirm )
    errors.passwordConfirm = 'Confirm password required';
  if ( values.password !== values.passwordConfirm )
    errors.passwordConfirm = 'Password and confirmPassowrd does not match';
  return errors;
}

function mapStateToProps(state) {
  return { errorMessage : state.auth.error };
}
export default reduxForm({
  form: 'signup',
  fields: ['email', 'password', 'passwordConfirm'],
  validate
},mapStateToProps, actions)(SignUp);
