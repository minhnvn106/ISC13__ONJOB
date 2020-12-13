import axios from 'axios';

                            // Các biến API để thao tác
const url = {
    baseurl: "https://www.localhost:3000",
    login: './admin/login',
    major: './major'
}

//Instance
const instance = axios.create({
    baseURL: url.baseurl,
    headers: {
        "Content-Type": "applicatipn/json",
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
