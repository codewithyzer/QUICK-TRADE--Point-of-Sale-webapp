import { Link } from "react-router-dom";

export default function Header(props) {
  return (
    <header className="font-poppin header-shadow fixed top-0 right-0 left-[284px] z-3 flex h-[70px] items-center justify-end gap-[30px] bg-white px-[40px]">
      <Link
        to={"/profile"}
        className="text-[0.95rem] font-semibold text-[#153969]"
      >
        {props.user.username}
      </Link>
    </header>
  );
}
