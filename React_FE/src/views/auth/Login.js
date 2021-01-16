import React, { useState, Component } from "react";
import { data } from 'jquery';
import { Link, Switch, Route, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import routes from 'layouts/Auth';
import { connect } from 'react-redux';

import userService from './../../assets/services/UserService';
import ActionTypes from './../../login/store/actions';

// Cap Quyen
import AuthService from './../../assets/services/auth-service';
import CheckButton from "react-validation/build/button";

//Toast
import Alert from './../../utils/toaster'
import 'react-toastify/dist/ReactToastify.css';
import Input from './../../assets/services/input';

import { Formik } from "formik";

const required = value =>{
  if (!value){
    return (
      <div className="alert alert-danger" role="alert">
        Xin hãy nhập thông tin.
      </div>
    );
  }
};
export default class Login extends Component{
// const Login = (props)=> {
  constructor(props){
    super(props);
      this.handleLogin = this.handleLogin.bind(this);
      this.onChangeUsername = this.onChangeUsername.bind(this);
      this.onChangePassword = this.onChangePassword.bind(this);

      this.state = {
        username:"",
        password:"",
        loading: false,
        message:""
      };
  } 
  
  onChangeUsername(e){
    this.setState({
      username: e.target.value
    });
  }

  onChangePassword(e){
    this.setState({
      password: e.target.value
    });
  }

  handleLogin(e){
    e.preventDefault();

    this.setState({
      message: "",
      loading: true
    });

    this.form.validateAll();

    if (this.checkBtn.context._errors.length === 0){
      AuthService.login(this.state.username, this.state.password).then(
        () => {
          this.props.history.push("./admin");
          window.location.reload();
        },
        error =>{
          const resMessage =
          ( error.response &&
            error.response.data &&
            error.response.data.message) ||
            error.message ||
            error.toString();

            this.setState({
              loading: false,
              message: resMessage
            });
          }
        );
      } else {
        this.setState({
          loading: false
        });
      }     
    }
    render(){
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
                  <form onSubmit={this.handleLogin}
                  ref={c =>{
                    this.form = c;
                  }}>
                  {/* <form action="" method="post" onSubmit={submitHander} autoComplete="on" encType='multipart/form-data'> */}
                  {/* <form action="" method="post"> */}
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-gray-700 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                      >
                        Tên người dùng
                      </label>
                      <Input  
                        // inputRef={userNameRef}
                        name="username"
                        value={this.state.username}
                        onChange = {this.onChangeUsername}
                        validations={[required]}
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
                        name="password"
                        value={this.state.password}
                        onChange={this.onChangePassword}
                        validations={[required]}
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
                        disabled={this.state.loading}
                        type="submit"
                      >
                        {this.state.loading && (
                          <span className="spinner-border spinner-border-sm"></span>
                        )}
                        Đăng nhập
                      </button>
                    </div>
                    {this.state.message && (
                      <div className="form-group">
                        <div className="alert alert-danger" role="alert">
                          {this.state.message}
                        </div>
                      </div>
                    )}
                    <CheckButton
                      style={{display:"none"}}
                      ref={c =>{
                        this.checkBtn = c;
                      }}/>
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
    }
}

 
	
