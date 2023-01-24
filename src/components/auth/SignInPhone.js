import bg_1 from '../../images/bg_1.jpg'
import bg_2 from '../../images/bg_2.jpg'
import {Input} from 'antd'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import  {Link} from 'react-router-dom'
import Navbar from '../layout/Navbar';
import { signInPhone } from '../../store/actions/authActions'
import{Redirect} from 'react-router-dom'
import 'antd/dist/antd.css'; 
// import './signin.css'
class SignInPhone extends Component {
  state = {
    phoneVerify:'',
    PhoneNum:'',
  }
  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }
  handleSubmit = (e) => {
    e.preventDefault();
    let phonen=this.state.PhoneNum
    this.setState({phoneVerify:''})
    if(this.state.PhoneNum[0]!=='+' )
    {
      this.setState({phoneVerify:'phone number not recognized, please use the form +*******'})
    //   if(this.state.PhoneNum.length===9 || this.state.PhoneNum.length===10)
    //   {
    //     if(this.state.PhoneNum.length===9)
    //     { phonen=this.state.Extention+this.state.PhoneNum}
    //   else if(this.state.PhoneNum[0]==='0' ){
    //     phonen=this.state.Extention
    //     for(let i=1;i<this.state.PhoneNum.length;i++)
    //     {
    //       phonen=phonen+this.state.PhoneNum[i]
    //       console.log('the num',phonen)
    //     }
    //   }
    //   else
    //   {
    //     this.setState({phoneVerify:'phone number not recognized'})
    //     return
    //   }
    // }
    //   else
    //   {
    //     this.setState({phoneVerify:'phone number not recognized'})
    //     return
    //   }
    //   this.setState({
    //   PhoneNum:phonen
    // })
  }
  
    
    console.log('the phone',phonen)
    this.props.signInPhone({PhoneNum:phonen})
  }
  render() {
    const { authError,auth } = this.props;
    if(auth.uid) return<Redirect to='/products'/>
    return (
 <div>
   <Navbar/>
     <section class="ftco-section contact-section bg-light">
<div class="container">

<div class="row block-9">
  
<div class="col-md-6 order-md-last d-flex " >
<form action="#" class="bg-white p-5 contact-form"  style={{height:'400px'}} onSubmit={this.handleSubmit}>
<div class="form-group col-md-13  d-flex pl-0" style={{marginTop:'70px'}}>
<input type="text"class="form-control" id="PhoneNum" placeholder="Phone number(+....)" onChange={this.handleChange}/>
</div>
<div id="recaptcha-container"></div>
    <div style={{color:'red'}}>{this.state.phoneVerify}</div>
<div class="form-group ">
<input style={{marginTop:'10px',marginBottom:'20px' , marginLeft:'100px'}}type="submit" value="Sign In" class="btn btn-primary py-3 px-5"/>
</div>
<Link to='/forgotpsw'> Forgot Password?</Link>
        <div className="center ">
              { authError ? <p>{authError}</p> : null }
            </div>
</form>

</div>

{/* <div class="col-md-6 order-md-last d-flex" >
  <div class="home-slider owl-carousel" >
                    <div class="slider-item" style={{backgroundImage: `url(${bg_1})`}} >                    
                           </div>
                <div class="slider-item" style={{backgroundImage: `url(${bg_2})`}}>
                   
                    </div>
   </div>

  </div> */}
</div>
</div>
</section>

</div>
)
}
}
const mapStateToProps = (state) => {
  return{
    authError: state.auth.authError,
    auth:state.firebase.auth
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    signInPhone: (creds) => dispatch(signInPhone(creds))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignInPhone)