import React from 'react'
import {Avatar} from 'antd'
function email(props){
    const {gmail,text}=props.data
    return(
    <div class="card mb-3 border-0" style={{boxShadow:'5px 5px 5px #f3f4f5'}}>
  <div class="card-body">
    <h6 class="card-title font-weight-bold">{text}</h6>
<p class="card-text"> {text}</p>
<div className='d-flex justify-content-between'>
<span><Avatar size={20}/>{gmail}</span><a href="#" class="btn btn-primary p-0">more</a>
</div>
    
  </div>
</div>
    )
}
export default email;