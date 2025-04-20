import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../../components/Header.jsx";
import HomeSidebar from "./components/HomeSidebar.jsx";
import { useAuth } from "../../context/AuthContext";
import LargeCard from "../../components/LargeCard.jsx";
import SmallCard from "../../components/SmallCard.jsx";
import { get_products } from "../../endpoints/api.js";

export default function HomePage() {
  const { user } = useAuth();
  const [products, setProducts] = useState([]);
  console.log(products);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await get_products("exclude_user=false");
        setProducts(data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, []);

  const categories = [
    "Electronics",
    "Home Appliances",
    "Fashion",
    "Health & Beauty",
    "Furniture",
    "Toys & Games",
    "Sports & Outdoors",
    "Automotive",
    "Groceries",
    "Book & Media",
  ];

  const categoryCards = categories.map((categoryName) => {
    const categoryProducts = products
      .filter((product) => product.category?.name === categoryName)
      .map((product) => <SmallCard key={product.id} {...product} />);

    if (categoryProducts.length > 0) {
      return (
        <div className="flex cursor-default flex-col gap-3" key={categoryName}>
          <h1 className="text-primary text-2xl font-semibold">
            {categoryName}
          </h1>
          <div className="scrollable flex gap-5 overflow-x-auto pb-3">
            {categoryProducts}
          </div>
        </div>
      );
    }
    return null;
  });

  return (
    <>
      <Header user={user} />
      <HomeSidebar />
      <main className="font-poppins mt-[70px] ml-[284px] p-8">
        <div className="flex flex-col gap-10">
          <div className="flex flex-col gap-5">
            <h1 className="text-3xl font-semibold text-[var(--color-primary)]">
              For You . . .
            </h1>
            <div className="scrollable grid grid-flow-col gap-5 pb-3">
              <LargeCard />
              <LargeCard />
              <LargeCard />
            </div>
          </div>
          {categoryCards}
        </div>
      </main>
    </>
  );
}
