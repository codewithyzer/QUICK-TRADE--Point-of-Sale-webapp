import searchIcon from "../../assets/search.png";
import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "../../components/Header";
import MessageSidebar from "./components/MessageSidebar.jsx";
import { useAuth } from "../../context/AuthContext";
import { MapPicker } from "../../components/MapPicker.jsx";

export default function MessagePage() {
  const { user } = useAuth();
  const pageActiveStyle =
    "active:opacity-80 flex h-[38px] w-[240px] cursor-pointer items-center justify-start rounded-[5px] border-0 pl-4 text-[0.86rem] font-medium transition-all duration-200 text-white bg-[#153969]";

  const buttonNormalStyle =
    "active:opacity-80 flex h-[38px] w-[240px] cursor-pointer items-center justify-start rounded-[5px] border-0 pl-4 text-[0.86rem] font-medium transition-all duration-200 text-[#153969] bg-transparent hover:bg-[#153969] hover:text-white";
  return (
    <>
      <Header user={user} />
      <MessageSidebar />
      <main className="font-poppins mt-[70px] ml-[284px] flex flex-col gap-6 bg-gray-100 p-8">
        <MapPicker />
      </main>
    </>
  );
}
