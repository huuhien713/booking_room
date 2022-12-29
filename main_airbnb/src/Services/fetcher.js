import axios from 'axios'

const fetcher = axios.create({
    baseURL: 'https://airbnbnew.cybersoft.edu.vn',
    headers : {
        tokenCybersoft: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCAzMiIsIkhldEhhblN0cmluZyI6IjE3LzA0LzIwMjMiLCJIZXRIYW5UaW1lIjoiMTY4MTY4OTYwMDAwMCIsIm5iZiI6MTY1MzkzMDAwMCwiZXhwIjoxNjgxODM3MjAwfQ.Yk1H5QCjda1n9Cd5-k2yU_DLnRqRvaB7FIkn1hIuPE0'
    }
});

export default fetcher;

fetcher.interceptors.response.use(
    (response) => {
        return response
    }, 
    (error) => {
        return Promise.reject(error);
    }
)

fetcher.interceptors.request.use(
    (config) => {
        const accessToken = JSON.parse(localStorage.getItem('userBooking')).token || '';
        if (accessToken) {
            config.headers.token = `${accessToken}`
        }
        return config;
    }, 
    (error) => {
        return Promise.reject(error);
    }
)

    
