import api from './api';

const getAll = () => api.get(api.url.instructor).then(res=>res.data);

const instructorService= {
    getAll
};

export default instructorService;

