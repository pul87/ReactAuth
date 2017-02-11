import axios from 'axios';
import { browserHistory } from 'react-router';
import { AUTH_USER, AUTH_ERROR, UNAUTH_USER } from './types';

const ROOT_URL = 'http://localhost:3000';

export function signInUser(email, password) {
  // Submit email and password to the server
  return function(dispatch){
    axios.post(`${ROOT_URL}/signin`, { email, password })
    .then((response)=>{
      // Update state to indicate user is authenticated
      dispatch({ type: AUTH_USER });
      // Save jwt token
      localStorage.setItem('token', response.data.token);
      // Redirect to the route '/feature'
      browserHistory.push('/feature');
    })
    .catch((err)=>{
      // Show an error to the user
      dispatch(authError('Bad Login Info'));
    });
  }
}

export function signUpUser(email, password) {
  return function(dispatch) {
      axios.post(`${ROOT_URL}/signup`, { email, password })
      .then( response =>{
        dispatch({ type: AUTH_USER });
        localStorage.setItem('token', response.data.token);
        browserHistory.push('/feature');
      })
      .catch( error => {
        dispatch(authError(error.response.data.error));
      });
  };
}

export function signOutUser() {
  return function(dispatch) {
    // delete the token in the localStorage
    localStorage.removeItem('token');
    // return action of type UNAUTH_USER that will change the authenticated state
    dispatch({ type: UNAUTH_USER });
  };
}

export function authError(error) {
  return {
    type: AUTH_ERROR,
    payload: error
  };
}
