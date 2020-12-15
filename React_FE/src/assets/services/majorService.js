import api from './api';

// const major = () => {
//     return api.get(api.url.major, data).then(res => res.data);
// };

// export default MajorGet
//----------------------------------------------------
// CÁCH 1
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { majorService } from 'assets/services/majorService';
// import { majorService } from 'assets/services/majorService';

// const majorService = {
//     major
// };

const getAll = () => api.get(api.url.major).then(res=>res.data);

const majorService= {
    getAll
};

export default majorService;

// CÁCH 2
export function getList() {
    return fetch('http://localhost:8888/listMajors')
      .then(data => data.json())
  }

// CÁCH 3

// const getAll = ()=> api.get(api.url.majors).then(res=> res.data);
// const get = ()=> api.get(`$api.url.majors/${majorID}`).then(res=> res.data);
// const add = (data)=> api.get(api.url.majors,data).then(res=> res.data);
// const update = (id, data)=> api.put(`$api.url.majors/${majorID}`, data).then(res => res.data);
// const remove = (id, data)=> api.delete(`$api.url.majors/${majorID}`).then(res => res.data);

// const majorService = {getAll, get, add, update, delete: remove};

<<<<<<< HEAD
// export default majorService;
=======
// export default majorService;
>>>>>>> ff2462561d6c0dddc251e1ba1d5eb0970cfd84db
