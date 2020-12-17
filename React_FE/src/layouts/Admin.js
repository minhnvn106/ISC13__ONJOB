import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

// components

// Thanh Admin
import AdminNavbar from "components/Navbars/AdminNavbar.js";

// Thanh bên trái
import Sidebar from "components/Sidebar/Sidebar.js";
import HeaderStats from "components/Headers/HeaderStats.js";
import FooterAdmin from "components/Footers/FooterAdmin.js";

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


export default function Admin() {
  return (
    <>
      <Sidebar />
      <div className="relative md:ml-64 bg-gray-200">
        <AdminNavbar />
        {/* Header */}
        <HeaderStats />
        <div className="px-4 md:px-10 mx-auto w-full -m-24">
          <Switch>
            <Route path="/admin/dashboard" exact component={Dashboard} />
            <Route path="/admin/maps" exact component={Maps} />
            <Route path="/admin/settings" exact component={Settings} />
            <Route path="/admin/tables" exact component={Tables} />
            
            <Route path="/admin/rooms" exact component={Rooms} />
            <Route path="/admin/companies" exact component={Companies} />            
            <Route path="/admin/intakes" exact component={Intakes} />
            <Route path="/admin/students" exact component={Students} />
            <Route path="/admin/instructors" exact component={Instructors} />
            <Route path="/admin/majors" exact component={Majors} />
            <Redirect from="/admin" to="/admin/rooms" />
          </Switch>
          <FooterAdmin />
        </div>
      </div>
    </>
  );
}
