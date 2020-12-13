import api from './api';

const getAll = () => api.get(api.url.room).then(res=>res.data);

const roomService= {
    getAll
};

export default roomService;

