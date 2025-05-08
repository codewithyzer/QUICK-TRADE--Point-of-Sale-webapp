import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";

export default function Success() {
  const { setSignupStatus } = useAuth();
  const nav = useNavigate();
  function handleClick() {
    setSignupStatus(false);
    nav("/signup/credentials");
  }
  return (
    <section className="font-poppins mx-auto my-[170px] flex w-fit flex-col items-center justify-center gap-2 p-[20px]">
      <h1 className="flex flex-col items-center">
        <i className="fa-solid fa-circle-check text-thirdary text-[100px]"></i>
        <p className="text-thirdary text-[50px] font-semibold">Success</p>
      </h1>
      <h1 className="w-100 text-center text-[1.7rem] font-bold">
        <span className="text-[#153969]">
          Congratulations on your succesful registration!
        </span>
      </h1>
      <button
        onClick={handleClick}
        className="mt-[15px] cursor-pointer rounded-[10px] border-none bg-gradient-to-br from-[#718bab] to-[#153969] px-[23px] py-[6px] text-[1.3rem] text-white shadow-md transition-all duration-200 hover:opacity-80"
      >
        Continue
      </button>
    </section>
  );
}
