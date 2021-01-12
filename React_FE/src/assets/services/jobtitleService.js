import api from './api';

const getAll = () => api.get(api.url.jobtitles).then(res=>res.data);
const get  = (id) => api.get(`${api.url.jobtitles}/${id}`).then(res=>res.data);
const add = (data)=>api.post(api.url.jobtitles,data).then(res=>res.data);
const update = (id,data)=>api.put(`${api.url.jobtitles}/${id}`,data).then(res=>res.data);
const remove = (id)=>api.delete(`${api.url.jobtitles}/${id}`).then(res=>res.data)

const jobtitleService = {
    getAll,get,add,update,delete:remove
};
export default jobtitleService;