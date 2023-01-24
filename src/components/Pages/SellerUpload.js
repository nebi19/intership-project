import React, { Component } from 'react'
import {connect} from 'react-redux';
import fbConfig from'../../config/fbConfig';
import MapSeller from './MapSeller';
import Navbar from '../layout/Navbar';
import {sellerupload} from '../../store/actions/SellerUploadAction';
import { withScriptjs, withGoogleMap, GoogleMap,Marker } from "react-google-maps";
import {Redirect} from 'react-router-dom'
import './scroll.css'
import {compose} from 'redux'
import { firestoreConnect } from 'react-redux-firebase'
const Map = withScriptjs(
  withGoogleMap(props => (
      <GoogleMap
          defaultZoom={12}
          defaultCenter={{lat: -0.023559, lng: 37.90619300000003}}
          onClick={e => props.onMapClick(e)}
      >
          
       {console.log("belew",props.marks)}
          {props.marks.map((mark, index) => <Marker key={index} 
    
          position={{ lat: mark.lat(),  lng: mark.lng() }}
        
           />)}
          
      </GoogleMap>
  ))
);


class SellerUpload extends Component {
    state={
        businessName:'',
        marketName:'',
        price:'',
        catagory:'',
        PhoneNumber:'',
        photo:[],
        lat:'',
        lng:'',
        discription:'',
        flag:'black',
        filename:[],
        
      }
    
    handelChange=(e)=>{

        this.setState({
        [e.target.id]:e.target.value,
        })
   console.log(this.state.file)
 }

      handleSubmit=(e)=>{
        if (this.file.files.length>4) {
      
            alert("Please select maximum of 4 photos");
            return
          }
          this.setState({
              flag:'red'
          })
      e.preventDefault();
      this.setState({
          photo:[]
      })
      const storageRef=fbConfig.storage().ref();
      for (var i =0 ; i <this.file.files.length; i++) {
          const file=this.file.files[i]
      const mainimage=storageRef.child(this.file.files[i].name)
      mainimage.put(file).then((snapshot)=>{
          mainimage.getDownloadURL().then((url)=>{
            let photos=this.state.photo
            photos.push(url)
              this.setState({
               photo:photos,
               flag:'green'
              })
          })
         
      })
      }
    
      }
      changes=(e)=>{
          let filenames=[]
          console.log(filenames,'helllllskjndn')
          for (var i =0 ; i <this.file.files.length; i++)
          {
              filenames.push(this.file.files[i])
          }
        this.setState({
            flag:'DarkGrey',
            filename:filenames,
          })
        
          console.log("files",this.state.filename)
       }
      setRef=ref=>{
          this.file=ref
          this.setState({
              photo:[],
              
          })
          console.log(this.state.flag,'the flagggg')
      }
    render() {
        const {auth,profile,catagory,market}=this.props
        const {seller}=this.props
     
        if(profile.userType==='Buyer') return <Redirect to='/editprofile'/>
        if(!auth.uid) return<Redirect to='/'/>
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
      
          <div class="row ">
         <div class="col-md-10 mx-auto bg-white" >
         <h2 style={styles}  class='pb-2 pt-4 text-center'>Add your Products</h2>
         <form class="p-5">

<div class="form-group row">
   <div class="col-sm-6">
           <label for="inputbusinessname" style={styles}>Name of Products</label>
           <input type="text"  onChange={this.handelChange} class="form-control" id="businessName" placeholder="Name of your Business" required/>
       </div>
       <div class="col-sm-6">
           <label for="inputPhoneNumber" style={styles}>Phone number</label>
           <input type="number" onChange={this.handelChange}  class="form-control" id="PhoneNumber" placeholder="PhoneNumber" required/>
       </div>

   </div>
   <div class="form-group row">
   <div class="col-sm-6">
  
           <label for="inputbusinessname" style={styles}>catagory</label>
           {/* <div class="scrollbar scrollbar-primary"> */}
           <select  style={{overflowY:'scroll'}} onChange={this.handelChange} class="form-control  "  id="catagory"required>
            
            <option value="" style={{overflowY:'scroll',height:'60px'}} selected disabled>Select your catagory</option>
     {
           catagory&&catagory.map((cat)=>{
            return  (
               
            <option  style={{overflowY:'scroll',height:'60px'}}   value={cat.catagory}
            >{cat.catagory}</option>
         
            )
      })
          
      
     }
    
</select>

          

       </div>
       <div class="col-sm-6">
                          <div class="form-group" style={{position: 'relative',  overflow:' hidden', display: 'inline-block'}}>
                          <button class=" bg-grey"><i style={{fontSize:'170%',fontWeight:'40',color:this.state.flag}}
                                          class="ion-md-arrow-up"></i>Add photos</button>
                          {this.state.flag==='DarkGrey'?<p style={{marginTop:'5%'}}>Images waiting to be uploaded</p>:null}
                          <input type="file"  onChange={this.changes}  ref={this.setRef} multiple   accept="image/*"
                          style={{position:"absolute",left:'0',top:'0', opacity:'0',borderRadius:'10px'}}/>
                            {this.state.filename&&this.state.filename.map((files)=>{
                            return <li>{files.name}</li>
                            })
                        }
                        
                           
                      </div>
                      {this.state.flag!=='red'?<button type="button" onClick={this.handleSubmit} class="btn btn-primary px-4 float-right">Upload</button>:<lable class="px-4 py-2 float-right" style={{borderRadius:'20px',backgroundColor:'#82ae46'}}>Uploading</lable>}</div>
        
   </div>
   
   <div class="form-group row" style={styles}>
       <div class="col-sm-6">
           <label for="inputDiscription">Discription</label>
           <input type="text" onChange={this.handelChange} class="form-control" id="discription" placeholder="discription" required/>
       </div>
       <div class="col-sm-6" >
                
             </div>
       </div>
   <div class="form-group row" style={styles}>
       <div class="col-sm-6">
           <label for="inputPrice">Price </label>
           <input type="text" onChange={this.handelChange} class="form-control" id="price" placeholder="Range of Price" required/>
       </div>
       <div class="col-sm-6">
           <label for="inputPrice">Market Name </label>
           {/* <input type="text" onChange={this.handelChange} 
           class="form-control" id="marketName" placeholder="Name of the markt located" required/> */}
           <select  style={{overflowY:'scroll'}} onChange={this.handelChange} class="form-control"  id="marketName"required>
          <option value="" style={{overflowY:'scroll',height:'60px'}} selected disabled>Select your Market</option>
     {
              market&&market.map((markets)=>{
                return  (
                   
                <option  style={{overflowY:'scroll',height:'60px'}}   value={markets.MarketName}
                >{markets.MarketName}</option>
             
                )
          })
     }
    
</select>
       </div>
   </div>

</form>
                  <div class="row "  >
                  <div class="col-md-10 mx-auto " >
                            <h3>Set Location</h3>
                            <MapSeller sellerInfo={this.state}/>
                          </div>
                          </div>
              </div>
              
      
         
          
      </div>
      </div>
 </section>
 
 </div>
        )
    }
}

const mapStateToProps=(state)=>{
    return {
      auth:state.firebase.auth,
      seller:state.firestore.data.sellerUpload,
      catagory:state.firestore.ordered.catagoryAdd,
      profile:state.firebase.profile,
      market:state.firestore.ordered.setMarket

    }
  }
const mapDispatchToProps=(dispatch)=>{
 
      return {
        sellerupload :(uploads)=>dispatch(sellerupload(uploads))
      }
  }
 export default compose(connect(mapStateToProps,mapDispatchToProps),  firestoreConnect([
    {collection:'catagoryAdd',orderBy: ['catagory']},
    {collection:'setMarket',orderBy: ['MarketName']}
  ]))(SellerUpload);
