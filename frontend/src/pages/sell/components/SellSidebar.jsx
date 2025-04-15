import { Link } from "react-router-dom";
import searchIcon from "../../../assets/search.png";
import { useNavigate } from "react-router-dom";
import { logout } from "../../../endpoints/api";

export default function BuySidebar() {
  const navigate = useNavigate();

  async function handleLogout() {
    try {
      const res = await logout();
      if (res.success) {
        navigate("/signin");
      } else {
        alert("logout failed. Try again.");
      }
    } catch (error) {
      console.error("Logout error:", error);
      alert("Something went wrong during logout.");
    }
  }
  const userStyle =
    "active:opacity-80 flex h-[38px] w-[240px] cursor-pointer items-center justify-start rounded-[5px] border-0 pl-4 text-[0.86rem] font-medium transition-all duration-200 text-white bg-[#87a0be]";

  const pageActiveStyle =
    "active:opacity-80 flex h-[38px] w-[240px] cursor-pointer items-center justify-start rounded-[5px] border-0 pl-4 text-[0.86rem] font-medium transition-all duration-200 text-white bg-[#153969]";

  const buttonNormalStyle =
    "active:opacity-80 flex h-[38px] w-[240px] cursor-pointer items-center justify-start rounded-[5px] border-0 pl-4 text-[0.86rem] font-medium transition-all duration-200 text-[#153969] bg-transparent hover:bg-[#153969] hover:text-white";
  return (
    <section className="font-poppins side-bar-shadow fixed top-0 bottom-0 left-0 flex w-[284px] flex-col items-center bg-white">
      <div className="flex w-full flex-col py-[20px] pb-[30px] pl-[20px]">
        <h1 className="mr-[30px] mb-[-10px] self-center text-[4rem] font-bold">
          <span className="text-[#153969]">Q</span>
          <span className="text-[#87a0be]">T</span>
        </h1>
        <h1 className="mr-[20px] self-center text-[2rem] font-semibold">
          <span className="text-[#153969]">Quick</span>{" "}
          <span className="text-[#87a0be]">Trade</span>
        </h1>
        <form action="" className="mt-[20px] flex items-center">
          <input
            type="text"
            id="search"
            name="search"
            placeholder="Search"
            className="h-[39px] w-[200px] rounded-l-[5px] border-[3px] border-[#153969] bg-white pr-[10px] pl-[10px] font-medium text-[#153969] outline-0"
          />
          <button className="flex h-[39px] w-[39px] cursor-pointer items-center justify-center rounded-r-[5px] border-0 bg-[#153969] outline-0 transition-opacity duration-100">
            <img src={searchIcon} alt="search icon" className="w-[30px]" />
          </button>
        </form>
      </div>
      <div className="font-poppins flex h-[250px] w-full flex-col items-start justify-between pl-[20px]">
        <Link to={"/home"}>
          <button className={buttonNormalStyle} name="home-page-toggler">
            <i className="fa-solid fa-house mr-2"></i>Home
          </button>
        </Link>
        <Link to={"/notifications"}>
          <button
            className={buttonNormalStyle}
            name="notification-page-toggler"
          >
            <i className="fa-solid fa-bell mr-2"></i>Notifications
          </button>
        </Link>
        <Link to={"/messages"}>
          <button name="message-page-toggler" className={buttonNormalStyle}>
            <i className="fa-solid fa-message mr-2"></i>Messages
          </button>
        </Link>
        <Link to={"/buy"}>
          <button name="buy-page-toggler" className={buttonNormalStyle}>
            <i className="fa-solid fa-shop mr-2"></i>Buy
          </button>
        </Link>
        <Link to={"/sell"}>
          <button name="sell-page-toggler" className={pageActiveStyle}>
            <i className="fa-solid fa-square-plus mr-2"></i>Sell
          </button>
        </Link>
      </div>
      <div className="mt-auto flex w-full justify-start px-8 pb-5">
        <button
          onClick={handleLogout}
          className="cursor-pointer text-[0.86rem] font-[500] text-[#153969] hover:text-[#87a0be]"
        >
          <i className="fa-solid fa-right-from-bracket mr-2"></i>Logout
        </button>
      </div>
    </section>
  );
}
