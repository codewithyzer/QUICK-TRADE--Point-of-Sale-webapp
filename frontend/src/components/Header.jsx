import { Link } from "react-router-dom";

export default function Header(props) {
  return (
    <header className="font-poppin border-thirdary fixed top-0 right-0 left-[283px] z-21 flex h-[70px] items-center justify-end gap-[30px] border-b-1 bg-white px-[40px]">
      <Link
        to={"/profile"}
        className="text-[0.95rem] font-semibold text-[#153969]"
      >
        {props.user.username}
      </Link>
    </header>
  );
}
