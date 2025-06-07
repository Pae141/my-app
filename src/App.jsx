import { useEffect, useState } from "react";
import { Routes, Route, Navigate, useParams } from "react-router-dom";

import Login from "./pages/Login";
import Home from "./pages/Home";
import Layout from './components/Layout';
import Register from "./pages/Register";
import UserProfile from "./pages/UserProfile";
import SettingsPage from './pages/Settings';
import ProtectedRoute from "./components/ProtectedRoute";
import Tickets from "./pages/Ticket";
import BookTicket from "./pages/Ticket/BookTicket";
import SeatBooking from "./pages/Ticket/SeatBooking";
import AddTicket from "./pages/Ticket/AddTicket";
import BookingForm from './pages/Ticket/BookingForm';
import UserBookings from './pages/Ticket/UserBookings';

function BookingFormWrapper({ user }) {
  const { eventId } = useParams();

  if (!user) return <div>กรุณาเข้าสู่ระบบก่อน</div>;

  return <BookingForm eventId={eventId} userId={user.id} />;
}

export default function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // wait for auth check

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch("https://my-backend-a4bd.onrender.com/api/users/me", {
          credentials: "include", // ส่ง cookie ไปด้วย
        });

        console.log("Status:", res.status);

        if (!res.ok) throw new Error("Unauthorized");

        const data = await res.json();
        console.log("User data:", data);

        setUser(data);
      } catch (err) {
        console.log("Auth error:", err.message);
        setUser(null);
      } finally {
        setLoading(false);
        console.log("Loading set to false");
      }
    };

    checkAuth();
  }, []);

  if (loading) return <div>Loading...</div>;

  console.log("Current user:", user);

  return (
    <>
      <Routes>
        <Route path="/" element={<Login setUser={setUser} />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/home"
          element={
            <ProtectedRoute user={user}>
              <Layout user={user} setUser={setUser}>
                <Home />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute user={user}>
              <Layout user={user} setUser={setUser}>
                <UserProfile />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/settings"
          element={
            <ProtectedRoute user={user}>
              <Layout user={user} setUser={setUser}>
                <SettingsPage />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/tickets"
          element={
            <ProtectedRoute user={user}>
              <Layout user={user} setUser={setUser}>
                <Tickets />
              </Layout>
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="book" />} />
          <Route path="book" element={<BookTicket />} />
          <Route path="seat" element={<SeatBooking />} />
          <Route path="add" element={<AddTicket />} />
          <Route path="book/:eventId" element={<BookingFormWrapper user={user} />} />
          <Route path="bookings" element={<UserBookings />} />
        </Route>

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
}
