import { useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import CartItem from "./cartitem";

export default function CartItems(props) {
  const { user } = useAuth();
  const nav = useNavigate();

  const cartItemsElements = props.cartItems.map((item) => {
    return <CartItem key={item.product.id} {...item} />;
  });

  function handleAdd() {
    console.log("clicked!");
    nav("/home");
  }
  return (
    <main className="font-poppins mt-[70px] ml-[284px] flex min-h-screen gap-6 bg-gray-100 p-8">
      <div className="flex w-2/3 flex-col gap-2">
        <h1 className="text-primary mb-5 flex items-end text-2xl font-semibold">
          {user.username.slice(0, 1).toUpperCase() +
            user.username.slice(1, user.username.length)}
          's cart
        </h1>
        <div className="fade-in flex flex-col gap-4">
          {cartItemsElements.length > 0 ? (
            cartItemsElements
          ) : (
            <div className="relative flex h-45 w-full items-center justify-end gap-3 overflow-hidden rounded-md bg-white px-10 transition-all duration-50">
              <p className="text-primary text-lg font-medium">Add a product</p>
              <button
                onClick={handleAdd}
                className="bg-primary duraton-150 h-12 w-12 cursor-pointer rounded-full text-white transition-all hover:opacity-70"
              >
                <i className="fa-solid fa-plus"></i>
              </button>
            </div>
          )}
        </div>
      </div>
      <div className="flex w-1/3 flex-col gap-2">
        <h1 className="text-primary mb-5 flex items-end text-2xl font-semibold">
          Instructions
        </h1>
        <div className="text-primary rounded-md border-1 border-gray-400 bg-white p-6 text-sm">
          <p className="mb-1 font-semibold text-yellow-400">
            <i className="fa-solid fa-triangle-exclamation mr-2"></i>Instant
            Purchase Notice
          </p>
          <ul className="ml-4 list-disc space-y-1 text-sm">
            <li>
              Clicking <strong>“Buy”</strong> will purchase the product
              <span className="font-semibold text-red-500"> immediately</span> —
              no confirmation prompt.
            </li>
            <li>
              An automatic message will be sent to the <strong>seller</strong>{" "}
              upon purchase.
            </li>
          </ul>
        </div>
      </div>
    </main>
  );
}
