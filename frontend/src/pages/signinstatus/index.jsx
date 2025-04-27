import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

export default function FailedSignin() {
  return (
    <section className="font-poppins mx-auto my-[270px] flex w-fit flex-col items-center justify-center p-[20px]">
      <h1 className="text-[2.1rem] font-bold">
        <span className="text-shadow-s text-[#153969]">Login failed, </span>
        <span className="text-[#718bab] text-shadow-xs">
          Please check your credentials.
        </span>
      </h1>
      <Link
        to={"/signin"}
        className="mt-[15px] cursor-pointer rounded-[10px] border-none bg-gradient-to-br from-[#718bab] to-[#153969] px-[23px] py-[6px] text-[1.3rem] text-white shadow-md transition-all duration-200 hover:opacity-80"
      >
        Back to login
      </Link>
    </section>
  );
}
