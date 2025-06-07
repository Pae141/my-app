import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa"; // ถ้าคุณใช้ไอคอนนี้ด้วย


export default function Header({ user, setUser }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => setMenuOpen(!menuOpen);
  const navigate = useNavigate();

  const handleLogout = () => {
  fetch("https://my-backend-a4bd.onrender.com/api/users/logout", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      if (!res.ok) throw new Error("Logout failed");
      return res.json();
    })
    .then(() => {
      setUser(null);
      setMenuOpen(false);
      navigate("/");
    })
    .catch((err) => {
      console.error("Logout error", err);
    });
};


  return (
    <>
      <header className="bg-white text-black p-4  flex justify-between items-center w-screen fixed top-0 left-0 right-0 z-50 mb-2 h-16">
        <div className="flex items-center space-x-3">
          <img src="logo.png" className="h-10" alt="logo" />
          <h1 className="text-xl font-bold">Demo App</h1>
        </div>

        <div className="relative flex items-center space-x-2">
          <span className="text-gray-700 font-medium">{user?.username || ""}</span>

          <button
            onClick={toggleMenu}
            className="p-2 rounded focus:outline-none border-0"
            aria-label="Toggle menu"
            style={{ backgroundColor: "transparent" }}
          >
            <FaUserCircle
              className="text-gray-500 hover:text-black transition-colors duration-200"
              size={50}
            />
          </button>

          {menuOpen && (
            <div className="absolute right-0 top-full  w-40 bg-white text-black rounded shadow-lg z-50">
              <button
                className="block w-full text-left px-4 py-2 hover:bg-gray-200 border-0"
                style={{ display: "block", width: "100%" }}
                onClick={() => navigate("/profile")}
              >
                โปรไฟล์
              </button>
              <button
                className="block w-full text-left px-4 py-2 hover:bg-gray-200 border-0"
                style={{ display: "block", width: "100%" }}
                onClick={handleLogout}
              >
                ออกจากระบบ
              </button>
            </div>
          )}
        </div>
      </header>

      <div className="pt-8"></div>
    </>
  );
}
