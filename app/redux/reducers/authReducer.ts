import {
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,
  SIGNIN_REQUEST,
  SIGNIN_SUCCESS,
  SIGNIN_FAILURE,
  //USER_SEARCH,
  SEARCH_USER,
  REMOVE_SEARCH_RESULT,
  SIGNUP_INFO,
  HEADER_ID,
  EXPECTED_RATING,
} from '../actions/actionType';

interface AuthState {
  user: any;
  loading: boolean;
  error: any;
  searchResults: any;
  expectRating:any
  signupInfo:any;
}

const initialState = {
  user: null,
  loading: false,
  error: null,
  searchResults: null,
  expectRating:null,
  signupInfo: {},

};

const authReducer = (state = initialState, action: any) => {
  console.log('action.type',action.type)
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
        error: action.payload,
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
        loading: false,
        error: null,
      };
    case SIGNIN_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
      case SEARCH_USER:
        return {
          ...state,
          loading: false,
          error: null,
          searchResults: action.payload,
        };
        case REMOVE_SEARCH_RESULT:
          const updatedSearchResults = state.searchResults.filter(
            (result, index) => index !== action.payload
          );
          return {
            ...state,
            searchResults: updatedSearchResults,
          };  
    case HEADER_ID:
      return {
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
    default:
      return state;
  }
};

export default authReducer;
