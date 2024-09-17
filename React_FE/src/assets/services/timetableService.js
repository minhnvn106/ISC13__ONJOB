import api from './api';

const getAll = () => api.get(api.url.timetables).then(res=>res.data);
const get  = (id) => api.get(`${api.url.timetables}/${id}`).then(res=>res.data);
const add = (data)=>api.post(api.url.timetables,data).then(res=>res.data);
const update = (id,data)=>api.put(`${api.url.timetables}/${id}`,data).then(res=>res.data);
const remove = (id)=>api.delete(`${api.url.timetables}/${id}`).then(res=>res.data)

const timetableService = {
    getAll,get,add,update,delete:remove
};
export default timetableService;