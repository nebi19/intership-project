import React, { Component } from 'react'
import {sellerupload} from '../../store/actions/SellerUploadAction';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom'
import fbConfig from'../../config/fbConfig';
class AddProducts extends Component {
    state={
        businessName:'',
        marketName:'',
        price:'',
        comment:'',
        discription:'',
        catagory:'',
        email:'',
        contactperson:'',
        photo:[]
      }
    
    handelChange=(e)=>{
      this.setState({
        [e.target.id]:e.target.value,
        })
     }
 handleSubmit=(e)=>{
        if (this.file.files.length>2) {
      
          alert("Please select max 4 photos.");
        }
      e.preventDefault();
      const storageRef=fbConfig.storage().ref();
    
      for (var i =0 ; i <this.file.files.length; i++) {
       const file=this.file.files[i]
      const mainimage=storageRef.child(this.file.files[i].name)
      mainimage.put(file).then((snapshot)=>{
          mainimage.getDownloadURL().then((url)=>{
            let photos=this.state.photo
            photos.push(url)
              this.setState({
               photo:photos
              })
          })
         
      })
  }
  this.props.sellerupload(this.state)
       console.log("upload",this.state)
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
             <form class="p-5">

             <div class="form-group row">
                <div class="col-sm-6">
                        <label for="inputbusinessname" style={styles}>Name of Products</label>
                        <input type="text"  onChange={this.handelChange} class="form-control" id="ame" 
                        placeholder="Name of your Business" />
                    </div>
                    <div class="col-sm-6">
                        <label for="inputmarketName" style={styles}>Phone number</label>
                        <input type="text" onChange={this.handelChange}  class="form-control" id="marketName" placeholder="Name of the Market"/>
                    </div>
    
                </div>
                <div class="form-group row">
                <div class="col-sm-6">
                        <label for="inputbusinessname" style={styles}>catagory</label>
                        <input type="text"  onChange={this.handelChange} class="form-control" id="businessName" placeholder="Name of your Business"/>
                    </div>
                    <div class="col-sm-6">
                    <div class="form-group" style={{position: 'relative',  overflow:' hidden', display: 'inline-block'}}>
                    <button  class=" bg-grey"><i style={{fontSize:'170%',fontWeight:'40',color:'white'}}
                                    class="ion-md-arrow-up"></i>Upload photo</button>
                    <input type="file" ref={this.setRef} multiple   accept="image/*"
                    style={{position:"absolute",left:'0',top:'0', opacity:'0',borderRadius:'10px'}} required/>
                <i style={{fontSize:'170%',color:'#82ae46'}}   class="ion-md-share pl-3"></i>
                </div>
                </div>
    
                </div>
                <div class="form-group row" style={styles}>
                    <div class="col-sm-6">
                        <label for="inputContactperson">Discription</label>
                        <input type="text" onChange={this.handelChange} class="form-control" id="contactperson" placeholder="Name For contact person"/>
                    </div>
                    <div class="col-sm-6" >
                             
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
             
                <button type="button" class="btn btn-primary px-4 float-right">Save</button>
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
export default connect(mapStateToProps,mapDispatchToProps)(AddProducts);
