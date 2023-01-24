import React, { Component } from "react";
import {connect } from 'react-redux';
import Send from '../../images/comment.png'
import {addComment} from '../../store/actions/addComment'
import Attach from '../img/attach.png'
import styled from 'styled-components';
 const Form = styled.form`
display: flex !important;  
`;
const Button=styled.button`
background-color: white;
border:0;
`;
 class CommentForm extends Component {
   state = {
      comment:'',
      FristName:'',
      imageId:''
        };
/**
   * Handle form input field changes & update the state
   */
  handleFieldChange = (event) => {
    this.setState({comment:event.target.value,
    imageId:this.props.imageId })    
  };
  onSubmit=(event)=>{
    // prevent default form submission
    event.preventDefault();
    if(this.state.comment.length!==0)
    {this.props.addComment(this.state);
    this.setState({comment:''});}
    else{
      alert("Dear User you can not post an empty comment");
    }
    
  }
  render() {
    console.log('imageid from comment form',this.props.imageId)
    return (
    <div className="Input  p-5" >
        <Form method="post Input" onSubmit={this.onSubmit}>
          
          <input
            style={{
              
              border:'solid',
              borderWidth:'1px',
              borderColor:'white',
              borderBottomColor:'gray',
              backgroundColor:'white'
            }}
            onChange={this.handleFieldChange}
              id="comment"
              name='comment'
              className="form-control "
              placeholder="Your Comment"
              value={this.state.comment}
          />
              <Button type="submit"> <img src={Send} height={40} /></Button>
        </Form>
      </div>
    );
  }
  }
  const mapDispatchToProps=(dispatch)=>{
    return{
        addComment:(comment)=>dispatch(addComment(comment))
    }
  }
 export default connect(null,mapDispatchToProps)(CommentForm);