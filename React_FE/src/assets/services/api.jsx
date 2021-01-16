import axios from 'axios';
import store from './../../login/store/index';

const url = {
    //có thể thay thế bằng url bên backend
    baseUrl:'http://localhost:8081',
    majors: '/api/majors',
    intakes: '/api/intakes',
    companies: '/api/companies',
    students: '/api/students',

    classes: '/api/classes',
    jobtitles: '/api/jobtitles',
    timetables: '/api/timetables',
    timetabledetails: '/api/timetabledetails',

    instructors: '/api/instructors',
    rooms: '/api/rooms',
    subjects: '/api/subjects',
    universities: '/api/universities',

    signin:'/signin',
    signup: '/signup',
    signout:'/signout'
}

const instance = axios.create({
    baseURL:url.baseUrl,
    headers:{
        // Content-Type  - chỉ truyền và nhận dữ liệu bằng json
        "Content-Type":"multipart/form-data",
        "Accept":"multipart/form-data",
        "Access-Control-Allow-Origin":"*", 
        'Access-Control-Allow-Headers': '*',
        'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,OPTIONS'

    }
});

instance.interceptors.request.use((request)=>{
    // grab current state
    const state = store.getState();
    if (state.auth.token){
        request.headers.Authorization = `Bearer ${state.auth.token}`;    
    }
    console.log(request)
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