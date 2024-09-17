import React, { useState } from "react";
import { data } from 'jquery';
import { Link, Switch, Route, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import routes from 'layouts/Auth';
// import { connect } from 'react-redux';

// import userService from '../../assets/services/UserService';
// import ActionTypes from '../../login/store/actions';


//Toast
import Alert from '../../utils/toaster'
import 'react-toastify/dist/ReactToastify.css';
import Input from '../../assets/services/input';

import { Formik } from "formik";

export default function Login(){
// const Login = (props)=> {
//   const { onUserLogin } = props;
//   const [message, setMessage] = useState('');
  
// 	const userNameRef = React.createRef();
// 	const passWordRef = React.createRef();

// 	const submitHander = (e) => {
// 		e.preventDefault();
//     const userName = userNameRef.current.value;
// 		const passWord = passWordRef.current.value;
// 		//call api
// 		userService.login(userName, passWord).then(
// 			(res) => {
// 				//success
// 				if (res.errorCode > 0) {
// 					//error
//           setMessage(res.message);
//           Alert('error','Đăng nhập sai')
// 				} else {
// 					//success
// 					setMessage('');
// 					//save user info
// 					onUserLogin(res.data.accessToken, res.data);
// 					//redirect to home page

// 					props.history.push('/admin/rooms');
// 				}
// 			},
// 			(error) => {
// 				//error
// 			}
// 		);
// 	};
	return (
    <>
      <div className="container mx-auto px-4 h-full">
        <div className="flex content-center items-center justify-center h-full">
          <div className="w-full lg:w-4/12 px-4">
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-300 border-0">
              <div className="rounded-t mb-0 px-6 py-6">
                <div className="text-center mb-3">
                  <h6 className="text-gray-600 text-sm font-bold">
                    ĐĂNG NHẬP
                  </h6>
                </div>
                <hr className="mt-6 border-b-1 border-gray-400" />
              </div>
              <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                {/* <div className="text-gray-500 text-center mb-3 font-bold">
                  <small>Or sign in with credentials</small>
                </div> */}
                {/* <form action="" method="post" onSubmit={submitHander} autoComplete="on" encType='multipart/form-data'> */}
                <form action="" method="post">
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-gray-700 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Tên người dùng
                    </label>
                    <Input  
                      // inputRef={userNameRef}
                      className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150"
                      type="text"
                      id="userName"
                      placeHolder="Nhập tên người dùng"
                    />
                    <div className="col">
									    {/* <p className="text-danger text-center">{message}</p> */}
								    </div>
                    {/* <input
                      type="email"
                      className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150"
                      placeholder="User name"
                    />*/}
                  </div> 

                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-gray-700 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Mật khẩu
                    </label>
                    <Input
                      // inputRef={passWordRef}
                      className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150"
                      type="password"
                      id="password"
                      placeHolder="Nhập mật khẩu"
							      />
                    {/* <input
                      type="password"
                      className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150"
                      placeholder="Password"
                    /> */}
                    <div className="col">
									    {/* <p className="text-danger text-center">{message}</p> */}
								    </div>
                  </div>

                  <div>
                    <label className="inline-flex items-center cursor-pointer">
                      <input
                        id="customCheckLogin"
                        type="checkbox"
                        className="form-checkbox text-gray-800 ml-1 w-5 h-5 ease-linear transition-all duration-150"
                      />
                      <span className="ml-2 text-sm font-semibold text-gray-700">
                        Ghi nhớ tôi
                      </span>
                    </label>
                  </div>

                  <div className="text-center mt-6">
                    <button
                      className="bg-gray-900 text-white active:bg-gray-700 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                      type="submit"
                    >
                      Đăng nhập
                    </button>
                  </div>
                </form>
              </div>
            </div>
            <div className="flex flex-wrap mt-6 relative">
              <div className="w-1/2">
                <a
                  href="#pablo"
                  onClick={(e) => e.preventDefault()}
                  className="text-gray-300"
                >
                  <small>Đã quên mật khẩu?</small>
                </a>
              </div>
              <div className="w-1/2 text-right">
                <Link to="/auth/register" className="text-gray-300">
                  <small>Create new account</small>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
// const mapDispatchToProps = (dispatch) => ({
// 	onUserLogin: (token, currentUser) =>
// 		dispatch({
// 			type: ActionTypes.LOGIN_USER,
// 			token,
// 			currentUser,
// 		}),
// });
// export default connect(null, mapDispatchToProps)(Login);
 