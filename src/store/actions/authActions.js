export const signIn = (credentials) => {
    return (dispatch, getState, {getFirebase}) => {
      const firebase = getFirebase();
      
      firebase.auth().signInWithEmailAndPassword(
        credentials.email,
        credentials.password
      ).then(() => {
        dispatch({ type: 'LOGIN_SUCCESS' });
      } ).catch((err) => {
        dispatch({ type: 'LOGIN_ERROR', err });
      });
  
    }
  }
  export const signInPhone = (credentials) => {
    return (dispatch, getState, {getFirebase,getFirestore}) => {
      const firebase = getFirebase();
      const firestore=getFirestore();
      firebase.auth().useDeviceLanguage();      
      window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container', {
        'size': 'normal',
        'callback': function(response) {
        },
        'expired-callback': function() {
        }
      });
      var appVerifier = window.recaptchaVerifier
      firebase.auth().signInWithPhoneNumber(credentials.PhoneNum,appVerifier)
      .then((confirmationResult,resp) => {
        const verificationCode = window.prompt('Please enter the verification ' +
            'code that was sent to your mobile device.');
            
        return confirmationResult.confirm(verificationCode)
        
      })
      .catch((error) => {
        dispatch({ type: 'LOGIN_phone_ERROR', error });
        console.log(error,'the error is ...')
        return Promise.reject(error)
      });
    }
  }
  export const signUpPhone = (credentials) => {
    return (dispatch, getState, {getFirebase,getFirestore}) => {
      const firebase = getFirebase();
      const firestore=getFirestore();
      firebase.auth().useDeviceLanguage();      
      window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container', {
        'size': 'normal',
        'callback': function(response) {
        },
        'expired-callback': function() {
        }
      });
      var appVerifier = window.recaptchaVerifier
      firebase.auth().signInWithPhoneNumber(credentials.PhoneNum,appVerifier)
      .then((confirmationResult,resp) => {
        const verificationCode = window.prompt('Please enter the verification ' +
            'code that was sent to your mobile device.');
            
        confirmationResult.confirm(verificationCode).then((result)=>{
          
          return firestore.collection('users').doc(result.user.uid).set({
            userType:credentials.userType,
            name:credentials.name,
            PhoneNum:credentials.PhoneNum,
            AlternateNum:credentials.AlternateNum,
            initials:credentials.name[0]+credentials.name[1]
        })
        })
        
      })
      .catch((error) => {
        dispatch({ type: 'LOGIN_phone_ERROR', error });
        console.log(error,'the error is ...')
        return Promise.reject(error)
      });
    }
  }

export const signOut=()=>{
    return(dispatch,getState,{getFirebase})=>{
        const firebase=getFirebase();
        firebase.auth().signOut().then(()=>{
            dispatch({type:'SIGNOUT_SUCCESS'})
        })
    }
}
export const signUp=(newUser)=>{
    return(dispatch,getState,{getFirebase,getFirestore})=>{
        const firebase=getFirebase()
        const firestore=getFirestore()
        firebase.auth().createUserWithEmailAndPassword(
            newUser.email,
            newUser.password
        ).then((resp)=>{
            return firestore.collection('users').doc(resp.user.uid).set({
                userType:newUser.userType,
                name:newUser.name,
                PhoneNum:newUser.PhoneNum,
                AlternateNum:newUser.AlternateNum,
                initials:newUser.name[0]+newUser.name[1]
            })

        }).then(()=>{
            dispatch({type:'SIGNUP_SUCCESS'})
        }).catch((err)=>{
            dispatch({type:'SIGNUP_ERROR',err})
        })
    }
}
export const ForgetPsw=(email)=>{

    return(dispatch,getState,{getFirebase,getFirestore})=>{
        const firebase=getFirebase()
    firebase.auth().sendPasswordResetEmail(email).then(()=>{
        window.alert('Email has been sent to you, please check and verify.')
    })
    .catch((err)=>{
        console.log('error in reset',err.message)
        // dispatch({type:'RESET_ERROR',err})
    })
    }
}

