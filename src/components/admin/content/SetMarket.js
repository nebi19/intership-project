import React, { Component } from 'react'
import {connect} from 'react-redux';
import './catagory.css';
import fbConfig from'../../../config/fbConfig';
import {setmarket} from '../../../store/actions/setMarketAction';
import SetMarketRedirect from './setMarketRedirect'
import { withScriptjs, withGoogleMap, GoogleMap, Circle,Marker } from "react-google-maps";
import {compose} from 'redux';
import {removeMarket} from '../../../store/actions/setMarketAction';
import { firestoreConnect } from 'react-redux-firebase';

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


class SetMarket extends Component {
  state={
    Edit:false,
    Add:false,
    id:''
  }  
  handleclose=(id)=>{
    console.log(id)
this.props.removeMarket(id);
}
handleEdit=(id)=>{
  this.setState({
    Edit:true,
    id:id
  })
}
handleAdd=(id)=>{
  this.setState({
    Add:true,
    id:''
  })
}
  
    render() {
        const {auth,profile}=this.props
        const {seller}=this.props
     
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
      <div class="container py-2">  
      <div class="row "  > 
      <div class="col-md-10 mx-auto " style={{backgroundColor:'DarkGray'}} >
      {this.state.Edit||this.state.Add?<span style={{marginLeft:'5%',fontSize:'25px',marginBottom:'5%',cursor:'pointer'}} onClick={()=>this.setState({Edit:false,Add:false})}>Back to the list </span>
      :<span style={{marginLeft:'5%',marginTop:'2%',fontSize:'20px',marginBottom:'5%'}}>List of Markets </span>
      }{this.state.Edit||this.state.Add?null:<button style={{marginLeft:'50%',marginTop:'2%',fontSize:'20px',marginBottom:'5%'}}class="search-button"onClick={this.handleAdd}>Add</button>
    }</div>
      </div>  
      <div class="row ">
      {this.state.Edit||this.state.Add?<div class="col-md-10 mx-auto bg-white" >
         <h2 style={styles}  class='pb-2 pt-4 text-center'>Add New Market</h2>
                   
                  <div class="row "  >
                  <div class="col-md-10 mx-auto " >
                            
                            <SetMarketRedirect id={this.state.id}
                            Market={this.props.Market}
                            marketSetError={this.props.marketSetError}
                           />
                          </div>
                          </div>
              </div>:<div class="col-md-10 mx-auto bg-white" style={{paddingTop:'2%'}} >
          {this.props.Market?this.props.Market.length!==0?this.props.Market.map((item)=>{
            return  <li class="forliM" style={{width:'80%'}} >{item.MarketName}<div style={{width:'40%'}}class="closeM" >
              <button class="closeBTN" style={{marginTop:'2%',fontSize:'15px',width:'50px'}}  onClick={()=>this.handleEdit(item.id)}  >Edit</button>
            <button class="closeBTN" style={{marginTop:'2%',fontSize:'15px',width:'40px'}}  onClick={()=>this.handleclose(item.id)}>x</button></div></li>
          }):<div>No market set yet or check your internet and try again</div>:<div>Loading...</div>}    
        </div> 
    }
         {/* <div class="col-md-10 mx-auto bg-white" >
         <h2 style={styles}  class='pb-2 pt-4 text-center'>Add New Market</h2>
                   
                  <div class="row "  >
                  <div class="col-md-10 mx-auto " >
                            
                            <SetMarketRedirect />
                          </div>
                          </div>
              </div> */}
              
      
         
          
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
    profile:state.firebase.profile,
    Market:state.firestore.ordered.setMarket,
    
  }
}
const mapDispatchToProps=(dispatch)=>{
  return{
    removeMarket :(id)=>dispatch(removeMarket (id)),
  }
}

export default compose(connect(mapStateToProps,mapDispatchToProps),firestoreConnect([
  {collection:'sellerLocation',orderedBy:['time','desc']},
  {collection:'setMarket',orderedBy:['time','desc']}
]))(SetMarket);
