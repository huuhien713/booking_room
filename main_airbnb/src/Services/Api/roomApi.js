import fetcher from "../fetcher";

const roomApi = {
    getAllRoom : () => {
        return fetcher.get('api/phong-thue');
    },
    getRoomByLocation : (maViTri) => {
        return fetcher.get('/api/phong-thue/lay-phong-theo-vi-tri', {
            params: {
                maViTri : maViTri
            }
        })
    },
    getRoomById: (id) => {
        return fetcher.get(`api/phong-thue/${id}`);
    }
}

export default roomApi;