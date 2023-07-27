/**
 * This function authenticates the user against the backend API.
 *
 * @param {string} email - The email of the user trying to log in.
 * @param {string} password - The password of the user trying to log in.
 *
 * @returns {Promise} A Promise that resolves to the server's response as a JavaScript object.
 */
export const login = (email, password) =>
  fetch(process.env.REACT_APP_BACKEND_API + 'user/login', {
    method: 'POST', // HTTP method
    headers: {
      // HTTP headers
      Accept: 'application/json', // informs the server about the types of data that can be sent back
      'Content-Type': 'application/json', // informs the server about the type of data being sent (in the body)
    },
    body: JSON.stringify({ email, password }), // body data type must match 'Content-Type' header
  })
    .then((response) => response.json()) // parses JSON response into native JavaScript objects
    .then((data) => {
      return data; // returns data received from the server
    });

export const getData = (token) =>
  fetch(process.env.REACT_APP_BACKEND_API + 'user/profile', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      Authorization: 'Bearer ' + token,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      return data;
    });

export const editProfile = (firstName, lastName, token) =>
  fetch(process.env.REACT_APP_BACKEND_API + 'user/profile', {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    },
    body: JSON.stringify({ firstName, lastName }),
  });
