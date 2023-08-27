import { createStore } from 'redux';
import { loadState } from './storage';

// Actions type
const LOGIN_VALID = 'LOGIN_VALID', // Triggered when a user logs in successfully.
  LOGOUT = 'LOGOUT', // Triggered when a user logs out.
  SAVE_STORAGE = 'SAVE_STORAGE', // Used to save some data related to the storage mechanism.
  PROFILE_UPDATE = 'PROFILE_UPDATE'; // Triggered when a user updates their profile.

// Reducer
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
