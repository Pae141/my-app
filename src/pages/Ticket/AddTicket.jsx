import React, { useState } from 'react';

function AddTicket() {
  const [form, setForm] = useState({
    name: '',
    date: '',
    time: '',
    location: '',
    price: '',
    ticket_quantity: '',
    booking_start: '',
    booking_deadline: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const res = await fetch('https://my-backend-a4bd.onrender.com/api/tickets', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "include", // ถ้ามี auth ด้วย cookie
      body: JSON.stringify(form)
    });

    if (!res.ok) throw new Error("Failed to add ticket");

    const data = await res.json();
    console.log("บันทึกสำเร็จ:", data);
    alert("เพิ่มรายการตั๋วสำเร็จ!");
  } catch (err) {
    console.error("เกิดข้อผิดพลาด:", err.message);
    alert("ไม่สามารถเพิ่มรายการได้");
  }
  setForm({
  name: '',
  date: '',
  time: '',
  location: '',
  price: '',
  ticket_quantity: '',
  booking_start: '',
  booking_deadline: '',
});
  
};


  return (
    <div className="max-w-5xl w-full mx-auto my-10 p-6 bg-white rounded-lg shadow-md font-sans">
      <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800">เพิ่มรายการจองตั๋ว</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <div className="flex flex-col">
          <label className="mb-1 font-medium text-gray-700" htmlFor="name">ชื่ออีเวนต์:</label>
          <input
            id="name"
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex flex-col">
          <label className="mb-1 font-medium text-gray-700" htmlFor="date">วันที่จัดงาน:</label>
          <input
            id="date"
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            required
            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex flex-col">
          <label className="mb-1 font-medium text-gray-700" htmlFor="time">เวลาจัดงาน:</label>
          <input
            id="time"
            type="time"
            name="time"
            value={form.time}
            onChange={handleChange}
            required
            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex flex-col">
          <label className="mb-1 font-medium text-gray-700" htmlFor="location">สถานที่:</label>
          <input
            id="location"
            type="text"
            name="location"
            value={form.location}
            onChange={handleChange}
            required
            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex flex-col">
          <label className="mb-1 font-medium text-gray-700" htmlFor="price">ราคาตั๋ว (บาท):</label>
          <input
            id="price"
            type="number"
            name="price"
            value={form.price}
            onChange={handleChange}
            min="0"
            step="0.01"
            required
            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex flex-col">
          <label className="mb-1 font-medium text-gray-700" htmlFor="ticket_quantity">จำนวนตั๋ว:</label>
          <input
            id="ticket_quantity"
            type="number"
            name="ticket_quantity"
            value={form.ticket_quantity}
            onChange={handleChange}
            min="1"
            required
            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex flex-col">
          <label className="mb-1 font-medium text-gray-700" htmlFor="booking_start">วัน-เวลาที่เริ่มเปิดรับจอง:</label>
          <input
            id="booking_start"
            type="datetime-local"
            name="booking_start"
            value={form.booking_start}
            onChange={handleChange}
            required
            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex flex-col">
          <label className="mb-1 font-medium text-gray-700" htmlFor="booking_deadline">วัน-เวลาที่ปิดรับจอง:</label>
          <input
            id="booking_deadline"
            type="datetime-local"
            name="booking_deadline"
            value={form.booking_deadline}
            onChange={handleChange}
            required
            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          className="mt-4 bg-blue-600 text-white font-semibold py-3 rounded-md hover:bg-blue-700 transition-colors"
        >
          เพิ่มรายการ
        </button>
      </form>
    </div>
  );
}

export default AddTicket;
