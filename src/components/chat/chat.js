import React, { Component } from 'react';
import Messages from './messages'
import Input from "./Input";
import Navbar from '../layout/Navbar';
import './App.css'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {compose} from 'redux';
import {firestoreConnect} from 'react-redux-firebase';
import 'bootstrap/dist/css/bootstrap.min.css';
class App extends Component{
  state={
    
    imageId:'',
    reciever:''
  }
  redirectToChat=(reciever,imageID)=>{
    console.log('reciever',reciever);
    this.setState({
      imageId:imageID,
      reciever:reciever
    })
  }
  render(){
const {ClickedChat,imageId,profile,ChatMessages,chatMessage,auth,sellerUpload,sellerI}=this.props

var Clicked = ClickedChat
var uploadedPhoto=''
if(sellerI){
 Clicked=sellerI[this.props.id]
 uploadedPhoto=Clicked
 console.log(sellerI[this.props.id],this.props.id)
}

console.log(Clicked,'the uploadddd')
if((Clicked)&&sellerUpload)
{
return(  
  <div id="container">
    <div className='row'>
        
        <div className='col-lg-12'>
          {console.log('the seller info',uploadedPhoto)}
          <Messages profile={profile} auth={auth.uid} messages={chatMessage} displayedImageId={this.props.id} productOwner={uploadedPhoto} />
                  {/* <h1>ffffffffffffff{profile.uIzzd}</h1> */}
            <Input profile={profile} Intials={profile.initials} imageId={this.props.id}  auth={auth.uid} productOwner={uploadedPhoto}/>
            </div>
      </div>
  </div>
)}
else if((!Clicked)&&sellerUpload){
  return(
    <div > 
      The product has been deleted
    </div>
  )
}
else{
  return(
    <div> 
      Loading .....
    </div>
  )
}

}
    }

const mapStateToProps=(state,ownProps)=>{
  const uId=state.firebase.auth.uid;
  const users=state.firestore.data.users;
  const userType=users?users[uId]:null;
  var UPhoto=''
 
 
  
  var id2=''
 

  return{
    
    userType:userType,
    imageId:id2,
    sellerUpload:state.firestore.ordered.sellerUpload,
    ChatMessages:state.firestore.data.chat,
    auth:state.firebase.auth,
    sellerI:state.firestore.data.sellerUpload,
    comments:state.firestore.ordered.comments,
     like:state.firestore.ordered.like,
    chatMessage:state.firestore.ordered.chat,
    profile:state.firebase.profile,
  }
} 
export default compose(
  connect(mapStateToProps,null),
 firestoreConnect([
    {collection:'sellerUpload'},
    {collection:'users'},
    {collection:'chat' ,orderBy: ['createdAt','asc']},
    {collection:'like'},
    {collection:'comments',orderBy: ['createdAt','asc']}
 ]))(App);
