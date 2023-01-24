export const getLocation=(location)=>{
    return (dispatch,getState,{getFirebase,getFirestore})=>{
        const firestore=getFirestore();
        const profile=getState().firebase.profile;
        
        const sellerId=getState().firebase.auth.uid;   
       
        firestore.collection('sellerLocation').add({
            ...location,
            sellername:profile.name,
            sellerId:sellerId, 
            createdAt:new Date()
        }).then(()=>{
            dispatch({type:'SELLERLOCATION',location});
        }).catch((err)=>{
            dispatch({type:'SELLERLOCATION_ERROR',err});
        })
       
    }
};
