const initState = {
  authError: null
}

const authReducer = (state = initState, action) => {
  switch(action.type){
    case 'LOGIN_ERROR':
      console.log('login error');
      return {
        ...state,
        authError: action.err.message
      }
    case 'LOGIN_SUCCESS':
      console.log('login success');
      return {
        ...state,
        authError: null
      }
    case 'LOGIN_phone_ERROR':
      console.log('phone login error');
      return {
        ...state,
        authError: action.error.message
      }
      
    case 'RESET_ERROR':
      console.log('error reset');
      return{
        ...state,
        authError:action.err.message
      }
    case 'SIGNOUT_SUCCESS':
          console.log('sign out successfully')
          return state
    case 'SIGNOUT_SUCCESS':
        console.log('sign out successfully')
        return state
    case 'SIGNUP_SUCCESS':
        console.log('signup success')
        return{
          ...state,
          authError:null
        }
    case 'SIGNUP_ERROR':
       console.log('signup error')
       return{
         ...state,
         authError:action.err.message
       }
       
    default:
      return state
  }
};

export default authReducer;