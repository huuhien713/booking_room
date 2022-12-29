import fetcher from '../fetcher'

const bookingApi = {
    getAllListBooking : () => {
        return fetcher.get('/api/dat-phong');
    },
    getListBookingById : (MaNguoiDung) => {
        return fetcher.get(`api/dat-phong/lay-theo-nguoi-dung/${MaNguoiDung}`, {
            params : {
                MaNguoiDung: MaNguoiDung,
            }
        });
    },
    bookingRoom: (model) => {
        return fetcher.post('/api/dat-phong', model);
    }
}

export default bookingApi;