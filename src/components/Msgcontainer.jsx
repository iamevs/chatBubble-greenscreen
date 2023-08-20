import React, { useState, useEffect } from "react";
import Chatbubble from "./Chatbubble";

export default function MsgContainer() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  const addMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim() !== "") {
      setMessages([...messages, { text: newMessage }]);
      setNewMessage("");
    }
  };

  useEffect(() => {
    if (messages.length > 0) {
      const timeoutId = setTimeout(() => {
        setMessages(messages.slice(1));
      }, 3500);
      return () => clearTimeout(timeoutId);
    }
  }, [messages]);

  return (
    <div className="flex flex-col h-screen bg-green-800">
      <div className="overflow-y-auto p-4 absolute bottom-10">
        {messages.map((message, index) => (
          <Chatbubble key={index} text={message.text} type="history" />
        ))}
        <Chatbubble typingText={newMessage} type="typing" />
      </div>
      <div className="flex">
        <form onSubmit={addMessage}>
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="flex-1 w-[100vw] h-[100vh] bg-green-800 text-green-800 p-2 rounded-l-lg"
          />
        </form>
      </div>
    </div>
  );
}
