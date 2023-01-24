import React, { Component } from 'react'
import {connect} from 'react-redux';
import {Avatar} from 'antd'
import { render } from 'react-dom';
class profileComponent  extends Component {
    render(){
    const {profile}=this.props
    console.log(profile)
    return (
        <div>
            <div className="media mb-4" >
                <Avatar size={46}    /> 
                <div className=" media-body   pl-3  ">
                    <p className='m-0'>Admin</p>  
                </div>   
            </div>
            
        </div>
    );
    }
}
const mapStateToProps = (state) => {
    return{
      auth: state.firebase.auth,
      profile:state.firebase.profile
    }
  }
  export default  connect(mapStateToProps) (profileComponent);