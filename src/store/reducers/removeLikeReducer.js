const initState={
    likes:[]     
}
const removeLikeReducer=(state=initState,action)=>{
  switch(action.type){
    case 'DISLIKED':
      console.log('DISLIKED');
      return state
      default :
      return state;
  }

}
export default removeLikeReducer