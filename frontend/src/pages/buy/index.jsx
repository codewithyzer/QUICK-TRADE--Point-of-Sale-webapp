import { useState, useEffect } from "react";
import Header from "../../components/Header";
import BuySidebar from "./components/BuySidebar.jsx";
import { useAuth } from "../../context/AuthContext";
import { viewCart } from "../../endpoints/api.js";
import CartItems from "./components/CartItems.jsx";

export default function BuyPage() {
  const { user } = useAuth();

  const [cartItems, setCartItems] = useState([]);

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
