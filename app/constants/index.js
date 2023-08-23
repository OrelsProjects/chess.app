import { store } from "../redux/store/store";
import axios from "axios";

export const BaseURL = axios.create({
  baseURL: "https://0j3kvj5lpl.execute-api.us-east-1.amazonaws.com",
  headers: {
    accept: 'application/json',
    "content-type": "text/plain; charset=utf-8",
    UserId: store.getState().auth.token,
  },
});

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
