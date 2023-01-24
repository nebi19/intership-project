import React, { Component } from 'react'
import Carousel from "react-multi-carousel";
import bg_1 from '../../images/bg_1.jpg';
import './Products.css';
import {connect} from 'react-redux';
import {ProductSearch} from '../../store/actions/ProductSearchAction'
import {compose} from 'redux'
import{Redirect} from 'react-router-dom'
import { firestoreConnect } from 'react-redux-firebase'

class ProfileBuyer extends Component {
  state={
    search:'',
    location:'',
    value:[],
    list:''
  }
 
  render() {
    const { authError,auth,profile } = this.props;
   
    
    
    console.log('this is it',(this.state.list===''))    
    if(!auth.uid) return<Redirect to='/'/>
    
    return (
      <div>
        {profile.name}
 </div>
    )
  }
}
const mapStateToProps=(state,ownProps)=>{
  console.log("ma",state)
  const id=ownProps.match.params.id;
  console.log(id)
  return {
    authError: state.auth.authError,
    auth:state.firebase.auth,
    profile:state.firebase.profile
  }
}
const mapDispatchToProps=(dispatch)=>{
  return {
    ProductSearch:(searchvalue)=>dispatch(ProductSearch(searchvalue))
  }
}
export default compose(connect(mapStateToProps,mapDispatchToProps),  firestoreConnect([
  {collection:'sellerUpload',orderedBy:['time','desc']},
  {collection:'sellerLocation',orderedBy:['time','desc']},
]))(ProfileBuyer);







