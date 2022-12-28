import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import bookingRoomAPI from '../../../../../services/bookingRoomAPI';

const BookingRoomId = () => {
    const { id } = useParams();
    const [booking, setBooking] = useState(null);
    console.log(booking)
    useEffect(() => {
        ( async () => {
            try {
                const data = await bookingRoomAPI.getBookingById(id);
                setBooking(data);
            } catch (error) {
                console.log(error)
            }
        })()
    },[])
  return (
    <div>BookingRoomId</div>
  );
};

export default BookingRoomId;