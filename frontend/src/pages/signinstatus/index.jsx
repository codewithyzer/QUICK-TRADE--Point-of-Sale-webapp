import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

export default function FailedSignin() {
  return (
    <section className="font-poppins mx-auto my-[170px] flex w-fit flex-col items-center justify-center gap-2 p-[20px]">
      <h1 className="flex flex-col items-center">
        <i className="fa-solid fa-circle-xmark text-thirdary text-[100px]"></i>
        <p className="text-thirdary text-[50px] font-semibold">Login Failed</p>
      </h1>
      <h1 className="w-115 text-center text-[1.7rem] font-bold">
        <span className="text-[#153969]">
          Please check your credentials or wait for admin's approval before
          logging in.
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
