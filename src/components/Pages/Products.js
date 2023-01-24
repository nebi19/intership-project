import React, { Component } from 'react'
import bg_1 from '../../images/bg_1.jpg';
import pin from '../../images/pin_img.png';
import ListProducts from './ListProducts';
import Carousel from "react-multi-carousel";
import './Products.css';
import Navbar from '../layout/Navbar';
import {connect} from 'react-redux';
import {compose} from 'redux'
import{Redirect,Link} from 'react-router-dom'
import { firestoreConnect } from 'react-redux-firebase'
import { GoogleComponent } from 'react-google-location' 
import Geocode from "react-geocode";
import {addLike} from '../../store/actions/AddLikesaction';
import { Select, Layout, Menu, Breadcrumb, Icon , Dropdown, Button } from 'antd';


const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;
const { Option } = Select;
Geocode.setApiKey('AIzaSyCd5GSrdhkRjDu53HCBVL7fh5QXa1-gIBE');
Geocode.setLanguage("en");
Geocode.setRegion("es");
Geocode.enableDebug();
function onChange(value) {
  console.log(`selected ${value}`);
}

function onBlur() {
  console.log('blur');
}

function onFocus() {
  console.log('focus');
}

function onSearch(val) {
  console.log('search:', val);
}
const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 5,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 4,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 2,
  },
};

class Products extends Component {
  state={
    search:'',
    location:'',
    value:[],
    place:null,
    northEast:[],
    southWest:[],
    searchedLocation:'',
    searched:'',
    searchedP:'',
    searchedName:'',
    id:'',
    LocationError:'',
    totalLike:-1,
    isLiked:-1,
    likeState:[],
    collapsed: false,
  }
  
  onCollapse = collapsed => {
    console.log(collapsed);
    this.setState({ collapsed });
  };
  handleLike=(e)=>{
    console.log('handle like click button',this.props.like);
    this.setState({
      likeState:this.props.like.filter((item)=>item.userId===this.props.auth.uid),
     })
     console.log('likeState',this.state.likeState.length)

    // this.setState({
    //   isLiked:1
    // })
    console.log('isLiked',this.state.isLiked)
    this.props.addLike(e);
  }
 
 handelChange=(e)=>{
   console.log(e.target.value,'the clicked catagory',e.target.id)
    this.setState({
      [e.target.name]:e.target.value,
      id:e.target.id
    })
    if(e.target.id==='search')
    {
      this.handleSubmit(e.target.value)
    }
     }
 
     handleSubmit=(e)=>{
       console.log('submited,,,,',e.type)
       var catagorySearch=this.state.searched
       var locationSearch=this.state.searchedLocation
      if(e.type)
      {e.preventDefault();}
      else{
        if(this.props.Market.filter(item=>item.MarketName===e).length===0)
        {catagorySearch=e}
        else
        locationSearch=e
      }
      console.log(catagorySearch,'come onnnnnn')
      this.setState({
        searchedP:catagorySearch
      })
      this.setState({
        LocationError:''
      })
      // console.log(this.state.searched,this.state.searchedLocation,'searched')
      this.search(this.props,catagorySearch,locationSearch,this.state.searchedName,this.state.id)
        //  this.props.history.push('/')
         
      }
        search=(props,searchvalue,searchedLocation,searchName,id)=>{
        const {seller,location}=props;
            if(seller){
        const works = seller.filter((val)=>{
          
          if(searchedLocation===''){
            this.setState({
              northEast:[],
              southWest:[]
            })
          }
       
          if(searchedLocation!==''){
            let flag=1
                  // console.log(this.props.Market)
                  this.props.Market&&this.props.Market.map((element,index)=>{
                   
                    if(searchedLocation===element.MarketName){
                      console.log(element.MarketName,searchedLocation)
                      this.setState({
                        mapPosition:{
                          lat:element.southWast.lat+(element.northEast.lat-element.southWast.lat)/2,
                          lng:element.southWast.lng+(element.northEast.lng-element.southWast.lng)/2
                        },
                        northEast:element.northEast,
                        southWest:element.southWast
                      })
                      flag=1
                      // console.log('hello i am true')
                    }
                  })
                    if(flag===0){
            Geocode.fromAddress(searchedLocation).then(
              
              response => {
                const { lat, lng,northeast } = response.results[0].geometry.location;
                // console.log("results",lat)
                if(response.results[0].geometry.bounds)
               {const r= response.results[0].geometry.bounds.northeast
               const c=response.results[0].geometry.bounds.southwest
                this.setState({
                  northEast:r,
                  southWest:c,
                  LocationError:''
                })}
                else{
                  this.setState({
                    LocationError:'error location not found'
                  })
                  console.log('error the elemets')
                }
              },
              error => {
                // console.error("error",error);
              }
            );}
           }
           
          //  console.log(searchvalue,'hellooojskdfjdjs')  
        if(searchvalue!==''&&searchName===''){
         
       return (
         val.catagory.toLowerCase().includes(searchvalue.toLowerCase())
         )}
         if(searchName!==''&&searchvalue===''){
         console.log(val,val.businessName.toLowerCase().includes(searchName.toLowerCase()),'hello')
          return (
            
            val.businessName.toLowerCase().includes(searchName.toLowerCase())
            )}
            if(searchvalue!==''&&searchName!==''){
         
              return (
                val.catagory.toLowerCase().includes(searchvalue.toLowerCase())&&val.businessName.toLowerCase().includes(searchName.toLowerCase())
                )}
           

           
        });
        console.log(works)
        this.setState({
          value:works
        })
      }
      
       }
       handelChangeLocation=(e,id)=>{
        console.log(e,'the inputttt')
           this.setState({
            searchedLocation:e,
             id:'location'
           })
          this.handleSubmit(e)
            }
       onresize=()=>{
        this.setState({
          x:window.innerWidth
        })
      
        }
      //  userLike=(like,auth)=>{
      //    this.setState({
      //     likeState:like.filter((item)=>item.userId===auth.uid)
      //    })
      //    console.log('likeState',this.state.likeState.length)
      //  }
      
  render()
   {
    
    const { authError,auth,profile,like,catagory,Market } = this.props;
    const {seller,location}=this.props;
    const {innerWidth}=window
    window.addEventListener("resize", this.onresize);
    if(!auth.uid) return<Redirect to='/'/>
    if(profile.userType==='seller') return<Redirect to='/profile'/>
    if(profile.userType==='Admin') return<Redirect to='/admin'/>
    const menu = (
      <Menu>
        {  
          Market&&Market.map((cat,index)=>{
                
                    return  (
                      <Menu.Item>
                      <a target="_blank" rel="noopener noreferrer" id='location' name='searchedLocation'  onClick={this.handelChangeLocation.bind(this,cat.MarketName)}>
                      {cat.MarketName}
                    </a>           
                      </Menu.Item>
                    
                 
                    )
              })
          }
          <Menu.Item>
                    <a target="_blank" rel="noopener noreferrer" id='location' name='searchedLocation'  onClick={this.handelChangeLocation.bind(this,'')} >
                    show all
                  </a>           
          </Menu.Item> 
      </Menu>
    );
    return (
      <div>
        <Navbar/>
<div class="hero-wrap hero-bread"  style ={{ backgroundImage:`url(${bg_1})`}}>
<div class="container">
<div class="row no-gutters slider-text align-items-center justify-content-center">
<div class="col-md-9 text-center">
<p class="breadcrumbs"><span class="mr-2"><Link to="/">Home</Link></span> <span>Products</span></p>
<h1 class="mb-0 bread">Products</h1>
</div>
</div>
</div>
</div>
<section class="ftco-section">
<div class="container">
<div class="row justify-content-center">
<div class="col-md-10 mb-5 text-center">
<h3 style={{color:'#82ae46',fontFamily:'poppins,Arial,sans-serif',lineHeight:'1.5', fontweight:'400'}}
          >Products</h3>

</div>
</div>
</div>
<form >
<div class="row ml-2" >
<div class="col-lg-5 col-sm-6 col-md-4" >
<input type="text" class="form-control" id='name' name='searchedName' onChange ={this.handelChange}  placeholder="Search Product name" display='inline-block' /> 

</div>

   <div class="col-lg-4 col-md-3 col-sm-6  ">
   
   {
     innerWidth<=768?
     <Dropdown overlay={menu} placement="bottomCenter">
     <img style={{width:'50px',marginLeft:'40%'}}class="img-fluid" src={pin} alt="Colorlib Template"/>
   </Dropdown>:
   <select class="form-control" id='location' name='searchedLocation'  onChange ={this.handelChange} >
   
   <option value="" selected disabled>By Location</option>
             {  
             Market&&Market.map((cat,index)=>{
                   
                       return  (
                          
                       <option   value={cat.MarketName}
                       >{cat.MarketName}</option>
                    
                       )
                 })
             }
     <option   value=''>Show all</option>
    </select>     
  
            }
   {this.state.LocationError}</div>
<div class="col-lg-3 col-sm-8 col-md-5">
 <button class="search-button "  onClick={this.handleSubmit}>Search</button>
 </div>
 
</div>

</form>
<div class='row '>
<div class="col-lg-2 "></div>
<div class="col-lg-8 " >
  {catagory?
    <Carousel    responsive={responsive} showArrows={true}
      infinite="true"  showIndicators={true} showThumbs={false}> 
              <div style={{paddingLeft:"40%"}}>
                {this.state.searched!==''?
                <button  class="search-button-cat "                 
                style={{backgroundColor:'white',color:'black',
                borderColor:'white',boxShadow:'0 white'}}
                id='search'  onClick ={this.handelChange} value='' 
                name='searched'> Show All</button>
                : <button  class="search-button-cat " 
                 style={{color:'black',borderColor:'white',
                boxShadow:'0 white'}}id='search'  onClick ={this.handelChange} value='' 
                name='searched'>
                   Show All</button>
              }
              </div>
              {catagory&&catagory.map((cat,i)=>{
                // console.log('the image isFinite',image)
               return ( 
                
               <div style={{paddingLeft:"40%"}}>
                 {this.state.searched!==cat.catagory?
                <button  class="search-button-cat "  
                style={{backgroundColor:'white',color:'black',borderColor:'white'
                ,boxShadow:'0 white'}}id='search'  onClick ={this.handelChange}
                 value={cat.catagory} name='searched'> {cat.catagory}</button>
                : <button  class="search-button-cat "  style={{color:'black',
                borderColor:'white',boxShadow:'0 white'}}id='search'  
                onClick ={this.handelChange} value={cat.catagory} 
                name='searched'> {cat.catagory}</button>
              } 
                </div>
             
               )
              })}
               
              
                 </Carousel>:null}
</div>
</div>
</section>
{console.log(this.state.searchedP,'the searched')}
    {(this.state.value.length===0 && this.state.searchedP!=='')
      ?<h2 style={{textAlign:'center'}}>Product not found</h2>:<div>{this.state.value.length===0?(<ListProducts seller={seller}
                                                like={like}
                                                totalLike={this.state.totalLike}
                                                location={location}
                                                southWest={this.state.southWest}
                                                northEast={this.state.northEast}
                                                countLike={this.countLike}
                                                handleLike={this.handleLike}
                                                isLiked={this.state.isLiked}
                                                search={this.state.searched}/>)
    :(<ListProducts seller={this.state.value}
                                                    location={location}
                                                    like={like}
                                                    isLiked={this.state.isLiked}
                                                    countLike={this.countLike}
                                                    handleLike={this.handleLike}
                                                    totalLike={this.state.totalLike}
                                                    southWest={this.state.southWest}
                                                    northEast={this.state.northEast}
                                                    search={this.state.searched}/>)}</div>}
</div>
    )
  }
}
const mapStateToProps=(state,ownProps)=>{
  // console.log("ma",ownProps)
  const id=ownProps.match.params.id;
  // console.log("okay",state)
  return {
    seller:state.firestore.ordered.sellerUpload,
    catagory:state.firestore.ordered.catagoryAdd,
    location:state.firestore.ordered.sellerLocation,
    authError: state.auth.authError,
    auth:state.firebase.auth,
    Market:state.firestore.ordered.setMarket,
    profile:state.firebase.profile,
    like:state.firestore.ordered.like
}
}
const mapDispatchToProps=(dispatch)=>{
  return{
      addLike:(like)=>dispatch(addLike(like))
  }
}

export default compose(connect(mapStateToProps,mapDispatchToProps),  firestoreConnect([
  {collection:'sellerUpload',orderedBy:['createdAt','desc']},
  {collection:'catagoryAdd',orderBy: ['createdAt','asc']},
  {collection:'sellerLocation',orderedBy:['createdAt','desc']},
  {collection:'like'},
  {collection:'setMarket',orderedBy:['time','desc']}
]))(Products);