import { useState } from "react";
import { get_products } from "../../../endpoints/api";
import { useNavigate } from "react-router-dom";

export default function FilterProducts() {
  const [category, setCategory] = useState("Electronics");
  const nav = useNavigate();

  function handleChange(event) {
    const { value } = event.currentTarget;
    setCategory(value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    nav(`products/filter/${category}`);
  }

  return (
    <form
      action=""
      className="flex h-8 w-80 items-center justify-end gap-2 self-end"
      onSubmit={handleSubmit}
    >
      <div className="z-10 flex flex-col gap-2">
        <select
          onChange={handleChange}
          name="productCategory"
          className="border-primary text-primary cursor-pointer rounded-lg border-1 px-2 py-1.5 text-[0.8rem] font-semibold shadow-sm outline-none"
        >
          <option value="" disabled></option>
          <option value="Electronics">Electronics</option>
          <option value="Home Appliances">Home Appliances</option>
          <option value="Fashion">Fashion</option>
          <option value="Health & Beauty">Health & Beauty</option>
          <option value="Furniture">Furniture</option>
          <option value="Toys & Games">Toys & Games</option>
          <option value="Sports & Outdoors">Sports & Outdoors</option>
          <option value="Automotive">Automotive</option>
          <option value="Groceries">Groceries</option>
          <option value="Book & Media">Book & Media</option>
        </select>
      </div>
      <button className="border-primary text-primary hover:bg-primary h-full cursor-pointer rounded-lg border-1 px-10 text-[0.8rem] font-medium transition-all duration-200 hover:text-white">
        Filter
      </button>
    </form>
  );
}
