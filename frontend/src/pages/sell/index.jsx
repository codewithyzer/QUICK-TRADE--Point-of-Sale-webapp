import searchIcon from "../../assets/search.png";
import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "../../components/Header";
import SellSidebar from "./components/SellSidebar.jsx";
import { useAuth } from "../../context/AuthContext";

export default function SellPage() {
  const { user } = useAuth();
  return (
    <>
      <Header user={user} />
      <SellSidebar />
      <main className="font-poppins mt-[70px] ml-[284px] p-8">
        <h1>Your products</h1>
        <h2>Upload a product</h2>
      </main>
    </>
  );
}
