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

/**
 * This function retrieves the profile data of an authenticated user.
 *
 * @param {string} token - The authorization token for the user.
 *
 * @returns {Promise} A Promise that resolves to the server's response as a JavaScript object.
 */
export const getData = (token) =>
  fetch(process.env.REACT_APP_BACKEND_API + 'user/profile', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      Authorization: 'Bearer ' + token, // provides authorization via a bearer token
    },
  })
    .then((response) => response.json())
    .then((data) => {
      return data;
    });

/**
 * This function updates the profile data of an authenticated user.
 *
 * @param {string} firstName - The new first name of the user.
 * @param {string} lastName - The new last name of the user.
 * @param {string} token - The authorization token for the user.
 *
 * @returns {Promise} A Promise that resolves to the server's response.
 */

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
