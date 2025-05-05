import { useNavigate } from "react-router-dom";

export default function ConversationCard(props) {
  const nav = useNavigate();

  function handleClick() {
    nav(`/messages/conversation/${props.conversationId}`);
  }
  return (
    <div
      onClick={handleClick}
      className="flex h-12 w-35 cursor-pointer items-center gap-2 rounded-md border-gray-400 bg-white px-2.5 py-1.5 transition-all duration-200 hover:border-1"
    >
      <div className="bg-thirdary flex h-7 w-7 items-center justify-center rounded-full text-white">
        <p>{props.user.slice(0, 1).toUpperCase()}</p>
      </div>
      <p>
        {props.user.length > 6 ? props.user.slice(0, 6) + ". . ." : props.user}
      </p>
    </div>
  );
}
