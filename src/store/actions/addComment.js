export const addComment = (comment) =>  
 {
     return(dispatch,getState ,{ getFirebase,getFirestore})=>{
        
        const firestore=getFirestore();
        const profile=getState().firebase.profile;
        console.log('profile',profile)
        const authorId=getState().firebase.auth.uid;
        firestore.collection('comments').add({
            ...comment,
            fristName:profile.name,
            userId:authorId,
            createdAt:new Date()  
 
        }).then(()=>{
            dispatch({type:'ADD-COMMENT',comment})
        }).catch((err)=>{
            dispatch({type:'ADD-COMMENT-ERROR',err});
        })
     }
 }
 export const countComment=()=>{
     
 }