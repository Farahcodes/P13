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
      return {
        logged: true,
        userData: action.userData,
        token: action.token,
      };
    case LOGOUT:
      return {};
    case SAVE_STORAGE:
      return {
        ...state,
        storage: action.storage,
      };
    case PROFILE_UPDATE:
      return {
        ...state,
        userData: {
          ...state.userData,
          firstName: action.firstName,
          lastName: action.lastName,
        },
      };
    default:
      return state;
  }
};

// Store
export const userStore = createStore(userReducer, loadState());
