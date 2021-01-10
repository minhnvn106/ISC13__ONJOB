import api from './api'

const login=(username,password)=>{
    const data={username,password}
    return api.post(api.url.signin,data).then(res=>res.data)
}
const userService={
    login:login
};
export default userService;
