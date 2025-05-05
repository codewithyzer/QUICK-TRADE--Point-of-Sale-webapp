import { useAuth } from "../../../context/AuthContext";
import { sendAMessage } from "../../../endpoints/api";
import { useState } from "react";

export default function Chatbox(props) {
  const { user } = useAuth();
  const [text, setText] = useState("");
  console.log(text);

  function handleChange(event) {
    const { value } = event.currentTarget;
    setText(value);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const data = await sendAMessage(props.conversationId, text);
      setText("");
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      console.error(error);
    }
  }

  const chatElements = props.conversation[0]?.messages.map((item) => {
    if (item.sender === user.id) {
      return (
        <div key={item.id} className="flex flex-col gap-2">
          <p className="self-end pr-1 text-[0.9rem] text-gray-400">
            {item.sender_username === user.username
              ? "You"
              : item.sender_username}
          </p>
          <div className="bg-primary w-100 self-end rounded-md p-4 text-white">
            {item.text}
          </div>
          <p className="self-end pr-1 text-[0.9rem] text-gray-400">
            {new Date(item.timestamp).toLocaleString("en-US", {
              dateStyle: "medium",
              timeStyle: "short",
            })}
          </p>
        </div>
      );
    } else {
      return (
        <div key={item.id} className="flex flex-col gap-1.5">
          <p className="self-start pl-1 text-[0.9rem] text-gray-400">
            {item.sender_username}
          </p>
          <div className="bg-thirdary w-100 self-start rounded-md p-4 text-white">
            {item.text}
          </div>
          <p className="self-start pl-1 text-[0.9rem] text-gray-400">
            {new Date(item.timestamp).toLocaleString("en-US", {
              dateStyle: "medium",
              timeStyle: "short",
            })}
          </p>
        </div>
      );
    }
  });
  return (
    <div className="font-poppins flex h-full w-full flex-col gap-4 rounded-md border-1 border-gray-400 bg-white p-5">
      <div className="scrollable-h flex h-100 flex-col gap-5 pr-5">
        {chatElements}
      </div>
      <form className="flex h-10 gap-3" onSubmit={handleSubmit}>
        <input
          onChange={handleChange}
          value={text}
          type="text"
          className="w-7/9 rounded-md border-1 border-gray-500 px-2 text-sm font-medium outline-none"
          placeholder="Type your message here . . . "
        />
        <button className="bg-primary flex w-2/9 cursor-pointer items-center justify-center rounded-md px-5 font-medium text-white transition-all duration-150 hover:opacity-70">
          Send Message
        </button>
      </form>
    </div>
  );
}
