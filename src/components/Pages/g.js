import { GoogleComponent } from 'react-google-location' 
 
//... 
import React, { Component } from 'react';
 
 
 
const API_KEY = 'AIzaSyCd5GSrdhkRjDu53HCBVL7fh5QXa1-gIBE'  // how to get key - step are below
 
class HomeComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      place: null,
    };
  }
 
  render() {
  console.log("place",this.state.place)
  let r=this.state.place
  console.log("r",r)
    return (
      <div >
         <GoogleComponent
         
          apiKey={API_KEY}
          language={'en'}
          // country={in|country:pr|country:vi|country:gu|country:mp}
          coordinates={true}
          // locationBoxStyle={'custom-style'}
          // locationListStyle={'custom-style-list'}
          onChange={(e) => { this.setState({ place: e }) }} />
      </div>
 
    )
  } 
}
 
 
export default HomeComponent;
