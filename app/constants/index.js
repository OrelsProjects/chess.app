import { store } from "../redux/store/store";
import axios from "axios";
import { useState } from "react";
import { useSelector } from "react-redux";

// const [header, setHeader] = useState('');

// const headerFound = useSelector(state => state.auth);
// setHeader(headerFound?.user);
console.log("headerFound>>>> ", store.getState().auth.token);

export const BaseURL = axios.create({
  // baseURL: "https://0j3kvj5lpl.execute-api.us-east-1.amazonaws.com",
  baseURL: "http://10.0.2.2:4000/",
  // baseURL: Platform.OS === 'ios' ? iosUrl : androidUrl,
  headers: {
    //accept: 'application/json',
    "content-type": "text/plain; charset=utf-8",
    // UserId: header,
    UserId: store.getState().auth.token,
  },
});

console.log("headerFound after create>>>> ", store.getState().auth.token);

export const endPoints = {
  signUp: "/users",
  searchUser: "/search/users/saif/1/10",
  signIn: `/users/${store.getState().auth.token}`,
  calculateRating: `/expectedRating/new`,
  getUserApi: `/users/${store.getState().auth.token}`,
  forgotPassword: "/user-management/forgot-password",
  recoverPassword: "/user-management/recover-password",
  reset: "/calculation/reset",
  undo: "/calculation/undo",
};
