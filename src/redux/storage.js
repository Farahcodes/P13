/**
 * The `loadState` and `saveState` functions are utilities for working with
 * browser's Web Storage (specifically `localStorage` and `sessionStorage`).
 * These storage options allows to store key/value pairs in a web browser.
 *
 * The main difference between `localStorage` and `sessionStorage`:
 * - `localStorage`: stores data with no expiration time.
 * - `sessionStorage`: stores data for one session (data is lost when the browser tab is closed).
 */

/**
 * Load application state from web storage.
 *
 * This function first tries to retrieve the state from `sessionStorage`.
 * If it doesn't find any state there, it checks in `localStorage`.
 * If it doesn't find the state in both storage options, it returns an empty object.
 *
 * @returns {Object} The stored state if found, otherwise an empty object.
 */
export const loadState = () => {
  // Check if there's a state saved in sessionStorage.
  if (sessionStorage.getItem('state') !== null)
    // If found, parse and return the state.
    return JSON.parse(sessionStorage.getItem('state'));

  // If the state wasn't found in sessionStorage, check in localStorage.
  if (localStorage.getItem('state') !== null)
    // If found, parse and return the state.
    return JSON.parse(localStorage.getItem('state'));
  // If no state is found in both storages, return an empty object.
  return {};
};

/**
 * Save application state to a given web storage.
 *
 * This function takes in the state and the storage (either `localStorage` or `sessionStorage`)
 * as arguments, and attempts to save the state into the specified storage.
 * If an error occurs (like exceeding storage quota), it simply catches and ignores the error.
 *
 * @param {Object} state - The state object to be stored.
 * @param {Storage} storage - The storage object where the state will be saved (`localStorage` or `sessionStorage`).
 */
export const saveState = (state, storage) => {
  try {
    // Stringify and store the state in the provided storage.
    storage.setItem('state', JSON.stringify(state));
  } catch (error) {}
};
