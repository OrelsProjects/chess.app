import { BaseURL, endPoints } from "../../constants";
import {
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,
  CLEAR_USER,
  SIGNIN_REQUEST,
  SIGNIN_SUCCESS,
  SIGNIN_FAILURE,
  REMOVE_OPPONENT,
  HEADER_ID,
  SIGNUP_INFO,
  EXPECTED_RATING,
  SET_LANGUAGE,
  SET_ONBOARDING,
  SET_USERINFO,
  REMOVE_USERINFO,
  SET_TOKEN,
  ADD_OPPONENTS,
} from "./actionType";
import { IOpponent } from "../reducers/authReducer";
import NavigationService from "../../navigation/NavigationService";
import { Auth } from "aws-amplify";
import { store } from "../store/store";
import { DdLogs } from "@datadog/mobile-react-native";
import axios from "axios";
interface SignupData {
  first_name: string;
  last_name: string;
  gender: "male" | "female" | "other";
  email: string;
  phone_number: string;
  player_number: string;
  date_of_birth: number;
}

// Should be used before app loads
export const validateUserAuthentication = () => {
  return async (dispatch: any) => {
    try {
      const user = await Auth.currentAuthenticatedUser();
      if (user != null && Object.keys(user).length > 0) {
        const { username, email } = user;
        dispatch(setToken(user?.attributes?.sub));
        dispatch(setUserInfo(username, email));
      } else {
        dispatch({ type: CLEAR_USER, payload: "User not found" });
      }
    } catch (error) {
      console.error("isAuthenticated error:", error);
    }
  };
};

export const Signup = (data: SignupData) => {
  return async (dispatch: any) => {
    dispatch({ type: SIGNUP_REQUEST });

    try {
      const {
        first_name,
        last_name,
        gender,
        email,
        phone_number,
        player_number,
        date_of_birth,
      } = data;

      if (!first_name || !email || !date_of_birth) {
        return;
      }

      let apiParams = {
        first_name,
        last_name,
        gender,
        email,
        phone_number,
        player_number,
        date_of_birth,
      };

      const response = await BaseURL.post(endPoints.signUp, apiParams);

      if (response) {
        dispatch({ type: SIGNUP_SUCCESS, payload: response.config.data });
        NavigationService.navigate("EnterOTP", {
          username: apiParams.first_name,
          email: apiParams.email,
        });
      }
    } catch (error) {
      DdLogs.error(`Signup redux error: ${error}`);
      dispatch({ type: SIGNUP_FAILURE, payload: error });
    }
  };
};

export const signin = (email: string, password: string) => {
  return async (dispatch: any) => {
    dispatch({ type: SIGNIN_REQUEST });

    try {
      if (!email || !password) {
        return;
      }

      const response = await BaseURL.post(endPoints.signIn, {
        email,
        password,
      });

      if (response && response.data) {
        dispatch({ type: SIGNIN_SUCCESS, payload: response });
      } else {
        throw new Error("Invalid response format");
      }
    } catch (error: any) {
      const errorMessage = error.response?.data || error.message;
      DdLogs.error(`Sign in redux error: ${error}`);
      dispatch({ type: SIGNIN_FAILURE, payload: errorMessage });
    }
  };
};

export const addOpponents = (opponents: IOpponent[]) => (dispatch: any) => {
  dispatch({ type: ADD_OPPONENTS, payload: opponents });
};

export const removeOpponent = (index: number) => {
  return {
    type: REMOVE_OPPONENT,
    payload: index,
  };
};

export const userSignupInfo = (userObject: any) => {
  return async (dispatch: any) => {
    try {
      dispatch({
        type: SIGNUP_INFO,
        payload: userObject,
      });
    } catch (error) {
      DdLogs.error(`fetch data user redux error: ${error}`);
      console.error("Signup error:", error);
    }
  };
};

export const setHeader = (headerID: string) => {
  return async (dispatch: any) => {
    dispatch({ type: HEADER_ID, payload: headerID });
  };
};

export const setExpectedRating = (expectedRating: string) => {
  return async (dispatch: any) => {
    dispatch({ type: EXPECTED_RATING, payload: expectedRating });
  };
};

export const setUserInfo = (name: string, email: string) => {
  return { type: SET_USERINFO, payload: { name, email } };
};

export const setLanguage = (lang: string) => {
  return async (dispatch: any) => {
    dispatch({ type: SET_LANGUAGE, payload: lang });
  };
};

export const setOnBoarding = (onBoarding: boolean) => {
  return async (dispatch: any) => {
    dispatch({ type: SET_ONBOARDING, payload: onBoarding });
  };
};

export const setToken = (token: string) => {
  axios.defaults.headers.common["UserId"] = token;
  return async (dispatch: any) => dispatch({ type: SET_TOKEN, payload: token });
};

export const removeUserInfo = () => {
  return async (dispatch: any) => {
    dispatch({ type: REMOVE_USERINFO });
  };
};
