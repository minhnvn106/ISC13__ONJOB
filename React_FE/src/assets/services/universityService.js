import api from './api';

const getAll = () =>api.get(api.url.universities).then(res => res.data);
const get=(id)=> api.get(`${api.url.universities}/${id}`).then(res=>res.data);
const add = (data)=> api.post(api.url.universities,data).then(res=>res.data);
const update = (id,data)=>api.put(`${api.url.universities}/${id}`,data).then(res=>res.data);
const remove = (id) => api.delete(`${api.url.universities}/${id}`).then(res=>res.data);
const universityService = {
    getAll,get,add,update,delete:remove
};
export default universityService;