import React,{Component} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {compose} from 'redux';
import App from './chat/chat'
import App2 from '../chat/chat'
import {firestoreConnect} from 'react-redux-firebase';
import moment from 'moment';
import './chat/App.css'
import { Avatar,Input } from 'antd';
import Navbar from '../layout/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
class myChat  extends Component{
  state={
    redirect:false,
    imageId:'',
    reciever:'',
    Id:'',
    search:'',
    x:window.innerWidth
  }
  onresize=()=>{
    this.setState({
      x:window.innerWidth
    })
  }
  handleClick=(e)=>{
    this.setState({
      Id:e
    })
  }
  
  redirectToChat=(reciever,imageID,redirect)=>{
    this.setState({
      redirect:redirect,
      imageId:imageID,
      reciever:reciever
    })
  }
  handelChange=(e)=>{
    this.setState({
      search:e.target.value
    })
  }
  render(){   
    let newmessage='';
    let MessageText=''
    let flag=0;
    let k=0;
    let messageFound=false;
    let messageF;
    const {innerWidth}=window
    window.addEventListener("resize", this.onresize);
   const { auth,chatMessage, profile}=this.props;
   if(!auth.uid) return <Redirect to='/signin'/>
   
   
    if(chatMessage){
      if(chatMessage.length===0)
      {
        return(<>
        < Navbar/>
          <div className='d-flex flex justify-content-center py-auto border'
                 style={{minHeight:'400px'}}>
      <p className='my-auto' style={{font:' 18px Tahoma,sans-serif,Arial,Helvetica'}}>
        No message yet </p>
      </div>
        </>)
      }
if(this.state.x<=800)
    { 
     if(profile.userType==='Buyer'){
         messageF=chatMessage.filter(item =>item.sender === auth.uid||item.reciever===auth.uid)
         if(messageF.length===0){
          newmessage=''
        }
        else{
          const len=messageF.length
          newmessage=[[messageF[len-1],0]];
          for(let i=messageF.length-1;i>=0;i--){
            for(let j=newmessage.length-1;j>=0;j--){
              if(messageF[i].imageId===newmessage[j][0].imageId){
                flag++;
                k=j;
                newmessage[j][1]++;
               //  newmessage[j][0]=messageF[i]
                break;
              }
            }//end of let second loop
            // 
            if (flag===0)
            {
              // console.log('here',i,newmessage)
              newmessage.push([messageF[i],1])
            }
            else{
              flag=0
            }      
          }
        }  
        return(
      
          <div className='  ' >
            < Navbar/>
              <div className="row  " style={{paddingTop:'10%',marginBottom:'10%'}} >
              <div className='col-lg-3 col-sm-0'></div>
              <div className='col-lg-6 col-sm-12 col-md-8  '> 
              {newmessage&&newmessage.map((message)=>{
                messageFound=true;
                  return(
                    <div className="media mb-2 py-0 "   >
                  {profile.photo?<Avatar size={50} icon='user'   src={profile.photo}/>: <p className='btn'>{profile.intials}</p>}
                    <div className="media-body pl-2">
                      <div className="d-flex flex-row bd-highlight ">
                          <p className="   font-weight-bold pr-2" style={{width:'80px',overflow:'hidden' , textOverflow:'ellipsis'}}>{message[0].Sellername}</p>
                           < p className=" "  style={{color:'#28a745'}}> 
                            {moment(message[0].createdAt.toDate()).fromNow()}
                            </p>  
                      </div>  
                       <div  onClick={()=>{window.location.reload(false);}} > <Link to={'/chat:' +message[0].imageId } >
                        <div className=' d-flex justify-content-between'>
                        <p style={{width:'200px',height:'25px',overflow:'hidden' , textOverflow:'ellipsis',cursor:'pointer'}}>{message[0].text}</p>
                        <p  style={{backgroundColor:'rgba(40, 167, 69, 0.25)',width:'30px',paddingLeft:'2%',borderRadius:'25%',marginRight:'10%'}}>{message[1]}</p>
                        </div>  
                        </Link></div>
                    </div>
                  </div>
                 )
           })}
                 {messageFound?null:<div className='d-flex flex justify-content-center py-auto border'
                 style={{minHeight:'400px'}}>
      <p className='my-auto' style={{font:' 18px Tahoma,sans-serif,Arial,Helvetica'}}>
        No message yet</p>
      </div>}
              </div>
              <div className='col-lg-0 col-sm-10  '>
              </div>
              <div className='col-lg-3 col-sm-0'></div>
            </div>
    
          </div>
        )

      }//end of if buyer
      else{
        // if he is seller      
        messageF=chatMessage.filter(item =>item.reciever === auth.uid||item.sender===auth.uid)
        if(messageF.length===0){
           newmessage=''
           MessageText=''
        }
        else{
          const len=messageF.length
         newmessage=[[messageF[len-1],0]];
         MessageText=[[messageF[len-1],0]];
         
         for(let i=messageF.length-1;i>=0;i--){
           for(let j=newmessage.length-1;j>=0;j--){
            console.log(messageF[i].imageId,newmessage[j][0].imageId,'the proooooooooo')
              if((messageF[i].reciever===newmessage[j][0].reciever&messageF[i].sender===newmessage[j][0].sender&messageF[i].imageId===newmessage[j][0].imageId)||(messageF[i].reciever===newmessage[j][0].sender&messageF[i].sender===newmessage[j][0].reciever&messageF[i].imageId===newmessage[j][0].imageId)){
               flag++;
               k=j;
               newmessage[j][1]++;
               MessageText[j][1]++;
                break;
              }
            }//end of let second loop
            // 
            if (flag===0)
            {
              newmessage.push([messageF[i],1])
              MessageText.push([messageF[i],1])
            }
            else{
              flag=0
            } 
                 
          }
        }
          return(
           
            <div className='  ' >
              < Navbar/>
              {
              <div className="row" style={{paddingTop:'10%'}} >         
              <div className='col-lg-3 col-sm-0'></div>
              <div className='col-lg-6 col-sm-12 col-md-8  '> 
             {newmessage&&newmessage.map((message,index)=>{
                messageFound=true;
                const Product=(this.props.seller&&this.props.seller.filter(item=>item.id===message[0].imageId))
               var ProductName=''
               if(Product&&Product.length!==0)
               {
                 ProductName=Product[0].businessName
                }
                let a=true;
                  return(
                    <div className="media mb-2 py-0"   >
                      {/* <Avatar icon='user'   src={profile.photo}/> */}
                   <Avatar  size={50}  >{message[0].intials}</Avatar>
                    <div className="media-body pl-2"  >
                      <div className="d-flex flex-row bd-highlight ">
                  <p className="   font-weight-bold pr-2" style={{width:'80px',overflow:'hidden' , textOverflow:'ellipsis'}}> {MessageText[index][0].Buyername}<h3 className="    pr-2" style={{fontSize:'10px',marginTop:'0',paddingTop:'0'}}>{'to:'+' '+ ProductName}</h3> </p>
                  
                           < p className="" style={{color:'#28a745'}}> 
                            {moment(message[0].createdAt.toDate()).fromNow()}
                            </p>  
                      </div>  
                      <div  onClick={()=>{window.location.reload(false);}} > <Link to={'/schat:' +message[0].id} >
                        <div className=' d-flex justify-content-between' >
                        
                        <p style={{width:'200px',height:'25px',overflow:'hidden' , textOverflow:'ellipsis',cursor:'pointer'}}>{MessageText[index][0].text}</p>
                        <p  style={{backgroundColor:'rgba(40, 167, 69, 0.25)',width:'30px',paddingLeft:'2%',borderRadius:'25%',marginRight:'10%'}}>{message[1]}</p>
                        </div>  
                        </Link>
                        </div>
                    </div>
                  </div>
                 )
           })}
                 {messageFound?null:<div className='d-flex flex justify-content-center py-auto border'
                 style={{minHeight:'400px'}}>
      <p className='my-auto' style={{font:' 18px Tahoma,sans-serif,Arial,Helvetica'}}>
        No message yet</p>
      </div>}
              </div>
              <div className='col-lg-0 col-sm-10  '>
              </div>
              <div className='col-lg-3 col-sm-0'></div>
            </div>
    } 
            </div>
          )
        
      }    
    }
else{
      if(profile.userType==='Buyer'){
        messageF=chatMessage.filter(item =>item.sender === auth.uid||item.reciever===auth.uid)
        if(messageF.length===0){
         newmessage=''
       }
       else{
         const len=messageF.length
         newmessage=[[messageF[len-1],0]];
         for(let i=messageF.length-1;i>=0;i--){
           for(let j=newmessage.length-1;j>=0;j--){
             if(messageF[i].imageId===newmessage[j][0].imageId){
               flag++;
               k=j;
               newmessage[j][1]++;
              //  newmessage[j][0]=messageF[i]
               break;
             }
           }//end of let second loop
           // 
           if (flag===0)
           {
             // console.log('here',i,newmessage)
             newmessage.push([messageF[i],1])
           }
           else{
             flag=0
           }      
         }
       }  
       return(
     
         <div className='  ' >
           < Navbar/>
           <div className="row"  style={{height:'20px',backgroundColor:' rgba(196, 192, 192, 0.1)',height:'30px'}} > 
    <div className='col-lg-3 col-sm-12 col-md-3 ' > </div>
    <div className='col-lg-6 col-sm-12 col-md-6' > 
    <h2 style={{textAlign:'center',paddingTop:'1%'}}>My Inbox</h2>
    </div>
    <div className='col-lg-3 col-sm-12 col-md-3' > </div>
    </div>            
<div className="row  " style={{paddingTop:'2%',backgroundColor:' rgba(196, 192, 192, 0.1)'}} >   

             <div className='col-lg-3 col-sm-10 col-md-3 bg-light scrollbar scrollbar-primary' > 
             <Input type="text"  style={{marginBottom:'2%',width:'90%',marginLeft:'5%',height:'30px'}} id='search' 
              onChange ={this.handelChange} placeholder="Search" />
              
             {newmessage&&newmessage.map((message)=>{
               if((!message[0].Sellername.toLowerCase().includes(this.state.search.toLowerCase()))&&this.state.search!=='')
               return
               messageFound=true;
               console.log(message[0].imageId,'the sent id')
               if(this.state.Id===''){
                this.setState({
                  Id:message[0].imageId
                })
              }
              var color=''
              if(this.state.Id===message[0].imageId)
                  {color='rgb(235, 227, 227)'}
              console.log('the clicked',this.state.Id,message[0].imageId)
                 return(
                   <div className="media mb-2 py-0 ContainLink" style={{backgroundColor:color}} onClick={this.handleClick.bind(this,message[0].imageId)}  >
                 <Avatar  size={50}  >{message[0].Sellername[0]}</Avatar>
                   <div className="media-body pl-2"  >
                     <div className="d-flex flex-row bd-highlight ">
                         <p className="   font-weight-bold pr-2" style={{width:'80px',overflow:'hidden' , textOverflow:'ellipsis'}}>{message[0].Sellername}</p>
                          < p className="" style={{color:'#28a745'}} > 
                           {moment(message[0].createdAt.toDate()).fromNow()}
                           </p>  
                     </div>  
                     
                       <form>
                       <div className=' d-flex justify-content-between'>
                       
                       <p style={{width:'200px',height:'25px',overflow:'hidden' , textOverflow:'ellipsis',cursor:'pointer'}} >{message[0].text}</p>
                        <p  style={{backgroundColor:'rgba(40, 167, 69, 0.25)',width:'30px',paddingLeft:'1%',borderRadius:'25%',marginRight:'10%'}} >{message[1]}</p>
                        
                       </div>  
                       </form>
                      
                   </div>
                 </div>
                )
          })}
                
             </div>
             <div className='col-lg-7 col-sm-10  col-md-7 scrollbar scrollbar-primary' >
             {messageFound?<App2 id={this.state.Id}/>:<div className='d-flex flex justify-content-center py-auto border'
                style={{minHeight:'400px'}}>
     <p className='my-auto' style={{font:' 18px Tahoma,sans-serif,Arial,Helvetica'}}>
       No message yet</p>
     </div>}
             
           </div>
           
           <div className='col-lg-2 col-sm-2 col-md-2'></div>
           </div>
   
         </div>
       )

     }//end of if buyer
     else{
       // if he is seller      
       messageF=chatMessage.filter(item =>item.reciever === auth.uid||item.sender===auth.uid)
       if(messageF.length===0){
          newmessage=''
          MessageText=''
       }
       else{
         const len=messageF.length
         newmessage=[[messageF[len-1],0]];
         MessageText=[[messageF[len-1],0]];
         
         for(let i=messageF.length-1;i>=0;i--){
           for(let j=newmessage.length-1;j>=0;j--){
            console.log(messageF[i].imageId,newmessage[j][0].imageId,'the proooooooooo')
              if((messageF[i].reciever===newmessage[j][0].reciever&messageF[i].sender===newmessage[j][0].sender&messageF[i].imageId===newmessage[j][0].imageId)||(messageF[i].reciever===newmessage[j][0].sender&messageF[i].sender===newmessage[j][0].reciever&messageF[i].imageId===newmessage[j][0].imageId)){
               flag++;
               k=j;
               newmessage[j][1]++;
               MessageText[j][1]++;
               
              
              //  MessageText[j][0].text=messageF[i].text
               break;
             }
           }//end of let second loop
           // 
           if (flag===0)
           {
             newmessage.push([messageF[i],1])
             MessageText.push([messageF[i],1])
           }
           else{
             flag=0
           } 
                
         }
        }
         return(
          
           <div className='  '    >
             < Navbar/>
             
    <div className="row"  style={{height:'20px',backgroundColor:' rgba(196, 192, 192, 0.1)'}} > 
    <div className='col-lg-3 col-sm-12 col-md-3 ' > </div>
    <div className='col-lg-6 col-sm-12 col-md-6' > 
    <h2 style={{textAlign:'center',paddingTop:'1%'}}>My Inbox</h2>
    </div>
    <div className='col-lg-3 col-sm-12 col-md-3' > </div>
    </div>            
<div className="row  " style={{paddingTop:'2%',backgroundColor:' rgba(196, 192, 192, 0.1)'}} >   
     
{/* <div className='col-lg-3 col-sm-0'></div> */}
             <div className='col-lg-3 col-sm-12 col-md-3 bg-light scrollbar scrollbar-primary' > 
            <Input type="text"  style={{marginBottom:'2%',width:'90%',marginLeft:'5%',height:'30px'}} id='search' 
              onChange ={this.handelChange} placeholder="Search" />
             {newmessage&&newmessage.map((message,index)=>{
               if((!MessageText[index][0].Buyername.toLowerCase().includes(this.state.search.toLowerCase()))&&this.state.search!=='')
               return
               messageFound=true;
               let a=true;
               if(this.state.Id===''){
                 this.setState({
                   Id:message[0].id
                 })
               }
               const Product=(this.props.seller&&this.props.seller.filter(item=>item.id===message[0].imageId))
               var ProductName=''
               if(Product&&Product.length!==0)
               {
                 ProductName=Product[0].businessName
                }
                console.log(ProductName,'the name is out')
                var color=''
                if(this.state.Id===message[0].id)
                  {color='rgb(235, 227, 227)'}
                console.log('the clicked',color)
                 return(
                   <div className="media mb-2 py-0 ContainLink" style={{backgroundColor:color}} onClick={this.handleClick.bind(this,message[0].id)} >
                     {/* <Avatar icon='user'   src={profile.photo}/> */}
                  <Avatar  size={40}  >{message[0].intials}</Avatar>
                   <div className="media-body pl-2 "  >
                     <div className="d-flex  ">
                     
                 <p className="   font-weight-bold pr-2" style={{width:'80px',overflow:'hidden' , textOverflow:'ellipsis'}}> {MessageText[index][0].Buyername}<h3 className="    pr-2" style={{fontSize:'10px',marginTop:'0',paddingTop:'0'}}>{'to:'+' '+ ProductName}</h3> </p>
                 
                          < p className="" style={{color:'#28a745'}} > 
                           {moment(message[0].createdAt.toDate()).fromNow()}
                           </p> 
                            
                     </div> 
                     
                     
                       {/* <Link to={'/schat:' +message[0].id} > */}
                       
                       <div className=' d-flex justify-content-between' >
                       <p style={{width:'200px',height:'25px',overflow:'hidden' , textOverflow:'ellipsis',cursor:'pointer'}} >{MessageText[index][0].text}</p>
                        <p  style={{backgroundColor:'rgba(40, 167, 69, 0.25)',width:'30px',paddingLeft:'1%',borderRadius:'25%',marginRight:'10%'}}>{message[1]}</p >
                        
                       </div>  
                      
                   </div>
                 </div>
                )
          })}
                
             </div>
             <div className='col-lg-7 col-sm-0  col-md-7 scrollbar scrollbar-primary' >
             {messageFound?<App id={this.state.Id}/>:<div className='d-flex flex justify-content-center py-auto border'
                style={{minHeight:'400px'}}>
     <p className='my-auto' style={{font:' 18px Tahoma,sans-serif,Arial,Helvetica'}}>
       No message yet</p>
     </div>}
               
             </div>
             <div className='col-lg-0 col-sm-10 col-md-0 '>
             </div>
             <div className='col-lg-2 col-sm-0 col-md-0'></div>
             
           </div>
   
           </div>
         )
       
     }   
    }
    } 
    else{
      return<div className='d-flex flex justify-content-center py-auto border'
      style={{minHeight:'400px'}}>
<p className='my-auto' style={{font:' 18px Tahoma,sans-serif,Arial,Helvetica'}}>
Loading...</p>
</div>
    }
  
  }//end of render
}
const mapStateToProps=(state)=>{
  // console.log('chat app state',state)
  return{
    auth:state.firebase.auth,
    chatMessage:state.firestore.ordered.chat,
    profile:state.firebase.profile,
    seller:state.firestore.ordered.sellerUpload
  }
} 
export default compose(
  connect(mapStateToProps),
 firestoreConnect([
    {collection:'chat' ,orderBy: ['createdAt','asc']},
    {collection:'users',orderedBy:['time','desc']}
 ]))(myChat);