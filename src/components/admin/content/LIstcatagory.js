import React, { Component } from 'react'
import './catagory.css';
import {connect} from 'react-redux';
import {compose} from 'redux'
import { firestoreConnect } from 'react-redux-firebase'
import {removecatagory} from '../../../store/actions/removecatagoryAction';
 class Listcatagory extends Component {
  handleclose=(id)=>{
        console.log(id)
    this.props.removecatagory(id);
  }
    render() {
        const {catagory}=this.props
        console.log({catagory})
        return (
            <div>
                <ul class="forul">
                    {catagory&&catagory.map((cat)=>{
                       return  <li class="forli">{cat.catagory}<span class="close" >
                         <button   onClick={()=>this.handleclose(cat.id)}>x</button></span></li>
                    })}
                </ul>
      </div>
        )
    }
}
const mapStateToProps=(state,ownProps)=>{
    return {
      catagory:state.firestore.ordered.catagoryAdd
    }
  }
  const mapDispatchToProps=(dispatch)=>{
 
    return {
      removecatagory :(catagory)=>dispatch(removecatagory(catagory))
    }
}

  export default compose(connect(mapStateToProps,mapDispatchToProps),  firestoreConnect([
    {collection:'catagoryAdd',orderBy: ['catagory']}
  ]))(Listcatagory);
