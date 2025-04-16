import { Link } from "react-router-dom";
import { useState } from "react";

export default function Failed(props) {
  return (
    <>
      <header className="fixed top-0 right-0 left-0 flex justify-end pt-3 pr-3">
        <div className="font-poppins rounded-md bg-red-500 p-4 text-xs font-medium text-white">
          {props.data.username && <p>Username Error: {props.data.username}</p>}
          {props.data.password && <p>Password Error: {props.data.password}</p>}
        </div>
      </header>
      <section className="font-poppins mx-auto my-[270px] flex w-fit flex-col items-center justify-center p-[20px]">
        <h1 className="text-[2.1rem] font-bold">
          <span className="text-shadow-s text-[#153969]">Error: </span>
          <span className="text-[#718bab] text-shadow-xs">
            Failed Registration
          </span>
        </h1>
        <Link to={"/signup"}>
          <button className="mt-[15px] cursor-pointer rounded-[10px] border-none bg-gradient-to-br from-[#718bab] to-[#153969] px-[23px] py-[6px] text-[1.3rem] text-white shadow-md transition-all duration-200 hover:opacity-80">
            Sign up again
          </button>
        </Link>
      </section>
    </>
  );
}
