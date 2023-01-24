import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import bg_1 from '../../images/bg_1.jpg';
import product_1 from '../../images/product_1.jpg'
import '../style.css'
import React, { Component } from 'react'
import {compose} from 'redux'
import { firestoreConnect } from 'react-redux-firebase'
import {connect} from 'react-redux';
import  {Link} from 'react-router-dom'
import {addLike} from '../../store/actions/AddLikesaction'
import {removeLike} from '../../store/actions/AddLikesaction'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import LikeIcon from '../../images/like_filled_100px.png'
import {
  FacebookShareButton,FacebookShareCount, FacebookIcon,TelegramIcon,
  WhatsappIcon,
  TwitterIcon} from 'react-share';
 
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

class  ListProducts extends Component {
  state={
    x:window.innerWidth
  }
  handleCheckLike=(index,listID,Likeflag,IdFetch)=>{
    if(Likeflag[index]===0){
      this.props.addLike(listID);
    }else{
      this.props.removeLike(IdFetch[index]);
    }

  }
  onresize=()=>{
  this.setState({
    x:window.innerWidth
  })

  }
  render(){
    const {innerWidth}=window
    window.addEventListener("resize", this.onresize);
    console.log(this.state.x,'the width')
  const {seller,location,southWest,northEast}=this.props
  let flag=0
  let isLiked=false;
  let counter=[]
  let Init=0
  let Likeflag=[]
  let IdFetch=[]
  let url = window.location.href;
  const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
   const twitterUrl = `https://twitter.com/sharer/sharer.php?u=${url}`;
  const linkedinUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${url}`;
  const telegramUrl=`https://telegram.me/share/url?url=${url}`
  const whatsupUrl=`whatsapp://send?text=${url}`
  let shareUrl='https://www.facebook.com/'
  return(
    <div>
 

   
  
      
     
        
      < div class="container pt-4" style={{minHeight:'400px', border:'solid',borderColor:'white',borderBottomColor:'gray'}}>
       <div class="row" >
      <div class="col-md-6 col-lg-6 ">
       
             
                   </div>
                      <div class="col-md-6 col-lg-4" >
                      <div class="product"  style={{border:'0'}}>
      <div class='row'>
        <div class="col-md-12 col-sm-12 col-lg-12">
           the name   
        </div>
        <div class="col-md-4 col-sm-4 col-lg-6">
    the location
        </div>
        <div class="col-md-4 col-sm-4  col-lg-4">
the price
        </div>
      
        </div>
       
       <div class="text py-3 pb-4 px-3 text-center">
                  
               
                 <div class="m-auto d-flex">
                          {/* {props.totalLike} */}
                            
                              </div>
                
                      </div>
                      </div>
                      </div>
                      </div>
         </ div>
       

   
  {counter.length===0?<h2 style={{textAlign:'center'}}>Product not found</h2>:null}
   </div>
    )

}
}
const mapStateToProps=(state)=>{
  
  return {
    location:state.firestore.ordered.sellerLocation,
    authError: state.auth.authError,
    auth:state.firebase.auth,
    Market:state.firestore.ordered.setMarket,
    profile:state.firebase.profile,
    like:state.firestore.ordered.like
}
}
const mapDispatchToProps=(dispatch)=>{
  return{
      addLike:(like)=>dispatch(addLike(like)),
      removeLike:(likeRemoveId)=>dispatch(removeLike(likeRemoveId))
  }
}
export default compose(connect(mapStateToProps,mapDispatchToProps),  firestoreConnect([
  {collection:'sellerUpload',orderedBy:['time','desc']},
  {collection:'sellerLocation',orderedBy:['time','desc']},
  {collection:'like'},
  {collection:'setMarket',orderedBy:['time','desc']}
]))(ListProducts);
