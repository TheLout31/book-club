import { auth } from "../../firebase/config";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { setAuthLoading, setUser, setAuthError, clearAuth } from "./authSlice";

export const registerUser = (email, password) => async (dispatch) => {
  dispatch(setAuthLoading(true));
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const {
      uid,
      email: userEmail,
      displayName,
      photoURL,
    } = userCredential.user;
    dispatch(setUser({ uid, email: userEmail, displayName, photoURL }));

    console.log(userCredential.user);
  } catch (error) {
    dispatch(setAuthError(error.message));
    throw error;
  } finally {
    dispatch(setAuthLoading(false));
  }
};

export const loginUser = (email, password) => async (dispatch) => {
  dispatch(setAuthLoading(true));
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const {
      uid,
      email: userEmail,
      displayName,
      photoURL,
    } = userCredential.user;
    dispatch(setUser({ uid, email: userEmail, displayName, photoURL }));
    localStorage.setItem(
      "user",
      JSON.stringify({ uid, email: userEmail, displayName, photoURL })
    );

    return userCredential.user;
  } catch (error) {
    dispatch(setAuthError(error.message));
    throw error;
  } finally {
    dispatch(setAuthLoading(false));
  }
};

export const logoutUser = () => async (dispatch) => {
  try {
    await signOut(auth);
    localStorage.clear();
    dispatch(clearAuth());
  } catch (error) {
    console.error("Logout error:", error);
  }
};
