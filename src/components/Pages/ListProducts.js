import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import bg_1 from '../../images/bg_1.jpg';
import product_1 from '../../images/product_1.jpg'
import '../style.css'
import CommentForm from '../comment/commentForm';
import CommentList from '../comment/commentList';
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
    x:window.innerWidth,
    showComent:''
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
  const {seller,location,southWest,northEast,profile,comments}=this.props
  let flag=0
  
  const limiter=3
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
 
{seller&&comments&&seller.map((list,index)=>{
  console.log(northEast,southWest)
  flag=0
  if(northEast&&southWest)
        {if((list.lat>northEast.lat || list.lat<southWest.lat)||(list.lng>northEast.lng || list.lng<southWest.lng))
        {
          flag=1
        }else{
          counter.push(list)
        }}
   if(this.props.like){
    // console.log('like lllllllllll',props.like)
   let LikedProduct=this.props.like.filter((item)=>item.userId===this.props.auth.uid && item.likedProuductId===list.id)
      if(LikedProduct.length!==0)
    {

      Likeflag.push(1)
      LikedProduct.map((Element)=>{
        IdFetch.push(Element.id)
      })
      
    }
    else{
      Likeflag.push (0)
      IdFetch.push(0)
    }
  
      
      if(flag===1){
        return(<></>)
      }
      else if (index%2===0 || this.state.x<=800){
        console.log(innerWidth,'the width',index)
        return(
      < div class="container pt-4" style={{minHeight:'400px', border:'solid',borderColor:'white',borderBottomColor:'gray'}}>
       <div class="row border" >
      <div class="col-md-6 col-lg-6 ">
       <Carousel  autoPlay   responsive={responsive} showArrows={true}  infinite="true"  showIndicators={true} showThumbs={false}>
              {list.photo&&list.photo.map((image,i)=>{
                // console.log('the image isFinite',image)
               return ( 
                
                <img class="img-fluid" src={image} alt="Colorlib Template"/>
             
               )
              })}
                 </Carousel>
             
                   </div>
                      <div class="col-md-6 col-lg-4" >
                      <div class="product"  style={{border:'0'}}>
                      {innerWidth<=768?<div class='row'>
        
        <div class="col-md-12 col-sm-12 col-lg-12">
        <h3 style={{color:'#000',fontFamily:'poppins,Arial,sans-serif',lineHeight:'1.5', fontweight:'400'}}>{list.businessName}</h3>      
        </div>
        <div class="col-md-4 col-sm-4 col-lg-6">
        <Link to="/mapbuyer"   ><i  class="ion-ios-map pr-2"/><span style={{color:'#000',fontFamily:'poppins,Arial,sans-serif',lineHeight:'1.5', fontweight:'30'}}>{list.marketName}</span></Link>
        </div>
        <div class="col-md-4 col-sm-4  col-lg-4">
        <span>Price:${list.price}</span>
        </div>
      
        </div>:<><div>
          <h3 style={{color:'#82ae46',fontFamily:'poppins,Arial,sans-serif',lineHeight:'1.5', fontweight:'400'}}>{list.businessName}</h3>
        <span style={{color:'#000',fontFamily:'poppins,Arial,sans-serif',lineHeight:'1.5', fontweight:'30'}}>Catagory:{list.catagory}</span>
        <Link to="/mapbuyer"   class="nav-link"><i  class="ion-ios-map pr-2"/><span style={{color:'#000',fontFamily:'poppins,Arial,sans-serif',lineHeight:'1.5', fontweight:'30'}}>{list.marketName}</span></Link>
          <span style={{color:'#000',fontSize:'18px',fontFamily:'poppins,Arial,sans-serif',lineHeight:'1.5',fontweight:'90'}}>
    Product Description </span>
        <p style={{fontSize:'15px',fontFamily:'poppins,Arial,sans-serif'}}>{list.discription}</p>
            </div>
            <p><span>Price:${list.price}</span></p></>}

        
       <div class="text py-3 pb-4 px-3 text-center">
                  
               
                 <div class="m-auto d-flex">
                          {/* {props.totalLike} */}
                              <button 
                              onClick={()=>this.handleCheckLike(index,list.id,Likeflag,IdFetch)}
                               className=" p-0 heart border d-flex justify-content-center align-items-center mr-3 " 
                               style={{backgroundColor:'white',border:'none'}}  >
                                 {Likeflag[index]? <img src={LikeIcon} alt='likeIcon'width={30} />:<span><i  style={{fontSize:'200%',color:'#82ae46'}}  
                                 class="ion-ios-heart"></i></span>
                                }
                              
                             </button>
                              <div class="heart d-flex justify-content-center align-items-center  pr-3 " onClick={()=>{if(this.state.showComent!==list.id){this.setState({showComent:list.id})} else{this.setState({showComent:''})}}}>
                            <span><i  style={{fontSize:'200%',color:'#82ae46'}}  class="ion-ios-mail"></i></span>
                              </div>
                              
                              <div onClick={()=>{window.location.reload(false);}}>
                        <Link to={'/chat:' + list.id} class="heart d-flex justify-content-center align-items-center  pr-3 ">
                        <span><i  style={{fontSize:'200%',color:'#82ae46'}}  class="ion-ios-chatbubbles"></i></span>
                        </Link>
                        </div>
                              <div class="dropdown dropright">
                              <a href="#"  class=" dropdown-toggle mt-5 " id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" class="buy-now d-flex justify-content-center align-items-center mx-1 pr-3">
                              <span><i   style={{fontSize:'200%',color:'#82ae46'}} class="ion-md-share"></i></span>
                              </a>
                              <div class="dropdown-menu" aria-labelledby="dropdownMenuLink" >
                                <a class="dropdown-item" href={twitterUrl} target="_blank"> <TwitterIcon size={32} round={true}/>Twitter </a> 
                                <a class="dropdown-item"  href={facebookUrl} target="_blank"> <FacebookIcon size={32} round={true}   />FaceBook</a> 
                                <a class="dropdown-item" href={telegramUrl} target="_blank"><TelegramIcon size={32} round={true}  />Telegram</a>
                                <a class="dropdown-item" href={whatsupUrl} target="_blank"><WhatsappIcon size={32} round={true}  />Whatsapp</a>
                             </div>
                             </div>
                              </div>
                              {console.log(comments.filter(comment=>comment.imageId===this.state.showComent)[comments.filter(comment=>comment.imageId===this.state.showComent).length-1],comments.filter(comment=>comment.imageId===this.state.showComent)[comments.filter(comment=>comment.imageId===this.state.showComent).length-2],comments.filter(comment=>comment.imageId===this.state.showComent)[comments.filter(comment=>comment.imageId===this.state.showComent).length-3],'the comments',limiter)
                              
                              }
                              
                              {this.state.showComent===list.id?<>
                              {comments.filter(comment=>comment.imageId===this.state.showComent).length<=3?<CommentList profile={profile} comments={comments}  imageId={list.id} />:<CommentList profile={profile} comments={[comments.filter(comment=>comment.imageId===this.state.showComent)[comments.filter(comment=>comment.imageId===this.state.showComent).length-3],comments.filter(comment=>comment.imageId===this.state.showComent)[comments.filter(comment=>comment.imageId===this.state.showComent).length-2],comments.filter(comment=>comment.imageId===this.state.showComent)[comments.filter(comment=>comment.imageId===this.state.showComent).length-1]]}  imageId={list.id} />}
                              <CommentForm profile={ profile } imageId={list.id}/>
                              <div onClick={()=>{window.location.reload(false);}}>
                          <Link to={'/comment:' + list.id} class="heart d-flex justify-content-center align-items-center  pr-3 pt-3">
                            <span>Show More</span>
                              </Link></div></>:null}
                
                      </div>
                      </div>
                      </div>
                      </div>
         </ div>
        )}else{
          console.log(innerWidth,'the width part 2',index)
   return(
    < div class="container pt-4 " style={{minHeight:'400px', border:'solid',borderColor:'white',borderBottomColor:'gray'}}>
     <div class="row" >
     <div class="col-md-6 col-lg-4 " >
       <div class="product pl-3"  style={{border:'0'}}>
       <div>
         </div>
         {<><div>
          <h3 style={{color:'#82ae46',fontFamily:'poppins,Arial,sans-serif',lineHeight:'1.5', fontweight:'400'}}>{list.businessName}</h3>
        <span style={{color:'#000',fontFamily:'poppins,Arial,sans-serif',lineHeight:'1.5', fontweight:'30'}}>Catagory:{list.catagory}</span>
        <Link to="/mapbuyer"   class="nav-link"><i  class="ion-ios-map pr-2"/><span style={{color:'#000',fontFamily:'poppins,Arial,sans-serif',lineHeight:'1.5', fontweight:'30'}}>{list.marketName}</span></Link>
          <span style={{color:'#000',fontSize:'18px',fontFamily:'poppins,Arial,sans-serif',lineHeight:'1.5',fontweight:'90'}}>
    Product Description </span>
        <p style={{fontSize:'15px',fontFamily:'poppins,Arial,sans-serif'}}>{list.discription}</p>
            </div>
            <p><span>Price:${list.price}</span></p></>}

                <div>
           <div class="m-auto d-flex">
                          
                              <button 
                              onClick={()=>this.handleCheckLike(index,list.id,Likeflag,IdFetch)}
                               className=" p-0 heart border d-flex justify-content-center align-items-center mr-3 " 
                               style={{backgroundColor:'white',border:'none'}}  >
                                 {Likeflag[index]? <img src={LikeIcon} alt='likeIcon'width={30} />:<span><i  style={{fontSize:'200%',color:'#82ae46'}}  class="ion-ios-heart"></i></span>
                                }
                              
                             </button>
                             <div class="heart d-flex justify-content-center align-items-center  pr-3 " onClick={()=>{if(this.state.showComent!==list.id){this.setState({showComent:list.id})} else{this.setState({showComent:''})}}}>
                            <span><i  style={{fontSize:'200%',color:'#82ae46'}}  class="ion-ios-mail"></i></span>
                              </div>
                        <div onClick={()=>{window.location.reload(false);}}>
                        <Link to={'/chat:' + list.id} class="heart d-flex justify-content-center align-items-center  pr-3 ">
                        <span><i  style={{fontSize:'200%',color:'#82ae46'}}  class="ion-ios-chatbubbles"></i></span>
                        </Link>
                        </div>
                        <div class="dropdown dropright">
                              <a href="#"  class=" dropdown-toggle mt-5 " id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" class="buy-now d-flex justify-content-center align-items-center mx-1 pr-3">
                              <span><i   style={{fontSize:'200%',color:'#82ae46'}} class="ion-md-share"></i></span>
                              </a>
                              <div class="dropdown-menu" aria-labelledby="dropdownMenuLink" >
                                <a class="dropdown-item" href={twitterUrl} target="_blank"> <TwitterIcon size={32} round={true}/>Twitter </a> 
                                <a class="dropdown-item"  href={facebookUrl} target="_blank"> <FacebookIcon size={32} round={true}   />FaceBook</a> 
                                <a class="dropdown-item" href={telegramUrl} target="_blank"><TelegramIcon size={32} round={true}  />Telegram</a>
                                <a class="dropdown-item" href={whatsupUrl} target="_blank"><WhatsappIcon size={32} round={true}  />Whatsapp</a>
                             </div>
                             </div>
                        </div>
                        {this.state.showComent===list.id?<>
                          {comments.filter(comment=>comment.imageId===this.state.showComent).length<=3?<CommentList profile={profile} comments={comments}  imageId={list.id} />:<CommentList profile={profile} comments={[comments.filter(comment=>comment.imageId===this.state.showComent)[comments.filter(comment=>comment.imageId===this.state.showComent).length-3],comments.filter(comment=>comment.imageId===this.state.showComent)[comments.filter(comment=>comment.imageId===this.state.showComent).length-2],comments.filter(comment=>comment.imageId===this.state.showComent)[comments.filter(comment=>comment.imageId===this.state.showComent).length-1]]}  imageId={list.id} />}
                              
                        <CommentForm profile={ profile } imageId={list.id}/>
                        <div onClick={()=>{window.location.reload(false);}}>
                          <Link to={'/comment:' + list.id} class="heart d-flex justify-content-center align-items-center  pr-3 pt-3">
                            <span>Show More</span>
                              </Link></div></>:null}
                        </div>
                </div>
         </div>
  <div class="col-md-6 col-lg-6">
          <Carousel autoPlay   infiniteLoop responsive={responsive} showArrows={true} infinite="true"  showThumbs={false}  dotColor={'red'} swipeable style={{backgroundColor:'red'}}
          renderDotsOutside={true}>
               {list.photo&&list.photo.map((image,i)=>{
               return ( 
            <img class="img-fluid"  src={image} alt="Colorlib Template"/>
              )
              })}
                 </Carousel>
       </div>
      </div>
  </ div>
      )
        }

  } })}
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
    comments:state.firestore.ordered.comments,
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
  {collection:'comments',orderBy: ['createdAt','asc']},
  {collection:'setMarket',orderedBy:['time','desc']}
]))(ListProducts);
