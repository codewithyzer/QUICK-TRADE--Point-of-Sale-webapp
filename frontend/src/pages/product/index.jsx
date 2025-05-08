import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { retrieveProduct } from "../../endpoints/api";
import BuySidebar from "./components/BuySidebar.jsx";
import Header from "../../components/Header";
import { useAuth } from "../../context/AuthContext";
import maps from "../../assets/maps_example.png";
import { addToCart } from "../../endpoints/api";
import MapView from "./components/MapView.jsx";
import SendMessage from "./components/SendMessage.jsx";
import { filterConversation } from "../../endpoints/api";
import { createConversation } from "../../endpoints/api";
import { updateProduct } from "../../endpoints/api";
import { sendAMessage } from "../../endpoints/api";
import { addNotification } from "../../endpoints/api";

export default function Product() {
  const { user } = useAuth();
  const { id } = useParams();
  const [addToCartSuccess, setAddToCartSuccess] = useState(false);
  const [addToCartFail, setAddToCartFail] = useState(false);
  const [isFadingOut1, setIsFadingOut1] = useState(false);
  const [isFadingOut2, setIsFadingOut2] = useState(false);
  const [productData, setProductData] = useState({});
  const [filteredConversation, setFilteredConversation] = useState({});

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
        const product = await retrieveProduct(id);
        setProductData(product);
        console.log(product);

        const conversation = await filterConversation(
          user.id,
          product.owner.id,
        );
        if (conversation.length > 0) {
          setFilteredConversation(conversation[0]);
        } else {
          try {
            await createConversation(product.owner.id);
          } catch (error) {
            console.error(error);
          }
        }
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, []);

  async function handleAddToCart() {
    try {
      const data = await addToCart(id);
      setAddToCartSuccess(true);

      setTimeout(() => {
        setIsFadingOut1(true);
      }, 5000);

      setTimeout(() => {
        setAddToCartSuccess(false);
        setIsFadingOut1(false);
      }, 5250);
    } catch (error) {
      setAddToCartFail(true);

      setTimeout(() => {
        setIsFadingOut2(true);
      }, 5000);

      setTimeout(() => {
        setAddToCartFail(false);
        setIsFadingOut2(false);
      }, 5250);
      console.error(error);
    }
  }

  async function handleBuy() {
    try {
      await updateProduct(user.id, id);
      await addNotification(
        productData.owner.id,
        `${user.username} just bought your product "${productData.name.toUpperCase()}".`,
      );
      window.location.reload();
    } catch (error) {
      console.error(error);
    }

    try {
      const data = await sendAMessage(
        filteredConversation.id,
        `Automatic Message: I bought your product "${productData.name}"`,
      );
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <>
      <Header user={user} />
      <BuySidebar />
      <main className="font-poppins mt-[70px] ml-[284px] flex h-full gap-6 bg-gray-100 p-8">
        {Object.keys(productData).length > 0 ? (
          <>
            <div className="flex w-1/2 flex-col gap-4 rounded-md">
              <div className="fade-in relative">
                <img
                  src={productData.image}
                  alt="Product Image"
                  className="w-full rounded-sm"
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
                  {productData.price.length > 8
                    ? productData.price.slice(0, 9) + "..."
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
                  {productData.in_stock && (
                    <div className="border- ml-auto flex gap-3">
                      <button
                        onClick={handleAddToCart}
                        className="cursor-pointer rounded-md bg-gray-400 px-3.5 py-2 text-sm font-medium text-white transition-all duration-200 hover:text-white hover:opacity-80"
                      >
                        <i className="fa-solid fa-cart-plus mr-2"></i>Add to
                        cart
                      </button>
                      <button
                        onClick={handleBuy}
                        className="bg-primary cursor-pointer rounded-md px-3.5 py-2 text-sm font-medium text-white transition-all duration-200 hover:opacity-80"
                      >
                        Buy now
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="flex h-full w-1/2 flex-col gap-4">
              <div className="flex flex-col gap-2 rounded-md bg-white p-7">
                <p className="text-thirdary text-lg font-semibold">
                  Seller information
                </p>
                <div className="flex gap-2">
                  <div className="text-md text-white} bg-primary flex h-13 w-13 items-center justify-center rounded-md text-white">
                    {productData.owner?.username[0]}
                  </div>
                  <div className="text-primary flex flex-col justify-between p-1 text-sm font-medium">
                    <p>Product owner: {productData.owner?.username}</p>
                    <p>Joined QUICKTRADE in {productData.owner?.date_joined}</p>
                  </div>
                </div>
              </div>
              <SendMessage
                sellerId={productData.owner?.id}
                conversationId={filteredConversation.id}
              />
              <div className="flex flex-col gap-2 rounded-md bg-white p-7">
                <p className="text-thirdary text-lg font-semibold">
                  Meetup preferences
                </p>
                <div className="flex flex-col">
                  <div className="z-1 overflow-hidden rounded-md">
                    <MapView
                      lat={productData.meetup_lat}
                      lng={productData.meetup_lng}
                    />
                  </div>
                  <p className="text-primary mt-2 font-medium">
                    {productData.meetup_place_name}
                  </p>
                  {productData.meetup_place_name && (
                    <p className="text-primary text-sm">
                      Location is approximate
                    </p>
                  )}
                </div>
              </div>
            </div>
            {(addToCartSuccess || isFadingOut1) && (
              <div
                className={`${isFadingOut1 ? "fade-out" : "fade-in"} font-poppins fixed right-5 bottom-5 z-20 rounded-lg bg-green-400 p-5 text-sm font-medium text-white`}
              >
                <i className="fa-solid fa-circle-check mr-2"></i>Product added
                to cart.
              </div>
            )}
            {(addToCartFail || isFadingOut2) && (
              <div
                className={`${isFadingOut2 ? "fade-out" : "fade-in"} font-poppins fixed right-5 bottom-5 z-20 rounded-lg bg-red-400 p-5 text-sm font-medium text-white`}
              >
                <i className="fa-solid fa-circle-xmark mr-2"></i>This item is
                currently on your cart.
              </div>
            )}
          </>
        ) : (
          <div className="fade-in font-poppins flex h-148 w-full flex-col items-center justify-center gap-1">
            <p className="text-3xl font-semibold text-red-400">
              Product not found<i className="fa-solid fa-exclamation ml-2"></i>
            </p>
            <p className="text-primary w-80 text-center text-lg font-medium">
              Hey {user?.username}, it seems like the product you trying to find
              does not exist.
            </p>
          </div>
        )}
      </main>
    </>
  );
}
