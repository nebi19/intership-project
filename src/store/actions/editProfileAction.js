export const editProfile=(newUser)=>{
    return(dispatch,getState,{getFirebase,getFirestore})=>{
        const firebase=getFirebase()
        const firestore=getFirestore()
        const user=getState().firebase.auth; 
        var user1=firebase.auth().currentUser
        const password=newUser.Npassword
        // const cred = firebase.auth.EmailAuthProvider.credential(
        //     user1.email, newUser.password);
        // console.log( user1.reauthenticateAndRetrieveDataWithCredential(cred))
        
        
        firestore.collection('users').doc(user1.uid).update({
            name:newUser.name,
            photo:newUser.photo,
            PhoneNum:newUser.PhoneNum,
            AlternateNum:newUser.AlternateNum          
            }).then(()=>{
                if(password.length>=6)
                        {
                firebase.auth().signInWithEmailAndPassword(
                    user1.email,
                    newUser.password
                  ).then(() => {
                    
                            user1.updatePassword(password).then(()=>{
                                dispatch({type:'Edited_SUCCESS'})
                            
                        }).catch((err)=>{
                            console.log('the error',err)
                            dispatch({type:'Edit__ERROR',err})
                        })
                 } ).catch((err) => {
                dispatch({type:'Edit__ERROR',err})
                    });
                }
                else{
                        dispatch({type:'Edited_SUCCESS'})}
                
                     
    }).catch((err)=>{
        console.log(err)
        dispatch({type:'Edit__ERROR',err})
    })
    
           
      }
}
