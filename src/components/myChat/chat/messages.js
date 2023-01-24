import {Component} from "react";
import React from "react";
import{ Avatar} from 'antd';
import moment from 'moment';
class Messages extends Component {
  renderMessage(message,displayedImageId,recieverm,senderm,auth,profile) {
    const {userType, text,imageId,reciever,sender,intials,createdAt} = message;
    const seller='seller';
    const buyer='Buyer';
    //if image is matched
    
    if(!displayedImageId.localeCompare(imageId) ){
       // if he is buyer
       
      // if the signed in user is has preivious message
      if( senderm===reciever&&sender===recieverm){
          return (
            <li className= 'Messages-message Buyer '>
              {/* <span 
              /> */}
              <Avatar   className="avatar" style={{backgroundColor: '#51CB7A '}}  >
                 {intials}</Avatar>
              <div className="Message-content">
                
                <div className='text'>
                <div class="row pl-3 pr-3"  >
                  <span>{text }</span>
                  </div>
                  <div class="row pl-3 pr-3" >
                <span style={{fontSize:'10px'}}>{moment(createdAt.toDate()).fromNow()}</span>
                </div>
                </div>
                
              </div>
            </li>
          );
        }
        // if signed in user has not previous messag
        
       
      
              //if he is seller
      else if(senderm===sender&&reciever===recieverm){
        //is the prouduct belongs to him?????
       return (
          <li className=' seller Messages-message  '>
            {/* <span className="avatar" 
            /> */}
             <Avatar   className="avatar" style={{backgroundColor: '#49B84C'}}  >
                 {intials}</Avatar>
            <div className="Message-content">
              <div className="username">
              </div>
              <div className='text'>
                <div class="row pl-3 pr-3"  >
                  <span>{text }</span>
                  </div>
                  <div class="row pl-3 pr-3" >
                <span style={{fontSize:'10px'}}>{moment(createdAt.toDate()).fromNow()}</span>
                </div>
                </div>  
            </div>
          </li>
        );
        
      }
    }
    //if image is not matched
    else{
     return null
    }

  }
  render() {
    // <Messages profile={profile} auth={auth.uid} messages={chatMessage} displayedImageId={ClickedChat.imageId}  reciever={ClickedChat.sender} />
        
    const {messages,displayedImageId,reciever,auth,profile,sender} = this.props;
    const redirect='false'
    // handleredirect(reciever,displayedImageId,redirect)
    return (
      
      <ul className="Messages-list" >
        {messages&&messages.map(m => this.renderMessage(m,displayedImageId,reciever,sender,auth,profile))}
      </ul>
    );
  }
}
export default Messages;