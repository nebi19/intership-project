import React from 'react'
import Navbar from './components/layout/Navbar';
import {Link} from 'react-router-dom'
export default function Nomatch() {
    return (
        <div>
            <Navbar/>
           {/* <img src={PageNotFound}  /> */}
            <p style={{textAlign:"center",paddingLeft:'2%'}}>
            <h4>We are sorry but the page you are looking for does not exist</h4>
              <Link to="/">Go to Home </Link>
           
            </p>
        </div>
    )
}
