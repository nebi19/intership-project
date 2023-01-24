import React, { Component } from 'react'
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom'
import Navbar from '../layout/Navbar';
import {signUp} from '../../store/actions/authActions'
import  {Link} from 'react-router-dom'
import {Input} from 'antd'
import 'antd/dist/antd.css';
class SignUpBuyer extends Component {
  state={
      email:'',
      password:'',
      name:'',
      PhoneNum:'',
      AlternateNum:'',
      userType:'seller',
      
  }
  
 
  handelChange=(e)=>{
     this.setState({
         [e.target.id]:e.target.value
     })
  }
  handelSubmit=(e)=>{
      e.preventDefault();
      
     console.log('hello')
        this.props.signUp(this.state)
      
      
      
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
<h2 style={{textAlign:'center'}}> Register my account as a Seller</h2>
</div>
<div class="form-group">
<input type="text" id="name" class="form-control" placeholder="User Name" onChange={this.handelChange} required/>
</div>
<div class="form-group" >
<Input.Password id="password"  className="psw-input" placeholder="Password" onChange={this.handelChange} required/>
</div>
<div class="form-group">
<input type="text" id="email"  class="form-control" placeholder="Email" onChange={this.handelChange}required/>
</div>
<div class="form-group">
<input type="text" id="PhoneNum"  class="form-control" placeholder="Phone number" onChange={this.handelChange} required/>
</div>
<div class="form-group">
<input type="text" id="AlternateNum" class="form-control" placeholder="Alternate Phone number" onChange={this.handelChange}/>
</div>
<div class="form-group">
 
      <textarea style={{backgroundColor:'#fff' , width:'100%'}} rows="3" disabled>       Terms and conditions                                                                                                                                        Sint ut laborum nostrud commodo. Aute ea culpa mollit do excepteur reprehenderit cupidatat cillum reprehenderit culpa nulla. Exercitation duis dolore nulla velit culpa consequat incididunt est proident culpa incididunt id fugiat nulla. Consequat dolor aliqua eiusmod voluptate. Occaecat qui consequat dolor aliqua labore esse. Occaecat ipsum ullamco officia deserunt ad eiusmod. Adipisicing incididunt dolore non sunt eu culpa.
        Sint ut laborum nostrud commodo. Aute ea culpa mollit do excepteur reprehenderit cupidatat cillum reprehenderit culpa nulla. Exercitation duis dolore nulla velit culpa consequat incididunt est proident culpa incididunt id fugiat nulla. Consequat dolor aliqua eiusmod voluptate. Occaecat qui consequat dolor aliqua labore esse. Occaecat ipsum ullamco officia deserunt ad eiusmod. Adipisicing incididunt dolore non sunt eu culpa.
        Sint ut laborum nostrud commodo. Aute ea culpa mollit do excepteur reprehenderit cupidatat cillum reprehenderit culpa nulla. Exercitation duis dolore nulla velit culpa consequat incididunt est proident culpa incididunt id fugiat nulla. Consequat dolor aliqua eiusmod voluptate. Occaecat qui consequat dolor aliqua labore esse. Occaecat ipsum ullamco officia deserunt ad eiusmod. Adipisicing incididunt dolore non sunt eu culpa.
        </textarea>
        </div>
        <div class="form-group">     
      <input style={{marginTop:'10px'}}  type="checkbox" name="vehicle1" value="Bike"  required/> I agree with terms and Conditions
        
      </div>
    <div style={{color:'red'}}>
      {authError}
      {console.log(authError)}
    </div>
    <Link to='/signupphoneS'>Register with phone number</Link>
<div class="form-group">
<button style={{marginLeft:'100px',marginTop:'20px'}}  class="btn btn-primary py-3 px-5">Register</button>
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
    
      signUp:(newUser)=>dispatch(signUp(newUser))
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(SignUpBuyer)

