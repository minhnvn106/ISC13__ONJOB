// views

import Dashboard from "views/admin/Dashboard.js";
import Maps from "views/admin/Maps.js";
import Settings from "views/admin/Settings.js";
import Tables from "views/admin/Tables.js";
import Rooms from "views/admin/Rooms.js";
import Students from "views/admin/Students.js";
import Instructors from "views/admin/Instructors.js";
import Intakes from "views/admin/Intakes.js";
import Majors from "views/admin/Majors.js";
import Companies from "views/admin/Companies";
import Subjects from "views/admin/Subjects";
import Universities from "views/admin/Universities";

const routes = [
// Template
{path:"/admin/dashboard", exact:true, name:"Dashboard", component: Dashboard},
{path:"/admin/maps", exact:true, name:"Map", component: Maps},
{path:"/admin/settings", exact:true, name:"Setting", component: Settings},
{path:"/admin/tables", exact:true, name:"Table", component: Tables},
// API Project
{path:"/admin/rooms", exact:true, name:"Phòng học", component: Rooms},
{path:"/admin/companies", exact:true, name:"Công ty", component: Companies},
{path:"/admin/intakes", exact:true, name:"Khóa học", component: Intakes},
{path:"/admin/students", exact:true, name:"Sinh viên", component: Students},
{path:"/admin/instructors", exact:true, name:"Giảng viên", component: Instructors},
{path:"/admin/majors", exact:true, name:"Ngành học", component: Majors},
{path:"/admin/subjects", exact:true, name:"Môn học", component: Subjects},
{path:"/admin/universities", exact:true, name:"Đại học", component: Universities},
];
export default routes;