// hooks/useSignUp.ts

import { useState } from 'react';
import { Auth } from 'aws-amplify';
import { useDispatch } from 'react-redux';
import { setToken, setUserInfo } from '../redux/actions/action';
import { endPoints } from '../constants';
import axios from 'axios';
import { DdLogs } from '@datadog/mobile-react-native';

export const useSignUp = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const signUp = async (user) => {
    setLoading(true);
    try {
      const response = await Auth.signUp(user);
      dispatch(setToken(response?.userSub));
      dispatch(setUserInfo({ name: user.username, email: user.attributes.email }));

      // Replace API call with a function that abstracts axios
      const signUpResponse = await callSignUpAPI(response?.userSub, user);
      
      if (signUpResponse) {
        dispatch({ type: SIGNUP_SUCCESS, payload: signUpResponse });
      }
      
      setLoading(false);
      return true;
    } catch (error) {
      console.error();
      DdLogs.error(`Signup error: ${error}`);
      setLoading(false);
      return false;
    }
  };

  const callSignUpAPI = async (token, user) => {
    const SignUpAPI = axios.create({
      baseURL: "https://0j3kvj5lpl.execute-api.us-east-1.amazonaws.com",
      headers: { "content-type": "text/plain; charset=utf-8", "UserId": token },
    });
    const response = await SignUpAPI.post(endPoints.signUp, user.attributes);
    return response.config.data;
  };

  return { signUp, loading };
};
