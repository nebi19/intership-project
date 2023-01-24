const initState={
    likes:[]     
}
const removecatagory=(state=initState,action)=>{
  switch(action.type){
    case 'REMOVED':
      
      return state
      default :
      return state;
  }

}
export default removecatagory