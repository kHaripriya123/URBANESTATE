// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";

// // Fetch messages
// export const fetchMessages = createAsyncThunk(
//   "chat/fetchMessages",
//   async ({ senderId, receiverId }) => {
//     const response = await axios.get(`/api/chats/${senderId}/${receiverId}`);
//     return response.data;
//   }
// );

// // Send message
// export const sendMessage = createAsyncThunk(
//   "chat/sendMessage",
//   async (message, { dispatch }) => {
//     const response = await axios.post("/api/chats", message);
//     dispatch(addMessage(response.data));
//   }
// );

// const chatSlice = createSlice({
//   name: "chat",
//   initialState: { messages: [] },
//   reducers: {
//     addMessage: (state, action) => {
//       state.messages.push(action.payload);
//     },
//   },
//   extraReducers: (builder) => {
//     builder.addCase(fetchMessages.fulfilled, (state, action) => {
//         state.messages = Array.isArray(action.payload) ? action.payload : [];
    
//     });
//   },
// });

// export const { addMessage } = chatSlice.actions;
// export default chatSlice.reducer;
