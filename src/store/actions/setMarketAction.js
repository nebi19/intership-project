
export const setmarket=(location)=>{
    return (dispatch,getState,{getFirebase,getFirestore})=>{
        const firestore=getFirestore();
       
        firestore.collection('setMarket').add({
            ...location,
            
        }).then(()=>{
            dispatch({type:'SETMARKET',location});
        }).catch((err)=>{
            dispatch({type:'SETMARKET_ERROR',err});
        })
       
    }
};

export const removeMarket=(id)=>{
    return(dispatch,getState ,{ getFirebase,getFirestore})=>{        
        const firestore=getFirestore();
        firestore.collection('setMarket').doc(id).delete().then(()=>{
            dispatch({type:'REMOVED',id})
        }).catch((err)=>{
            dispatch({type:'REMOVED-ERROR',err});
        })
     }
};
export const EditMarket=(id,location)=>{
    return (dispatch,getState,{getFirebase,getFirestore})=>{
        const firestore=getFirestore();
        
        firestore.collection('setMarket').doc(id).update({
            ...location,
            
        }).then(()=>{
            dispatch({type:'SETMARKET',location});
        }).catch((err)=>{
            dispatch({type:'SETMARKET_ERROR',err});
        }) 
    }
};
