import api from './api';

const getAll = () => api.get(api.url.rooms).then(res=>res.data);
const get  = (id) => api.get(`${api.url.rooms}/${id}`).then(res=>res.data);
const add = (data)=>api.post(api.url.rooms,data).then(res=>res.data);
const update = (id,data)=>api.put(`${api.url.rooms}/${id}`,data).then(res=>res.data);
const remove = (id)=>api.delete(`${api.url.rooms}/${id}`).then(res=>res.data)

const roomService = {
    getAll,get,add,update,delete:remove
};
export default roomService;