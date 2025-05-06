import { useState } from "react";
import { useNavigate } from "react-router-dom";
import searchIcon from "../assets/search.png";

export default function SearchForm() {
  const [searched, setSearched] = useState("");
  const nav = useNavigate();

  function handleChange(event) {
    const { value } = event.currentTarget;
    setSearched(value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    nav(`/home/products/search/${searched}`);
    setSearched("");
  }

  return (
    <form onSubmit={handleSubmit} className="mt-[20px] flex items-center">
      <input
        onChange={handleChange}
        value={searched}
        type="text"
        id="search"
        name="search"
        placeholder="Search"
        className="input-two h-[39px] w-[200px] rounded-l-[5px] border-[3px] border-[#153969] bg-white pr-[10px] pl-[10px] font-medium text-[#153969] outline-0"
      />
      <button className="flex h-[39px] w-[39px] cursor-pointer items-center justify-center rounded-r-[5px] border-0 bg-[#153969] outline-0 transition-opacity duration-100">
        <img src={searchIcon} alt="search icon" className="w-[30px]" />
      </button>
    </form>
  );
}
