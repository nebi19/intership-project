export const removeLike = (likedProuductId) =>  
 {
     return(dispatch,getState ,{ getFirebase,getFirestore})=>{        
        const firestore=getFirestore();
        firestore.collection('like').doc(likedProuductId).delete().then(()=>{
            dispatch({type:'DISLIKED',likedProuductId})
        }).catch((err)=>{
            dispatch({type:'DISLIKE-ERROR',err});
        })
     }
 }
 