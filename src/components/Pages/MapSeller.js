import React, { Component } from "react";
import {sellerupload} from '../../store/actions/SellerUploadAction';
import {getLocation} from '../../store/actions/LocationAction';
import { withScriptjs, withGoogleMap, GoogleMap, Rectangle,Marker } from "react-google-maps";
import {connect} from 'react-redux';
import {compose} from 'redux';
import { firestoreConnect } from 'react-redux-firebase';

import Geocode from "react-geocode";
import { Redirect } from "react-router";
Geocode.setApiKey( "AIzaSyCd5GSrdhkRjDu53HCBVL7fh5QXa1-gIBE" );
Geocode.enableDebug();

class MapSeller extends Component {
    state = {
        searched:'',
        markerPosition:[],   
        mapPosition: {
            lat: -0.023559, lng: 37.90619300000003
        },
        markerFirst:false, 
        fillColor:'red',
        fillReq:'',
        north:'',
        south:'',
        east:'',
        west:'',
        LocationFound:''
    };

    setMark = e => {
        
        console.log('this is it',e.latLng)
       this.setState({ 
markerPosition: [e.latLng],
        pos:[e.latLng.lat(),e.latLng.lng()]
        
    
        });
        
        
        console.log('the array ',this.state.pos)
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
                        LocationFound:''
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
                        LocationFound:'',
                        north:element.northEast.lat,
                        south:element.southWast.lat,
                        east:element.northEast.lng,
                        west:element.southWast.lng
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
                        
                        this.setState({
                          mapPosition:t,
                          LocationFound:''
                        })
                        
                      },
                      error => {
                        flag=-1
                        console.error("error",error);
                        this.setState({
                          LocationFound:'Location not found'
                        })
                      }
                    )
                    ;}
                  
                   }
                  
                   
                };
                search(this.props,this.state.searched)	
              console.log(this.state.mapPosition,'this should work')
              
               
         }
    onhandleSubmitform=e=>{
        e.preventDefault();
        console.log(this.props.sellerInfo.photo.lengh,this.props.sellerInfo.photo)
        if(this.props.sellerInfo.photo.length===0){
          this.setState({
            fillReq:'Dear '+this.props.profile.name +'you haven\'t uploaded the images',
            fillColor:'red'
        })
        }
      else if(this.props.sellerInfo.flag==='black'||this.props.sellerInfo.discription===''||this.props.sellerInfo.PhoneNumber===''||this.props.sellerInfo.catagory===''||this.props.sellerInfo.marketName===''||this.props.sellerInfo.price===''||this.props.sellerInfo.businessName===''){
          this.setState({
            fillReq:'Dear '+this.props.profile.name +' Please complete the form',
            fillColor:'red'
        })
        }
        else if(this.props.seller.filter(item=>item.businessName===this.props.sellerInfo.businessName).length!==0){
          this.setState({
            fillReq:'Dear '+this.props.profile.name +' The product name is already in use',
            fillColor:'red'
        })
        }
        else{

          this.setState({
            fillReq:'Product Successfully added',
            fillColor:'green'
        })
        this.state.markerPosition.map((Element,index)=>{
            this.setState({
                markerFirst:true
            })
            
            this.props.sellerInfo.lat=Element.lat()
            this.props.sellerInfo.lng=Element.lng()
            console.log('akjfbsgkfeudfhbjlg',this.props.sellerInfo)
            
       
            this.props.sellerupload({businessName:this.props.sellerInfo.businessName,marketName:this.props.sellerInfo.marketName,
              price:this.props.sellerInfo.price,catagory:this.props.sellerInfo.catagory,PhoneNumber:this.props.sellerInfo.PhoneNumber,
              photo:this.props.sellerInfo.photo,lat:this.props.sellerInfo.lat,lng:this.props.sellerInfo.lng,discription:this.props.sellerInfo.discription})
            this.props.getLocation([Element.lat(),Element.lng(),this.props.sellerInfo.businessName])
            
        })
        
      }
                
        
    }
    deleteMarkS = () => {
        this.setState({
            markerPosition: [],
            pos:[]
        });
    };

    render() {
        const Map = withScriptjs(
            withGoogleMap(props => (
                <GoogleMap
                    defaultZoom={12}
                    defaultCenter={{lat: props.center.lat, lng: props.center.lng}}
                    onClick={e => props.onMapClick(e)}
                >
                  <Rectangle
                    defaultUrl="https://www.lib.utexas.edu/maps/historical/newark_nj_1922.jpg"
                    defaultBounds={new window.google.maps.LatLngBounds(
                        new window.google.maps.LatLng(this.state.north, this.state.west),
                        new window.google.maps.LatLng(this.state.south, this.state.east)
                    )}
                    defaultOpacity={.5}
                    onClick={e => props.onMapClick(e)}
                    />
                 {console.log("belew",props.marks)}
                    {props.marks.map((mark, index) => <Marker key={index} 
              
                    // position={mark}
                    position={{ lat: mark.lat(),  lng: mark.lng() }}
                    // position={{ lat: this.state.markerPosition.lat, lng: this.state.markerPosition.lng }}
                  
                     />)}
                    
                </GoogleMap>
            ))
        );
        
        const { markerPosition } = this.state;
        
        console.log(this.state.LocationFound)
       
        return (
            <div >
                
                <div style={{marginLeft:'15%',marginBottom:'5%'}}>
                <input type="text"  style={{width:'60%',marginRight:'10%'}}class="form-control float-left"id='location' onChange ={this.handelChangeAuto}  placeholder="Location"/>
        <button class="btn btn-primary  px-5 " onClick={this.handleSubmit}>Search</button>
                </div>
                <div style={{marginLeft:'14%',marginBottom:'5%',fontSize:'20px'}}>{this.state.LocationFound}</div>
                <Map
                 googleMapURL="http://maps.googleapis.com/maps/api/js?key=AIzaSyBkNxsjV5ZW3NM5DvV2uoZh9XKY46JVosE"
                    loadingElement={<div style={{ height: `100%` }} />}
                    containerElement={<div style={{height: `500px` ,width:'80%', marginLeft:'10%',backgroundColor:'white'}} />}
                    mapElement={<div style={{ height: `100%` }} />}
                    onMapClick={this.setMark}
                    center={{lat:this.state.mapPosition.lat, lng: this.state.mapPosition.lng}}
                    marks={markerPosition}
                />
               
                <div style={{marginLeft:'10%'}}>
                <button onClick={this.deleteMarkS}    class="btn btn-primary  px-5">Clear</button>
                <button onClick={this.onhandleSubmitform} style={{marginLeft:'2%'}} class="btn btn-primary  px-5">Submit</button>
                </div>
                <div style={{marginLeft:'20%',marginTop:'8%',fontSize:'18px',color:'red'}}>
                {this.state.fillReq}
                </div>
            </div>
        );
    }
}
const mapStateToProps=(state)=>{
    return{
        Market:state.firestore.ordered.setMarket,
        profile:state.firebase.profile,
        seller:state.firestore.ordered.sellerUpload,
    }
  }
  const mapDispatchToProps=(dispatch)=>{
    return{
        sellerupload :(uploads)=>dispatch(sellerupload(uploads)),
        getLocation :(location)=>dispatch(getLocation(location))
    }
  }
 
  export default compose(connect(mapStateToProps,mapDispatchToProps),firestoreConnect([
    {collection:'sellerLocation',orderedBy:['time','desc']},
    {collection:'setMarket',orderedBy:['time','desc']},
    {collection:'sellerUpload',orderedBy:['time','desc']},
  ]))(MapSeller);