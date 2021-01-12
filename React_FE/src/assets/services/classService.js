import api from './api';

const getAll = () => api.get(api.url.classes).then(res=>res.data);
const get  = (id) => api.get(`${api.url.classes}/${id}`).then(res=>res.data);
const add = (data)=>api.post(api.url.classes,data).then(res=>res.data);
const update = (id,data)=>api.put(`${api.url.classes}/${id}`,data).then(res=>res.data);
const remove = (id)=>api.delete(`${api.url.classes}/${id}`).then(res=>res.data)

const classService = {
    getAll,get,add,update,delete:remove
};
export default classService;