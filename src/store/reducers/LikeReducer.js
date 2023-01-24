const initState={
    likes:[]     
}
const commentReducer=(state=initState,action)=>{
  switch(action.type){
    case 'ADD-LIKE':
      console.log('LIKE ISS ADDED');
      return{
          state
      }
      default :
      return state;
  }

}
export default commentReducer