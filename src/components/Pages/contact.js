import React from 'react';
import firebase from 'firebase/app';
import Navbar from '../layout/Navbar';
import Axios from 'axios'
export default class Emails extends React.Component {
  state={
	  email:'',
	  message:''
  }
  handleMessageChange(event) {
	  this.setState({[event.target.name]:event.target.value})
  }

  handleSubmit = event => {
	event.preventDefault();
  
  
	Axios.post('https://us-central1-ourprojectname.cloudfunctions.net/submit', this.state)
	  .then(res => {
		if (firebase) {
		  return firebase
			.database()
			.ref('contacts')
			.push(this.state);
		}
	  })
	  .catch(error => {
		console.log(error);
	  });
  };


  render() {
	return (<>
    <Navbar/>
	<form onSubmit={this.handleSubmit}>
  <label>
    e-mail:
    <br />
    <input type="email" name="email" value={this.state.email} onChange={this.handleMessageChange.bind(this)}  />
  </label>
  <br />
  <label>
    Message
    <br />
    <textarea type="text" name="message" value={this.state.message} onChange={this.handleMessageChange.bind(this)} />
  </label>
  <br />
  <input type="submit" value="submit" />
</form>
</>)
  }

  
}