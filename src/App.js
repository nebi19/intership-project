import React from 'react';
import { BrowserRouter,Switch,Route } from 'react-router-dom';

import Footer from'./components/layout/Footer';
import Products from './components/Pages/Products';
import Tryin from './components/Pages/tryin';
import AboutUs from './components/Pages/AboutUs';
// import ContactUs from './components/Pages/contact';
import ContactUs from './components/Pages/ContactUs';
import SellerUpload from './components/Pages/SellerUpload';
import SignIn from './components/auth/SignIn'; 
import SignInPhone from './components/auth/SignInPhone'; 
import SignUpPhoneB from './components/auth/SignUpPhoneB'; 
import SignUpPhoneS from './components/auth/SignUpPhoneS'; 
import Chat from './components/chat/App'
import Comment from './components/comment/commentBox'
import SignUpSeller from './components/auth/SignUpSeller';
import SignUpBuyer from './components/auth/SignUpBuyer';
import Home from './components/Pages/HomePage';
import Nomatch from './Nomatch';
import Profile from './components/Pages/Profile'
import EditProfile from './components/Pages/EditProfile'
import MapBuyer from './components/Pages/MapBuyerRedirect'
import setMarket from './components/Pages/SetMarketRedirect';
import Mychat from './components/myChat/myChat';
import ChatS from './components/myChat/chat/chat';
import ScrollToTop from './ScrollUp'
import ForgotPsw from './components/auth/ForgotPsw'
import Admin from './components/admin/AdminApp'
import CatagoryAdd from './components/Pages/CatagoryAdd'
function App() {
  return (
    <div className="App">  
      <BrowserRouter>
      <ScrollToTop/> 
    
        <Switch>         
        <Route exact path='/'component={Home}/>
        <Route exact path='/admin'component={Admin}/>
        <Route path='/products'component={Products} />
        <Route path='/tryin'component={Tryin} />
        <Route path='/contactus'component={ContactUs}/>
          <Route path='/aboutus'component={AboutUs}/> 
          <Route path='/signin'component={SignIn}/> 
          <Route path='/signinphone'component={SignInPhone}/> 
          <Route path='/signupphoneB'component={SignUpPhoneB}/> 
          <Route path='/signupphoneS'component={SignUpPhoneS}/> 
          <Route path='/forgotpsw'component={ForgotPsw}/> 
          {/* <Route path='/setmarket'component={setMarket}/>  */}
          <Route path='/addcatagory'component={CatagoryAdd}/> 
          <Route path='/chat:id' component={Chat}/>
          <Route exact path='/schat:id' component={ChatS}/>
          <Route path='/mychat' component={Mychat}/>
          <Route path='/comment:id' component={Comment}/>
          <Route path='/signupBuyer'component={SignUpBuyer}/> 
          <Route path='/signupSeller'component={SignUpSeller}/>
          <Route path='/addproducts'component={SellerUpload}/> 
          <Route path='/mapBuyer'component={MapBuyer}/>
          <Route path='/profile'component={Profile}/>
          <Route path='/editprofile'component={EditProfile}/>
          <Route exact path='*' component={Nomatch} />
        </Switch>
      <Footer/>
    </BrowserRouter>
    </div>
  );
}

export default App;
