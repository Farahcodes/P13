import './SignIn.scss'; // importing styling
import { ReactComponent as UserCircle } from '../img/user-circle.svg'; // Importing an SVG as a React component
import { useForm } from 'react-hook-form'; // Importing useForm hook for form validation
import { useNavigate } from 'react-router-dom'; // Importing useNavigate hook for navigation
import { login, getData } from '../api/login'; // Importing API calls
import { useDispatch } from 'react-redux'; // Importing useDispatch hook for dispatching actions
import { userStore } from '../redux/userStore'; // Importing the Redux store
import { saveState } from '../redux/storage'; // Importing function to save state to Web Storage
import { useState } from 'react'; // Importing useState hook for component-level state

// SignIn Component
export default function SignIn() {
  // Initialization
  const { register, handleSubmit } = useForm(), // Initializing react-hook-form
    dispatch = useDispatch(), // Initializing useDispatch for action dispatching
    navigate = useNavigate(), // Initializing navigate function for routing
    [errorMessage, setErrorMessage] = useState(''); // Local state for managing error messages

  /**
   * onSubmit function
   *
   * This function is called when the form is submitted.
   * It performs login and state operations and navigates the user based on login success or failure.
   *
   * @param {Object} data - The form data
   */
  const onSubmit = async (data) => {
    // Determine the Web Storage type to use based on the "Remember me" checkbox
    const storageName = data['remember-me']
        ? 'localStorage'
        : 'sessionStorage',
      storageType = data['remember-me']
        ? localStorage
        : sessionStorage;
    const saveCurrentState = () =>
      saveState(userStore.getState(), storageType);
    // Attempt to login
    try {
      const loginData = await login(data.username, data.password);
      // If login successful
      if (loginData.status === 200) {
        // Fetch user data
        const userData = await getData(loginData.body.token);
        // Dispatching Redux actions
        dispatch({
          type: 'LOGIN_VALID',
          userData: userData.body,
          token: loginData.body.token,
        });
        dispatch({ type: 'SAVE_STORAGE', storage: storageName });
        // Save the current state to Web Storage
        saveCurrentState();
        // Navigate to profile page
        navigate('/profile');
      } else {
        // If login failed, set the error message
        setErrorMessage(loginData.message);
      }
    } catch (error) {
      // If there's a server error
      setErrorMessage('Error with server');
    }
  };

  return (
    <main className="main bg-dark">
      <section className="sign-in-content">
        <UserCircle className="sign-in-icon" />
        <h1>Sign In</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="input-wrapper">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              autoComplete="username"
              {...register('username', {
                required: 'This input is required',
              })}
            />
          </div>
          <div className="input-wrapper">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              autoComplete="current-password"
              {...register('password', { required: true })}
            />
          </div>
          <div className="input-remember">
            <input
              type="checkbox"
              id="remember-me"
              {...register('remember-me')}
            />
            <label htmlFor="remember-me">Remember me</label>
          </div>
          <button type="submit" className="sign-in-button">
            Sign In
          </button>
          <div className="errorMessage">{errorMessage}</div>
        </form>
      </section>
    </main>
  );
}
