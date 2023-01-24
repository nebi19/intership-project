export const sellerupload=(uploads)=>{
    return (dispatch,getState,{getFirebase,getFirestore})=>{
        const firestore=getFirestore();
        const sellerId=getState().firebase.auth.uid;   
        console.log("reduxpart",uploads)
        firestore.collection('sellerUpload').add({
            ...uploads,
            authId:sellerId,
            createdAt:new Date()
        }).then(()=>{
            dispatch({type:'SELLERUPLOAD',uploads});
        }).catch((err)=>{
            dispatch({type:'SELLERUPLOAD_ERROR',err});
        })
       
    }
};
export const removeProduct = (Id) =>  
 {
     return(dispatch,getState ,{ getFirebase,getFirestore})=>{        
        const firestore=getFirestore();
        
        firestore.collection('sellerUpload').doc(Id).delete().then(()=>{
            dispatch({type:'Removed Product',Id})
        }).catch((err)=>{
            dispatch({type:'Removed Product error',err});
        })
     }
 }

