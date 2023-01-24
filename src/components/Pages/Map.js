import React, { Component } from "react";
import { withScriptjs, withGoogleMap, GoogleMap, Circle,Marker } from "react-google-maps";
import Autocomplete from 'react-google-autocomplete';
const Map = withScriptjs(
    withGoogleMap(props => (
        <GoogleMap
            defaultZoom={12}
            defaultCenter={{ lat: -34.397, lng: 150.644 }}
            onClick={e => props.onMapClick(e)}
        >
         {console.log("belew",props.mark)}
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

class R extends Component {
    state = {
        marks: [],
        markerPosition: {
            lat:null,
            lng:null
        }
     
    };

    setMark = e => {
            let latValue= e.latLng.lat()
            let  lngValue=e.latLng.lng()
         console.log("really", [e.latLng.lat(),e.latLng.lng()])
       this.setState({ marks: [...this.state.marks,e.latLng],
            markerPosition: {
                lat: latValue,
                lng: lngValue
               }
        });
    };

    deleteMarkS = () => {
        this.setState({
            marks: []
            
        });
    };

    render() {
        const { marks } = this.state;
        console.log("eshi",{marks})
        return (
            <div>
                <button onClick={this.deleteMark}>DELETE MARKS</button>
                <Map
                    googleMapURL="http://maps.googleapis.com/maps/api/js?key=AIzaSyBkNxsjV5ZW3NM5DvV2uoZh9XKY46JVosE"
                    loadingElement={<div style={{ height: `100%` }} />}
                    containerElement={<div style={{ height: `400px` }} />}
                    mapElement={<div style={{ height: `100%` }} />}
                    onMapClick={this.setMark}
                    center={{lat: -0.45275,lng: 39.64601}}
                    marks={marks}
                />;
            </div>
        );
    }
}

export default R;