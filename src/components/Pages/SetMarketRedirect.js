import React, { Component } from 'react'
import {connect} from 'react-redux';
import fbConfig from'../../config/fbConfig';
import SetMarket from './setMarket';

import Navbar from '../layout/Navbar';
import {setmarket} from '../../store/actions/setMarketAction';
import { withScriptjs, withGoogleMap, GoogleMap, Circle,Marker } from "react-google-maps";
import {Redirect} from 'react-router-dom'
const Map = withScriptjs(
  withGoogleMap(props => (
      <GoogleMap
          defaultZoom={12}
          defaultCenter={{lat: -0.023559, lng: 37.90619300000003}}
          onClick={e => props.onMapClick(e)}
      >
       {console.log("belew",props.marks)}
          {props.marks.map((mark, index) => <Marker key={index} 
    
          // position={mark}
          position={{ lat: mark.lat(),  lng: mark.lng() }}
          // position={{ lat: this.state.markerPosition.lat, lng: this.state.markerPosition.lng }}
        
           />)}
          {/* <Autocomplete
             style={{
              width: '50%',
              height: '40px',
              paddingLeft: '16px',
              marginTop: '10px',
              marginBottom: '100px'
             }}
            
          //    onPlaceSelected={ this.onPlaceSelected }
             types={['(regions)']}
            /> */}
      </GoogleMap>
  ))
);


class serMarketRedirect extends Component {
    state={
      price:'',
       photo:[],
        lat:'',
        lng:'',
        businessName:'',
        marketName:'',
        description:'',
        catagory:'',
        email:'',
        contactperson:'',
         progress:0
      }
    
    handelChange=(e)=>{

        this.setState({
        [e.target.id]:e.target.value,
        })
   console.log(this.state.file)
 }

      handleSubmit=(e)=>{
    
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
      console.log(this.state)
      
      //  this.props.history.push('/')
       console.log("upload",this.state)
      }
  handleUpload=(e)=>{
    
      }
      setRef=ref=>{
          this.file=ref
      }
    render() {
        const {auth,profile}=this.props
        const {seller}=this.props
        if(profile.userType!=='Admin') return <Redirect to='/'/>
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
         <h2 style={styles}  class='pb-2 pt-4 text-center'>Add New Market</h2>
                   
                  <div class="row "  >
                  <div class="col-md-10 mx-auto " >
                            
                            <SetMarket seller={seller}
                                       sellerInfo={this.state}/>
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
      profile:state.firebase.profile
    }
  }

export default connect(mapStateToProps,null)(serMarketRedirect);
