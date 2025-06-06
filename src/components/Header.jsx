import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";

export default function Header({ user, setUser }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => setMenuOpen(!menuOpen);

  const navigate = useNavigate();

  // เอาชื่อ user จาก props มาแสดงเลย
  const username = user?.username || "";

  const handleLogout = () => {
    fetch("https://paeproject.onrender.com/api/users/logout", {
      method: "POST",
      credentials: "include",
    })
      .then(() => {
        setUser(null); // เคลียร์สถานะ user ใน App
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
          <span className="text-gray-700 font-medium">{username}</span>

          <button
            onClick={toggleMenu}
            className="p-2 rounded focus:outline-none border-0"
            aria-label="Toggle menu"
            style={{ backgroundColor: 'transparent' }}
          >
            <FaUserCircle
              className="text-gray-500 hover:text-black transition-colors duration-200"
              size={50}
            />
          </button>

          {menuOpen && (
            // เมนูนี้ต้องอยู่ใน div ที่ relative อยู่แล้ว และตั้งตำแหน่ง absolute ชิดขวา
            <div className="absolute right-0 top-full  w-40 bg-white text-black rounded shadow-lg z-50">
              <button
                className="block w-full text-left px-4 py-2 hover:bg-gray-200 border-0"
                style={{ display: 'block', width: '100%' }}
                onClick={() => navigate('/profile')}
              >
                โปรไฟล์
              </button>
              <button
                className="block w-full text-left px-4 py-2 hover:bg-gray-200 border-0"
                style={{ display: 'block', width: '100%' }}
                onClick={handleLogout}
              >
                ออกจากระบบ
              </button>
            </div>
          )}
        </div>
      </header>

      {/* Padding หรือ margin-top เท่าความสูง header */}
      <div className="pt-8">
        {/* เนื้อหาหลักของหน้า */}
      </div>
    </>
  );
}

