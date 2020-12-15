// import api from './api';

// // const major = () => {
// //     return api.get(api.url.major, data).then(res => res.data);
// // };

// // const majorService = {
// //     major
// // };

// const getAll = () => api.get(api.url.major).then(res=>res.data);

// const majorService= {
//     getAll
// };
// export default MajorGet
//----------------------------------------------------
// CÁCH 1
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { majorService } from 'assets/services/majorService';
// import { majorService } from 'assets/services/majorService';

// function MajorGet(){
//     const [posts, setPosts] = useState([])

//     useEffect(()=>{
//         axios.get('http://localhost:8888/listMajors')
//         .then(res => {
//             console.log(res)
//             setPosts(res.data)
//         })
//         .catch(err => {
//             console.log(err)
//         })
//     })
//     return (        
//         posts.map(post => (
//             <tr key={post.majorID}>
//                 <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4">
//                     {post.majorName}
//                 </td>
//                 <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4">
//                     {post.majorCode}
//                 </td>
//                 <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4 text-right">
//                       <a href="/">
//                       <i className="fas fa-edit text-primary"></i>
//                       </a>
//                       <a href="/">
//                       <i className="fas fa-trash-alt text-danger"></i>
//                       </a>
//                   </td>
//             </tr>
//           ))
//     )
// }


// export default majorService;

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

// export default majorService;