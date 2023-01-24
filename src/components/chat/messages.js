import {Component} from "react";
import React from "react";
import{ Avatar} from 'antd';
import moment from 'moment';
class Messages extends Component {
  renderMessage(message,displayedImageId,productOwner,auth,profile) {
    const {userType, text,imageId,reciever,sender,intials,createdAt} = message;
    const seller='seller';
    const buyer='Buyer';
    
    //if image is matched
    if(!displayedImageId.localeCompare(imageId) ){
       // if he is buyer
       {
      // if the signed in user is has preivious message
      if(auth===sender){
          return (
            <li className= 'Messages-message Buyer '>
              {/* <span 
              /> */}
              <Avatar   className="avatar" style={{backgroundColor: '#51CB7A ',fontSize:'20px',paddingTop:'0px'}}  >
                 {profile.initials}</Avatar>
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
        
        else if(auth===reciever){
          console.log('profile',profile,auth,sender,reciever)
          //is the prouduct belongs to him?????
         return (
            <li className=' seller Messages-message  '>
              {/* <span className="avatar" style={{backgroundColor: '#49B84C'}}
              /> */}
              <Avatar   className="avatar" style={{backgroundColor: '#49B84C'}}  >
                   {productOwner.businessName}</Avatar>
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
        
       
      }
              //if he is selle
              
      
    }
    //if image is not matched
    else{
     return null
    }

  }
  render() {
    const {messages,displayedImageId,productOwner,auth,profile} = this.props;
    return (
      <ul className="Messages-list">
        {messages&&messages.map(m => this.renderMessage(m,displayedImageId,productOwner,auth,profile))}
      </ul>
    );
  }
}
export default Messages;