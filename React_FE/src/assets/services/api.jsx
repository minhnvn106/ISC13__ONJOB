import axios from 'axios';

                            // Các biến API để thao tác
const url = {
    baseUrl:'http://localhost:8888/api',
    login: './admin/login',
    major: '/majors',
    instructor: '/instructors',
    student: '/students'
}

//Instance
const instance = axios.create({
    baseURL: url.baseurl,
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
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