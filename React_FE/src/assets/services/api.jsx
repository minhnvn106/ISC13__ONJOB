import axios from 'axios';
import store from './../../login/store/index';

const url = {
    //có thể thay thế bằng url bên backend
    baseUrl:'http://localhost:8081',
    login:'/api/login', //đường dẫn sẽ gọi đến controller api backend
    majors: '/api/majors',
    intakes: '/api/intakes',
    companies: '/api/companies',
    students: '/api/students',

    instructors: '/api/instructors',
    rooms: '/api/rooms',
    subjects: '/api/subjects',
    universities: '/api/universities',

    signin:'/signin'
}

const instance = axios.create({
    baseURL:url.baseUrl,
    headers:{
        // Content-Type  - chỉ truyền và nhận dữ liệu bằng json
        "Content-Type":"application/json",
        "Accept":"application/json"
    }
});

instance.interceptors.request.use((request)=>{
    // grab current state
    const state = store.getState();
    if (state.auth.token){
        request.headers.Authorization = 'Bearer ${state.auth.token}';
    }
    return request;
});

const api = {
    url,
    instance,
    // url : url,
    // instance : instance,
    get : instance.get,
    post:instance.post,
    put:instance.put,
    delete:instance.delete
}
export default api;