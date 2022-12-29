import fetcher from "../fetcher";

const commentApi = {
    getAllComment : () => {
        return fetcher.get('/api/binh-luan')
    },
    sendComment : (model) => {
        return fetcher.post('/api/binh-luan', model);
    },
    deleteComment : (id) => {
        return fetcher.delete(`/api/binh-luan/${id}`, {
            params: {
                id: id
            }
        })
    }
}

export default commentApi;