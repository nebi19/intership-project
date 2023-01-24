import React, { Component } from 'react'
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom'
import {ForgetPsw} from '../../store/actions/authActions'
import bg_1 from '../../images/bg_1.jpg'
import bg_2 from '../../images/bg_2.jpg'
import {Input} from 'antd'
import Navbar from '../layout/Navbar';
import 'antd/dist/antd.css';
class Forgotpsw extends Component {
  state={
      email:'',      
  }
  
 
  handelChange=(e)=>{
     this.setState({
         [e.target.id]:e.target.value
     })
  }
  handelSubmit=(e)=>{
      e.preventDefault();
      
     console.log('hello',this.state)
        this.props.ForgetPsw(this.state.email)
      
      
      
  }
  render() {
      const {auth,authError}=this.props
      if(auth.uid)return<Redirect to='/products'/>
    return (
        <div>
          <Navbar/>
            <section class="ftco-section contact-section bg-light">
<div class="container">
<div class="row block-9">
<div class="col-md-6 order-md-last d-flex">
<form onSubmit={this.handelSubmit} class="bg-white p-5 contact-form" >
<div class="form-group">
<h2 style={{textAlign:'center'}}> Forgot password</h2>
</div>

<div class="form-group">
<input type="text" id="email"  class="form-control" placeholder="Email" onChange={this.handelChange}required/>
</div>
    
<div class="form-group">
<button style={{marginLeft:'100px',marginTop:'20px'}}  class="btn btn-primary py-3 px-5">Reset password</button>
</div>
</form>
</div>


</div>
</div>
</section>
</div>

    )
}}
const mapStateToProps=(state)=>{
  return{
      auth:state.firebase.auth,
      authError:state.auth.authError
  }
}
const mapDispatchToProps=(dispatch)=>{
  return{
    
      ForgetPsw:(email)=>dispatch(ForgetPsw(email))
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(Forgotpsw)

