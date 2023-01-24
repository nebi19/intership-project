
const initstate={
    catagoryadd:null
}

const catagoryReducer = (state=initstate ,action) => {
    
    switch(action.type)
    {
      case 'CATAGORY':
        console.log(action.catagory)
      return{
        ...state,
        catagoryadd: 'catagory Successfully Set'
      } 
      case 'CATAGORY_ERROR':
        return{
          ...state,
          catagoryadd: 'faild to add catagory '+action.err.message
        } 
      default:
      return state;
    }
}

export default catagoryReducer  ;