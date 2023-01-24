import React, { Component } from 'react'
import {connect} from 'react-redux';

import {compose} from 'redux'
import { firestoreConnect } from 'react-redux-firebase'

class Messages extends Component{
    state={
        expanded:[],
      
    }
  expandedText=(index,more)=>{
        if(this.state.expanded.length!==0)
        {
            more=this.state.expanded   
        }
        more[index]=!more[index]
              this.setState({
                expanded:more
              })
      }
  render()
  {
    const {messages}=this.props

    let more=[]
    if(messages){
        for (let i=0;i<messages.length;i++)
        more.push(false)
    }
 return(
        <section class="ftco-section contact-section bg-light">
        <div class="container py-2">
        <div class="row ">
           <div class="col-md-10 mx-auto bg-white" style={{overflowY:'scroll',height:'450px'}} >       
           {messages? messages.length!==0?
           messages.map((item,index)=>
          
    <div class="card mb-3 border-1" style={{boxShadow:'5px 5px 5px #f3f4f5'}}>
        
  <div class="card-body">
           <h6 class="card-title font-weight-bold">{item.subject}</h6>
        <p class="card-text">from:{item.name}</p>
        {/* <div className='d-flex justify-content-between'> */}
       
  <span></span>    {this.state.expanded[index]?<div > {item.message}</div>:null} 
            <button class="btn btn-primary p-0" onClick={()=>this.expandedText(index,more)}> 
                {this.state.expanded[index]?<span>show less</span>:<span>more</span>}
            </button>
   
</div>
</div>


):<p style={{marginLeft:'3%'}}>Check Your internet Connection </p>:<p style={{marginLeft:'3%'}}>Loading... </p>}
</div>
    
  </div>
</div>
</section>
    )
  }
}
const mapStateToProps=(state,ownProps)=>{
    return {
      messages:state.firestore.ordered.contactmessage
    }
  }

    export default compose(connect(mapStateToProps,null),  firestoreConnect([
      {collection:'contactmessage'}
    ]))(Messages);
