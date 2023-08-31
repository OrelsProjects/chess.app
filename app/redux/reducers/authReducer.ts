import {
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,
  SIGNIN_REQUEST,
  SIGNIN_SUCCESS,
  SIGNIN_FAILURE,
  CLEAR_USER,
  //USER_SEARCH,
  SEARCH_USER,
  REMOVE_SEARCH_RESULT,
  SIGNUP_INFO,
  HEADER_ID,
  EXPECTED_RATING,
  SET_LANGUAGE,
  SET_ONBOARDING,
  SET_USERINFO,
  REMOVE_USERINFO,
  SET_TOKEN,
} from "../actions/actionType";

interface AuthState {
  user: any;
  loading: boolean;
  error: any;
  token: string | null;
  searchResults: any[] | null;
  expectRating: any;
  signupInfo: any;
  language: string;
  Onboarding: boolean;
  userInfo: any;
  isLoggedIn: boolean;
}

const initialState = {
  token: null,
  user: null,
  loading: false,
  error: null,
  searchResults: null,
  expectRating: null,
  signupInfo: {},
  language: "",
  Onboarding: true,
  isLoggedIn: false,
  userInfo: {},
};

const authReducer = (state = initialState, action: any): AuthState => {
  switch (action.type) {
    case SIGNUP_REQUEST:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case SIGNUP_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case SIGNUP_SUCCESS:
      return {
        ...state,
        loading: false,
        isLoggedIn: true,
        user: action.payload,
      };
    case SIGNIN_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case SIGNIN_SUCCESS:
      return {
        ...state,
        user: action.payload,
        isLoggedIn: true,
        loading: false,
        error: null,
      };
    case SIGNIN_FAILURE:
      return {
        ...state,
        loading: false,
        isLoggedIn: false,
        error: action.payload,
      };
    case CLEAR_USER:
      return {
        ...state,
        user: null,
        loading: false,
        error: null,
      };
    case SEARCH_USER:
      return {
        ...state,
        loading: false,
        error: null,
        searchResults: action.payload,
      };
    case REMOVE_SEARCH_RESULT:
      let updatedSearchResults = [];
      if (state.searchResults !== null && Array.isArray(state.searchResults)) {
        updatedSearchResults = state.searchResults.filter(
          (_, index) => index !== action.payload
        );
      }
      return {
        ...state,
        searchResults: updatedSearchResults,
      };
    case HEADER_ID:
      return {
        ...state,
        user: action.payload,
        loading: false,
        error: null,
      };
    case SIGNUP_INFO:
      return {
        ...state,
        signupInfo: action.payload,
      };
    case EXPECTED_RATING:
      return {
        ...state,
        loading: false,
        error: null,
        expectRating: action.payload,
      };
    case SET_LANGUAGE:
      return {
        ...state,
        loading: false,
        error: null,
        language: action.payload,
      };
    case SET_ONBOARDING:
      return {
        ...state,
        loading: false,
        error: null,
        Onboarding: action.payload,
      };
    case SET_USERINFO:
      return {
        ...state,
        loading: false,
        error: null,
        userInfo: action.payload.userInfo,
      };

    case SET_TOKEN:
      return {
        ...state,
        token: action.payload,
        loading: false,
        error: null,
      };
    case REMOVE_USERINFO:
      return {
        token: null,
        user: null,
        loading: false,
        error: null,
        searchResults: null,
        expectRating: null,
        signupInfo: {},
        language: "",
        Onboarding: false,
        userInfo: {},
        isLoggedIn: false,
      };

    default:
      return state;
  }
};

export default authReducer;
