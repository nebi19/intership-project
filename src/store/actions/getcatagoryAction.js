export const getcatagory=(catagory)=>{
    return (dispatch,getState,{getFirebase,getFirestore})=>{
        const firestore=getFirestore();
        console.log("catagory",catagory)
      firestore.collection('catagoryAdd').add({
            ...catagory,
            createdAt:new Date()
        }).then(()=>{
            dispatch({type:'CATAGORY',catagory});
        }).catch((err)=>{
            dispatch({type:'CATAGORY_ERROR',err});
        })
       
    }
};
