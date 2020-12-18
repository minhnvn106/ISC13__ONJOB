import api from './api';

const getAll = () =>api.get(api.url.subjects).then(res => res.data);
const get = () =>api.get(`${api.url.subjects}/${id}`).then(res=>res.data);
const add = () =>api.post(api.url.subjects,data).then(res=>res.data);
const update = ()=>api.put(`${api.url.subjects}/${id}`).then(res=>res.data);
const remove = ()=>api.delete(`${api.url.subjects}/${id}`).then(res=>res.data);

const subjectService = {
    getAll,get,add,update,delete:remove
};
export default subjectService;