import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
// import routes from "./routes";
// import { connect } from "react-redux";

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
import Subjects from "views/admin/Subjects";
import Universities from "views/admin/Universities";
import Classes from "views/admin/Classes";
import JobTitles from "views/admin/Jobtitles";


// const mapStateToProps = (state) => ({
//   isLoggedIn: state.auth.isLoggedIn,
// });

// const Admin=(props)=> {
export default function Admin() {
  // const {isLoggedIn} = props;
  return (
    <>
      <Sidebar />
      <div className="relative md:ml-64 bg-gray-200">
        <AdminNavbar />
        {/* Header */}
        <HeaderStats />
        <div className="px-4 md:px-10 mx-auto w-full -m-24">
          <Switch>
            {/* {!isLoggedIn? <Redirect to = "/auth/login"/>:(
              routes.map((route,idx)=>{
                return route.component ? (
                  <Route key={idx} path={route.path} exact={route.exact} 
                  name={route.name} component={route.component}/>
                ): null;
              })
            )} */}
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

            <Route path="/admin/subjects" exact component={Subjects} />
            <Route path="/admin/universities" exact component={Universities} />
            <Route path="/admin/classes" exact component={Classes} />
            <Route path="/admin/jobtitles" exact component={JobTitles} />
            <Redirect from="/admin" to="/admin/students" />
          </Switch>
          <FooterAdmin />
        </div>
      </div>
    </>
  );
}
// export default connect(mapStateToProps)(Admin)