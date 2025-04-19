import defaultProductImage from "../assets/No Product Image.svg";

export default function SmallCard() {
  return (
    <div className="border-primary flex h-50 w-100 flex-col overflow-hidden rounded-xl border-1 bg-white shadow-md transition-all duration-50">
      <div className="bg-thirdary flex h-4/5 w-full items-center justify-center">
        <img
          src={defaultProductImage}
          alt="default product image"
          className="w-full object-contain"
        />
      </div>
      <div className="flex h-1/5 w-full border-t-1 bg-white">
        <div className="flex items-center gap-2 pl-4 text-[0.65rem]">
          <p className="text-primary font-semibold">
            Name: <span className="font-medium">Laptop</span>
          </p>
          <p className="text-primary font-semibold">
            Price: <span className="font-medium">199.00</span>
          </p>
        </div>
        <div className="ml-auto flex items-center gap-2 pr-4">
          <button className="bg-thirdary hover:bg-primary cursor-pointer justify-self-end rounded-md px-2 py-0.25 text-sm font-medium text-white transition-all duration-200">
            View
          </button>
          <button className="bg-thirdary hover:bg-primary cursor-pointer justify-self-end rounded-md px-2 py-0.25 text-sm font-medium text-white transition-all duration-200">
            Buy
          </button>
        </div>
      </div>
    </div>
  );
}
