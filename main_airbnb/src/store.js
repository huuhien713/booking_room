import { configureStore } from '@reduxjs/toolkit';
import authSlice from './Services/Slices/authSlice';
import bookingSlice from './Services/Slices/bookingSlice';
import commentSlice from './Services/Slices/commentSlice';
import locationSlice from './Services/Slices/locationSlice'
import roomSlice from './Services/Slices/roomSlice';
import userSlice from './Services/Slices/userSlice';

const store = configureStore({
    reducer: {
        location: locationSlice,
        room: roomSlice,
        auth: authSlice,
        user: userSlice,
        comment: commentSlice,
        booking: bookingSlice
    },
    devTools: true,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false
        })
});

export default store;