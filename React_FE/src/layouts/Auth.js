import React,{Component} from "react";
import {BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";

// Cấp quyền
import AuthService from "../assets/services/auth-service";
// components

import Navbar from "components/Navbars/AuthNavbar.js";
import FooterSmall from "components/Footers/FooterSmall.js";

// views

import Login from "views/auth/Login.js";
import Register from "views/auth/Register.js";

// class Auth extends Component {
export default function Auth() {
  // constructor (props) {
  //   super(props);
  //   this.logOut = this.logOut.bind(this);

  //   this.state = {
  //     showModeratorBoard: false,
  //     showAdminBoard: false,
  //     currentUser: undefined
  //   };
  // }

  // componentDidMount(){
  //   const user = AuthService.getCurrentUser();

  //   if (user) {
  //     this.setState({
  //       currentUser: AuthService.getCurrentUser(),
  //       showModeratorBoard: user.roles.includes("ROLE_MODERATOR"),
  //       showAdminBoard: user.roles.includes("ROLE_ADMIN")
  //     });
  //   }
  // }

  // logOut() {
  //   AuthService.logout();
  // }
  // render(){
  //   const {currentUser, showModeratorBoard, showAdminBoard } =this.state;

  //   return (
  //       <>
  //         <Navbar transparent />
  //         <main>
  //           <section className="relative w-full h-full py-40 min-h-screen">
  //             <div
  //               className="absolute top-0 w-full h-full bg-gray-900 bg-no-repeat bg-full"
  //               style={{
  //                 backgroundImage:
  //                   "url(" + require("assets/img/register_bg_2.png") + ")",
  //               }}
  //             ></div>
  //             <Switch>
  //               <Route exact path="/auth/login" exact component={Login} />
  //               <Route exact path="/auth/register" exact component={Register} />
  //               <Redirect from="/auth" to="/auth/login" />
  //             </Switch>
  //             <FooterSmall absolute />
  //           </section>
  //         </main>
  //       </>
  //     );
    
  // }
  return (
    <>
      <Navbar transparent />
      <main>
        <section className="relative w-full h-full py-40 min-h-screen">
          <div
            className="absolute top-0 w-full h-full bg-gray-900 bg-no-repeat bg-full"
            style={{
              backgroundImage:
                "url(" + require("assets/img/register_bg_2.png") + ")",
            }}
          ></div>
          <Switch>
            <Route path="/auth/login" exact component={Login} />
            <Route path="/auth/register" exact component={Register} />
            <Redirect from="/auth" to="/auth/login" />
          </Switch>
          <FooterSmall absolute />
        </section>
      </main>
    </>
  );
}
// export default Auth;