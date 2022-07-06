import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: [],
  theme: false,
};

const dataSlice = createSlice({
  name: "data",
  initialState,

  reducers: {
    setUsers: (state, action) => {
      state.users = action.payload.users;
    },
  
    setTheme: (state, action) => {
      state.theme = action.payload.theme;
    },

  },
});

export default dataSlice.reducer;
export const dataActions = dataSlice.actions;
