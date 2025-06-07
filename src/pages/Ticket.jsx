import { Outlet } from "react-router-dom";
import Sidebar from "../components/Ticket/Sidebar";

export default function Tickets() {
  return (
    <div className="flex flex-grow min-h-0">
      <Sidebar />
      <div className="flex-1 p-6 overflow-auto">
        <Outlet />
      </div>
    </div>

  );
}
