 
const intialState={
    message:'how are you',
}
const chatReducer=(state=intialState,action)=>{
    switch(action.type){
        case 'ADD-MESSAGE':
            console.log('message is added')
            return {
                ...state,
            }
         case 'ADD-MESSAGE-ERR':
             return{
                
            }
        default:
            return state;

    }
}
export default chatReducer;
 