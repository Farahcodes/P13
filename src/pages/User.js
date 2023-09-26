import './User.scss'; // Importing styling for this component
import { useForm } from 'react-hook-form'; // Importing useForm for form validation
import { useState } from 'react'; // React's useState hook for component state
import { useSelector, useDispatch } from 'react-redux'; // Redux hooks for state and actions

import { editProfile } from '../api/login'; // Importing API calls
import { userStore } from '../redux/userStore'; // Importing Redux store
import { saveState } from '../redux/storage'; // Import function to save state to Web Storage
import ErrorPage from './ErrorPage'; // Importing ErrorPage component for unauthorized users

// HeaderMessage Function Component
const HeaderMessage = (props) => {
  return (
    <>
      <h1>
        Welcome back
        <br />
        {props.username}
      </h1>

      <button
        className="edit-button"
        onClick={() => props.openEdit()}
      >
        Edit Name
      </button>
    </>
  );
};

// EditingHeader Function Component
const EditingHeader = (props) => {
  const { register, handleSubmit } = useForm(), // Initialize useForm for form validation.
    dispatch = useDispatch(), // Initialize Redux dispatch for state updates.
    // Function to save the current state to either sessionStorage or localStorage.
    saveCurrentState = () =>
      saveState(userStore.getState(), props.storage),
    [errorMessage, setErrorMessage] = useState(''); // Local state for error messages.

  /**
   * onSubmit function for form submission.
   * Makes an API call and updates the global and local state.
   */
  const onSubmit = async (data) => {
    try {
      const edit = await editProfile(
        data.firstName,
        data.lastName,
        props.token
      ); // API call to edit the user profile.
      if (edit.status === 200) {
        // Successful API call.
        dispatch({
          type: 'PROFILE_UPDATE',
          firstName: data.firstName,
          lastName: data.lastName,
        }); // Update Redux state.
        props.closeEdit(); // Close editing mode.
        setErrorMessage(''); // Clear any existing error messages.
        saveCurrentState(); // Save the updated state to Web Storage.
      } else {
        // Unsuccessful API call.
        setErrorMessage(edit.message); // Show API error message.
      }
    } catch (error) {
      // Catch network or server errors.
      setErrorMessage('Error with server'); // Show server error message
    }
  };

  return (
    <>
      <h1>Welcome back</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="flex-center">
        <div className="input-wrapper flex-right">
          <input
            type="text"
            placeholder={props.userData.firstName}
            {...register('firstName', { required: true })}
          />
          <button className="edit-button" type="submit">
            Save
          </button>
        </div>
        <div className="input-wrapper flex-left">
          <input
            type="text"
            placeholder={props.userData.lastName}
            {...register('lastName', { required: true })}
          />
          <button
            className="edit-button"
            type="button"
            onClick={() => props.closeEdit()}
          >
            Cancel
          </button>
        </div>
      </form>
      <div className="errorMessage">{errorMessage}</div>
    </>
  );
};

export default function User() {
  const {
      logged: isUserConnected = false,
      userData,
      token,
      storage,
    } = useSelector((state) => state),
    [isEditingProfile, setIsEditingProfile] = useState(false);

  const openEdit = () => {
      setIsEditingProfile(true);
    },
    closeEdit = () => {
      setIsEditingProfile(false);
    };

  if (!isUserConnected) return <ErrorPage error={401} />;

  return (
    <main className="main bg-dark">
      <div className="header">
        {isEditingProfile ? (
          <EditingHeader
            storage={storage}
            token={token}
            userData={userData}
            closeEdit={closeEdit}
          />
        ) : (
          <HeaderMessage
            username={userData.firstName + ' ' + userData.lastName}
            openEdit={openEdit}
          />
        )}
      </div>
      <h2 className="sr-only">Accounts</h2>

      {/* Example Data */}
      <section className="account">
        <div className="account-content-wrapper">
          <h3 className="account-title">
            Argent Bank Checking (x8349)
          </h3>
          <p className="account-amount">$2,082.79</p>
          <p className="account-amount-description">
            Available Balance
          </p>
        </div>
        <div className="account-content-wrapper cta">
          <button className="transaction-button">
            View transactions
          </button>
        </div>
      </section>
      <section className="account">
        <div className="account-content-wrapper">
          <h3 className="account-title">
            Argent Bank Savings (x6712)
          </h3>
          <p className="account-amount">$10,928.42</p>
          <p className="account-amount-description">
            Available Balance
          </p>
        </div>
        <div className="account-content-wrapper cta">
          <button className="transaction-button">
            View transactions
          </button>
        </div>
      </section>
      <section className="account">
        <div className="account-content-wrapper">
          <h3 className="account-title">
            Argent Bank Credit Card (x8349)
          </h3>
          <p className="account-amount">$184.30</p>
          <p className="account-amount-description">
            Current Balance
          </p>
        </div>
        <div className="account-content-wrapper cta">
          <button className="transaction-button">
            View transactions
          </button>
        </div>
      </section>
    </main>
  );
}
