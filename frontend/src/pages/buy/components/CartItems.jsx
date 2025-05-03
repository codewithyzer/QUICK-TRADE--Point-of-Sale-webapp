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
        <h1 className="text-primary mb-5 flex items-end text-3xl font-semibold">
          <i className="fa-solid fa-cart-shopping mr-3"></i>
          {user.username}'s cart
        </h1>
        <div className="fade-in flex flex-col gap-4">
          {cartItemsElements.length > 0 ? (
            cartItemsElements
          ) : (
            <div className="relative flex h-45 w-full items-center justify-end gap-4 overflow-hidden rounded-md bg-white px-10 transition-all duration-50">
              <p className="text-primary text-xl font-medium">Add a product</p>
              <button
                onClick={handleAdd}
                className="bg-primary duraton-150 h-15 w-15 cursor-pointer rounded-full text-white transition-all hover:opacity-70"
              >
                <i className="fa-solid fa-plus"></i>
              </button>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
