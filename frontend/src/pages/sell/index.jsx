import { useState, useEffect } from "react";
import Header from "../../components/Header";
import SellSidebar from "./components/SellSidebar.jsx";
import { useAuth } from "../../context/AuthContext";
import { get_products } from "../../endpoints/api.js";
import UploadProduct from "./components/UploadProduct.jsx";
import OwnerProducts from "./components/OwnerProducts.jsx";

export default function SellPage() {
  const { user } = useAuth();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await get_products("owned_user=true");
        setProducts(data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, []);

  return (
    <>
      <Header user={user} />
      <SellSidebar />
      <main className="font-poppins mt-[70px] ml-[284px] flex gap-10 bg-gray-100 p-8">
        <UploadProduct />
        <OwnerProducts products={products} />
      </main>
    </>
  );
}
