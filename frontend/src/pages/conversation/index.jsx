import { useState, useEffect } from "react";
import Header from "../../components/Header";
import MessageSidebar from "./components/MessageSidebar.jsx";
import { useAuth } from "../../context/AuthContext";
import { getConversations } from "../../endpoints/api.js";
import ConversationItems from "./components/ConversationItems.jsx";
import { useParams } from "react-router-dom";
import Chatbox from "./components/Chatbox.jsx";

export default function ConversationPage() {
  const { id } = useParams();
  const { user } = useAuth();
  const [fetchedConversations, setFetchedConversations] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getConversations();
        setFetchedConversations(data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, []);

  const filteredConversations = fetchedConversations.filter(
    (item) => item.buyer === user.id || item.seller === user.id,
  );

  const conversation = filteredConversations.filter(
    (item) => item.id === parseInt(id),
  );

  return (
    <>
      <Header user={user} />
      <MessageSidebar />
      <main className="font-poppins mt-[70px] ml-[284px] flex min-h-screen flex-col gap-3 bg-gray-100 p-8">
        <h1 className="text-primary text-2xl font-semibold">Messages</h1>
        <ConversationItems
          conversations={filteredConversations}
          conversationId={parseInt(id)}
        />
        <Chatbox conversation={conversation} conversationId={parseInt(id)} />
      </main>
    </>
  );
}
