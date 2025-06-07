import { NavLink } from "react-router-dom";

export default function Sidebar() {
  const baseClass = "block w-full h-[45px] px-4 text-white border-black flex items-center";
const hoverClass = "hover:bg-green-300";

return (
  <div className="w-52 h-[1000px] bg-blue-200 mt-[52px]">
    <NavLink
      to="/tickets/book"
      className={({ isActive }) =>
        `${baseClass} ${hoverClass} ${isActive ? "bg-green-300 font-bold" : ""}`
      }
    >
      จองตั๋ว
    </NavLink>

    <NavLink
      to="/tickets/seat"
      className={({ isActive }) =>
        `${baseClass} ${hoverClass} ${isActive ? "bg-green-300 font-bold" : ""}`
      }
    >
      จองที่นั่ง
    </NavLink>

    <NavLink
      to="/tickets/add"
      className={({ isActive }) =>
        `${baseClass} ${hoverClass} ${isActive ? "bg-green-300 font-bold" : ""}`
      }
    >
      เพิ่มรายการ
    </NavLink>

    <NavLink
      to="/tickets/bookings"
      className={({ isActive }) =>
        `${baseClass} ${hoverClass} ${isActive ? "bg-green-300 font-bold" : ""}`
      }
    >
      ข้อมูลการจอง
    </NavLink>
  </div>
);
}