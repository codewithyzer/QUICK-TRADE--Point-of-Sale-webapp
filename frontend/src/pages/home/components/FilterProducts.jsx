export default function FilterProducts() {
  return (
    <form
      action=""
      className="flex h-8 w-80 items-center justify-end gap-2 self-end"
    >
      <div className="z-10 flex flex-col gap-2">
        <select
          name="productCategory"
          className="border-primary text-primary cursor-pointer rounded-lg border-1 px-2 py-1.5 text-[0.8rem] font-semibold shadow-sm outline-none"
        >
          <option value="" disabled></option>
          <option value="1">Electronics</option>
          <option value="2">Home Appliances</option>
          <option value="3">Fashion</option>
          <option value="4">Health & Beauty</option>
          <option value="5">Furniture</option>
          <option value="6">Toys & Games</option>
          <option value="7">Sports & Outdoors</option>
          <option value="8">Automotive</option>
          <option value="9">Groceries</option>
          <option value="10">Book & Media</option>
        </select>
      </div>
      <button className="border-primary text-primary hover:bg-primary h-full cursor-pointer rounded-lg border-1 px-10 text-[0.8rem] font-medium transition-all duration-200 hover:text-white">
        Filter
      </button>
    </form>
  );
}
