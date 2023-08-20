import React from "react";

export default function ChatBubble(props) {
  return (
    <div
      className={`flex justify-${
        props.type === "typing" ? "end" : "start"
      } my-2`}
    >
      <div
        className={`p-2 ${
          props.type === "typing" ? "bg-gray-100" : "bg-gray-200"
        } text-gray-800 max-w-xs rounded-t-lg rounded-br-lg text-xl`}
      >
        {props.type === "typing" && props.typingText && (
          <span>{props.typingText}</span>
        )}
        {props.type === "history" && props.text}
      </div>
    </div>
  );
}
