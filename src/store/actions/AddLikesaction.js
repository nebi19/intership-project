export const addLike = (likedProuductId) =>  
 {
     return(dispatch,getState ,{ getFirebase,getFirestore})=>{        
        const firestore=getFirestore();
        const profile=getState().firebase.profile;
        const authorId=getState().firebase.auth.uid;
        firestore.collection('like').add({
            fristName:profile.name,
            userId:authorId,
            likedProuductId,
            createdAt:new Date()  
 
        }).then(()=>{
            dispatch({type:'ADD-LIKE',likedProuductId})
        }).catch((err)=>{
            dispatch({type:'ADD-LIKE-ERROR',err});
        })
     }
 }
 export const removeLike = (likeRemoveId) =>  
 {
     return(dispatch,getState ,{ getFirebase,getFirestore})=>{        
        const firestore=getFirestore();
        const profile=getState().firebase.profile;
        const authorId=getState().firebase.auth.uid;
        firestore.collection('like').doc(likeRemoveId).delete().then(()=>{
            dispatch({type:'successfully removed'})
        }).catch((err)=>{
            dispatch({type:'ERROR in removing',err});
        })
     }
 }
 