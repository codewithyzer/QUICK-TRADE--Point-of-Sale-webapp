import { useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import CartItem from "./cartitem";

export default function CartItems(props) {
  const { user } = useAuth();

  const cartItemsElements = props.cartItems.map((item) => {
    return <CartItem key={item.product.id} {...item} />;
  });
  return (
    <main className="font-poppins mt-[70px] ml-[284px] flex min-h-screen gap-6 bg-gray-100 p-8">
      <div className="flex w-2/3 flex-col gap-2">
        <h1 className="text-primary mb-5 flex items-end text-3xl font-semibold">
          <i className="fa-solid fa-cart-shopping mr-3"></i>
          {user.username}'s cart
        </h1>
        <div className="fade-in flex flex-col gap-4">{cartItemsElements}</div>
      </div>
    </main>
  );
}
