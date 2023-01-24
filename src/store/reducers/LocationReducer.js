
const initstate={
    searchvalue: '', works: [],contents: ['Mirististica', 'Vet']
}

const locationReducer = (state=initstate ,action) => {
    
    switch(action.type)
    {
      case 'SELLERLOCATION':
      console.log('SELLERLOCATION',action.location)
      return state
      case 'SELLERLOCATION_ERROR':
        console.log('ERROR',action.location)
        return state
      default:
      return state;
    }
}

export default locationReducer ;