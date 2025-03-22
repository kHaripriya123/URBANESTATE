import { createSlice } from "@reduxjs/toolkit";

const propertySlice = createSlice({
  name: "property",
  initialState: {
    properties: [],
  },
  reducers: {
    setProperties: (state, action) => {
      state.properties = action.payload; // ✅ Correctly set properties array
    },
    updateProperty: (state, action) => {
      state.properties = state.properties.map(property =>
        property._id === action.payload._id ? action.payload : property
      );
      console.log("Updated Redux State:", state.properties); // ✅ Debugging
    },
  },
});

export const { setProperties, updateProperty } = propertySlice.actions;
export default propertySlice.reducer;
