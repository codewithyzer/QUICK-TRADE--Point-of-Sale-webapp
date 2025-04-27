import { useState, useEffect } from "react";
import Header from "../../components/Header.jsx";
import HomeSidebar from "./components/HomeSidebar.jsx";
import { useAuth } from "../../context/AuthContext";
import SmallCard from "../../components/SmallCard.jsx";
import { get_products } from "../../endpoints/api.js";
import FilterProducts from "./components/FilterProducts.jsx";
import ProductCards from "./components/ProductCards.jsx";

export default function HomePage() {
  const { user } = useAuth();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await get_products("exclude_user=true");
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
      <HomeSidebar />
      <main className="font-poppins mt-[70px] ml-[284px] flex flex-col gap-6 bg-gray-100 p-8">
        <FilterProducts />
        <div className="flex flex-col gap-15">
          <ProductCards products={products} />
        </div>
        <div className="text-thirdary mt-10 text-center text-sm">
          You've reached the end of this page
        </div>
      </main>
    </>
  );
}
