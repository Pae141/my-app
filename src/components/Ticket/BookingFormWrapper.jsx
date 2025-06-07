import { useParams } from 'react-router-dom';
import BookingForm from './BookingForm';

function BookingFormWrapper({ user }) {
  console.log(user, eventId)
  const { eventId } = useParams();

  if (!user) return <div>กรุณาเข้าสู่ระบบก่อน</div>;

  return <BookingForm eventId={eventId} userId={user.id} />;
}

export default BookingFormWrapper;
