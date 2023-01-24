import bg_1 from '../../images/bg_1.jpg'
import bg_2 from '../../images/bg_2.jpg'
import {Input} from 'antd'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import  {Link} from 'react-router-dom'
import Navbar from '../layout/Navbar';
import { signIn } from '../../store/actions/authActions'
import{Redirect} from 'react-router-dom'
import 'antd/dist/antd.css'; 
// import './signin.css'
class SignIn extends Component {
  state = {
    email: '',
    password: ''
  }
  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.signIn(this.state)
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
  
<form action="#" class="bg-white p-5 contact-form"   onSubmit={this.handleSubmit}>
<h1>Log In </h1>
<div class="form-group col-md-13  d-flex pl-0" style={{marginTop:'70px'}}>
<input type="text"class="form-control" id="email" placeholder="Email" onChange={this.handleChange}/>
</div>

<Input.Password className="psw-input" id="password" placeholder="input password" style={{height:'40px',marginBottom:'20px'}}onChange={this.handleChange}/>
<Link to='/signinphone'>Sign in with phone number</Link>
<div class="form-group ">
<input style={{marginTop:'10px',marginBottom:'20px' , marginLeft:'100px'}}type="submit" value="Sign In" class="btn btn-primary py-3 px-5"/>
</div>
<Link to='/forgotpsw'> Forgot Password?</Link>
        <div className="center" style={{color:'red'}}>
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
    signIn: (creds) => dispatch(signIn(creds))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn)