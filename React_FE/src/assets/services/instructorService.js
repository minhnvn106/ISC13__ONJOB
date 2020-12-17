
import api2 from './api2';

const getAll = ()=> api2.get(api2.url.instructors).then(res => res.data);
const get=(id)=> api2.get(`${api2.url.instructors}/${id}`).then(res=>res.data);
const add = (data)=> api2.post(api2.url.instructors,data).then(res=>res.data);
const update = (id,data)=>api2.put(`${api2.url.instructors}/${id}`,data).then(res=>res.data);
const remove = (id) => api2.delete(`${api2.url.instructors}/${id}`).then(res=>res.data);


const instructorService = {
    getAll,add,update,delete:remove,get
};
export default instructorService;