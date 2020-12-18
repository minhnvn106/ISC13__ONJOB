import axios from 'axios';

const url = {
    //có thể thay thế bằng url bên backend
    baseUrl:'http://localhost:8081/api',
    login:'/login', //đường dẫn sẽ gọi đến controller api backend
    majors: '/majors',
    intakes: '/intakes',
    companies: '/companies',
    students: '/students',

    instructors: '/instructors',
    rooms: '/rooms',
    subjects: '/subjects',
    universities: '/universities'
}

const instance = axios.create({
    baseURL:url.baseUrl,
    headers:{
        // Content-Type  - chỉ truyền và nhận dữ liệu bằng json
        "Content-Type":"application/json",
        "Accept":"application/json"
    }
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