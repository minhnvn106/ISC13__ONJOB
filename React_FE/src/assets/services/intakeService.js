
import api from './api';

const getAll = ()=> api.get(api.url.intakes).then(res => res.data);
const get=(id)=> api.get(`${api.url.intakes}/${id}`).then(res=>res.data);
const add = (data)=> api.post(api.url.intakes,data).then(res=>res.data);
const update = (id,data)=>api.put(`${api.url.intakes}/${id}`,data).then(res=>res.data);
const remove = (id) => api.delete(`${api.url.intakes}/${id}`).then(res=>res.data);


const intakeService = {
    getAll,add,update,delete:remove,get
};
export default intakeService;