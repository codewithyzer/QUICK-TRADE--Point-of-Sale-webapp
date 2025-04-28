import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { retrieveProduct } from "../../endpoints/api";
import HomeSidebar from "./components/HomeSidebar";
import Header from "../../components/Header";
import { useAuth } from "../../context/AuthContext";
import maps from "../../assets/maps_example.png";

export default function Product() {
  const { user } = useAuth();
  const { id } = useParams();
  const [productData, setProductData] = useState({});
  const colors = [
    "bg-blue-400",
    "bg-orange-400",
    "bg-green-400",
    "bg-violet-400",
  ];
  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  useEffect(() => {
    async function fetchData() {
      try {
        const data = await retrieveProduct(id);
        setProductData(data);
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
      <main className="font-poppins mt-[70px] ml-[284px] flex h-full gap-6 bg-gray-100 p-8">
        {Object.keys(productData).length > 0 ? (
          <>
            <div className="flex w-1/2 flex-col gap-4 rounded-md">
              <div className="fade-in relative w-full">
                <img
                  src={productData.image}
                  alt="Product Image"
                  className="rounded-sm"
                />
                {productData.in_stock ? (
                  <p className="absolute top-4 left-4 rounded-sm bg-green-400 px-3 py-1 text-sm font-medium text-white">
                    Available
                  </p>
                ) : (
                  <p className="absolute top-3 left-3 rounded-sm bg-red-400 px-3 py-1 text-sm font-medium text-white">
                    Sold out
                  </p>
                )}
                <div className="bg-primary absolute right-4 bottom-4 flex items-center justify-center rounded-md px-4 py-2 text-lg font-medium text-white">
                  ₱{" "}
                  {productData.price.length > 6
                    ? productData.price.slice(0, -6) +
                      ", " +
                      productData.price.slice(-6, productData.price.length)
                    : productData.price}
                </div>
              </div>
              <div className="relative flex flex-col rounded-md bg-white px-7 py-5">
                <div className="flex flex-col gap-5 py-2">
                  <div>
                    <p className="text-thirdary text-sm font-semibold">
                      <i className="fa-solid fa-circle-info mr-2"></i>Product
                      name
                    </p>
                    <p className="text-primary font-sm text-xl">
                      {productData.name}
                    </p>
                  </div>
                  <div>
                    <p className="text-thirdary text-sm font-semibold">
                      <i className="fa-solid fa-circle-info mr-2"></i>Product
                      category
                    </p>
                    <p className="text-primary font-sm text-xl">
                      {productData.category.name}
                    </p>
                  </div>
                  <div>
                    <p className="text-thirdary text-sm font-semibold">
                      <i className="fa-solid fa-circle-info mr-2"></i>Product
                      owner
                    </p>
                    <p className="text-primary font-sm text-xl">
                      {productData.owner.username}
                    </p>
                  </div>
                  <div>
                    <p className="text-thirdary text-sm font-semibold">
                      <i className="fa-solid fa-circle-info mr-2"></i>Product
                      Description (RFS)
                    </p>
                    <p className="text-primary font-sm text-md">
                      {productData.rfs}
                    </p>
                  </div>
                  <div className="border- ml-auto flex gap-3">
                    <button className="cursor-pointer rounded-md bg-gray-400 px-3.5 py-2 text-sm font-medium text-white transition-all duration-200 hover:text-white hover:opacity-80">
                      <i class="fa-solid fa-cart-plus mr-2"></i>Add to cart
                    </button>
                    <button className="bg-primary cursor-pointer rounded-md px-3.5 py-2 text-sm font-medium text-white transition-all duration-200 hover:opacity-80">
                      Buy now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="fade-in font-poppins flex h-148 w-full flex-col items-center justify-center gap-1">
            <p className="text-3xl font-semibold text-red-400">
              Product not found<i class="fa-solid fa-exclamation ml-2"></i>
            </p>
            <p className="text-primary w-80 text-center text-lg font-medium">
              Hey {user?.username}, it seems like the product you trying to find
              does not exist.
            </p>
          </div>
        )}
        <div className="flex h-full w-1/2 flex-col gap-4">
          <div className="flex flex-col gap-2 rounded-md bg-white p-7">
            <p className="text-thirdary text-lg font-semibold">
              Seller information
            </p>
            <div className="flex gap-2">
              <div className="text-md text-white} bg-primary flex h-13 w-13 items-center justify-center rounded-md text-white">
                {productData.owner?.username[0]}
              </div>
              <div className="text-thirdary flex flex-col justify-between p-1 text-sm font-medium">
                <p>Product owner: {productData.owner?.username}</p>
                <p>Joined QUICKTRADE in {productData.owner?.date_joined}</p>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2 rounded-md bg-white p-7">
            <p className="text-thirdary text-lg font-semibold">
              Meetup preferences
            </p>
            <div className="flex flex-col">
              <img
                src={maps}
                alt="meet up preference"
                className="border-thirdary rounded-md border-1"
              />
              <p className="text-thirdary mt-2 font-medium">Alangilan</p>
              <p className="text-thirdary text-sm">Location is approximate</p>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
