import { useState, useEffect } from "react";
import Header from "../../components/Header";
import BuySidebar from "./components/BuySidebar.jsx";
import { useAuth } from "../../context/AuthContext";
import { viewCart } from "../../endpoints/api.js";
import CartItems from "./components/CartItems.jsx";

export default function BuyPage() {
  const { user } = useAuth();

  const [cartItems, setCartItems] = useState([]);

  const pageActiveStyle =
    "active:opacity-80 flex h-[38px] w-[240px] cursor-pointer items-center justify-start rounded-[5px] border-0 pl-4 text-[0.86rem] font-medium transition-all duration-200 text-white bg-[#153969]";

  const buttonNormalStyle =
    "active:opacity-80 flex h-[38px] w-[240px] cursor-pointer items-center justify-start rounded-[5px] border-0 pl-4 text-[0.86rem] font-medium transition-all duration-200 text-[#153969] bg-transparent hover:bg-[#153969] hover:text-white";

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await viewCart();
        setCartItems(data.items);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, []);
  return (
    <>
      <Header user={user} />
      <BuySidebar />
      <CartItems cartItems={cartItems} />
    </>
  );
}
