import React, { Component } from 'react'
import { connect } from 'react-redux'

 class AboveNavbar extends Component {
    render() {
      const { auth ,profile} = this.props;  
//  console.log("profilecheck",auth.uid)
            
  if (auth.uid)
      {
 return (
 
<div class="py-1" style={{backgroundColor:'#82ae46'}}>
<div class="container" >
<div class="row no-gutters d-flex align-items-start align-items-center px-md-0"  >
<div class="col-lg-12" >
<div class="row d-flex" >
<div class="col-md pr-4 d-flex topper align-items-center" style={{height:'24px'}} >
<div class="icon mr-2 d-flex justify-content-center align-items-center" ><span class="icon-phone2"></span></div>
<span style={{ color:'white',fontFamily:'poppins,Arial,sans-serif',lineHeight:'1.5', fontweight:'30'}}>{profile.PhoneNum}</span>
</div>
<div class="col-md pr-4 d-flex topper align-items-center" style={{height:'24px'}}>
<div class="icon mr-2 d-flex justify-content-center align-items-center"><span class="icon-paper-plane"></span></div>
<span  style={{ color:'white',fontFamily:'poppins,Arial,sans-serif',lineHeight:'1.5', fontweight:'30'}}>

[{profile.name}]</span>
</div>
<div class="col-md-5 pr-4 d-flex topper align-items-center text-lg-right" style={{height:'24px'}}>
<span style={{ color:'white',fontFamily:'poppins,Arial,sans-serif',lineHeight:'1.5', fontweight:'30'}}>we connect Seller and Buyer @sokonileo &amp;</span>
</div>
</div>
</div>
</div>
</div>

 </div>

      )
      }else{
        return (
          <div class="py-1 bg-primary ">
<div class="container">
<div class="row no-gutters d-flex align-items-start align-items-center px-md-0">
<div class="col-lg-12 d-block">
<div class="row d-flex">
<div class="col-md pr-4 d-flex topper align-items-center">
<div class="icon mr-2 d-flex justify-content-center align-items-center"><span class="icon-phone2"></span></div>
<span class="text">{profile.PhoneNum}</span>
</div>
<div class="col-md pr-4 d-flex topper align-items-center">
<div class="icon mr-2 d-flex justify-content-center align-items-center"><span class="icon-paper-plane"></span></div>
<span class="text">
[{profile.name}]</span>
</div>
<div class="col-md-5 pr-4 d-flex topper align-items-center text-lg-right">
<span class="text">we connect Seller and Buyer @sokoleo &amp;</span>
</div>
</div>
</div>
</div>
</div>

 </div>
        )
      }
      
    }
}
const mapStateToProps = (state) => {
  // console.log(state);
  return{
    auth: state.firebase.auth,
    profile:state.firebase.profile
  }
}
export default  connect(mapStateToProps) (AboveNavbar);
