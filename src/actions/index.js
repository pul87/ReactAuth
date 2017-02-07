import axios from 'axios';
import { browserHistory } from 'react-router';
import { AUTH_USER, AUTH_ERROR } from './types';

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

export function authError(error) {
  return {
    type: AUTH_ERROR,
    payload: error
  };
}
