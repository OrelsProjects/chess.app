import { Alert } from 'react-native';
import { BaseURL, endPoints } from '../../constants';
import {
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,
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
  SET_TOKEN
} from './actionType';
import NavigationService from '../../navigation/NavigationService';
import { store } from '../store/store';
import { useStore } from '../../store/index';


interface SignupData {
  first_name: string;
  last_name: 'testing';
  gender: 'male';
  email: string;
  //password: string;
  phone_number: '0543442286';
  player_number: 201222;
  date_of_birth: number;
}

// Sign-up Action Creator
export const Signup = (data: SignupData) => {
  return async (dispatch: any) => {
    dispatch({ type: SIGNUP_REQUEST });
    console.log('Check Before API data ==> ', data);
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
        console.log('first_name or email or date_of_birth missing');
        return;
      }

      let apiParams={
        first_name,
        last_name,
        gender,
        email,
        phone_number,
        player_number,
        date_of_birth,
      }
      console.log('apiParams22', apiParams)
      const response = await BaseURL.post(endPoints.signUp, apiParams);

console.log("testing",response)
      if (response) {
        dispatch({ type: SIGNUP_SUCCESS, payload: response.config.data });
      //  useStore.getState().setIsLoggedIn(true)
        NavigationService.navigate('EnterOTP', {
        username: apiParams.first_name,
        email: apiParams.email,
      });
        // dispatch(set)
        console.log('response Sign Up Data:', response.config.data);
      }
    } catch (error) {
      dispatch({ type: SIGNUP_FAILURE, payload: error });
      console.log('error:', error);
      console.log('Error response:',error?.response?.data)
    }
  };
};

// Sign-in Action Creator
export const signin = (email: string, password: string) => {
  return async (dispatch: any) => {
    dispatch({ type: SIGNIN_REQUEST });

    try {
      if (!email || !password) {
        Alert.alert('Please provide email and password');
        return;
      }

      const response = await BaseURL.post(endPoints.signIn, {
        email,
        password,
      });

      if (response && response.data) {
        console.log("login response:",response)
        dispatch({ type: SIGNIN_SUCCESS, payload: response });
        //Alert.alert('successfully sign in');
        console.log('response Sign In Data>>>>>>>>', response);
      } else {
        // Handle unexpected response format
        throw new Error('Invalid response format');
      }
    } catch (error:any) {
      const errorMessage = error.response?.data || error.message;
      dispatch({ type: SIGNIN_FAILURE, payload: errorMessage });
      Alert.alert('Failed', errorMessage);
      console.log('error>>>>>>>>>> ', error);
    }
  };
};

// //User-Search Action Creator
// export const searchUser = (opponentName: string, ratingNumber: string ) => {
//   return async (dispatch: any) => {
//     try {
//       const response = await BaseURL.get(endPoints.searchUser);
//       dispatch({ type: SEARCH_USER, payload: response.data });
//       return response.data;
//     } catch (error) {
//       console.error('Search error:', error);
//       throw error;
//     }
//   };
// };

export const searchUser = (serachedData:any) => {
  
  let tempArray:any=[]
  if(store.getState().auth.searchResults==undefined){
    tempArray=serachedData
  }else{
    tempArray=[
      ...store.getState().auth.searchResults,
      ...serachedData
    ]
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
//User SignUp info
export const userSignupInfo = (userObject:any) => {
  return async (dispatch: any) => {
    try {
      
      console.log('sign up info',userObject)
      dispatch({
        type: SIGNUP_INFO,
        payload: userObject,
      });
    } catch (error) {
      console.error('Signup error:', error);
    }
  };
};

//Set Header Action Creator
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

export const setUserInfo = (infoData: any) => {
  return async (dispatch: any) => {
    dispatch({ type: SET_USERINFO, payload: infoData });
  };
};

export const setLanguage = (lang:string) => {
  return async (dispatch: any) => {
    dispatch({ type: SET_LANGUAGE, payload: lang });
  };
};
//on boarding set to true/false
export const setOnBoarding = (onBoarding: boolean) => {
  return async (dispatch: any) => {
    dispatch({ type: SET_ONBOARDING, payload: onBoarding });
  };
};
export const setToken = (token: string) => {
  return async (dispatch: any) => {
    dispatch({ type: SET_TOKEN, payload: token });
  };
};

export const removeUserInfo = () => {
  return async (dispatch: any) => {
    dispatch({ type: REMOVE_USERINFO });
  };
};

