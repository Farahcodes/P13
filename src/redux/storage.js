/**
 * The `loadState` and `saveState` functions are utilities for working with
 * browser's Web Storage (specifically `localStorage` and `sessionStorage`).
 * These storage options allows to store key/value pairs in a web browser.
 *
 * The main difference between `localStorage` and `sessionStorage`:
 * - `localStorage`: stores data with no expiration time.
 * - `sessionStorage`: stores data for one session (data is lost when the browser tab is closed).
 */

export const loadState = () => {
  if (sessionStorage.getItem('state') !== null)
    return JSON.parse(sessionStorage.getItem('state'));
  if (localStorage.getItem('state') !== null)
    return JSON.parse(localStorage.getItem('state'));
  return {};
};

// Save state from a given storage
export const saveState = (state, storage) => {
  try {
    storage.setItem('state', JSON.stringify(state));
  } catch (error) {}
};
