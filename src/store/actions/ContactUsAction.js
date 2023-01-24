export const getcontactmessage=(messages)=>{
    return (dispatch,getState,{getFirebase,getFirestore})=>{
        const firestore=getFirestore();
        console.log("contact",messages)
      firestore.collection('contactmessage').add({
            ...messages,
            createdAt:new Date()
        }).then(()=>{
            dispatch({type:'CONTACTMESSAGE',messages});
        }).catch((err)=>{
            dispatch({type:'CONTACTMESSAGE_ERROR',err});
        })
       
    }
};
