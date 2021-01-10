import { defaultLoadScriptProps } from "@react-google-maps/api/dist/LoadScript";
import React from "react";
import {connect} from "react-redux";
import ActionTypes from './../../store/actions';

const Signin = (props) => {
  const { onUserLogin } = props;
}

const mapDispatchToProps = (dispatch) => ({
  onUserLogin: (token, currentUser) =>
    dispatch({
      type: ActionTypes.LOGIN_USER,
      token,
      currentUser,
    }),
});

export default connect (null, mapDispatchToProps) (Signin)