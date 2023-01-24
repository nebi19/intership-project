import React from 'react';
import MenuList from './sideBar/menuList'
import Header from './Header/header'
import DashBoard from './content/dashboard'
import CatagoryAdd from './content/CatagoryAdd'
import SetMarket from './content/SetMarket'
import Messages from './content/Messages'
import{Redirect} from 'react-router-dom'
import { connect } from 'react-redux'
class App extends React.Component {

    state = { selectedItem: 'Messages' };

    render() {
        const { selectedItem } = this.state;
        const { auth,profile } = this.props;
        if(!auth.uid) return<Redirect to='/'/>
       else if(profile.userType==='seller') return<Redirect to='/profile'/>
       else if(profile.userType==='Buyer') return<Redirect to='/products'/>
       
        return (
              <div class="container-fluid ">
                    <Header/>
            <div className='row ' >
                <div className='col-lg-3 col-sm-12' >
                    <MenuList selectedItem={selectedItem} onChange={(selectedItem) => this.setState({ selectedItem })} />
                </div>
                <div className='col-lg-9 col-sm-12  '>
                  <div className='  row ' >
                      
                  </div>
                                                                    
                      {selectedItem=='Messages'&&<Messages title={selectedItem} />
                         ||selectedItem=='SetMarket'&&<SetMarket title={selectedItem} />
                         ||selectedItem=='CatagoryAdd'&&<CatagoryAdd title={selectedItem} />
                          
                       }
                   
                </div>
            </div>
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return{
      authError: state.auth.authError,
      auth:state.firebase.auth,
      profile:state.firebase.profile
    }
  }
  export default connect(mapStateToProps, null)( App)
