const initialState = {
    isLoggedIn: false,
    token: null,
  };
  
  const authReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'LOGIN_SUCCESS':
        return {
          ...state,
          isLoggedIn: true,
          token: action.payload,
        };
      case 'LOGOUT':
        return {
          ...state,
          isLoggedIn: false,
          token: null,
        };
      default:
        return state;
    }
  };
  
  export default authReducer;
  