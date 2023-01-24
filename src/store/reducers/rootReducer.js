import productReducer from './ProductReducer';
import authReducer from './authReducer';
import {firebaseReducer} from 'react-redux-firebase';
import {combineReducers} from 'redux'; 
import {firestoreReducer} from 'redux-firestore';
import commentReducer from './commentReducer';
import chatReducer from './chatReducer';
import likeReducer from './LikeReducer';
import setMarketReducer from './SetMarketReducer'
import editProfileReducer from './EditProfileReducer'
import contactReducer from './contactReducer'
import catagoryReducer from './catagoryReducer'
import removecatagory from './removecatagoryReducer'
import "firebase/storage";  
import removeLikeReducer from './removeLikeReducer'
const rootReducer=combineReducers({
    removeLikeReducer:removeLikeReducer,
    removecatagory:removecatagory,
    contactReducer:contactReducer,
    catagoryReducer:catagoryReducer,
    comment:commentReducer,
    chat:chatReducer,
     auth:authReducer,
     like:likeReducer,
     setMarket:setMarketReducer,
     edit:editProfileReducer,
    products:productReducer,
    firestore:firestoreReducer,
    firebase:firebaseReducer
  
});
export default rootReducer;
