import api from './api';

const getAll = () => api.get(api.url.timetabledetails).then(res=>res.data);
const get  = (id) => api.get(`${api.url.timetabledetails}/${id}`).then(res=>res.data);
const add = (data)=>api.post(api.url.timetabledetails,data).then(res=>res.data);
const update = (id,data)=>api.put(`${api.url.timetabledetails}/${id}`,data).then(res=>res.data);
const remove = (id)=>api.delete(`${api.url.timetabledetails}/${id}`).then(res=>res.data)

const timetabledetailService = {
    getAll,get,add,update,delete:remove
};
export default timetabledetailService;