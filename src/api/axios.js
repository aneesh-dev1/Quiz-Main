import axios  from 'axios';  

const api = axios.create({
    baseURL:'https://quizo.onrender.com'
})


export default api;