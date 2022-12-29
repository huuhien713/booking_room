import fetcher from "../fetcher";

const authApi = {
    signin : (model) => {
        return fetcher.post('/api/auth/signin', model)
    },
    signup : (model) => {
        return fetcher.post('/api/auth/signup', {...model, avatar: null, role: 'USER'})
    }
}
export default authApi;