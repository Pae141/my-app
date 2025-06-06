import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; 
import axios from 'axios';

export default function Login({ setUser }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [showDialog, setShowDialog] = useState(false);
  const [errorDialog, setErrorDialog] = useState(false);

  const [testDialog, setTestDialog] = useState(false);

  const navigate = useNavigate(); 

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      // ถ้ามี token ให้ redirect ไปหน้า home
      navigate("/home", { replace: true });
    }
  }, [navigate]);

  const toRegister = () => {
    navigate('/register');
  }

  const handleTest = () => {
    setTestDialog(true);
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const response = await axios.post("https://my-backend-a4bd.onrender.com/api/users/login", {
      username,
      password
    }, { withCredentials: true });  // ส่ง cookie ด้วย

    if (response.data.message === "Login successful") {
      // ไม่ต้องเก็บ token ใน localStorage เพราะใช้ cookie httpOnly
      setUser({ username }); // หรือข้อมูล user ที่ได้มา
      setShowDialog(true);
    } else {
      setErrorDialog(true);
    }
  } catch (error) {
    console.log(error);
    setErrorDialog(true);
  }

  setUsername('');
  setPassword('');
};


  return (
    <>
    <div className="flex flex-col justify-center items-center w-screen bg-gray-200 min-h-screen">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-md  
        max-w-sm m-3"
      >
        <h1 className="text-center text-2xl mb-6">เข้าสู่ระบบ</h1>
        <label className="block mb-1 text-gray-700">ชื่อผู้ใช้:</label>
        <input
          type="text"
          placeholder="ชื่อผู้ใช้"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full mb-4 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <label className="block mb-1 text-gray-700">รหัสผ่าน:</label>
        <input
          type="password"
          placeholder="รหัสผ่าน"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-6 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition mb-2"
        >
          เข้าสู่ระบบ
        </button>

        <button onClick={toRegister}
          type="button"
          className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition"
        >
          ลงทะเบียน
        </button>

        <br />
      </form>

     

      {showDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-80 shadow-lg">
            <h2 className="text-xl font-semibold mb-4">ล็อกอินสำเร็จ!</h2>
            <p>ยินดีต้อนรับเข้าสู่ระบบ</p>
            <button
              className="mt-6 w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
              onClick={() => {
                setShowDialog(false);
                navigate('/home')
              }}
            >
              เข้าสู่ระบบ
            </button>
          </div>
        </div>
      )}

      
      {errorDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-80 shadow-lg">
            <h2 className="text-xl font-semibold mb-4 text-red-600">
              ล็อกอินไม่สำเร็จ
            </h2>
            <p>ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง กรุณาลองใหม่อีกครั้ง</p>
            <button
              className="mt-6 w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600 transition"
              onClick={() => setErrorDialog(false)}
            >
              ปิด
            </button>
          </div>
        </div>
      )}

      <div>
        <button onClick={handleTest}>Dialog</button>
      </div>

      {testDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-80 shadow-lg">
            <p>Test Dialog</p>
          <button
            className="mt-6 w-full bg-blue-500 text-white py-2 
            rounded-md hover:bg-blue-600 transition"
            onClick={() => setTestDialog(false)}
          >
            ปิด
          </button>
          </div>
        </div>
      )}

      

    </div>

     

    </>
  );
}
