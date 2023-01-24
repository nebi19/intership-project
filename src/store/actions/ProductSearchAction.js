export const ProductSearch=(searchvalue)=>{
    return (dispatch,getState,{getFirebase,getFirestore})=>{
        console.log("my action saerc",searchvalue)
        dispatch({type:'SEARCH_RESULTS',searchvalue});
        // const firestore=getFirestore();
        // firestore.collection('sellerUpload').where('productName'==searchvalue).get().then(()=>{
        //     dispatch({type:'SEARCH_RESULTS',searchvalue});
        // }).catch((err)=>{
        //     dispatch({type:'SEARCH_RESULTS_NONE',err});
        // })
       
    }
    
}
    