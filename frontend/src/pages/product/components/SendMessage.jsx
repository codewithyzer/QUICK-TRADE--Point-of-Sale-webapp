import { useState } from "react";
import { sendAMessage } from "../../../endpoints/api";

export default function SendMessage(props) {
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
      console.log(data);
      setText("");
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <div className="flex flex-col gap-3 rounded-md bg-white p-7">
      <p className="text-thirdary text-lg font-semibold">
        Send a message to seller
      </p>
      <form onSubmit={handleSubmit} className="flex items-center gap-2">
        <input
          value={text}
          name="message"
          onChange={handleChange}
          type="text"
          className="border-primary text-primary w-2/3 rounded-md border-1 px-2 py-2 text-sm font-medium outline-none"
          placeholder="Type a message . . ."
        />
        <button className="bg-primary trasition-all w-1/3 cursor-pointer rounded-md py-2 text-sm font-medium text-white duration-200 hover:opacity-80">
          Send message
        </button>
      </form>
    </div>
  );
}
