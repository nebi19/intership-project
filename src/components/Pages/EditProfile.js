import React, { Component } from 'react'
import {editProfile} from '../../store/actions/editProfileAction';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom'
import {Input} from 'antd'
import Navbar from '../layout/Navbar';
import 'antd/dist/antd.css';
import fbConfig from'../../config/fbConfig';
import { Avatar, Typography, Col,Button } from 'antd';
const { Title } = Typography;
class EditProfile extends Component {
    state={
        name:'',
        PhoneNum:'',
        AlternateNum:'',
        photo:'',
        Npassword:'',
        password:'',
        confirmPassword:'',
        passwordError:'',
        flag:'black',
        init:true,
        notification:'',
        filename:''
      }
    
    handelChange=(e)=>{
      this.setState({
        [e.target.id]:e.target.value,
        })
     }
     changes=(e)=>{
      this.setState({
          filename:this.file.files[0],
        })
        console.log("files",this.file.files[0])
     }
  handleSubmitimage=(e)=>{
    const storageRef=fbConfig.storage().ref();
      if(this.file.files.length>0)
      {this.setState({
        flag:'red'
      })}
  
       const file=this.file.files[0]
      const mainimage=storageRef.child(this.file.files[0].name)
      mainimage.put(file).then((snapshot)=>{
          mainimage.getDownloadURL().then((url)=>{
          
           
              this.setState({
               photo:url,
               flag:'green'
              })
          })
         
      })
  

     }
 handleSubmit=(e)=>{
        console.log('this is here')
        if (this.file.files.length>1) {
      
          alert("Please select only one photo");
          return
        }
       
      if(this.state.Npassword!==this.state.confirmPassword){
        console.log('password error')
        this.setState({
          passwordError:'password mismatch'
        })
        return
     }
     if(this.state.Npassword.length<6&&this.state.Npassword.length!==0){
       console.log('password error')
       this.setState({
         passwordError:'Password Too Short'
       })
       return
    }
    e.preventDefault();
     this.setState({
       notification:'You have successfully updated your profile '
     }) 
  console.log("this is upload",this.state)
  this.props.editProfile(this.state)
       
      }

      setRef=ref=>{
          this.setState({
            flag:'black'
          })
          this.file=ref
         }
   render() {
     console.log(this.props.editError)
    if(this.props.profile.name) 
     {if(this.state.init){
       this.setState({
        name:this.props.profile.name,
        PhoneNum:this.props.profile.PhoneNum,
        AlternateNum:this.props.profile.AlternateNum,        
        init:false 
       })
     }}
    if(!this.props.auth.uid) return<Redirect to='/'/>
    const styles = {
        color:'#000',
        fontFamily:'poppins,Arial,sans-serif',
        lineHeight:'1.5', 
        fontweight:'30',
        fontSize:'18px'

      }
      return (
     <div>
       <Navbar/>
     <section class="ftco-section contact-section bg-light">
<div class="container py-5">

    <div class="row">
   <div class="col-md-10 mx-auto bg-white" >
   {this.props.editError===''?<div style={{fontSize:'18px',marginLeft:'35%',color:'#82ae46'}}>You have successfully edited your profile</div>:<div style={{fontSize:'18px',marginLeft:'15%',color:'red'}}>{this.props.editError }</div>}
        <h2 style={styles}  class='pb-2 pt-4 text-center'>Edit your Profile</h2>
             <form class="p-5">
             <Col style={{ marginBottom: '80px' }} align='center'>
    {this.state.photo===''?
    <a target="_blank" href={this.props.profile.photo}>
    <Avatar size={100} icon='user'  src={this.props.profile.photo}/> </a>:
    <Avatar size={100} icon='user'  src={this.state.photo}/>}
    <Title style={{ fontSize: '14px', margin: '10px 0' }}></Title>   
    <div class="col-sm-6 " >
       <div class="form-group" style={{position: 'relative',  overflow:' hidden', display: 'inline-block'}}>
       <Button type="button" class='btn btn-primary px-4' style={{backgroundColor:'gray',cursor:'pointer',color:'white'}}>Browse Photo</Button>
         <input type="file"   onChange={this.changes} ref={this.setRef} multiple accept="image/*" style={{position:'absolute',left:'10',top:'10', opacity:'0',borderRadius:'100px'
        }}/>
   <p>{this.state.filename.name}</p>
        
     </div>
      </div>
      <div class="col-sm-6 ">
        
      {this.state.flag!=='red'?<button type="button" onClick={this.handleSubmitimage} class="btn btn-primary px-4 float-right">Upload</button>:<lable class="px-4 py-2 float-right" style={{borderRadius:'20px',backgroundColor:'#82ae46'}}>Uploading</lable>}</div>
    </Col>
    
             <div class="form-group row">
                <div class="col-sm-6">
                        <label for="inputbusinessname" style={styles}>Name</label>
                        <input type="text"  onChange={this.handelChange} class="form-control" id="name" defaultValue={this.props.profile.name}/>
                    </div>
                    <div class="col-sm-6">
                        <label for="inputmarketName" style={styles}>Phone number</label>
                        <input type="text" onChange={this.handelChange}  class="form-control" id="PhoneNum" defaultValue={this.props.profile.PhoneNum}/>
                    </div>
    
                </div>
                <div class="form-group row" style={styles}>
                    <div class="col-sm-6">
                        <label for="inputContactperson">Alternative Phone number </label>
                        <input type="text" onChange={this.handelChange} class="form-control" id="AlternateNum" defaultValue={this.props.profile.AlternateNum}/>
                    </div>
                    <div class="col-sm-6">
                        <label for="inputmarketName" style={styles}>New Password</label>
                        <Input.Password id="Npassword"  className="psw-input" placeholder="Password" onChange={this.handelChange} required/>
                        </div>
                    
                    </div>
                <div class="form-group row">
                <div class="col-sm-6">
                <label for="inputmarketName" style={styles}>Old Password</label>
                        <Input.Password id="password"  className="psw-input" placeholder="Password" onChange={this.handelChange} required/>
                        </div>
                    <div class="col-sm-6">
                        <label for="inputmarketName" style={styles}>Confirm Password</label>
                        <Input.Password id="confirmPassword"  className="psw-input" placeholder="Confirm Password" onChange={this.handelChange} required/>
                        <div style={{fontSize:'18px',color:'red'}}>
                {this.state.passwordError}
                </div>
                        </div>
                  
    
                </div>
                
                
                      
                <button type="button" onClick={this.handleSubmit}class="btn btn-primary px-4 float-right">Save</button>
            </form>
            {console.log(this.props.editError==='')}
            {this.props.editError===''?<div style={{fontSize:'18px',marginLeft:'35%',color:'#82ae46'}}>You have successfully edited your profile</div>:<div style={{fontSize:'18px',marginLeft:'15%',color:'red'}}>{this.props.editError }</div>}
        </div>
    </div>
</div>
</section>
                    </div>
        );
    }
}

const mapStateToProps=(state)=>{
    return {
      auth:state.firebase.auth,
      profile:state.firebase.profile,
      editError:state.edit.editError,
      seller:state.firestore.data.sellerUpload,
    }
  }
  const mapDispatchToProps=(dispatch)=>{
    return{
      
        editProfile:(newUser)=>dispatch(editProfile(newUser))
    }
  }
export default connect(mapStateToProps,mapDispatchToProps)(EditProfile);
