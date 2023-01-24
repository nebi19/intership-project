import React, { Component } from 'react';
import CommentList from './commentList';
import CommentForm from './commentForm';
import {connect} from 'react-redux';
import {compose} from 'redux';
import Carousel from "react-multi-carousel";
import {firestoreConnect} from 'react-redux-firebase';
import './commentStyle.css';
import LikeIcon from '../../images/like_filled_100px.png'
import {Redirect} from 'react-router-dom';
import {Link } from 'react-router-dom';
import commentIcon from '../img/comments_48px.png'
import messageIcon from '../img/message.png'
import likesIcon from '../img/likes.png';
import {addLike} from '../../store/actions/AddLikesaction'
import Navbar from '../layout/Navbar';
import {removeLike} from '../../store/actions/removeLikeAction'
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
let isLiked;
 class commentBox extends Component {
   state={
     totalComment:-1,
     totalLike:-1,
     user:'',
     imageId:'',
     LikedOrNot:''
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
      const {uploadedPhoto,auth,comments,profile,imageId,like}=this.props;
      // console.log('profile ',profile)
      console.log('is like render',isLiked)
      if(this.state.totalLike===-1){
        if(like){{this.countLike(like,imageId)}}       
      }
      if(this.state.totalComment===-1){
        if(comments){
          {this.countComment(comments,imageId)}
        }       
      }
      if(!auth.uid) return <Redirect to='/signin'/>
      if(uploadedPhoto||comments){
         if(uploadedPhoto){
         return ( <div class='bg-light'>
         <Navbar/> 
           <div className='row'>
             <div className='col-lg-3 col-sm-0 col-md-1'></div>
              <div className='col-lg-6 col-sm-12 col-md-10 bg-white' style={{paddingBottom:'2%',marginBottom:'2%'}}>
              <h3 style={{color:'##82ae46',fontFamily:'poppins,Arial,sans-serif',lineHeight:'1.5', fontweight:'400',marginLeft:'40%'}}>{uploadedPhoto.businessName}</h3>
                  <Carousel  autoPlay   responsive={responsive} showArrows={true}   showIndicators={true} showThumbs={false}>
              {uploadedPhoto.photo&&uploadedPhoto.photo.map((image,i)=>{
               return ( 
             
                <img class="img-fluid" src={image} alt="Colorlib Template"/>
             
               )
              })}
                 </Carousel>
                <div style={{marginLeft:'2%',marginRight:'2%',width:'90%',border:'solid',borderColor:'transparent',borderBottomColor:'gray',marginBottom:'10px'}}>
                 <div style={{marginLeft:'6%'}}>
                 <h5 style={{color:'#82ae46',marginLeft:'4%',fontSize:'20px',fontFamily:'poppins,Arial,sans-serif',lineHeight:'1.5'}}>
    Product Description </h5>

    <p style={{fontSize:'15px',fontFamily:'poppins,Arial,sans-serif'}}>{uploadedPhoto.discription}</p>
        <span style={{color:'#000',fontFamily:'poppins,Arial,sans-serif', fontSize:'15px'}}>Catagory:{uploadedPhoto.catagory}</span>
        <span style={{color:'#000',fontFamily:'poppins,Arial,sans-serif', fontSize:'15px'}}>
          {uploadedPhoto.marketName}</span>
          
        
        <p><span>Price:${uploadedPhoto.price}</span></p>
            </div>
            </div>
            
                <div  className="d-flex flex-fill bg-white" style={{paddingLeft:'2%',paddingRight:'2%',width:'90%'}} >
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
                    <Link  to={'/chat:'+imageId} className=" flex-fill font-weight-bold text-dark">
                       <ImageFormatter src={messageIcon} alt="chat icon" /> send message
                    </Link>
              </div>
                {  comments ?<div class='bg-white'style={{width:'90%'}}>
                  <h1>comments</h1>
                                 <CommentList profile={profile} comments={comments}  imageId={ imageId} total={this.state.totalComment} like={like}/>
                                 <CommentForm profile={ profile } imageId={ imageId}/>
                            </div>
                            :<p>Loading comments</p>}
              </div>
              <div className='col-lg-3 col-sm-0 col-md-1'></div>
            </div>
               </div>);}
           else {
            return (
              <>
              <Navbar/>
              <div className="container center">
                <p>Loading photos...</p>
              </div>
            </>)
          }  
      }
      else {
         return (
          <>
          <Navbar/>
           <div className="container center">
             <p>Loading photo and comments...</p>
           </div>
        </> )
       }     
    }
 }
  
 const mapStateToProps=(state,ownProps)=>{
   const id=ownProps.match.params.id;
   var id2=id.substring(1);
   const commentss=state.firestore.data.sellerUpload;
   const comment=commentss?commentss[id2]:null

   return{
     imageId:id2,
      uploadedPhoto:comment,
      auth:state.firebase.auth,
     comments:state.firestore.ordered.comments,
     like:state.firestore.ordered.like,
     profile:state.firebase.profile
   }
 }
 const mapDispatchToProps=(dispatch)=>{
  return{
      addLike:(like)=>dispatch(addLike(like)),
      removeLike:(imageid)=>dispatch(removeLike(imageid))
  }
}
 export default compose(
    connect(mapStateToProps,mapDispatchToProps),
   firestoreConnect([
      {collection:'sellerUpload'},
      {collection:'like'},
      {collection:'comments',orderBy: ['createdAt','asc']}
   ]))(commentBox);
