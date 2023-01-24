import {Component} from "react";
import React from "react";
import {connect } from 'react-redux'
import {addChatMessage} from '../../../store/actions/chatAction'
import Send from '../../../images/send.png'
import Attach from '../../img/attach.png'
import styled from 'styled-components';
const Form = styled.form`
display: flex !important;  
`;
const Button=styled.button`
background-color: white;
border:0;
`;

class Input extends Component {
  state = { 
          text: "",
          sender:'',
          userType:'',
          reciever:'',
          imageId:'' ,
          intials:'',
          Buyername:'',
          Sellername:''
 }
  onChange(e) {
    this.setState({
      reciever:this.props.reciever,
      text: e.target.value,
      userType:this.props.profile.userType,
      imageId:this.props.imageId ,
      sender:this.props.auth,
      intials:this.props.profile.initials,
      Sellername:this.props.ClickedChat.Sellername,
      Buyername:this.props.ClickedChat.Buyername
    });
  }
  onSubmit(e) {
    e.preventDefault();
    if(this.state.text.length!==0)
    {this.props.addChatMessage(this.state)
      this.setState({text: ""});}
    else{
      alert("Dear User you can not send an empty text");
    }
  }
  render() {
    
    console.log('profile',this.props.profile)
    console.log('this.props.reciever',this.props.reciever)
    console.log('this.props.auth',this.props.auth)
    return (
      <div className=" p-3 " >
        <Form onSubmit={e => this.onSubmit(e)} className="py-0">
        
          <input
              style={{
                marginLeft:'10%',
                marginRight:'2%',
                border:'solid',
                borderWidth:'1px',
                borderColor:'white',
                borderBottomColor:'gray',
                backgroundColor:'white'
              }}
            onChange={e => this.onChange(e)}
            value={this.state.text}
            type="text"
            placeholder="Type your message...."
            className="form-control"
            autofocus="true"
 
          />
          <Button> <img src={Send} height={50} /></Button>
        </Form>
      </div>
    );
  }
}

const mapDispatchToProps=(dispatch)=>{
  return{
      addChatMessage:(message)=>dispatch(addChatMessage(message))
  }
}
export default connect(null,mapDispatchToProps)(Input);