
const initstate={
    contactmessage:null
}

const contactReducer = (state=initstate ,action) => {
    
    switch(action.type)
    {
      case 'CONTACTMESSAGE':
      return{
        ...state,
        contactmessage: 'Market Successfully Set'
      } 
      case 'CONTACTMESSAGE_ERROR':
        return{
          ...state,
          contactmessage: 'faild to contact '+action.err.message
        } 
      default:
      return state;
    }
}

export default contactReducer  ;