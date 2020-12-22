import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
// import "assets/styles/tailwind.css";
import "assets/styles/minhvp.css";

// layouts

import Admin from "layouts/Admin.js";
import Auth from "layouts/Auth.js";

// views without layouts

import Landing from "views/Landing.js";
import Profile from "views/Profile.js";
// import Index from "views/Index.js";

// dependancys

//Bootstrap
// import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

toast.configure({
  autoClose:3000,
  draggable: false,
  position:'top-right',
  hideProgressBar: false,
  newestOnTop:true,
  closeOnClick:true,
  rlt:false,
  pauseOnVisibilityChange: true,
  pauseOnHover: true
})

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route path="/admin" component={Admin} />
      <Route path="/auth" component={Auth} />
      {/* add routes without layouts */}
      <Route path="/landing" exact component={Landing} />
      <Route path="/profile" exact component={Profile} />
      {/* <Route path="/" exact component={Admin} /> */}
      {/* add redirect for first page */}
      <Redirect from="*" to="/admin" />
    </Switch>
    
  </BrowserRouter>,
  
  document.getElementById("root")
);
