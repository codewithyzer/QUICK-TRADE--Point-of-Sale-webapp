import { useEffect, useState } from "react";
import Header from "../../components/Header";
import NotifSidebar from "./components/NotifSidebar.jsx";
import { useAuth } from "../../context/AuthContext";
import { getNotifications } from "../../endpoints/api.js";
import { deleteNotification } from "../../endpoints/api.js";

export default function NotificationPage() {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState([]);
  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getNotifications();
        setNotifications(data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, []);

  async function handleRemove(id) {
    await deleteNotification(id);
    window.location.reload();
  }

  const notificationsElements = notifications.map((item) => {
    return (
      <div
        key={item.id}
        className="relative flex h-35 w-full items-center gap-3 overflow-hidden rounded-md bg-white px-10 transition-all duration-50"
      >
        <div className="flex flex-col">
          <p className="text-sm font-medium text-gray-500">
            {new Date(item.timestamp).toLocaleString("en-US", {
              dateStyle: "medium",
              timeStyle: "short",
            })}
          </p>
          <p className="text-primary text-md font-medium">
            {item.notification}
          </p>
        </div>
        <button
          onClick={() => handleRemove(item.id)}
          className="bg-primary duraton-150 ml-auto h-10 w-10 cursor-pointer rounded-full text-white transition-all hover:opacity-70"
        >
          <i className="fa-solid fa-xmark"></i>
        </button>
      </div>
    );
  });
  return (
    <>
      <Header user={user} />
      <NotifSidebar />
      <main className="font-poppins mt-[70px] ml-[284px] flex min-h-screen flex-col gap-3 bg-gray-100 p-8">
        <h1 className="text-primary text-2xl font-semibold">Notifications</h1>
        {notifications.length > 0 ? (
          <div className="flex flex-col gap-3">
            {notificationsElements.reverse()}
          </div>
        ) : (
          <div className="text-xl text-gray-500">
            You have no new notifications
          </div>
        )}
      </main>
    </>
  );
}
