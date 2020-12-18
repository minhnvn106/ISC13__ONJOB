
import api from './api';

const getAll = ()=> api.get(api.url.companies).then(res => res.data);
const get=(id)=> api.get(`${api.url.companies}/${id}`).then(res=>res.data);
const add = (data)=> api.post(api.url.companies,data).then(res=>res.data);
const update = (id,data)=>api.put(`${api.url.companies}/${id}`,data).then(res=>res.data);
const remove = (id) => api.delete(`${api.url.companies}/${id}`).then(res=>res.data);


const instructorService = {
    getAll,add,update,delete:remove,get
};
export default instructorService;