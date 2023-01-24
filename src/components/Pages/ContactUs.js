import React, { Component } from 'react'
import {connect} from 'react-redux';
import {Link} from 'react-router-dom'
import bg from '../../images/bg.jpg';
import {compose} from 'redux'
import Navbar from '../layout/Navbar';
import {getcontactmessage} from '../../store/actions/ContactUsAction';
import { firestoreConnect } from 'react-redux-firebase'
class  ContactUs extends Component {
  state={
    email:'',
    subject:'',
    name:'',
    message:'',
    status:''
  }
  handelChange=(e)=>{
    this.setState({
      [e.target.name]:e.target.value,
      })
  }
  handleSubmit=(e)=>{
    e.preventDefault();
    this.props.getcontactmessage(this.state)
    this.setState({
      status:"Thank you for contacting Us",
      })
  }
  render(){
    
    return (
  <div>
<Navbar/>
<div class="hero-wrap hero-bread"  style ={{ backgroundImage:`url(${bg})`,height:'60px',viewPort:'0 0 500 50'}}>
<div class="container">
<div class="row no-gutters slider-text align-items-center justify-content-center">
<div class="col-md-9  text-center fadeInUp ">
<p class="breadcrumbs"><span class="mr-2"><Link to="/">Home</Link></span> <span>Contact us</span></p>
<h1 class="mb-0 bread">Contact us</h1>
</div>
</div>
</div>
</div>
<section class="ftco-section bg-light">
<div class="container">
<div class="row no-gutters ftco-services">
<div class="col-lg-4 text-center d-flex align-self-stretch ftco">
<div class="media block-6 services mb-md-0 mb-4">
<div class="icon ios-pin d-flex
 justify-content-center align-items-center mb-2" style={{backgroundColor:' rgb(130, 174, 70)'}}>
  <span><i style={{fontSize:'75%',color:'white'}} class="ion-ios-pin"></i></span>
</div>
<div class="media-body">
<h3 class="heading">ADDRESS</h3>
<span  class="p-5 line">Sokoleo</span>
<br/>
<span  class="p-5 line">6950 s.jordan road</span>
<br/>
<span  class="p-5 line">centenniel,CO 80112</span>
</div>
</div>
</div>
<div class="col-lg-4 text-center d-flex align-self-stretch ftco">
<div class="media block-6 services mb-md-0 mb-4">
<div class="icon ios-pin d-flex
 justify-content-center align-items-center mb-2" style={{backgroundColor:' rgb(130, 174, 70)'}}>
  <span><i style={{fontSize:'75%',color:'white'}} class="ion-ios-phone-portrait"></i></span>
</div>
<div class="media-body">
<h3 class="heading">Phone</h3>
<span  class="p-5 line">sokoleo Group contracting</span>
<br/>
<span  class="p-5 line">300-245-6970</span>
<br/>

</div>
</div>
</div>
<div class="col-lg-4 text-center d-flex align-self-stretch ftco">
<div class="media block-6 services mb-md-0 mb-4">
<div class="icon ios-pin d-flex
 justify-content-center align-items-center mb-2" style={{backgroundColor:' rgb(130, 174, 70)'}}>
  <span><i style={{fontSize:'75%',color:'white'}}  class="ion-ios-mail"></i></span>
</div>
<div class="media-body">
<h3 class="heading">Email</h3>
<span  class="p-5 line">Request for sokoleo</span>
<br/>
<span  class="p-5 line">info@sokoleo.com</span>
</div>
</div>
</div>
</div>
</div>
</section>
<section class="ftco-section testimony-section">
<div class="container">
<div class="row justify-content-center mb-5 pb-3">
<div class="col-md-7 heading-section  text-center">
<p style={{fontSize:'30px'}}>Feel free to drop us a line below!</p>
    <p style={{color:' rgb(130, 174, 70)'}}>{this.state.status}</p>
<form  class="bg-white p-5 contact-form" onSubmit={this.handleSubmit}>
<div class="form-group">
<input type="text" name="name" onChange={this.handelChange} class="form-control" placeholder="Your Name"/>
</div>
<div class="form-group">
<input type="text" name="email" onChange={this.handelChange}  class="form-control" placeholder="Your Email"/>
</div>
<div class="form-group">
<input type="text"name="subject" onChange={this.handelChange}  class="form-control" placeholder="Subject"/>
</div>
<div class="form-group">
<textarea  name="message"cols="30" onChange={this.handelChange} rows="7" class="form-control" placeholder="Message"></textarea>
</div>
<div class="form-group">
<input type="submit" value="Send Message" class="btn btn-primary py-3 px-5"/>
</div>
</form>
</div>
</div>
</div>
</section>


  </div>
    )
  }
}
const mapStateToProps=(state,ownProps)=>{
    console.log("prod",state);
    const id=ownProps.match.params.id;
    const  sellerDetails=state.firestore.data.sellerUpload
  const sellerDetail=sellerDetails ? sellerDetails[id]:null
    return {
      sellerDetails:sellerDetail
    }
  }
  const mapDispatchToProps=(dispatch)=>{
 
    return {
      getcontactmessage :(message)=>dispatch(getcontactmessage(message))
    }
}
  export default compose(connect(mapStateToProps,mapDispatchToProps),  firestoreConnect([
    {collection:'sellerUpload'}
  ]))(ContactUs);