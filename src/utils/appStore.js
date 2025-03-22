import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import profileReducer from "./profileSlice";
import feedReducer from "./feedSlice";
import propertyReducer from "./propertySlice";
// import chatReducer from "./chatSlice";

const appStore = configureStore({
   reducer: {
      user: userReducer,
      profile : profileReducer,
      feed : feedReducer,
      property : propertyReducer,
      // chat :  chatReducer,
   }
})


export default appStore;