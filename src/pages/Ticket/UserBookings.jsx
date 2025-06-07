import { useEffect, useState } from "react";

export default function UserBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUserBookings();
  }, []);

  const fetchUserBookings = async () => {
    try {
      const response = await fetch("https://my-backend-a4bd.onrender.com/api/bookings/user", {
        method: "GET",
        credentials: "include",
      });
      if (!response.ok) throw new Error("ไม่สามารถโหลดข้อมูลการจองได้");

      const data = await response.json();
      setBookings(data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  if (loading)
    return <div className="text-center mt-10">กำลังโหลดข้อมูลการจอง...</div>;
  if (error)
    return (
      <div className="text-center text-red-600 mt-10">
        {error}
      </div>
    );

  return (
    <div className="w-[1400px] mx-auto mt-10 bg-white p-6 rounded shadow">
      <h1 className="text-3xl font-bold mb-6 text-center">รายการการจองของฉัน</h1>

      {bookings.length === 0 ? (
        <p className="text-center text-gray-600">คุณยังไม่มีรายการจอง</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300">
            <thead className="bg-gray-100">
              <tr>
                <th className="border border-gray-300 px-4 py-2 text-left">ชื่ออีเวนต์</th>
                <th className="border border-gray-300 px-4 py-2 text-left">ชื่อ</th>
                <th className="border border-gray-300 px-4 py-2 text-left">อีเมล</th>
                <th className="border border-gray-300 px-4 py-2 text-left">โทรศัพท์</th>
                <th className="border border-gray-300 px-4 py-2 text-center">จำนวนที่นั่ง</th>
                <th className="border border-gray-300 px-4 py-2 text-left">ที่อยู่</th>
                <th className="border border-gray-300 px-4 py-2 text-left">สถานที่รับของ</th>
                <th className="border border-gray-300 px-4 py-2 text-center">วันที่จอง</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => (
                <tr key={booking.id} className="odd:bg-white even:bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2">{booking.event_name}</td>
                  <td className="border border-gray-300 px-4 py-2">{booking.full_name}</td>
                  <td className="border border-gray-300 px-4 py-2">{booking.email}</td>
                  <td className="border border-gray-300 px-4 py-2">{booking.phone}</td>
                  <td className="border border-gray-300 px-4 py-2 text-center">{booking.quantity}</td>
                  <td className="border border-gray-300 px-4 py-2">{booking.address}</td>
                  <td className="border border-gray-300 px-4 py-2">{booking.pickup_location}</td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    {new Date(booking.created_at).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
