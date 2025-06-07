import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaTrash } from 'react-icons/fa';

function BookTicket() {
  const [events, setEvents] = useState([]);
  const [availableTickets, setAvailableTickets] = useState({});
  const [now, setNow] = useState(new Date());
  const [editId, setEditId] = useState(null);
  const [editForm, setEditForm] = useState({
    name: '',
    date: '',
    time: '',
    location: '',
    price: '',
    ticket_quantity: '',
    booking_start: '',
    booking_deadline: '',
  });

  const navigate = useNavigate();

  useEffect(() => {
    fetchEvents();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const fetchEvents = async () => {
    try {
      const res = await fetch('https://my-backend-a4bd.onrender.com/api/tickets');
      const data = await res.json();
      setEvents(data);

      data.forEach(event => fetchAvailableTickets(event.id));
    } catch (err) {
      console.error('Error fetching events:', err);
    }
  };

  const fetchAvailableTickets = async (eventId) => {
    try {
      const res = await fetch(`https://my-backend-a4bd.onrender.com/api/tickets/${eventId}/tickets-available`);
      if (!res.ok) {
        console.error(`Cannot fetch available tickets for event ${eventId}`);
        setAvailableTickets(prev => ({ ...prev, [eventId]: 0 }));
        return;
      }
      const data = await res.json();
      setAvailableTickets(prev => ({ ...prev, [eventId]: data.available }));
    } catch (err) {
      console.error('Error fetching available tickets:', err);
      setAvailableTickets(prev => ({ ...prev, [eventId]: 0 }));
    }
  };

  function formatCountdown(ms) {
    if (ms <= 0) return '';
    const totalSeconds = Math.floor(ms / 1000);
    const days = Math.floor(totalSeconds / 86400);
    const hours = Math.floor((totalSeconds % 86400) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    const dayStr = days > 0 ? `${days} วัน ` : '';
    const hourStr = hours.toString().padStart(2, '0');
    const minuteStr = minutes.toString().padStart(2, '0');
    const secondStr = seconds.toString().padStart(2, '0');

    return `${dayStr}${hourStr}:${minuteStr}:${secondStr}`;
  }

  const handleBooking = (event) => {
    navigate(`/tickets/book/${event.id}`);
  };

  const startEdit = (event) => {
    setEditId(event.id);
    setEditForm({
      name: event.name || '',
      date: event.date ? event.date.split('T')[0] : '',
      time: event.time || '',
      location: event.location || '',
      price: event.price || '',
      ticket_quantity: event.ticket_quantity || '',
      booking_start: event.booking_start ? event.booking_start.slice(0, 16) : '',
      booking_deadline: event.booking_deadline ? event.booking_deadline.slice(0, 16) : '',
    });
  };

  const cancelEdit = () => {
    setEditId(null);
    setEditForm({
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

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditForm(prev => ({ ...prev, [name]: value }));
  };

  const saveEdit = async () => {
    try {
      const res = await fetch(`https://my-backend-a4bd.onrender.com/api/tickets/${editId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editForm),
      });

      if (!res.ok) throw new Error('Failed to update event');

      const updatedEvent = await res.json();

      setEvents(prev => prev.map(ev => (ev.id === editId ? updatedEvent : ev)));
      cancelEdit();

      // อัพเดตจำนวนตั๋วหลังแก้ไข
      fetchAvailableTickets(editId);

      alert('อัปเดตข้อมูลสำเร็จ!');
    } catch (err) {
      console.error('Error updating event:', err);
      alert('ไม่สามารถบันทึกข้อมูลได้');
    }
  };

  const deleteEvent = async (id) => {
    if (!window.confirm('คุณแน่ใจว่าจะลบรายการนี้หรือไม่?')) return;

    try {
      const res = await fetch(`https://my-backend-a4bd.onrender.com/api/tickets/${id}`, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error('ไม่สามารถลบรายการได้');

      setEvents(prev => prev.filter(event => event.id !== id));
      alert('ลบรายการเรียบร้อยแล้ว');
    } catch (err) {
      console.error('Error deleting event:', err);
      alert('เกิดข้อผิดพลาดในการลบรายการ');
    }
  };

  return (
    <div className="w-[1300px] mx-auto my-10 p-6 bg-white rounded-lg shadow-md font-sans">
      <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800">รายการอีเวนต์</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {events.length === 0 && (
          <p className="col-span-full text-center text-gray-500">ไม่มีอีเวนต์ในระบบ</p>
        )}
        {events.map(event => {
          const bookingStart = new Date(event.booking_start);
          const bookingDeadline = new Date(event.booking_deadline);
          const eventDate = new Date(event.date);

          const timeToBooking = bookingStart - now;
          const isBookingOpen = now >= bookingStart && now <= bookingDeadline;

          const available = availableTickets[event.id] ?? event.ticket_quantity;
          const isSoldOut = available <= 0;

          if (editId === event.id) {
            return (
              <div key={event.id} className="border rounded-md p-5 shadow flex flex-col">
                <h3 className="text-xl font-semibold mb-4">แก้ไขอีเวนต์</h3>
                <input
                  type="text"
                  name="name"
                  placeholder="ชื่ออีเวนต์"
                  value={editForm.name}
                  onChange={handleEditChange}
                  className="mb-2 p-2 border rounded"
                />
                <input
                  type="date"
                  name="date"
                  value={editForm.date}
                  onChange={handleEditChange}
                  className="mb-2 p-2 border rounded"
                />
                <input
                  type="text"
                  name="time"
                  placeholder="เวลา"
                  value={editForm.time}
                  onChange={handleEditChange}
                  className="mb-2 p-2 border rounded"
                />
                <input
                  type="text"
                  name="location"
                  placeholder="สถานที่"
                  value={editForm.location}
                  onChange={handleEditChange}
                  className="mb-2 p-2 border rounded"
                />
                <input
                  type="number"
                  name="price"
                  placeholder="ราคา"
                  value={editForm.price}
                  onChange={handleEditChange}
                  className="mb-2 p-2 border rounded"
                />
                <input
                  type="number"
                  name="ticket_quantity"
                  placeholder="จำนวนตั๋ว"
                  value={editForm.ticket_quantity}
                  onChange={handleEditChange}
                  className="mb-2 p-2 border rounded"
                />
                <label className="block mb-1">วันเริ่มเปิดจอง</label>
                <input
                  type="datetime-local"
                  name="booking_start"
                  value={editForm.booking_start}
                  onChange={handleEditChange}
                  className="mb-2 p-2 border rounded"
                />
                <label className="block mb-1">วันปิดรับจอง</label>
                <input
                  type="datetime-local"
                  name="booking_deadline"
                  value={editForm.booking_deadline}
                  onChange={handleEditChange}
                  className="mb-2 p-2 border rounded"
                />

                <div className="flex gap-3 mt-4">
                  <button
                    onClick={saveEdit}
                    className="flex-1 py-3 bg-green-600 text-white rounded hover:bg-green-700 font-semibold"
                  >
                    บันทึก
                  </button>
                  <button
                    onClick={cancelEdit}
                    className="flex-1 py-3 bg-gray-400 text-white rounded hover:bg-gray-500 font-semibold"
                  >
                    ยกเลิก
                  </button>
                </div>
              </div>
            );
          }

          return (
            <div key={event.id} className="border rounded-md p-5 shadow hover:shadow-lg transition-shadow flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-semibold mb-2">{event.name}</h3>
                <p>วันที่: {eventDate.toLocaleDateString('th-TH')}</p>
                <p>เวลา: {event.time}</p>
                <p>สถานที่: {event.location}</p>
                <p>ราคา: {event.price} บาท</p>
                <p>จำนวนตั๋วทั้งหมด: {event.ticket_quantity}</p>
                <p>ตั๋วที่เหลือ: {available}</p>

                {timeToBooking > 0 ? (
                  <p className="text-blue-600 font-semibold mt-2">
                    เปิดจองใน: {formatCountdown(timeToBooking)}
                  </p>
                ) : isBookingOpen ? (
                  <p className="text-green-600 font-semibold mt-2">กำลังเปิดจอง</p>
                ) : (
                  <p className="text-red-600 font-semibold mt-2">ปิดรับจองแล้ว</p>
                )}

                {isSoldOut && <p className="text-red-700 font-bold mt-2">ตั๋วเต็มแล้ว</p>}
              </div>

              <div className="mt-4 flex gap-3">
                <button
                  disabled={!isBookingOpen || isSoldOut}
                  onClick={() => handleBooking(event)}
                  className={`flex-1 py-3 rounded font-semibold text-white ${
                    isBookingOpen && !isSoldOut
                      ? 'bg-blue-600 hover:bg-blue-700'
                      : 'bg-gray-400 cursor-not-allowed'
                  }`}
                >
                  จองตั๋ว
                </button>

                <button
                  onClick={() => startEdit(event)}
                  className="flex-1 py-3 bg-yellow-500 text-white rounded hover:bg-yellow-600 font-semibold"
                >
                  แก้ไข
                </button>

                <button
                  onClick={() => deleteEvent(event.id)}
                  className="flex items-center justify-center gap-2 flex-1 py-3 bg-red-600 text-white rounded hover:bg-red-700 font-semibold"
                >
                  <FaTrash />
                  ลบ
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default BookTicket;
