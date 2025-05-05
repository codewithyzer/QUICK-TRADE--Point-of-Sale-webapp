import { useState } from "react";
import { removeFromCart } from "../../../endpoints/api";
import { useNavigate } from "react-router-dom";

export default function CartItem(props) {
  const [isShownCheck, setIsShownCheck] = useState(false);
  const [isRemoved, setIsRemoved] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const nav = useNavigate();

  function handleShowCheck() {
    setIsShownCheck((prev) => !prev);
  }

  async function handleRemove() {
    try {
      const data = await removeFromCart(props.product.id);
      console.log(data);
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  }

  function handleReviewProduct() {
    nav(`/buy/products/${props.product.id}`);
  }

  return (
    <>
      <div className="relative flex h-45 w-full gap-3 overflow-hidden rounded-md border-1 border-gray-400 bg-white transition-all duration-50">
        <button
          onClick={handleShowCheck}
          className="absolute top-2 right-3 z-1 cursor-pointer rounded-lg px-2.5 py-1 text-lg transition-all duration-150 hover:bg-gray-300"
          aria-label="Review meetup place"
        >
          <i className="fa-solid fa-ellipsis-vertical"></i>
        </button>
        {isShownCheck && (
          <div className="bg-primary absolute top-3 right-11 z-2 flex flex-col items-start gap-2 rounded-md p-4.5">
            <button
              onClick={handleReviewProduct}
              className="w-full cursor-pointer text-sm font-medium text-white transition-all duration-150 hover:opacity-70"
            >
              Review product details
            </button>
          </div>
        )}

        <div className="w-2/5">
          <img
            src={props.product.image}
            alt="product image"
            className="h-full w-full object-cover object-center"
          />
        </div>
        <div className="flex w-3/5 flex-col p-4">
          <div className="flex flex-col gap-1">
            <div className="gap-0.1 flex flex-col">
              <p className="text-thirdary text-[0.75rem] font-medium">
                Product name
              </p>
              <p className="text-lg">{props.product.name}</p>
            </div>

            <div className="flex flex-col gap-1">
              <p className="text-thirdary text-[0.75rem] font-medium">
                Product price
              </p>
              <p className="text-md font-medium">₱ {props.product.price}</p>
            </div>
          </div>
          <div className="mt-auto flex w-full items-center justify-end gap-2 pb-1">
            <button
              onClick={handleRemove}
              className="cursor-pointer rounded-md bg-gray-400 px-2.5 py-1 text-sm font-medium text-white transition-all duration-200 hover:opacity-80"
            >
              Remove
            </button>
            <button className="bg-primary cursor-pointer rounded-md px-2.5 py-1 text-sm font-medium text-white transition-all duration-200 hover:opacity-80">
              Buy
            </button>
          </div>
        </div>
      </div>
      {(isRemoved || isFadingOut) && (
        <div
          className={`${isFadingOut ? "fade-out" : "fade-in"} font-poppins fixed right-5 bottom-5 z-20 rounded-lg bg-green-400 p-5 text-sm font-medium text-white`}
        >
          <i className="fa-solid fa-circle-check mr-2"></i>Product removed
          succesfully
        </div>
      )}
    </>
  );
}
