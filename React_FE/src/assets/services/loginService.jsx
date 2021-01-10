import React from "react";
import {connect} from "react-redux";
import ActionTypes from './../../store/actions';
import { Switch, Route, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import routes from "layouts/Auth";

const mapStateToProps = (state) =>({
  isLoggedIn: state.auth.isLoggedIn,
});
const DefaultLayout = (props)=> {
  const { isLoggedIn } = props;

  
}

const Logged = () => {
  const username = usernameRef.current.value;
  const password = passwordRef.current.value;

  UserService.Logged(username,password).then((res)=> {
    if (res.errorCode > 0) {
    // Thông báo kết quả 
    Alert('error', 'Mật khẩu không đúng')   
    loadData();
    console.log(res);
    } else {
    Alert('success', 'Đăng nhập thành công')   
    onUserLogin(res.data.accessToken, res.data);

    history.push("/admin");
    }
  })
}

// const mapDispatchToProps = (dispatch) => ({
//   onUserLogin: (token, currentUser) =>
//     dispatch({
//       type: ActionTypes.LOGIN_USER,
//       token,
//       currentUser,
//     }),
// });

export default connect (mapStateToProps) (DefaultLayout)