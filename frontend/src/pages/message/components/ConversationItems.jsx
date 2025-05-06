import ConversationCard from "./ConversationCard";
import { useAuth } from "../../../context/AuthContext";

export default function ConversationItems(props) {
  const { user } = useAuth();
  const conversationCardElements = props.conversations.map((conversation) => {
    if (user.id === conversation.buyer) {
      return (
        <ConversationCard
          key={conversation.id}
          conversationId={conversation.id}
          user={conversation.seller_username}
        />
      );
    } else if (user.id === conversation.seller) {
      return (
        <ConversationCard
          key={conversation.id}
          conversationId={conversation.id}
          user={conversation.buyer_username}
        />
      );
    }
  });
  return (
    <div className="scrollable flex gap-3 pb-3">{conversationCardElements}</div>
  );
}
