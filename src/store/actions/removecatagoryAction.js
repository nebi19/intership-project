export const removecatagory = (addedcatagory) =>  
 {
     return(dispatch,getState ,{ getFirebase,getFirestore})=>{        
        const firestore=getFirestore();
        firestore.collection('catagoryAdd').doc(addedcatagory).delete().then(()=>{
            dispatch({type:'REMOVED',addedcatagory})
        }).catch((err)=>{
            dispatch({type:'REMOVED-ERROR',err});
        })
     }
 }
 