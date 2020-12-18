import api from './api';

const getAll = () =>api.get(api.url.universities).then(res => res.data);
const get = () =>api.get(`${api.url.universities}/${id}`).then(res=>res.data);
const add = () =>api.post(api.url.universities,data).then(res=>res.data);
const update = ()=>api.put(`${api.url.universities}/${id}`).then(res=>res.data);
const remove = ()=>api.delete(`${api.url.universities}/${id}`).then(res=>res.data);

const universityService = {
    getAll,get,add,update,delete:remove
};
export default universityService;