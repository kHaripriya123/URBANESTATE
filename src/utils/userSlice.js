import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: { user: null },

  reducers: {
    addUser: (state, action) => {
      state.user = action.payload;
    },
    removeUser: (state) => {
      state.user = null;
      state.profile = null;
    },
   
  },
});

export const { addUser, removeUser, setProfile } = userSlice.actions;
export default userSlice.reducer;
