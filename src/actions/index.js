import axios from 'axios';

const ROOT_URL = 'http://localhost:3000';

export function signInUser(email, password) {
  console.log(email,password);
  axios.post(`${ROOT_URL}/signin`, { email, password });
  return function(dispatch){

  }
}
