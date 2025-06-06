import { useEffect, useState } from "react";
import Header from '../components/Header';
import Nav from '../components/Nav';
import Footer from '../components/Footer';

export default function UserProfile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [initialData, setInitialData] = useState(null);

  const [showDialog, setShowDialog] = useState(false);
  const [errorDialog, setErrorDialog] = useState(false);
  const [resetDialog, setResetDialog] = useState(false);

 


  const [formData, setFormData] = useState({
    name: "",
    last_name: "",
    email: "",
    phone: "",
    birth_date: "",
    gender: ""
  });

  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      const response = await fetch("https://my-backend-a4bd.onrender.com/api/users/profile", {
        method: "GET",
        credentials: "include",
      });
      if (!response.ok) throw new Error("ไม่สามารถโหลดข้อมูลผู้ใช้");

      const data = await response.json();
      setUser(data);
      setFormData({
        name: data.name || "",
        last_name: data.last_name || "",
        email: data.email || "",
        phone: data.phone || "",
        birth_date: data.birth_date || "",
        gender: data.gender || "",
      });
      setInitialData(data); // เก็บข้อมูลเดิมไว้ใช้รีเซ็ต

      setLoading(false);
    } catch (err) {
      console.error("Error fetching user profile:", err);
      setError(err.message);
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const toggleEdit = () => {
    setIsEditing((prev) => !prev);
  };

  const handleCancelEdit = () => {
    if (initialData) {
      setFormData({
        name: initialData.name || "",
        last_name: initialData.last_name || "",
        email: initialData.email || "",
        phone: initialData.phone || "",
        birth_date: initialData.birth_date || "",
        gender: initialData.gender || "",
      });
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setResetDialog(true);
  };

  const confirmCancel = () => {
    if (initialData) {
      setFormData({
        name: initialData.name || "",
        last_name: initialData.last_name || "",
        email: initialData.email || "",
        phone: initialData.phone || "",
        birth_date: initialData.birth_date || "",
        gender: initialData.gender || "",
      });
    }
    setResetDialog(false);
    setIsEditing(false);
  };

  const closeDialog = () => {
    setResetDialog(false);
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch("https://my-backend-a4bd.onrender.com/api/users/updateuser", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "บันทึกข้อมูลไม่สำเร็จ");
      }

      setShowDialog(true);
      fetchUserProfile();
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating profile:", error);
      setErrorDialog(true);
    }
  };

  const formatDateForInput = (isoDateString) => {
    if (!isoDateString) return "";
    const date = new Date(isoDateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  if (loading) return <div className="text-center mt-10">กำลังโหลด...</div>;
  if (error) return <div className="text-center text-red-600 mt-10">{error}</div>;

  return (
    <div className="flex flex-col min-h-screen">
   

      <main className="flex-grow">
        <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded shadow space-y-3">
          <h1 className="text-2xl font-bold mb-4 text-center">โปรไฟล์ผู้ใช้</h1>

          <div>
            
            <div className="space-y-3">
              {/* ชื่อ */}
              <div className={isEditing ? "flex flex-col space-y-1" : "flex flex-row items-center space-x-2"}>
                <label className="font-medium w-28">ชื่อ:</label>
                {isEditing ? (
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="border w-full px-3 py-1 rounded"
                  />
                ) : (
                  <p>{formData.name || "-"}</p>
                )}
              </div>

              {/* นามสกุล */}
              <div className={isEditing ? "flex flex-col space-y-1" : "flex flex-row items-center space-x-2"}>
                <label className="font-medium w-28">นามสกุล:</label>
                {isEditing ? (
                  <input
                    type="text"
                    name="last_name"
                    value={formData.last_name}
                    onChange={handleChange}
                    className="border w-full px-3 py-1 rounded"
                  />
                ) : (
                  <p>{formData.last_name || "-"}</p>
                )}
              </div>

              {/* อีเมล */}
              <div className={isEditing ? "flex flex-col space-y-1" : "flex flex-row items-center space-x-2"}>
                <label className="font-medium w-28">อีเมล:</label>
                {isEditing ? (
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="border w-full px-3 py-1 rounded"
                  />
                ) : (
                  <p>{formData.email || "-"}</p>
                )}
              </div>

              {/* เบอร์โทรศัพท์ */}
              <div className={isEditing ? "flex flex-col space-y-1" : "flex flex-row items-center space-x-2"}>
                <label className="font-medium w-28">เบอร์โทร:</label>
                {isEditing ? (
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="border w-full px-3 py-1 rounded"
                  />
                ) : (
                  <p>{formData.phone || "-"}</p>
                )}
              </div>

              {/* วันเกิด */}
              <div className={isEditing ? "flex flex-col space-y-1" : "flex flex-row items-center space-x-2"}>
                <label className="font-medium w-28">วันเกิด:</label>
                {isEditing ? (
                  <input
                    type="date"
                    name="birth_date"
                    value={formatDateForInput(formData.birth_date)}
                    onChange={handleChange}
                    className="border w-full px-3 py-1 rounded"
                  />
                ) : (
                  <p>{formData.birth_date ? formatDateForInput(formData.birth_date) : "-"}</p>
                )}
              </div>

              {/* เพศ */}
              <div className={isEditing ? "flex flex-col space-y-1" : "flex flex-row items-center space-x-2"}>
                <label className="font-medium w-28">เพศ:</label>
                {isEditing ? (
                  <div className="flex space-x-4">
                    <label>
                      <input
                        type="radio"
                        name="gender"
                        value="ชาย"
                        checked={formData.gender === "ชาย"}
                        onChange={handleChange}
                      />{" "}
                      ชาย
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="gender"
                        value="หญิง"
                        checked={formData.gender === "หญิง"}
                        onChange={handleChange}
                      />{" "}
                      หญิง
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="gender"
                        value="อื่น ๆ"
                        checked={formData.gender === "อื่น ๆ"}
                        onChange={handleChange}
                      />{" "}
                      อื่น ๆ
                    </label>
                  </div>
                ) : (
                  <p>{formData.gender || "-"}</p>
                )}
              </div>
            </div>
                
                <div className="flex justify-center mt-10" >
                {!isEditing && (
                    <button onClick={toggleEdit} className="bg-yellow-400 px-4 py-2 rounded mb-4 hover:bg-yellow-500">
                      แก้ไขข้อมูล
                    </button>
                  )}
                </div>
            



            {isEditing && (
              <div className="flex justify-center space-x-4 mt-4">
                <button
                  onClick={handleSubmit}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  บันทึกข้อมูล
                </button>
                <button
                  onClick={handleCancel}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
                >
                  ยกเลิก
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Dialog แสดงเมื่อบันทึกสำเร็จ */}
        {showDialog && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-80 shadow-lg">
              <h2 className="text-xl font-semibold mb-4">บันทึกข้อมูลสำเร็จ!</h2>
              <button
                className="mt-6 w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
                onClick={() => setShowDialog(false)}
              >
                ปิด
              </button>
            </div>
          </div>
        )}

        {/* Dialog ยืนยันยกเลิกการแก้ไข */}
        {resetDialog && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
            <div className="bg-white p-6 rounded shadow max-w-sm w-full">
              <p className="mb-4">คุณแน่ใจหรือว่าต้องการยกเลิกการแก้ไข?</p>
              <div className="flex justify-end space-x-4">
                <button
                  onClick={closeDialog}
                  className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                >
                  ยกเลิก
                </button>
                <button
                  onClick={confirmCancel}
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  ยืนยัน
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Dialog แสดงเมื่อเกิด error */}
        {errorDialog && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-80 shadow-lg">
              <h2 className="text-xl font-semibold mb-4 text-red-600">บันทึกข้อมูลไม่สำเร็จ</h2>
              <button
                className="mt-6 w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600 transition"
                onClick={() => setErrorDialog(false)}
              >
                ปิด
              </button>
            </div>
          </div>
        )}
      </main>

    </div>
  );
}
