import React, { Component } from 'react';
import Messages from './messages'
import Input from "./Input";
import Navbar from '../../layout/Navbar';
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
const {ClickedChat,profile,ChatMessages,chatMessage,auth,sellerUpload}=this.props

var Clicked = ClickedChat
if(ClickedChat===''){
 Clicked=ChatMessages[this.props.id]
}
console.log(Clicked)
if((Clicked)&&sellerUpload)
{
  const seller = sellerUpload&&sellerUpload.filter(item=>item.id===Clicked.imageId)
if(seller.length!==0)
{return(  
  <div id="container">
              {ClickedChat===''?null:< Navbar/>}
    <div className='row'>
        {ClickedChat===''?null:<div className='col-lg-3'> </div>}
        {ClickedChat===''? <div className='col-lg-12'>
          {console.log('the seller info',Clicked)}
        <Messages profile={profile} auth={auth.uid} messages={chatMessage} displayedImageId={Clicked.imageId}  reciever={Clicked.reciever} sender={Clicked.sender}/>
             <Input profile={profile} auth={auth.uid} ClickedChat={Clicked} reciever={Clicked.sender} imageId={Clicked.imageId}/>
             </div>:<div className='col-lg-6'>
          {console.log('the seller info',Clicked)}
        <Messages profile={profile} auth={auth.uid} messages={chatMessage} displayedImageId={Clicked.imageId}  reciever={Clicked.reciever} sender={Clicked.sender}/>
             <Input profile={profile} auth={auth.uid} ClickedChat={Clicked} reciever={Clicked.sender} imageId={Clicked.imageId}/>
             </div>}
             {ClickedChat===''?null:<div className='col-lg-3'> </div>}
      </div>
  </div>
)}
else{
  return(  
    <div id="container">
                {ClickedChat===''?null:< Navbar/>}
      <div className='row'>
          {ClickedChat===''?null:<div className='col-lg-3'> </div>}
          {ClickedChat===''? <div className='col-lg-12'>
            {console.log('the seller info',Clicked)}
          <p>Product has been deleted</p>
          </div>:<div className='col-lg-6'>
            {console.log('the seller info',Clicked)}
            <p>Product has been deleted</p>
          </div>}
               {ClickedChat===''?null:<div className='col-lg-3'> </div>}
        </div>
    </div>
  )
}
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
  if (ownProps.match)
 { const id=ownProps.match.params.id;
  console.log('idid',id)
  var id2=id.substring(1);
  console.log('id2',id2)
  const uPhoto=state.firestore.data.chat;
  UPhoto=uPhoto?uPhoto[id2]:null;}
 else 
 { 
  
  var id2=''
 
  UPhoto=''
 }

  return{
    
    userType:userType,
    imageId:id2,
    sellerUpload:state.firestore.ordered.sellerUpload,
    ClickedChat:UPhoto,
    ChatMessages:state.firestore.data.chat,
    auth:state.firebase.auth,
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
