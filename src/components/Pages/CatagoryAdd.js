import React, { Component } from 'react'
import {connect} from 'react-redux';
import {Link} from 'react-router-dom'
import {compose} from 'redux'
import {getcatagory} from '../../store/actions/getcatagoryAction';
import { firestoreConnect } from 'react-redux-firebase'
import Navbar from '../layout/Navbar';

import Listcatgory from './LIstcatagory'
class CatagoryAdd extends Component {
    state={
        catagory:'',
        status:''
    }
    handelChange=(e)=>{
      this.setState({
        [e.target.name]:e.target.value,
        })
    }
    handleSubmit=(e)=>{
      e.preventDefault();
      if (this.props.catagory.filter(list=>list.catagory===this.props.catagory.catagory).length!==0)
     {
      this.setState({
        status:"catagory already exists ",
        })
      }
      this.props.getcatagory(this.state)
      this.setState({
        status:"catagory added ",
        })
    }
    render() {
        return (
         <div>
             <Navbar/>
 <section class="ftco-section contact-section bg-light">
<div class="container py-5">
 <div class="row">
<div class="col-md-10 mx-auto bg-white" >

<form  class="bg-white p-3 contact-form" onSubmit={this.handleSubmit}>
<p>Add Catagory</p>
<p style={{color:' rgb(130, 174, 70)'}}>{this.state.status}</p>
<div class="form-group row ml-2" >
   <div class="col-sm-5">
  <input type="text" class="form-control"  name='catagory' onChange ={this.handelChange} 
   placeholder="Add Catagory" display='inline-block' />
</div>
 <button class="search-button"onClick={this.handleSubmit}>Add</button>
</div>
</form>
<Listcatgory/>
       </div> 
       </div>
       </div>
       </section>    
        </div>
        
        )
    }
}
const mapDispatchToProps=(dispatch)=>{
 
    return {
      getcatagory :(catagory)=>dispatch(getcatagory(catagory))
    }
}
  export default compose(connect(null,mapDispatchToProps),  firestoreConnect([
    {collection:'sellerUpload'}
  ]))(CatagoryAdd);