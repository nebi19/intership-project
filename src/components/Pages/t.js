import React, { Component } from 'react'
import {sellerupload} from '../../store/actions/SellerUploadAction';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom'
import fbConfig from'../../config/fbConfig';
import { withScriptjs, withGoogleMap, GoogleMap, Circle,Marker } from "react-google-maps";
import Autocomplete from 'react-google-autocomplete';
import Geocode from "react-geocode";
Geocode.setApiKey("AIzaSyCd5GSrdhkRjDu53HCBVL7fh5QXa1-gIBE");
Geocode.setLanguage("en");
Geocode.setRegion("es");
Geocode.enableDebug();

class R extends Component {
    state={
        businessName:'',
        marketName:'',
        price:'',
        comment:'',
        discription:'',
        catagory:'',
        email:'',
        contactperson:'',
        photo:[],
        progress:0
      }
handelChange=(e)=>{
      this.setState({
        [e.target.id]:e.target.value,
        })
     }
     handels=(e)=>{
        console.log("upd",this.state.photo)
        e.preventDefault();
        this.props.sellerupload(this.state)
    
       }
 handleSubmit=(e)=>{

      e.preventDefault();
      const storageRef=fbConfig.storage().ref();
  for (var i =0 ; i <this.file.files.length; i++) {
    console.log("upload",this.state.photo)
       const file=this.file.files[i]
      const mainimage=storageRef.child(this.file.files[i].name).put(file)
      
      mainimage.on('state_changed', 
      (snapshot) => {
        // progrss function ....
        const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        this.setState({progress});

        console.log(this.state.progress)
      }, 
      (error) => {
           // error function ....
        console.log(error);
      }, 
    () => {
            mainimage.getDownloadURL().then((url)=>{
              let photos=this.state.photo
              photos.push(url)
                this.setState({
                 photo:photos
                })
        
           console.log(this.state.photo)
        })
    }
    );
     
  }

      }

      setRef=ref=>{
          this.file=ref
         }
   render() {
    const styles = {
        color:'#000',
        fontFamily:'poppins,Arial,sans-serif',
        lineHeight:'1.5', 
        fontweight:'30',
        fontSize:'18px'

      }
      return (
     <div>
     <section class="ftco-section contact-section bg-light">
<div class="container py-5">
    <div class="row">
   <div class="col-md-10 mx-auto bg-white" >
   <h2 style={styles}  class='pb-2 pt-4 text-center'>Add your Products</h2>
             <form class="p-5"  >
                <div class="form-group row">
                <div class="col-sm-6">
                        <label for="inputbusinessname" style={styles}>Name of your Business</label>
                        <input type="text"  onChange={this.handelChange} class="form-control" id="businessName" placeholder="Name of your Business"/>
                    </div>
                    <div class="col-sm-6">
                        <label for="inputmarketName" style={styles}>Name of the Market</label>
                        <input type="text" onChange={this.handelChange}  class="form-control" id="marketName" placeholder="Name of the Market"/>
                    </div>
    
                </div>
                <div class="form-group row" style={styles}>
                <div class="col-sm-6">
                        <label for="inputDiscription">Discription</label>
                        <textarea id="discription"  onChange={this.handelChange} cols="30" rows="2" class="form-control" placeholder="Enter comment (optional)"/>
                    </div>
                    <div class="col-sm-6">
                        <label for="inputCatagory">Catagory</label>
                        <input type="text"onChange={this.handelChange} class="form-control" id="catagory" placeholder="Catagory"/>
                    </div>
                  
                </div>
                <div class="form-group row" style={styles}>
                    <div class="col-sm-6">
                        <label for="inputDiscription">Discription</label>
                        <textarea id="discription"  onChange={this.handelChange} cols="30" rows="2" class="form-control" placeholder="Enter comment (optional)"/>
                    </div>
                    <div class="col-sm-6">
                    <label for="inputPrice">Price</label>
                        <input type="number" onChange={this.handelChange} class="form-control" id="price" placeholder="Price"/>
                    </div>
                </div>
                <div class="form-group row" style={styles}>
                    <div class="col-sm-6">
                        <label for="inputContactperson">Name For contact person</label>
                        <input type="text" onChange={this.handelChange} class="form-control" id="contactperson" placeholder="Name For contact person"/>
                    </div>
                    <div class="col-sm-6">
                    <div class="form-group">
                    <br/>
                    <progress value={this.state.progress} max="100"/>
                    <br/>
                    <input type="file" onChange={this.handleSubmit} ref={this.setRef} multiple   accept="image/*"    />
        <button onClick={this.handleSubmit}>Upload</button>
                 {/* <button onClick={this.handleSubmit}   class=" bg-grey" style={{position: 'relative',  overflow:' hidden', display: 'inline-block'}}>Upload photo</button>
                    <input type="file" ref={this.setRef} multiple   accept="image/*"    
                    style={{position:"absolute",left:'0',top:'0', opacity:'0',borderRadius:'10px'}}/>
                <i style={{fontSize:'170%',color:'#82ae46'}}   class="ion-md-share pl-3"></i> */}
              
                </div>
                </div>
                    </div>
                <div class="form-group row" style={styles}>
                    <div class="col-sm-6">
                        <label for="inputContactNumber">Cell phone </label>
                        <input type="number" onChange={this.handelChange} class="form-control" id="contactNumber" placeholder="Contact Number"/>
                    </div>
                    <div class="col-sm-6">
                        
                    </div>
                </div>
                <div class="form-group" style={styles}>
                <div class="col-sm-6" >
                        <label for="inputemail">Email</label>
                        <input type="email" onChange={this.handelChange} class="form-control" id="email" placeholder="Email (optional)"/>
                    </div>
                    <div class="col-sm-6">
                       
                    </div>
                 
                 
                </div>
                <button  onClick={this.handels}type="button"class="btn btn-primary px-4 float-right">Save</button>
            </form>
      
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
      seller:state.firestore.data.sellerUpload,
    }
  }
const mapDispatchToProps=(dispatch)=>{
 
      return {
        sellerupload :(uploads)=>dispatch(sellerupload(uploads))
      }
  }
export default connect(mapStateToProps,mapDispatchToProps)(R);