import defaultProductImage from "../assets/No Product Image.svg";

export default function LargeCard(props) {
  return (
    <div className="border-primary flex max-h-90 min-h-75 max-w-120 min-w-100 cursor-pointer flex-col overflow-hidden rounded-md bg-white transition-all duration-50 hover:border-1">
      <div className="flex h-4/5 w-full items-center justify-center bg-white">
        <img
          src={props.image}
          alt="default product image"
          className="w-full object-contain"
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
