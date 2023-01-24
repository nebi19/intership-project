import React from 'react'
import {Link} from 'react-router-dom'
import bg_1 from '../../images/bg_1.jpg';
import AboveNavbar from './AboveNavbar';
import { connect } from 'react-redux'
import SignedIn from './SignedIn'
import SignedOut from './SignedOut'
const Navbar = (props) => {

    
  const { auth } = props;  
  const links=auth.uid?<SignedIn />:<SignedOut/>
  return(
    <div>
      {links}
    </div>
  )

}
const mapStateToProps = (state) => {
  console.log(state);
  return{
    auth: state.firebase.auth,
  }
}

export default connect(mapStateToProps)(Navbar)
