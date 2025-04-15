import { Link } from "react-router-dom";
import background from "./../../assets/landingpage_background.png";
import quickTradeText from "./../../assets/QUICK TRADE.png";

export default function LandingPage() {
  const isLoggedIn = false;
  return (
    <>
      <nav className="font-poppins fixed top-0 right-0 left-0 z-10 flex h-[90px] items-center justify-center bg-[#F5F5F5] px-[30px] shadow-md">
        <Link to={"/"} className="text-[1.9rem] font-bold">
          <span className="text-[var(--color-primary)]">Q</span>
          <span className="text-[var(--color-thirdary)]">T</span>
        </Link>
        <ul className="mr-2.5 ml-auto flex list-none items-center gap-[5px] font-[500]">
          {!isLoggedIn && (
            <li>
              <Link to={"/signin"}>
                <button className="border-box ml-[15px] w-[100px] cursor-pointer rounded-xl border-2 bg-white py-[5px] text-[0.9rem] text-[var(--color-primary)] transition-all duration-200 hover:opacity-70">
                  Login
                </button>
              </Link>
            </li>
          )}
          {isLoggedIn ? (
            <li>
              <Link to={"/home"}>
                <button className="ml-[15px] w-[100px] cursor-pointer rounded-xl bg-gradient-to-br from-[#718bab] to-[#153969] py-[6px] align-middle text-[0.9rem] text-white transition-all duration-200 hover:opacity-70">
                  Home
                </button>
              </Link>
            </li>
          ) : (
            <li>
              <Link to={"/signup"}>
                <button className="ml-[15px] w-[100px] cursor-pointer rounded-xl bg-gradient-to-br from-[#718bab] to-[#153969] py-[6px] align-middle text-[0.9rem] text-white transition-all duration-200 hover:opacity-70">
                  Sign up
                </button>
              </Link>
            </li>
          )}
        </ul>
      </nav>
      <img
        src={background}
        alt="A Background"
        className="fixed top-[-300px] left-[-500px] z-9 w-[1100px]"
      />
      <img
        src={quickTradeText}
        alt="Quick Trade Text Logo"
        className="z-9 mt-[310px] ml-[400px] w-[860px]"
      />
    </>
  );
}
