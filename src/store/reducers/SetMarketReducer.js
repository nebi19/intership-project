
const initstate={
    marketSetError:null
}

const setMarketReducer = (state=initstate ,action) => {
    
    switch(action.type)
    {
      case 'SETMARKET':
      return{
        ...state,
        marketSetError: 'Market Successfully Set'
      } 
      case 'SETMARKET_ERROR':
        return{
          ...state,
          marketSetError: 'faild to set market '+action.err.message
        } 
      default:
      return state;
    }
}

export default setMarketReducer ;