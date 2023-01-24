const initState = {
    editError: null
  }
  
  const editProfileReducer = (state = initState, action) => {
    switch(action.type){
      case 'Edited_SUCCESS':
          return {
            ...state,
            editError: ''
          }            
          
      case 'Edit__ERROR':
         console.log('Not edited',action.err.message)
         return {
          ...state,
          editError: 'faild to update profile '+action.err.message
        }
         
      default:
        return {
          state,
          editError:null
        }
    }
  };
  
  export default editProfileReducer;