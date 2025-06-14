import { NavLink } from "react-router-dom";
import { IoMdHome } from "react-icons/io";
import { MdTempleBuddhist } from "react-icons/md";
import { IoSettingsSharp } from "react-icons/io5";
import { AiFillSignal } from "react-icons/ai";
import { IoTicketSharp } from "react-icons/io5";

export default function Nav() {
  const linkClass = ({ isActive }) =>
    `flex items-center space-x-2 px-4 py-2 h-11 font-bold text-white cursor-pointer 
     ${isActive ? "bg-yellow-300" : "hover:bg-yellow-300"}`;

  return (
    <>
      <div className="bg-yellow-300 w-screen h-2 fixed top-16 "></div>

      <div className="bg-blue-300 w-screen h-11 flex items-center justify-center fixed top-[4.5rem] ">
        <div className="flex items-center">
          {/* เมนู Home */}
          <NavLink to="/home" end className={linkClass}>
            <IoMdHome className="h-5 w-5" />
            <span>Home</span>
          </NavLink>

          {/* เมนู Amulet */}
          <NavLink to="/#" className={linkClass}>
            <MdTempleBuddhist className="h-5 w-5" />
            <span>Amulet</span>
          </NavLink>

          {/* เมนู Dashboard */}
          <NavLink to="/#" className={linkClass}>
            <AiFillSignal className="h-5 w-5" />
            <span>Dashboard</span>
          </NavLink>

          {/* เมนู จองตั๋ว */}
          <NavLink to="/tickets" className={linkClass}>
            <IoTicketSharp className="h-5 w-5" />
            <span>Tickets</span>
          </NavLink>

          {/* เมนู Setting */}
          <NavLink to="/settings" className={linkClass}>
            <IoSettingsSharp className="h-5 w-5" />
            <span>ตั้งค่า</span>
          </NavLink>
        </div>
      </div>
    </>
  );
}
