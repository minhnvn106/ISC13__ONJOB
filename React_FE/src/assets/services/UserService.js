import api from './api'

const config = {     
    headers: { 
        'content-type': 'multipart/form-data',
        "Access-Control-Allow-Origin":"*", 
        'Access-Control-Allow-Headers': '*',
        'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,OPTIONS'    
    },
}

const login=(username,password)=>{
    const data = {username,password}
    // return api.post(api.url.signin,data, config).then(res => res.headers('Access-Control-Allow-Origin','*').data)
    return api.post(api.url.signin,data).then(res =>
        res.header('Access-Control-Allow-Origin', '*').data)
    }
const userService={
    login:login
};
export default userService;
