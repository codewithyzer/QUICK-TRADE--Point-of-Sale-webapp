import HomeSidebar from "./components/HomeSidebar.jsx";
import Header from "../../components/Header.jsx";
import { useAuth } from "../../context/AuthContext";
import { useParams } from "react-router-dom";
import { searchAProduct } from "../../endpoints/api.js";
import { useEffect, useState } from "react";
import ProductCards from "./components/ProductCards.jsx";

export default function SearchPage() {
  const { user } = useAuth();
  const { item } = useParams();
  const [fetchedData, setFetchedData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await searchAProduct(`search=${item}&exclude_user=true`);
        setFetchedData(data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, [item]);
  return (
    <>
      <HomeSidebar />
      <Header user={user} />
      <main className="font-poppins mt-[70px] ml-[284px] flex min-h-screen flex-col gap-6 bg-gray-100 p-8">
        <h1 className="text-primary text-2xl font-normal">
          {fetchedData.length > 0 ? (
            <p>
              Search results for <span className="font-semibold">{item}</span>
            </p>
          ) : (
            <p>
              No results found for{" "}
              <span className="font-semibold">{item}</span>{" "}
            </p>
          )}
        </h1>
        <ProductCards products={fetchedData} />
      </main>
    </>
  );
}
