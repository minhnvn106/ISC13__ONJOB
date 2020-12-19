import api from './api';

const getAll = () => api.get(api.url.rooms).then(res=>res.data);
const get  = () => api.get(`${api.url.rooms}/${id}`).then(res=>res.data);
const add = ()=>api.post(api.url.rooms,data).then(res=>res.data);
const update = ()=>api.put(`${api.url.rooms}/${id}`).then(res=>res.data);
const remove = ()=>api.delete(`${api.url.rooms}/${id}`).then(res=>res.data)

const roomService = {
    getAll,get,add,update,delete:remove
};
export default roomService;