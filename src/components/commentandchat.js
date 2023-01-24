import React, { Component } from 'react';
import CommentList from './commentList';
import CommentForm from './commentForm';
import {connect} from 'react-redux';
import {compose} from 'redux';
import Carousel from "react-multi-carousel";
import {firestoreConnect} from 'react-redux-firebase';
import './commentStyle.css';
import {Redirect} from 'react-router-dom';
import {Link } from 'react-router-dom';
import commentIcon from '../img/comments_48px.png'
import messageIcon from '../img/message.png'
import likesIcon from '../img/likes.png';
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
 class commentBox extends Component {
   state={
     totalComment:0,
     totalLike:0,
     user:'',
     imageId:''
   }
   handleLike=(e)=>{
     this.state.totalLike++;
     console.log('like is clicked',this.state.totalLike)
     console.log('like is imageid',e)
     this.props.addLike(e)
   }
   handleComment=()=>{
     console.log('from handling comment',this.state.totalComment)
   }
    render() { 
      const {uploadedPhoto,auth,comments,profile,imageId}=this.props;
      console.log('userrrr',auth.uid);
      if(!auth.uid) return <Redirect to='/signin'/>
      if(uploadedPhoto||comments){
         if(uploadedPhoto){
         return (  
           <div className='row'>
             <div className='col-lg-3 col-sm-0'></div>
              <div className='col-lg-6 col-sm-12 ' >
                  <Carousel  autoPlay   responsive={responsive} showArrows={true}   showIndicators={true} showThumbs={false}>
              {uploadedPhoto.photo&&uploadedPhoto.photo.map((image,i)=>{
               return ( 
             
                <img class="img-fluid" src={image} alt="Colorlib Template"/>
             
               )
              })}
                 </Carousel>
                <div  className="d-flex flex-fill">
                    <Link to={'/comment/'+imageId} className="px-5 flex-fill font-weight-bold">
                      <button onClick={()=>this.handleLike(imageId)}  >
                        <ImageFormatter src={likesIcon} alt="like icon"/>
                      </button>
                        <span className='px-2'>45</span>
                        like
                    </Link>
                    <Link to={'/comment/'+imageId} className="px-5 flex-fill font-weight-bold text-dark">
                      <ImageFormatter src={commentIcon} alt="comment icon" />
                      {" "+this.state.totalComment+" "}
                      comment
                    </Link>
                    <Link  to={'/chat/'+imageId} className="px-5 flex-fill font-weight-bold text-dark">
                       <ImageFormatter src={messageIcon} alt="chat icon" /> send message
                    </Link>
              </div>
                {  comments ?<div>
                                  {/* {console.log('comments',comments)}
                                  {console.log('ggggg',comments.length)} */}
                                 <CommentList comments={comments}  imageId={ imageId} total={this.state.totalComment}/>
                                 <CommentForm profile={ profile } imageId={ imageId}/>
                            </div>
                            :<p>Loading comments</p>}
              </div>
              <div className='col-lg-3 col-sm-0'></div>
            </div>
               );}
           else {
            return (
              <div className="container center">
                <p>Loading photos...</p>
              </div>
            )
          }  
      }
      else {
         return (
           <div className="container center">
             <p>Loading photo and comments...</p>
           </div>
         )
       }     
    }
 }
  
 const mapStateToProps=(state,ownProps)=>{
   const id=ownProps.match.params.id;
   const commentss=state.firestore.data.sellerUpload;
   const comment=commentss?commentss[id]:null
   return{
     imageId:id,
      uploadedPhoto:comment,
      auth:state.firebase.auth,
     comments:state.firestore.ordered.comments,
     profile:state.firebase.profile
   }
 }
 const mapDispatchToProps=(dispatch)=>{
  return{
      addLike:(like)=>dispatch(addLike(like))
  }
}
 export default compose(
    connect(mapStateToProps,mapDispatchToProps),
   firestoreConnect([
      {collection:'sellerUpload'},
      {collection:'comments',orderBy: ['createdAt','asc']}
   ]))(commentBox);
