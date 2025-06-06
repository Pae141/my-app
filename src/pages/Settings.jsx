import { useEffect, useState } from "react";
import Header from "../components/Header";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import { FaTrash } from "react-icons/fa";


export default function SettingsPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [user, setUser] = useState(null);


  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch("https://my-backend-a4bd.onrender.com/api/users", {
        credentials: "include",
      });

      if (!response.ok) throw new Error("โหลดรายชื่อผู้ใช้ไม่สำเร็จ");

      const data = await response.json();
      setUsers(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const [selectedUserId, setSelectedUserId] = useState(null);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);

  const handleDeleteClick = (userId) => {
    setSelectedUserId(userId);
    setShowConfirmDelete(true);
  };

  const confirmDelete = async () => {
    try {
     const response = await fetch(`https://my-backend-a4bd.onrender.com/api/users/${selectedUserId}`, {
      method: "DELETE",
      credentials: "include",
    });

      if (!response.ok) throw new Error("ลบผู้ใช้ไม่สำเร็จ");

      setUsers((prev) => prev.filter((user) => user.id !== selectedUserId));
      setShowConfirmDelete(false);
      setSelectedUserId(null);
    } catch (err) {
      alert(err.message);
    }
  };

  const cancelDelete = () => {
    setSelectedUserId(null);
    setShowConfirmDelete(false);
  };

  return (
    <div className="flex flex-col min-h-screen">
     

      <main className="flex-grow p-6">
        <h1 className="text-2xl font-bold mb-4 text-center">จัดการผู้ใช้</h1>

        {/* ... loading, error */}

        {!loading && !error && (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th className="py-2 px-4 border-b">#</th>
                  <th className="py-2 px-4 border-b">ชื่อ</th>
                  <th className="py-2 px-4 border-b">นามสกุล</th>
                  <th className="py-2 px-4 border-b">อีเมล</th>
                  <th className="py-2 px-4 border-b">เบอร์โทร</th>
                  <th className="py-2 px-4 border-b">วันเกิด</th>
                  <th className="py-2 px-4 border-b">เพศ</th>
                  <th className="py-2 px-4 border-b">การจัดการ</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="py-2 px-4 border-b text-center">{index + 1}</td>
                    <td className="py-2 px-4 border-b">{user.name}</td>
                    <td className="py-2 px-4 border-b">{user.last_name}</td>
                    <td className="py-2 px-4 border-b">{user.email}</td>
                    <td className="py-2 px-4 border-b">{user.phone}</td>
                    <td className="py-2 px-4 border-b">{user.birth_date?.split("T")[0]}</td>
                    <td className="py-2 px-4 border-b">{user.gender}</td>
                    <td className="py-2 px-4 border-b text-center">
                      <button
                        onClick={() => handleDeleteClick(user.id)}
                        className="text-red-500 hover:text-red-800"
                        aria-label="ลบผู้ใช้"
                      >
                        <FaTrash size={20} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* ยืนยันลบ */}
        {showConfirmDelete && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded shadow max-w-sm w-full">
              <p className="mb-4">คุณแน่ใจหรือว่าต้องการลบผู้ใช้นี้?</p>
              <div className="flex justify-end space-x-4">
                <button
                  onClick={cancelDelete}
                  className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                >
                  ยกเลิก
                </button>
                <button
                  onClick={confirmDelete}
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  ลบ
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

    </div>
  );
};