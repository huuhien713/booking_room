import fetcher from "../fetcher";

const userApi = {
    getAllAccount : () => {
        return fetcher.get('/api/users');
    },
    getUserById : (id) => {
        return fetcher.get(`/api/users/${id}`);
    },
    updateUser : (model) => {
        return fetcher.put(`/api/users/${model.id}`, {...model, role: 'USER'})
    },
    updateAvatarUser: (file) => {
        return fetcher.post('/api/users/upload-avatar', file)
    }
}

export default userApi;