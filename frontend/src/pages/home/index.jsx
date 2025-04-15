import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "../../components/Header.jsx";
import HomeSidebar from "./components/HomeSidebar.jsx";
import { useAuth } from "../../context/AuthContext";

export default function HomePage() {
  const { user } = useAuth();
  return (
    <>
      <Header user={user} />
      <HomeSidebar />
      <main className="font-poppins mt-[70px] ml-[284px] p-10">
        <div className="flex flex-col gap-10">
          <div className="flex flex-col gap-5">
            <h1 className="text-3xl font-semibold text-[var(--color-primary)]">
              For You . . .
            </h1>
            <div className="scrollable grid grid-flow-col gap-5 pb-3">
              <div className="h-70 w-120 rounded-md border-2 bg-[var(--color-thirdary)]"></div>
              <div className="h-70 w-120 rounded-md border-2 bg-[var(--color-thirdary)]"></div>
              <div className="h-70 w-120 rounded-md border-2 bg-[var(--color-thirdary)]"></div>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <h1 className="text-2xl font-semibold text-[var(--color-primary)]">
              Electronics
            </h1>
            <div className="scrollable grid grid-flow-col gap-5 pb-3">
              <div className="h-50 w-100 rounded-md border-2 bg-[var(--color-thirdary)]"></div>
              <div className="h-50 w-100 rounded-md border-2 bg-[var(--color-thirdary)]"></div>
              <div className="h-50 w-100 rounded-md border-2 bg-[var(--color-thirdary)]"></div>
              <div className="h-50 w-100 rounded-md border-2 bg-[var(--color-thirdary)]"></div>
              <div className="h-50 w-100 rounded-md border-2 bg-[var(--color-thirdary)]"></div>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <h1 className="text-2xl font-semibold text-[var(--color-primary)]">
              Fashion
            </h1>
            <div className="scrollable grid grid-flow-col gap-5 pb-3">
              <div className="h-50 w-100 rounded-md border-2 bg-[var(--color-thirdary)]"></div>
              <div className="h-50 w-100 rounded-md border-2 bg-[var(--color-thirdary)]"></div>
              <div className="h-50 w-100 rounded-md border-2 bg-[var(--color-thirdary)]"></div>
              <div className="h-50 w-100 rounded-md border-2 bg-[var(--color-thirdary)]"></div>
              <div className="h-50 w-100 rounded-md border-2 bg-[var(--color-thirdary)]"></div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
