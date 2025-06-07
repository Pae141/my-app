// components/Ticket/Sidebar.js
import { NavLink } from "react-router-dom";

export default function Sidebar() {
  const linkClass = "block px-4 py-2 rounded hover:bg-blue-100";
  return (
    <div className="w-52 h-full bg-blue-200">
      <h2 className="text-lg font-bold mb-4 border mt-4">เมนู</h2>
      <NavLink to="/tickets/book" className={linkClass}>จองตั๋ว</NavLink>
      <NavLink to="/tickets/seat" className={linkClass}>จองที่นั่ง</NavLink>
      <NavLink to="/tickets/add" className={linkClass}>เพิ่มรายการ</NavLink>

    </div>
  );
}
