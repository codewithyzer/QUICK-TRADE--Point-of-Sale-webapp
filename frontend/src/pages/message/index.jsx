import { useState, useEffect } from "react";
import Header from "../../components/Header";
import MessageSidebar from "./components/MessageSidebar.jsx";
import { useAuth } from "../../context/AuthContext";
import { getConversations } from "../../endpoints/api.js";
import ConversationItems from "./components/ConversationItems.jsx";

export default function MessagePage() {
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

  return (
    <>
      <Header user={user} />
      <MessageSidebar />
      <main className="font-poppins mt-[70px] ml-[284px] flex min-h-screen flex-col gap-3 bg-gray-100 p-8">
        <h1 className="text-primary text-2xl font-semibold">Messages</h1>
        {filteredConversations.length > 0 ? (
          <>
            <ConversationItems conversations={filteredConversations} />
            <div className="h-115 w-full rounded-md border-gray-400 bg-white"></div>
          </>
        ) : (
          <div className="text-xl text-gray-500">You have no new messages</div>
        )}
      </main>
    </>
  );
}
