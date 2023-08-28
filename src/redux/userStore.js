import { createStore } from 'redux';
import { loadState } from './storage';

// Actions type
const LOGIN_VALID = 'LOGIN_VALID', // Triggered when a user logs in successfully.
  LOGOUT = 'LOGOUT', // Triggered when a user logs out.
  SAVE_STORAGE = 'SAVE_STORAGE', // Used to save some data related to the storage mechanism.
  PROFILE_UPDATE = 'PROFILE_UPDATE'; // Triggered when a user updates their profile.

/**
 * User Reducer
 *
 * A reducer is a pure function that takes the current state and an action as arguments
 * and returns a new state.
 *
 * This reducer handles state changes for user-related actions.
 *
 * @param {Object} state - The current state.
 * @param {Object} action - The action being dispatched.
 * @returns {Object} - The updated state.
 */

const userReducer = (state, action) => {
  switch (action.type) {
    case LOGIN_VALID:
      // When a user logs in, we update the state to reflect that they're logged in,
      // store their user data and their token.
      return {
        logged: true,
        userData: action.userData,
        token: action.token,
      };
    case LOGOUT:
      // When a user logs out, we reset the user state.
      return {};
    case SAVE_STORAGE:
      // This case might be used to save some specifics about the user's storage preference or data.
      return {
        ...state, // Spreading the existing state.
        storage: action.storage, //Setting the new storage data.
      };
    case PROFILE_UPDATE:
      // When a user updates their profile, only the firstName and lastName are updated in this case.
      return {
        ...state, // Spreading the existing state.
        userData: {
          ...state.userData, // Spreading the existing user data.
          firstName: action.firstName, // Updating the first name.
          lastName: action.lastName, // Updating the last name.
        },
      };
    default:
      // If the action type doesn't match any known action, return the state unchanged.
      return state;
  }
};

// Store
export const userStore = createStore(userReducer, loadState());
