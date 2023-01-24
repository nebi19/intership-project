import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux';
import {signOut} from '../../../store/actions/authActions'
function HeaderComponent(props) {
    const {title, ...otherProps } = props;
    return (
        <div>
            <nav  class="navbar navbar-expand-lg navbar-dark ftco_navbar bg-whiteblack ftco-navbar-light" id="ftco-navbar">
<div class="container">
<Link to="/" class="navbar-brand" style={{color:'#82ae46'}}><i  class="ion-ios-home pr-2"/>Sokoleo</Link>
<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#ftco-nav" aria-controls="ftco-nav" aria-expanded="false" aria-label="Toggle navigation">
<span class="oi oi-menu"></span> Menu</button>
<div class="collapse navbar-collapse" id="ftco-nav">
<ul class="navbar-nav ml-auto">
<li class="nav-item"><Link to="/"onClick={props.signOut}  class="nav-link"><i  class="ion-ios-log-out pr-2"/>Log Out</Link></li>
</ul>
</div>
</div>
</nav>
        </div>
    );
}
const mapDispatchToProps=(dispatch)=>{
    return{
        signOut:()=>dispatch(signOut())
    }
}
export default connect(null,mapDispatchToProps)(HeaderComponent);
