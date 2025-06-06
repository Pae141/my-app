import { useState } from "react";
import { useNavigate } from "react-router-dom"; 

export default function Register() {

  const [dataForm, setDataForm] = useState({
    username: (""),
    password: (""),
    name: (""),
    email: (""),
    last_name: (""),
    phone: (""),
    birth_date: (""),
    gender: (""),
  });
  
  const navigate = useNavigate(); 
  const toLogin = () => {
    navigate('/');
  }

  const resetForm = () => {
  setDataForm({
    username: "",
    password: "",
    name: "",
    email: "",
    last_name: "",
    phone: "",
    birth_date: "",
    gender: "",
  });
};
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    // อัปเดตค่าทีละ field
    setDataForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const [showDialog, setShowDialog] = useState(false);

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const response = await fetch("https://my-backend-a4bd.onrender.com/api/users/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataForm),
    });

    if (!response.ok) {
      const error = await response.json();
      alert("เกิดข้อผิดพลาด: " + error.message);
      return;
    }

    const result = await response.json();
    

    setShowDialog(true); // แสดง Dialog
    setDataForm({
      username: "",
      password: "",
      name: "",
      email: "",
      last_name: "",
      phone: "",
      birth_date: "",
      gender: "",
    });

  } catch (error) {
    console.error("เกิดข้อผิดพลาด:", error);
    alert("ไม่สามารถเชื่อมต่อเซิร์ฟเวอร์");
  }

  
};

  return (
    <div className="flex flex-col justify-center items-center w-screen bg-gray-200 min-h-screen">
        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-md w-[400px] m-3">
        <h1 className="text-center text-2xl mb-6">ลงทะเบียน</h1>
        <label className="block mb-1 text-gray-700">ชื่อผู้ใช้:</label>
        <input
          type="text"
          placeholder="ชื่อผู้ใช้"
          name="username"
          value={dataForm.username}
          onChange={handleChange}
          className="w-full mb-4 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <label className="block mb-1 text-gray-700">รหัสผ่าน:</label>
        <input
          type="password"
          name="password"
          placeholder="รหัสผ่าน"
          value={dataForm.password}
          onChange={handleChange}
          className="w-full mb-4 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <label className="block mb-1 text-gray-700">ชื่อ:</label>
        <input
          type="text"
          name="name"
          placeholder="ชื่อ"
          value={dataForm.name}
          onChange={handleChange}
          className="w-full mb-4 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <label className="block mb-1 text-gray-700">นามสกุล:</label>
        <input
          type="text"
          name="last_name"
          placeholder="นามสกุล"
          value={dataForm.last_name}
          onChange={handleChange}
          className="w-full mb-4 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <label className="block mb-1 text-gray-700">อีเมล:</label>
        <input
          type="text"
          name="email"
          placeholder="อีเมล"
          value={dataForm.email}
          onChange={handleChange}
          className="w-full mb-6 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <label className="block mb-1 text-gray-700">เบอร์โทร:</label>
        <input
          type="text"
          name="phone"
          placeholder="เบอร์โทร"
          value={dataForm.phone}
          onChange={handleChange}
          className="w-full mb-4 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <label className="block mb-1 text-gray-700">วันเกิด:</label>
        <input
          type="date"             // เปลี่ยนจาก text เป็น date
          name="birth_date"
          placeholder="วันเกิด"
          value={dataForm.birth_date}
          onChange={handleChange}
          className="w-full mb-4 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <label className="block mb-1 text-gray-700">เพศ:</label>

        <div className="mb-4">
          <label className="mr-4">
            <input
              type="radio"
              name="gender"
              value="ชาย"
              checked={dataForm.gender === "ชาย"}
              onChange={handleChange}
              className="mr-1"
            />
            ชาย
          </label>

          <label className="mr-4">
            <input
              type="radio"
              name="gender"
              value="หญิง"
              checked={dataForm.gender === "หญิง"}
              onChange={handleChange}
              className="mr-1"
            />
            หญิง
          </label>

          <label>
            <input
              type="radio"
              name="gender"
              value="อื่นๆ"
              checked={dataForm.gender === "อื่นๆ"}
              onChange={handleChange}
              className="mr-1"
            />
            อื่นๆ
          </label>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition mb-2"
        >
          ยืนยัน
        </button>

        <button onClick={resetForm}
          type="button"
          className="w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600 transition mb-2"
        >
          ล้างข้อมูล
        </button>

        <button onClick={toLogin}
          type="button"
          className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition"
        >
          กลับไปหน้าเข้าสู่ระบบ
        </button>
      
      </form>

       {showDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-80 shadow-lg">
            <h2 className="text-xl font-semibold mb-4">ส่งข้อมูลสำเร็จ!</h2>
            <button
              className="mt-6 w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
              onClick={() => setShowDialog(false)}
            >
              ปิด
            </button>
          </div>
        </div>
      )}

    </div>
   
    
  );
}
