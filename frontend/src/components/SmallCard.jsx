import defaultProductImage from "../assets/No Product Image.svg";

export default function SmallCard(props) {
  return (
    <div className="border-primary relative flex h-50 w-100 shrink-0 cursor-default flex-col overflow-hidden rounded-xl border-1 bg-white shadow-md transition-all duration-50">
      <div className="bg-primary absolute top-2 left-2 rounded-md px-2 py-1 text-xs font-semibold text-white">
        By:{" "}
        <span className="font-normal">
          {props.owner.username.length > 8
            ? `${props.owner.username.slice(0, 8)}...`
            : props.owner.username}
        </span>
      </div>
      <div className="bg-thirdary flex h-4/5 w-full items-center justify-center">
        <img
          src={props.image}
          alt="default product image"
          className="w-full object-contain"
        />
      </div>
      <div className="flex h-1/5 w-full border-t-1 bg-white">
        <div className="flex items-center gap-2 pl-4 text-[0.65rem]">
          <p className="text-primary font-semibold">
            Name:{" "}
            <span className="font-medium">
              {props.name.length > 15
                ? `${props.name.slice(0, 15)}...`
                : props.name}
            </span>
          </p>
          <p className="text-primary font-semibold">
            Price: ₱<span className="font-medium">{props.price}</span>
          </p>
        </div>
        <div className="ml-auto flex items-center gap-2 pr-2.5">
          <button className="bg-thirdary hover:bg-primary cursor-pointer justify-self-end rounded-md px-2 py-0.25 text-sm font-medium text-white transition-all duration-200">
            View
          </button>
          {props.in_stock && (
            <button className="bg-thirdary hover:bg-primary cursor-pointer justify-self-end rounded-md px-2 py-0.25 text-sm font-medium text-white transition-all duration-200">
              Buy
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
