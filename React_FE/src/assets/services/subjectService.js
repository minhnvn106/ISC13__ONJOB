import api from './api';

const getAll = () =>api.get(api.url.subjects).then(res => res.data);
const get=(id)=> api.get(`${api.url.subjects}/${id}`).then(res=>res.data);
const add = (data)=> api.post(api.url.subjects,data).then(res=>res.data);
const update = (id,data)=>api.put(`${api.url.subjects}/${id}`,data).then(res=>res.data);
const remove = (id) => api.delete(`${api.url.subjects}/${id}`).then(res=>res.data);
const subjectService = {
    getAll,get,add,update,delete:remove
};
export default subjectService;