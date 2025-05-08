import { Link } from "react-router-dom";

export default function Header(props) {
  return (
    <header className="font-poppin border-thirdary fixed top-0 right-0 left-[283px] z-21 flex h-[70px] items-center justify-end gap-2 border-b-1 bg-white px-[20px]">
      <Link
        to={"/profile"}
        className="border-primary hover:bg-secondary flex items-center justify-center rounded-lg px-4 py-1 text-[0.95rem] font-semibold text-[#153969] transition-all duration-150 hover:text-white"
      >
        {props.user?.username}
      </Link>
      <Link
        to={"/home/report"}
        className="border-primary hover:bg-secondary flex items-center justify-center rounded-lg px-4 py-1 text-[0.95rem] font-semibold text-[#153969] transition-all duration-150 hover:text-white"
      >
        <i className="fa-solid fa-flag mr-2"></i>Report
      </Link>
    </header>
  );
}
