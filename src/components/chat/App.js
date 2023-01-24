import React, { Component } from 'react';
import Messages from './messages'
import Input from "./Input";
import Carousel from "react-multi-carousel";
import './App.css'

import 'bootstrap/dist/css/bootstrap.min.css';
import LikeIcon from '../../images/like_filled_100px.png'
import Navbar from '../layout/Navbar';
import messageIcon from '../img/message.png'
import likesIcon from '../img/likes.png'
import commentIcon from '../img/comments_48px.png'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {compose} from 'redux';
import {firestoreConnect} from 'react-redux-firebase';
import {addLike} from '../../store/actions/AddLikesaction'
const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 1,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 1,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 1,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};
const ImageFormatter=(props)=>{
  return(
    <img className="pr-2" src={props.src} alt={props.alt} width={30}/>
  )
}

class App extends Component {
  state={
    totalComment:-1,
     totalLike:-1,
     user:'',
     imageId:'',
     LikedOrNot:''
   }
   handleLike=(e)=>{
    if(this.state.LikedOrNot===0){
      // this.props.addLike(e)
      this.setState({
      // totalLike:this.state.totalLike+1,
      LikedOrNot:1
    })
      } 
    
   }
   countLike=(like,imageId)=>{
    const likep = like.filter(item => item.likedProuductId === imageId);
    const likeOrNot = like.filter(item => item.likedProuductId === imageId && item.userId===this.props.auth.uid);
    this.setState({
      totalLike : likep.length,
      LikedOrNot:likeOrNot.length
    })
    console.log('likeppppppppppp',likep)
   }
   countComment=(comments,imageId)=>{
    const commentl = comments.filter(item => item.imageId === imageId);
    this.setState({totalComment : commentl.length})

   }
     render() {
       const {userType, auth,imageId,uploadedPhoto,profile,chatMessage,comments,like}=this.props;
       const {innerWidth}=window

      console.log('profileprofileeeeeeeee',profile)
       if(this.state.totalLike===-1){
        if(like){{this.countLike(like,imageId)}}       
      }
      if(this.state.totalComment===-1){
        if(comments){
          {this.countComment(comments,imageId)}
        }       
      }
      //  console.log('profile photo from chat app',profile)
      //  const { AlternateNum , PhoneNum,name  }=userType;
      //  console.log('image innnnnnd',userType.name)
       if(!auth.uid) return <Redirect to='/signin'/>
       console.log('uploadedPhoto',uploadedPhoto)
       if(uploadedPhoto){
        return (<div class='bg-light mb-4'>
        <Navbar/>  
          <div className='row '  >
            <div className='col-lg-3 col-sm-0 col-md-1'></div>
             <div className='col-lg-6 col-sm-12 col-md-10 '>
                  <Carousel autoPlay  infinite="true" responsive={responsive} showArrows={true}   showIndicators={true} showThumbs={false}>
                    {uploadedPhoto.photo&&uploadedPhoto.photo.map((image,i)=>{
                    return ( <>
                  
                      {innerWidth<=700?<img class="img-fluid" src={image} alt="Colorlib Template"/>:<img class="img-fluid" style={{marginLeft:'20%'}} src={image} alt="Colorlib Template"/>}
                  
                   </> )
                    })}
                 </Carousel>
                 
                 <div  className="d-flex flex-fill bg-white" style={{paddingLeft:'2%'}} >
                 <div 
                       className=" p-0 heart border d-flex justify-content-center align-items-center mr-3  " 
                       style={{backgroundColor:'white',border:'none'}}  >
                      {this.state.LikedOrNot!==0? <img src={LikeIcon} alt='likeIcon'width={30} />:<span><i  style={{fontSize:'200%',color:'#82ae46'}}  class="ion-ios-heart"></i></span>
                                }
                      </div>
                     <span style={{marginRight:"10px"}}>{" "+this.state.totalLike+" "} </span>
                      <span className='text-dark  font-weight-bold'>like</span> 
                    <Link to={'/comment:'+imageId} className="px-5 flex-fill font-weight-bold text-dark">
                      <ImageFormatter src={commentIcon} alt="comment icon" />
                      {" "+this.state.totalComment+" "}
                      comment
                    </Link>
                    <Link  to={'/chat:'+imageId} className="px-5 flex-fill font-weight-bold text-dark">
                       <ImageFormatter src={messageIcon} alt="chat icon" /> send message
                    </Link>
              </div>
               <div className="App bg-white mb-5" >
            <Messages profile={profile} auth={auth.uid} messages={chatMessage} displayedImageId={imageId} productOwner={uploadedPhoto} />
                  {/* <h1>ffffffffffffff{profile.uIzzd}</h1> */}
            <Input profile={profile} Intials={profile.initials} imageId={ imageId}  auth={auth.uid} productOwner={uploadedPhoto}/>
          </div>
        </div>
             <div className='col-lg-3 col-sm-0 col-md-1'></div>
           </div>
              </div>);}
              else if((!uploadedPhoto)&&chatMessage)
              {
                return(<div style={{backgroundColor:'LightGray',marginBottom:'10%'  }} > 
                  <Navbar/>
                  <div className="App bg-white mb-5" style={{minHeight:'200px',marginBottom:'10%'}}>
                  <h4 style={{textAlign:'center'}}>The product has been deleted</h4>
                </div>
                   
                   
                  </div>
                )
              }
          else {
           return (<>
           <Navbar/> 
             <div className="container center">
               <p>Loading ...</p>
             </div>
           </>)
         } 
      }
}
const mapDispatchToProps=(dispatch)=>{
  return{
      addLike:(like)=>dispatch(addLike(like))
  }
}
const mapStateToProps=(state,ownProps)=>{
  const uId=state.firebase.auth.uid;
  const users=state.firestore.data.users;
  const userType=users?users[uId]:null;
  const id=ownProps.match.params.id;
  console.log('idid',id)
  var id2=id.substring(1);
  const uPhoto=state.firestore.data.sellerUpload;
  const UPhoto=uPhoto?uPhoto[id2]:null;
  return{
    userType:userType,
    imageId:id2,
    
    uploadedPhoto:UPhoto,
    auth:state.firebase.auth,
    comments:state.firestore.ordered.comments,
     like:state.firestore.ordered.like,
    chatMessage:state.firestore.ordered.chat,
    profile:state.firebase.profile,
  }
} 
export default compose(
  connect(mapStateToProps,mapDispatchToProps),
 firestoreConnect([
    {collection:'sellerUpload'},
    {collection:'users'},
    {collection:'chat' ,orderBy: ['createdAt','asc']},
    {collection:'like'},
    {collection:'comments',orderBy: ['createdAt','asc']}
 ]))(App);
