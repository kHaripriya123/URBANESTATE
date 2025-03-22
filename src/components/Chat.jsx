// import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchMessages, sendMessage } from "../utils/chatSlice";
// import { io } from "socket.io-client";

// const socket = io("http://localhost:3000");

// const Chat = ({ senderId, receiverId, senderName, receiverName }) => {
//   const dispatch = useDispatch();
//   const messages = useSelector((state) => state.chat.messages);
//   const [text, setText] = useState("");

//   useEffect(() => {
//     dispatch(fetchMessages({ senderId, receiverId }));

//     socket.on("receiveMessage", (message) => {
//       dispatch({ type: "chat/addMessage", payload: message });
//     });

//     return () => socket.off("receiveMessage");
//   }, [dispatch, senderId, receiverId]);

//   const handleSendMessage = () => {
//     const message = { senderId, receiverId, text };
//     dispatch(sendMessage(message));
//     socket.emit("sendMessage", message);
//     setText("");
//   };

//   return (
//     <div className="chat-container">
//       <h3>Chat with {receiverName}</h3>
//       <div className="messages">
//         {messages.map((msg, index) => (
//           <div key={index} className={msg.senderId === senderId ? "sent" : "received"}>
//             <strong>{msg.senderId === senderId ? senderName : receiverName}:</strong> {msg.text}
//           </div>
//         ))}
//       </div>
//       <input value={text} onChange={(e) => setText(e.target.value)} placeholder="Type a message..." />
//       <button onClick={handleSendMessage}>Send</button>
//     </div>
//   );
// };

// export default Chat;
