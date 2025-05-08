import { useState, useEffect } from "react";
import { removeFromCart } from "../../../endpoints/api";
import { useNavigate } from "react-router-dom";
import { updateProduct } from "../../../endpoints/api";
import { addNotification } from "../../../endpoints/api";
import { sendAMessage } from "../../../endpoints/api";
import { useAuth } from "../../../context/AuthContext";
import { filterConversation } from "../../../endpoints/api";
import { createConversation } from "../../../endpoints/api";

export default function CartItem(props) {
  const { user } = useAuth();
  const [isShownCheck, setIsShownCheck] = useState(false);
  const [isRemoved, setIsRemoved] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [filteredConversation, setFilteredConversation] = useState({});
  const [buyError, setBuyError] = useState(false);
  const nav = useNavigate();

  useEffect(() => {
    async function fetchData() {
      try {
        const conversation = await filterConversation(
          user.id,
          props.product.owner.id,
        );
        if (conversation.length > 0) {
          setFilteredConversation(conversation[0]);
        } else {
          try {
            await createConversation(props.product.owner.id);
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

  async function handleBuy() {
    try {
      await updateProduct(user.id, props.product.id);
      if (props.product.in_stock) {
        try {
          await sendAMessage(
            filteredConversation.id,
            `Automatic Message: I bought your product "${props.product.name}"`,
          );
          await addNotification(
            props.product.owner.id,
            `${user.username} just bought your product "${props.product.name.toUpperCase()}".`,
          );
        } catch (error) {
          console.error(error);
        }
        window.location.reload();
        handleRemove();
      } else {
        setBuyError(true);

        setTimeout(() => {
          setIsFadingOut(true);
        }, 5000);

        setTimeout(() => {
          setBuyError(false);
          setIsFadingOut(false);
        }, 5250);
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      {((buyError && !props.product.in_stock) || isFadingOut) && (
        <div
          className={`${isFadingOut ? "fade-out" : "fade-in"} fixed right-5 bottom-5 w-65 rounded-md bg-red-400 p-5 text-sm font-medium text-white`}
        >
          <i className="fa-solid fa-circle-exclamation mr-2"></i>Sorry but this
          product is already bought by someone.
        </div>
      )}
      <div className="relative flex h-45 w-full gap-3 overflow-hidden rounded-md bg-white transition-all duration-50">
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
            <button
              onClick={handleBuy}
              className="bg-primary cursor-pointer rounded-md px-2.5 py-1 text-sm font-medium text-white transition-all duration-200 hover:opacity-80"
            >
              Buy
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
