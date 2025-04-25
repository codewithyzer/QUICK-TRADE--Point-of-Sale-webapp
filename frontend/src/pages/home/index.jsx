import { useState, useEffect } from "react";
import Header from "../../components/Header.jsx";
import HomeSidebar from "./components/HomeSidebar.jsx";
import { useAuth } from "../../context/AuthContext";
import SmallCard from "../../components/SmallCard.jsx";
import { get_products } from "../../endpoints/api.js";
import electronicsPic from "../../assets/Electronics.png";

export default function HomePage() {
  const { user } = useAuth();
  const [products, setProducts] = useState([]);
  console.log(products);

  const scrollable = "scrollable flex gap-5 overflow-x-auto pb-3";
  const notScrollable = "flex gap-5 pb-3";

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
        <div
          className="fade-in flex cursor-default flex-col gap-4"
          key={categoryName}
        >
          <div className="bg-primary rounded-t-md p-5 text-3xl font-semibold text-white">
            {categoryName}
          </div>
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
            {categoryProducts}
          </div>
        </div>
      );
    } else {
      return (
        <div className="flex cursor-default flex-col gap-4" key={categoryName}>
          <div className="bg-primary rounded-t-md p-5 text-3xl font-semibold text-white">
            {categoryName}
          </div>
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
            <div className="border-primary relative flex h-60 shrink-0 cursor-default flex-col items-center justify-center overflow-hidden bg-white transition-all duration-50">
              <p>No product for this category</p>
            </div>
          </div>
        </div>
      );
    }
  });

  return (
    <>
      <Header user={user} />
      <HomeSidebar />
      <main className="font-poppins mt-[70px] ml-[284px] flex flex-col gap-6 bg-gray-100 p-8">
        <form
          action=""
          className="flex h-8 w-80 items-center justify-end gap-2 self-end"
        >
          <div className="z-10 flex flex-col gap-2">
            <select
              name="productCategory"
              className="border-primary text-primary cursor-pointer rounded-lg border-1 px-2 py-1.5 text-[0.8rem] font-semibold shadow-sm outline-none"
            >
              <option value="" disabled></option>
              <option value="1">Electronics</option>
              <option value="2">Home Appliances</option>
              <option value="3">Fashion</option>
              <option value="4">Health & Beauty</option>
              <option value="5">Furniture</option>
              <option value="6">Toys & Games</option>
              <option value="7">Sports & Outdoors</option>
              <option value="8">Automotive</option>
              <option value="9">Groceries</option>
              <option value="10">Book & Media</option>
            </select>
          </div>
          <button className="border-primary text-primary hover:bg-primary h-full cursor-pointer rounded-lg border-1 px-10 text-[0.8rem] font-medium transition-all duration-200 hover:text-white">
            Filter
          </button>
        </form>
        <div className="flex flex-col gap-15">{categoryCards}</div>
        <div className="text-thirdary mt-10 text-center text-sm">
          You've reached the end of this page
        </div>
      </main>
    </>
  );
}
