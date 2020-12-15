import axios from 'axios';

                            // Các biến API để thao tác
const url = {
    baseurl: "http://localhost:8888",
    login: './admin/login',
    major: '/listMajors'
}

//Instance
const instance = axios.create({
    baseURL: url.baseurl,
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
    }
});

const api ={
    // url: url,
    // instance: instance,
/*==>*/     url,
            instance,

    get:instance.get,
    post: instance.post,
    put: instance.put,
    delete: instance.delete

};

export default api;
