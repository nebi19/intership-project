import React from 'react'
import {Link} from 'react-router-dom'
import bg_1 from '../../images/bg_1.jpg';
import AboveNavbar from './AboveNavbar';
const SignedOut = (props) => {
  
    return (
      <div>
<nav  class="navbar navbar-expand-lg navbar-dark ftco_navbar bg-whiteblack ftco-navbar-light" id="ftco-navbar">
<div class="container">
<Link to="/" class="navbar-brand" style={{color:'#82ae46'}} >Sokoleo</Link>
<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#ftco-nav" aria-controls="ftco-nav" aria-expanded="false" aria-label="Toggle navigation">
<span class="oi oi-menu"></span> Menu</button>
<div class="collapse navbar-collapse" id="ftco-nav">
<ul class="navbar-nav ml-auto">
<li class="nav-item"><Link to="/signin" class="nav-link"><i  class="ion-ios-log-in pr-2"/>Log In</Link></li>

<li class="nav-item"><Link to="/contactus" class="nav-link"><i  class="ion-ios-call pr-2"/>Contact us</Link></li>
<li class="nav-item"><Link to="/aboutus" class="nav-link"><i  class="ion-ios-home pr-2"/>About Us</Link></li>
</ul>
</div>
</div>
</nav>  
</div>
    )
}


export default SignedOut;