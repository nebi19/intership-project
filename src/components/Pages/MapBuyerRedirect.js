import React, { Component } from "react";
import {connect} from 'react-redux';
import {compose} from 'redux';
import Navbar from '../layout/Navbar';
import { firestoreConnect } from 'react-redux-firebase';
import{Redirect} from 'react-router-dom'
import MapBuyyer from './MapBuyer'

import Geocode from "react-geocode";
Geocode.setApiKey( "AIzaSyBkNxsjV5ZW3NM5DvV2uoZh9XKY46JVosE" );
Geocode.enableDebug();
class MapBuyer extends Component {
    state = {
        searched:'',
        markerPosition: [],   
        mapPosition: {
            lat: -0.023559, lng: 37.90619300000003
        },  
        northEast:{
            lat: '',
             lng: ''
        },
		southWest:{
            lat: '', 
            lng: ''
        },
        LocationFound:''
    };
    handelChangeAuto=(e)=>{
        this.setState({
          searched:e.target.value,
        })
         }
    handleSubmit=(e)=>{
      
            e.preventDefault();
            
            const search=(props,searchvalue)=>{
                console.log(searchvalue)
                    
                  if (searchvalue==='')
                  {return(
                    this.setState({
                        mapPosition: {
                            lat: -0.023559, lng: 37.90619300000003
                        },
                    })
                  )}
                else {
                  let flag=0
                  console.log(this.props.Market)
                  this.props.Market&&this.props.Market.map((element,index)=>{
                    console.log(element)
                    if(searchvalue===element.MarketName){
                      
                      this.setState({
                        mapPosition:{
                          lat:element.southWast.lat+(element.northEast.lat-element.southWast.lat)/2,
                          lng:element.southWast.lng+(element.northEast.lng-element.southWast.lng)/2
                        },
                        northEast:element.northEast,
                        southWest:element.southWast
                      })
                      flag=1
                      console.log('hello i am true')
                    }
                  })
                    if(flag===0){
                    Geocode.fromAddress(searchvalue).then(
                      
                      response => {
                        const { lat, lng,northeast } = response.results[0].geometry.location;
                        const t=response.results[0].geometry.location
                        const r= response.results[0].geometry.bounds.northeast
					   const c=response.results[0].geometry.bounds.southwest
                        
                        this.setState({
                          mapPosition:t,
                          northEast:r,
						              southWest:c
                        })
                        console.log('northeast',r,'southwast',c)
                       
					   
						
                        
                      },
                      error => {
                        console.error("error",error);
                        this.setState({
                          LocationFound:'location not found'
                        })
                      }
                    )};
                   }
                  
                   
                };
                search(this.props,this.state.searched)	
              console.log(this.state.mapPosition,'this should work')
              
               
         }
    render(){
        const {location,Market,auth,profile} = this.props
        if(!auth.uid) return<Redirect to='/'/>
        if(profile.userType!=='Buyer') return<Redirect to='/'/>
        let array=[]
        
        
        
            location&&location.map((list,index)=>{
                if((list[0]>this.state.northEast.lat || list[0]<this.state.southWest.lat)||(list[1]>this.state.northEast.lng || list[1]<this.state.southWest.lng))
            {
              console.log('i have found one')
              
            }else{
              array.push(list)
            }})
    
        
        // if(!auth.uid )return<Redirect to='/'/>
        // if(auth.userType==='seller' )return<Redirect to='/mapSeller'/>
        return(<>
        <Navbar/>
            <div style={{ margin: '10%' }}>
             <div class="form-group row">
                          <div class="col-sm-5">
                            <input type="text"  class="form-control" id='location' onChange ={this.handelChangeAuto}  placeholder="Location"/>
                          </div>
                          <div class="col-sm-6">
                          <div class="form-group" style={{position: 'relative',  overflow:' hidden', display: 'inline-block'}}>
                          <button  class="btn btn-primary px-5 float-right" onClick={this.handleSubmit}>Search</button>
                      </div>
                    
                      </div>
                          </div>
				<MapBuyyer
                    google={this.props.google}
                    
					center={{lat:this.state.mapPosition.lat,lng:this.state.mapPosition.lng}}
                    height='600px'
                    marks={array}
					zoom={12}
				/>
			</div>
        </>)
    
    }
   
}

const mapStateToProps=(state)=>{
    return{
        location:state.firestore.ordered.sellerLocation,
        Market:state.firestore.ordered.setMarket,
        auth:state.firebase.auth,
        profile:state.firebase.profile
        
    }
  }
 
  export default compose(connect(mapStateToProps),  firestoreConnect([
    {collection:'sellerLocation',orderedBy:['time','desc']},
    {collection:'setMarket',orderedBy:['time','desc']}
  ]))(MapBuyer);
  
  