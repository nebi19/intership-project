import React, { Component } from 'react';
import { withGoogleMap, GoogleMap, withScriptjs, InfoWindow, Marker } from "react-google-maps";
import Geocode from "react-geocode";
Geocode.setApiKey( "AIzaSyBkNxsjV5ZW3NM5DvV2uoZh9XKY46JVosE" );

Geocode.enableDebug();

class Mapb extends Component{

	state = {
        searched:'',
        markerPosition: [],   
        mapPosition: {
            lat: -0.023559, lng: 37.90619300000003
        },  
    };
   
	
	
	/**
	 * This Event triggers when the marker window is closed
	 *
	 * @param event
	 */
	onInfoWindowClose = ( event ) => {

	};
	render(){
		
		
		
		const AsyncMap = withScriptjs(
			withGoogleMap(
				props => (
          
					<GoogleMap google={ this.props.google }
                     defaultZoom={ this.props.zoom }
                     defaultCenter={{ lat: this.state.mapPosition.lat, lng: this.state.mapPosition.lng }}
                     
					> 
					
					
            
            { 
				
			
            props.marks.map((mark, index) =><>
			{console.log('let this work',mark[2],mark[1],mark[0])}
			 <Marker key={index} 
            position={{ lat: mark[0], lng: mark[1]  }}
          
             />
             <InfoWindow
             onClose={props.onInfoWindowClose}
             position={{ lat: ( mark[0]+ 0.0108 ), lng: mark[1]}}
            >
             <div>
              {mark[2]}
             </div>
			</InfoWindow></>)
		}
            
						
					</GoogleMap>
				)
			)
		);
		
		let map;
		if( this.props.center.lat !== undefined ) {
			map = <div>
				{console.log('2hello',this.state.mapPosition)}
				
				<AsyncMap
					googleMapURL="http://maps.googleapis.com/maps/api/js?key=AIzaSyBkNxsjV5ZW3NM5DvV2uoZh9XKY46JVosE&libraries=places"
					
					loadingElement={
						<div style={{ height: `100%` }} />
					}
					containerElement={
						<div style={{ height: this.props.height }} />
          }
          center={this.state.mapPosition.lat,this.state.mapPosition.lng}
					mapElement={
						<div style={{ height: `100%` }} />
          }
          marks={this.props.marks}
				/>
			</div>
		} else {
			map = <div style={{height: this.props.height}} />
		}
		return( map )
	}
}

export default Mapb;