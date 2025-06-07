import { Outlet } from "react-router-dom";
import Sidebar from "../components/Ticket/Sidebar";

export default function Tickets() {
  return (
    <div className="flex h-[calc(100vh-4rem)]">
      <Sidebar />
      <div className="flex-1 p-6 overflow-auto">
        <Outlet />  {/* แสดงหน้าลูกจาก route ที่ nested */}
      </div>
    </div>
  );
}
