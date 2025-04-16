import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";

export default function Success() {
  const { setSignupStatus } = useAuth();
  const nav = useNavigate();
  function handleClick() {
    setSignupStatus(false);
    nav("/signin");
  }
  return (
    <section className="font-poppins mx-auto my-[270px] flex w-fit flex-col items-center justify-center p-[20px]">
      <h1 className="text-[2.1rem] font-bold">
        <span className="text-shadow-s text-[#153969]">Sucessful </span>
        <span className="text-[#718bab] text-shadow-xs">Registration</span>
      </h1>
      <button
        onClick={handleClick}
        className="mt-[15px] cursor-pointer rounded-[10px] border-none bg-gradient-to-br from-[#718bab] to-[#153969] px-[23px] py-[6px] text-[1.3rem] text-white shadow-md transition-all duration-200 hover:opacity-80"
      >
        Proceed to login
      </button>
    </section>
  );
}
