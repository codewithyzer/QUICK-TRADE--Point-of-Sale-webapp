import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Header from "../../components/Header";
import { useAuth } from "../../context/AuthContext";
import HomeSidebar from "../home/components/HomeSidebar";
import ProductCards from "./components/ProductCards";
import { get_products } from "../../endpoints/api";

export default function FilteredProducts() {
  const { user } = useAuth();
  const { category } = useParams();
  const [filteredProducts, setFilteredProducts] = useState([]);
  console.log(filteredProducts);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await get_products(
          `category=${category}&exclude_user=true`,
        );
        setFilteredProducts(data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, []);

  return (
    <>
      <Header user={user.username} />
      <HomeSidebar />
      <main className="font-poppins mt-[70px] ml-[284px] flex flex-col gap-6 bg-gray-100 p-8">
        <div className="flex flex-col gap-15">
          <ProductCards products={filteredProducts} categoryName={category} />
        </div>
      </main>
    </>
  );
}
