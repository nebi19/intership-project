import React from 'react'
import {connect} from 'react-redux';
import {Link}  from 'react-router-dom';
 function Footer(props) {
    const {auth,profile,id}=props
    return (
        <div>
<footer class="ftco-footer ftco-section" style={{marginTop:'30px'}}>
<div class="container">
<div class="row">
<div class="mouse">
<a href="#" class="mouse-icon">
<div class="mouse-wheel"><span class="ion-ios-arrow-up"></span></div>
</a>
</div>
</div>
<div class="row mb-5">
<div class="col-md">
<div class="ftco-footer-widget mb-4">
<h2 class="ftco-heading-2">Sokoleo</h2>
<p>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia.</p>
<ul class="ftco-footer-social list-unstyled float-md-left float-lft mt-5">

</ul>
</div>
</div>
<div class="col-md" style={{marginLeft:'15%'}}>
<div class="ftco-footer-widget mb-4 ml-md-5">
<h2 class="ftco-heading-2">Menu</h2>
<ul class="list-unstyled">
<li><Link to="/products" class="py-2 d-block">Products</Link></li>
<li><Link to="/aboutus"class="py-2 d-block">About Us</Link></li>
<li><Link to="/contactus" class="py-2 d-block">Contact Us</Link></li>
</ul>
</div>
</div>
<div class="col-md-4">
    
{!auth.uid? <div class="ftco-footer-widget mb-4">
<h2 class="ftco-heading-2">About Sokoleo</h2>
<p>louremlouremvlouremlouremlourem
<br/>louremlouremvlouremlouremlourem</p>
</div>:null}
</div>


</div>
</div>
</footer>
        </div>
    )
}
const mapStateToProps = (state) => {
    console.log(state);
    return{
      auth: state.firebase.auth,
      profile:state.firebase.profile
    }
  }


export default connect(mapStateToProps,null)(Footer);
