// import axios from "axios";
// import api from './api';

// const API_URL = api.url;

// class AuthService {
//     login(username, password){
//         return axios
//         .post(api.url.signin,{
//             username,
//             password
//         })
//         .then( response =>{
//             if (response.data.accessToken){
//                 localStorage.setItem("user", JSON.stringify(response.data));
//             }
//             return response.data;
//         });
//     }

//     logout(){
//         localStorage.removeItem("user");
//     }

//     register(username, email,password ){
//         return axios.post (API_URL + "signup",{
//             username,
//             email,
//             password
//         });
//     }

//     getCurrentUser(){
//         return JSON.parse(localStorage.getItem('user'));;
//     }
// }

// export default new AuthService();