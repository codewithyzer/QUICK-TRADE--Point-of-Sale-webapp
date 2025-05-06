import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { logout } from "../../../endpoints/api";
import SearchForm from "../../../components/SearchForm.jsx";

export default function MessageSidebar() {
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
    <section className="border-thirdary font-poppins fixed top-0 bottom-0 left-0 flex w-[284px] flex-col items-center border-r-1 bg-white">
      <div className="flex w-full flex-col py-[20px] pb-[30px] pl-[20px]">
        <h1 className="mr-[30px] mb-[-10px] self-center text-[4rem] font-bold">
          <span className="text-[#153969]">Q</span>
          <span className="text-[#87a0be]">T</span>
        </h1>
        <h1 className="mr-[20px] self-center text-[2rem] font-semibold">
          <span className="text-[#153969]">Quick</span>{" "}
          <span className="text-[#87a0be]">Trade</span>
        </h1>
        <SearchForm />
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
          <button name="message-page-toggler" className={pageActiveStyle}>
            <i className="fa-solid fa-message mr-2"></i>Messages
          </button>
        </Link>
        <Link to={"/buy"}>
          <button name="buy-page-toggler" className={buttonNormalStyle}>
            <i className="fa-solid fa-shop mr-2"></i>Buy
          </button>
        </Link>
        <Link to={"/sell"}>
          <button name="sell-page-toggler" className={buttonNormalStyle}>
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
