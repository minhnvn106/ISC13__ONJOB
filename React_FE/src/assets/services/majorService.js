import api from './api';

// const major = () => {
//     return api.get(api.url.major, data).then(res => res.data);
// };

// const majorService = {
//     major
// };

const getAll = () => api.get(api.url.major).then(res=>res.data);

const majorService= {
    getAll
};

export default majorService;

