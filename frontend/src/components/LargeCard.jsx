import defaultProductImage from "../assets/No Product Image.svg";

export default function LargeCard() {
  return (
    <div className="border-primary flex h-70 w-120 flex-col overflow-hidden rounded-xl border-1 bg-white shadow-md transition-all duration-50">
      <div className="bg-thirdary flex h-4/5 w-full items-center justify-center">
        <img
          src={defaultProductImage}
          alt="default product image"
          className="w-full object-contain"
        />
      </div>
      <div className="flex h-1/5 w-full border-t-1 bg-white">
        <div className="flex flex-col justify-center pl-4 text-sm">
          <p className="text-primary font-medium">
            Name: <span className="font-normal">Laptop</span>
          </p>
          <p className="text-primary font-medium">
            Price: <span className="font-normal">199.00</span>
          </p>
        </div>
        <div className="ml-auto flex items-center gap-3 pr-4">
          <button className="bg-thirdary hover:bg-primary cursor-pointer justify-self-end rounded-md px-4 py-0.5 font-medium text-white transition-all duration-200">
            View
          </button>
          <button className="bg-thirdary hover:bg-primary cursor-pointer justify-self-end rounded-md px-4 py-0.5 font-medium text-white transition-all duration-200">
            Buy
          </button>
        </div>
      </div>
    </div>
  );
}
