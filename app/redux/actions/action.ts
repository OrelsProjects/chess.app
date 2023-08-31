import { BaseURL, endPoints } from "../../constants";
import {
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,
  CLEAR_USER,
  SIGNIN_REQUEST,
  SIGNIN_SUCCESS,
  SIGNIN_FAILURE,
  SEARCH_USER,
  REMOVE_SEARCH_RESULT,
  HEADER_ID,
  SIGNUP_INFO,
  EXPECTED_RATING,
  SET_LANGUAGE,
  SET_ONBOARDING,
  SET_USERINFO,
  REMOVE_USERINFO,
  SET_TOKEN,
} from "./actionType";
import NavigationService from "../../navigation/NavigationService";
import { Auth } from "aws-amplify";
import { store } from "../store/store";
import { DdLogs } from "@datadog/mobile-react-native";
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
      console.log("Am I logged in?" + JSON.stringify(store.getState().auth));
      const user = await Auth.currentAuthenticatedUser();

      if (user != null && Object.keys(user).length > 0) {
        const { username, email } = user;
        dispatch(setToken(user?.attributes?.sub));
        dispatch(setUserInfo({ name: username, email }));
        // CALL IT HERE
      } else {
        dispatch({ type: CLEAR_USER, payload: "User not found" });
      }
    } catch (error) {
      DdLogs.error(`isAuthenticated redux error: ${error}`);
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
        console.log("Params");
        console.log(JSON.stringify(apiParams));
        NavigationService.navigate("EnterOTP", {
          username: apiParams.first_name,
          email: apiParams.email,
        });
      }
    } catch (error) {
      DdLogs.error(`Signup redux error: ${error}`);
      console.log(error);
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

export const addOpponents = (opponents: any) => {
  let tempArray: any = [];
  if (store.getState().auth.searchResults == undefined) {
    tempArray = opponents;
  } else {
    tempArray = [...store.getState().auth.searchResults, ...opponents];
  }
  return async (dispatch: any) => {
    dispatch({ type: SEARCH_USER, payload: tempArray });
  };
};

export const removeSearchResult = (index: number) => {
  return {
    type: REMOVE_SEARCH_RESULT,
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

export const expectedRating = (expectRating: string) => {
  return async (dispatch: any) => {
    dispatch({ type: EXPECTED_RATING, payload: expectRating });
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
  return { type: SET_TOKEN, payload: token };
};

export const removeUserInfo = () => {
  return async (dispatch: any) => {
    dispatch({ type: REMOVE_USERINFO });
  };
};
