import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import API_BASE_URL from "../../api/apiConfig"; // Import the API base
// const userSlice = createSlice({
//   name: "user",
//   initialState: {
//     loading: false,
//     user: {},
//     isAuthenticated: false,
//     error: null,
//     message: null,
//     isUpdated: false,
//   },
//   reducers: {
//     registerRequest(state) {
//       state.loading = true;
//       state.isAuthenticated = false;
//       state.user = {};
//       state.error = null;
//     },
//     registerSuccess(state, action) {
//       state.loading = false;
//       state.isAuthenticated = true;
//       state.user = action.payload;
//       state.error = null;
//     },
//     registerFailed(state, action) {
//       state.loading = false;
//       state.isAuthenticated = false;
//       state.user = {};
//       state.error = action.payload;
//     },
//     loginRequest(state, action) {
//       state.loading = true;
//       state.isAuthenticated = false;
//       state.user = {};
//       state.error = null;
//     },
//     loginSuccess(state, action) {
//       state.loading = false;
//       state.isAuthenticated = true;
//       state.user = action.payload;
//       state.error = null;
//     },
//     loginFailed(state, action) {
//       state.loading = false;
//       state.isAuthenticated = false;
//       state.user = {};
//       state.error = action.payload;
//     },
//     logoutSuccess(state, action) {
//       state.loading = false;
//       state.isAuthenticated = false;
//       state.user = {};
//       state.error = null;
//       state.message = action.payload;
//     },
//     logoutFailed(state, action) {
//       state.loading = false;
//       state.isAuthenticated = state.isAuthenticated;
//       state.user = state.user;
//       state.error = action.payload;
//     },
//     loadUserRequest(state, action) {
//       state.loading = true;
//       state.isAuthenticated = false;
//       state.user = {};
//       state.error = null;
//     },
//     loadUserSuccess(state, action) {
//       state.loading = false;
//       state.isAuthenticated = true;
//       state.user = action.payload;
//       state.error = null;
//     },
//     loadUserFailed(state, action) {
//       state.loading = false;
//       state.isAuthenticated = false;
//       state.user = {};
//       state.error = action.payload;
//     },
//     updatePasswordRequest(state, action) {
//       state.loading = true;
//       state.isUpdated = false;
//       state.message = null;
//       state.error = null;
//     },
//     updatePasswordSuccess(state, action) {
//       state.loading = false;
//       state.isUpdated = true;
//       state.message = action.payload;
//       state.error = null;
//     },
//     updatePasswordFailed(state, action) {
//       state.loading = false;
//       state.isUpdated = false;
//       state.message = null;
//       state.error = action.payload;
//     },
//     updateProfileRequest(state, action) {
//       state.loading = true;
//       state.isUpdated = false;
//       state.message = null;
//       state.error = null;
//     },
//     updateProfileSuccess(state, action) {
//       state.loading = false;
//       state.isUpdated = true;
//       state.message = action.payload;
//       state.error = null;
//     },
//     updateProfileFailed(state, action) {
//       state.loading = false;
//       state.isUpdated = false;
//       state.message = null;
//       state.error = action.payload;
//     },
//     updateProfileResetAfterUpdate(state, action) {
//       state.error = null;
//       state.isUpdated = false;
//       state.message = null;
//     },
//     clearAllErrors(state, action) {
//       state.error = null;
//       state = state.user;
//     },
//   },
// });
const userSlice = createSlice({
  name: "user",
  initialState: { loading: false, user: {}, isAuthenticated: false, error: null },
  reducers: {
    registerRequest: (state) => { state.loading = true; },
    registerSuccess: (state, action) => { state.loading = false; state.isAuthenticated = true; state.user = action.payload; },
    registerFailed: (state, action) => { state.loading = false; state.error = action.payload; },

    loginRequest: (state) => { state.loading = true; },
    loginSuccess: (state, action) => { state.loading = false; state.isAuthenticated = true; state.user = action.payload; },
    loginFailed: (state, action) => { state.loading = false; state.error = action.payload; },

    clearAllErrors: (state) => { state.error = null; },
  },
});
// export const register = (userData) => async (dispatch) => {
//   dispatch(userSlice.actions.registerRequest());
//   try {
//     const { data } = await axios.post(`${API_BASE_URL}/user/register`, userData, {
//       withCredentials: true,
//       headers: { "Content-Type": "application/json" },
//     });
//     dispatch(userSlice.actions.registerSuccess(data.user));
//   } catch (error) {
//     dispatch(userSlice.actions.registerFailed(error.response.data.message));
//   }
// };
export const register = (userData) => async (dispatch) => {
  console.log("Register action dispatched", userData);

  dispatch(userSlice.actions.registerRequest());

  try {
    console.log(userData);
    const { data } = await axios.post(`${API_BASE_URL}/user/register`, userData, {
      withCredentials: true,
      headers: { "Content-Type": "application/json" },
    });

    dispatch(userSlice.actions.registerSuccess(data.user));
  } catch (error) {
    console.error("Register API error", error);
    dispatch(userSlice.actions.registerFailed(error.response?.data?.message || error.message));
  }
};

export const login = (email, password) => async (dispatch) => {
  dispatch(userSlice.actions.loginRequest());
  try {
    const { data } = await axios.post(
      `${API_BASE_URL}/user/login`,
      { email, password },
      { withCredentials: true, headers: { "Content-Type": "application/json" } }
    );
    dispatch(userSlice.actions.loginSuccess(data.user));
    dispatch(userSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(userSlice.actions.loginFailed(error.response.data.message));
  }
};

export const getUser = () => async (dispatch) => {
  dispatch(userSlice.actions.loadUserRequest());
  try {
    const { data } = await axios.get(`${API_BASE_URL}/user/me`, {
      withCredentials: true,
    });
    dispatch(userSlice.actions.loadUserSuccess(data.user));
    dispatch(userSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(userSlice.actions.loadUserFailed(error.response.data.message));
  }
};

export const logout = () => async (dispatch) => {
  try {
    const { data } = await axios.get(
      `${API_BASE_URL}/user/logout`,
      { withCredentials: true }
    );
    dispatch(userSlice.actions.logoutSuccess(data.message));
    dispatch(userSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(userSlice.actions.logoutFailed(error.response.data.message));
  }
};

export const updatePassword =
  (currentPassword, newPassword, confirmNewPassword) => async (dispatch) => {
    dispatch(userSlice.actions.updatePasswordRequest());
    try {
      const { data } = await axios.put(
        `${API_BASE_URL}/user/password/update`,
        { currentPassword, newPassword, confirmNewPassword },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );
      dispatch(userSlice.actions.updatePasswordSuccess(data.message));
      dispatch(userSlice.actions.clearAllErrors());
    } catch (error) {
      dispatch(
        userSlice.actions.updatePasswordFailed(error.response.data.message)
      );
    }
  };

export const updateProfile = (data) => async (dispatch) => {
  dispatch(userSlice.actions.updateProfileRequest());
  try {
    const response = await axios.put(
      `${API_BASE_URL}/user/me/profile/update`,
      data,
      {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    dispatch(userSlice.actions.updateProfileSuccess(response.data.message));
    dispatch(userSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(
      userSlice.actions.updateProfileFailed(error.response.data.message)
    );
  }
};
export const resetProfile = () => (dispatch) => {
  dispatch(userSlice.actions.updateProfileResetAfterUpdate());
};
export const clearAllUserErrors = () => (dispatch) => {
  dispatch(userSlice.actions.clearAllErrors());
};

export default userSlice.reducer;
