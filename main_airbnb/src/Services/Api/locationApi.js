import fetcher from '../fetcher'

const locationApi = {
    getAllLocation : () => {
        return fetcher.get('/api/vi-tri');
    },
    getLocationById : (id) => {
        return fetcher.get(`/api/vi-tri/${id}`, {
            params: {
                id: id
            }
        });
    },
}

export default locationApi;