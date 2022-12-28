import fetcher from "./fetcher";

const bookingRoomAPI = {
    getBookingRooms : () => {
        return fetcher.get("dat-phong");
    },
    
    getBookingById: (id) => {
        return fetcher.get(`dat-phong/${id}`);
    },
    createBooking: (values) => {
        return fetcher.post("dat-phong", values);
    },

    updateBooking: (id,values) => {
        return fetcher.put(`dat-phong/${id}`,values);
    },

    deleteBooking : (id) => {
        return fetcher.delete(`dat-phong/${id}`);
    },
}

export default bookingRoomAPI;