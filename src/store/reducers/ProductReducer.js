
const initstate={
    searchvalue: '', works: [],contents: ['Mirististica', 'Vet']
}

const productReducer = (state=initstate ,action) => {
    
    switch(action.type)
    {
      case 'SELLERUPLOAD':
      console.log('sellerupload',action.uploads)
      return state
      default:
      return state;
    }
}

export default productReducer;