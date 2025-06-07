import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // 👈 เพิ่มสำหรับ redirect

function BookingForm({ userId, eventId }) {
  const navigate = useNavigate(); // 👈 เรียก useNavigate

  const [event, setEvent] = useState(null);
  const [form, setForm] = useState({
    full_name: '',
    email: '',
    phone: '',
    quantity: 1,
    address: '',
    pickup_location: '',
  });
  const [loading, setLoading] = useState(true);
  const [ticketAvailable, setTicketAvailable] = useState(null);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (!eventId) {
      setError('ไม่พบ eventId');
      setLoading(false);
      return;
    }

    setLoading(true);
    setError('');

    fetch(`https://my-backend-a4bd.onrender.com/api/tickets/${eventId}`)
      .then(res => {
        if (!res.ok) throw new Error('ไม่พบข้อมูลอีเวนต์');
        return res.json();
      })
      .then(data => setEvent(data))
      .catch(err => {
        console.error(err);
        setError('เกิดข้อผิดพลาดในการโหลดข้อมูลอีเวนต์');
      })
      .finally(() => setLoading(false));
  }, [eventId]);

  useEffect(() => {
    if (!eventId) return;

    fetch(`https://my-backend-a4bd.onrender.com/api/tickets/${eventId}/tickets-available`)
      .then(res => {
        if (!res.ok) throw new Error('Error fetching ticket info');
        return res.json();
      })
      .then(data => setTicketAvailable(Number(data.available)))
      .catch(err => {
        console.error(err);
        setTicketAvailable(0);
      });
  }, [eventId]);

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async e => {
    
    e.preventDefault();

    setError('');
    setMessage('');

    if (ticketAvailable <= 0) {
      setError('ขออภัย ตั๋วสำหรับอีเวนต์นี้หมดแล้ว');
      return;
    }

    const bookingData = {
      ...form,
      user_id: userId,
      event_id: eventId,
      quantity: 1,
    };

    console.log('Booking data:', bookingData);


    try {
      const res = await fetch('https://my-backend-a4bd.onrender.com/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(bookingData),
        });

      if (!res.ok) throw new Error('Booking failed');

      await res.json();

      setMessage('จองตั๋วสำเร็จ!');
      setForm({
        full_name: '',
        email: '',
        phone: '',
        quantity: 1,
        address: '',
        pickup_location: '',
      });
      setTicketAvailable(prev => (prev > 0 ? prev - 1 : 0));

      // ✅ redirect ไปที่หน้าจองตั๋วเสร็จ
      navigate('/tickets/book');
    } catch (err) {
      console.error(err);
      setError('เกิดข้อผิดพลาดในการจองตั๋ว');
    }
  };

  if (loading || ticketAvailable === null) {
    return <p>กำลังโหลดข้อมูลอีเวนต์และจำนวนตั๋ว...</p>;
  }

  if (error) {
    return <p className="text-red-600 font-semibold">{error}</p>;
  }

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-xl font-semibold mb-4 text-center">ฟอร์มจองตั๋ว</h2>

      {event ? (
        <p className="mb-4">
          อีเวนต์ที่จอง: <strong>{event.name}</strong> (วันที่ {event.date})
        </p>
      ) : (
        <p className="mb-4 text-gray-600">ไม่พบข้อมูลอีเวนต์</p>
      )}

      <p className="mb-4 font-semibold">
        จำนวนตั๋วที่เหลือ: {ticketAvailable}
      </p>

      {ticketAvailable <= 0 && (
        <p className="mb-4 text-red-600 font-semibold">
          ขออภัย ตั๋วสำหรับอีเวนต์นี้หมดแล้ว
        </p>
      )}

      {message && (
        <p className="mb-4 text-green-600 font-semibold">{message}</p>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <label>
          ชื่อ-นามสกุล:
          <input
            type="text"
            name="full_name"
            value={form.full_name}
            onChange={handleChange}
            required
            className="border rounded p-2 w-full"
          />
        </label>

        <label>
          อีเมล:
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            className="border rounded p-2 w-full"
          />
        </label>

        <label>
          เบอร์โทรศัพท์:
          <input
            type="tel"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            required
            className="border rounded p-2 w-full"
          />
        </label>

        <p className="mb-4 font-semibold">จำนวนตั๋ว: 1 ใบ</p>

        <label>
          ที่อยู่:
          <textarea
            name="address"
            value={form.address}
            onChange={handleChange}
            required
            className="border rounded p-2 w-full"
          />
        </label>

        <label>
          สถานที่รับตั๋ว:
          <input
            type="text"
            name="pickup_location"
            value={form.pickup_location}
            onChange={handleChange}
            required
            className="border rounded p-2 w-full"
          />
        </label>

        <button
          type="submit"
          disabled={ticketAvailable <= 0}
          className={`py-2 rounded text-white transition ${
            ticketAvailable > 0 ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-400 cursor-not-allowed'
          }`}
        >
          จองตั๋ว
        </button>
      </form>
    </div>
  );
}

export default BookingForm;
