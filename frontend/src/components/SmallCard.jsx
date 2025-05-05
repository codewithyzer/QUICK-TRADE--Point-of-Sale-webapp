import defaultProductImage from "../assets/No Product Image.svg";
import { Link, useNavigate } from "react-router-dom";

export default function SmallCard(props) {
  const nav = useNavigate();
  function handleClick() {
    nav(`/buy/products/${props.id}`);
  }
  return (
    <div
      onClick={handleClick}
      className="relative flex h-60 shrink-0 cursor-pointer flex-col overflow-hidden rounded-sm border-solid bg-white transition-all duration-50 hover:border-1 hover:border-gray-400"
    >
      <div className="bg-primary absolute top-2 left-2 rounded-md px-2 py-1 text-xs font-semibold text-white">
        By:{" "}
        <span className="font-normal">
          {props.owner.username.length > 8
            ? `${props.owner.username.slice(0, 8)}...`
            : props.owner.username}
        </span>
      </div>
      <div className="flex h-4/5 w-full items-center justify-center bg-white">
        <img
          src={props.image}
          alt="default product image"
          className="object-sover w-full"
        />
      </div>
      <div className="flex h-1/5 w-full bg-white">
        <div className="flex items-center gap-2 pl-4 text-[0.65rem]">
          <p className="text-primary text-[0.9rem] font-medium">
            {props.name.length > 35
              ? `${props.name.slice(0, 35)}...`
              : props.name}
          </p>
        </div>
        <div className="ml-auto flex items-center gap-2 pr-2.5">
          <p className="text-primary text-lg font-bold">₱{props.price}</p>
        </div>
      </div>
    </div>
  );
}
