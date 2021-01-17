import api from './api';
// import axios from "axios";
// import qs from "qs";  

// const url = "http://localhost:8085/api/students";
// let data={
//     stdId:'',
//     stdCode:'',
//     stdName:'',      
//     stdGender:'',
//     stdBirthday:'',
//     stdEmail:'',
//     stdPhone:'',
//     stdImg:'',
//     stdType:'',
//     stdGPA:'',
//     stdWorkStatus:'',
// }
// let header = {
//     method: "POST",
//     headers: { "content-type": "application/x-www-form-urlencoded" },
//     data: qs.stringify(data),
//     url
// };
const getAll = ()=> api.get(api.url.students).then(res => res.data);
const get=(id)=> api.get(`${api.url.students}/${id}`).then(res=>res.data);
const add = (data)=> api.post(api.url.students, data).then(res=>res.data);
const update = (id,data)=>api.put(`${api.url.students}/${id}`,data).then(res=>res.data);
const remove = (id) => api.delete(`${api.url.students}/${id}`).then(res=>res.data);


const studentService = {
    getAll,add,update,delete:remove,get
};
export default studentService;
