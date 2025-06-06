import { createSlice } from "@reduxjs/toolkit";

const initialState = JSON.parse(localStorage.getItem("user")) || {
  user: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify({ user: action.payload }));
    },
    logout: (state) => {
      state.user = null;
      localStorage.removeItem("user");
    },
    
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
