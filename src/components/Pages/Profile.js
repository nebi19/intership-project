import React, { Component } from 'react'
import Carousel from "react-multi-carousel";

import bg_1 from '../../images/bg_1.jpg';
import './Products.css';
import Navbar from '../layout/Navbar';
import {connect} from 'react-redux';
import {compose} from 'redux'
import {removeProduct} from '../../store/actions/SellerUploadAction'
import{Redirect,Link} from 'react-router-dom'
import { firestoreConnect } from 'react-redux-firebase'
import { Avatar, Typography, Button, Col,Card } from 'antd';
const { Title } = Typography;
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
  
class Profile1 extends Component {
  state={
    search:'',
    location:'',
    value:[],
    list:''
  }
  handleRemove=(id)=>{
    console.log(id)
    this.props.removeProduct(id)
  }
  render() {
    const { authError,auth,profile ,seller,id,user} = this.props;
    
    const styles = {
      color:'#000',
      fontFamily:'poppins,Arial,sans-serif',
      lineHeight:'1.5', 
      fontweight:'30',
      fontSize:'18px'
    }
    if(profile.userType==='Admin') return<Redirect to='/admin'/>
    if(profile.userType==='Buyer') return <Redirect to='/editprofile'/>
    if(!auth.uid) return<Redirect to='/'/>  
    return (
   <div>
     <Navbar/>
   <section class="ftco-section contact-section bg-light">
<div class="container py-5">
<div class="row">
 <div class="col-md-10 mx-auto bg-white" >
 <h2 style={styles}  class='pb-2 pt-4 text-center'>Edit your Profile</h2>
           
           <Col style={{ marginBottom: '80px' }} align='center'>
             {console.log('the image is here',user)}
             {user&&user.map((profileUser,index)=>{
               if(profileUser.id===auth.uid){
                 console.log(profileUser.photo===profile.photo,profileUser.photo)
                return <Avatar size={100} icon='user'  src={profileUser.photo}/>
               }
             
           
          })}
             
    <Title style={{ fontSize: '14px', margin: '10px 0' }}>{this.props.profile.name}</Title>
  <Link to='/editprofile'>
  <Button shape='round' style={{backgroundColor:'rgb(130, 174, 70)',color:'white'}}>Edit Your Profile</Button>
  </Link>
  </Col>
  <div class=" bg-light " style={{marginBottom:'2%'}}>
<div class="row no-gutters d-flex align-items-start align-items-center px-md-0">
<div class="col-lg-12 d-block">
<div class="row d-flex">
<div class="col-md pr-4 d-flex topper align-items-center">
<div class="icon mr-2 ml-5 d-flex justify-content-center align-items-center">
  <span style={{fontSize:'15px',color:'black'}}>Your products</span></div>

</div>
{/* <div class="col-md pr-4 d-flex topper align-items-center">
<div class="icon mr-2 d-flex justify-content-center align-items-center"><span></span></div>
<span class="text">
</span>
</div> */}
<div class="col-md-5 m-1 pr-4 d-flex topper align-items-center text-lg-right">
<Link to='/addproducts' class="btn btn-black">Add Products</Link>
</div>
</div>
</div>
</div>
</div>
 {seller &&seller.map((list,index)=>{
   if(list.authId===auth.uid)
  {return(
    <section class="ftco-section">
<div class="container">
<div class="row">

<div class="col-lg-6 mb-5 fadeInUp ftco-animated">
   <Carousel  autoPlay   responsive={responsive} showArrows={true} infinite="true"  showIndicators={true} showThumbs={false}>
          {list.photo&&list.photo.map((image,i)=>{
            console.log(image,'this is here but y???')
           return ( 
           <img class="img-fluid" src={image} alt="Colorlib Template"/>
            
        )
          })}
             </Carousel>
</div>

<div class="col-lg-6 product-details pl-md-5 ftco-animate fadeInUp ftco-animated">
        <h3>{list.businessName}</h3>

<p class="text-left mr-4">
Catagory:<span >{list.catagory}</span>
</p>
<p class="text-left mr-4">

</p>
<p class="text-left">
  marketName :<span >{list.marketName}</span>
</p>

        <p class="price"><span>${list.price}</span></p>
        <p>{list.discription}</p>
<div class="row mt-4">
<div class="col-md-6">
<button onClick={()=>this.handleRemove(list.id)}>remove</button>
</div>
<div class="w-100"></div>
<div class="input-group col-md-6 d-flex mb-3">

</div>
<div class="w-100"></div>
<div class="col-md-12">

</div>
</div>

</div>
</div>
</div>
</section> 
)}
    else{
      return(
      <>
        </>
      )
    }
        })} 

</div>
  </div>
</div>
</section>
                  </div>
      );
  }
}
  
const mapStateToProps=(state,ownProps)=>{

  const id=ownProps.match.params.id;
  const uPhoto=state.firestore.data.sellerUpload;
  const UPhotoS=uPhoto?uPhoto[id]:null;
  console.log(UPhotoS,'ezike tay')
  return{
    sellerId:id,
    seller:state.firestore.ordered.sellerUpload,
    user:state.firestore.ordered.users,
     auth:state.firebase.auth,
    profile:state.firebase.profile
  }

}
const mapDispatchToProps=(dispatch)=>{
  return{
    removeProduct:(Id)=>dispatch(removeProduct(Id))
  }
}
export default compose(connect(mapStateToProps,mapDispatchToProps),
  firestoreConnect([
    {collection:'sellerUpload',orderedBy:['time','desc']},
    {collection:'users',orderedBy:['time','desc']}
  
]))(Profile1);







