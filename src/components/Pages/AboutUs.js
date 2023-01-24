import React, { Component } from 'react'
import about from '../../images/about.jpg';
import about_2 from '../../images/about_2.jpg';
import person_1 from '../../images/person_1.jpg';
import person_2 from '../../images/person_2.jpg';
import marketday from '../../images/marketday.jpg';
import bg_3 from '../../images/bg_3.jpg';
import {Link} from 'react-router-dom'
import Navbar from '../layout/Navbar';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 3,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };
export default function AboutUs() {
    return (
<div> 
<Navbar/>
<div class="hero-wrap hero-bread"  style ={{ backgroundImage:`url(${marketday})`,height:'80px',viewPort:'0 0 500 50'}}>
<div class="container">
<div class="row no-gutters slider-text align-items-center justify-content-center">
<div class="col-md-9 text-center">
<p class="breadcrumbs"><span class="mr-2"><Link to="/"></Link></span> <span></span></p>
<h4 class="mb-0 bread">Helping millions Grow better</h4>
</div>
</div>
</div>
</div>
<section class="ftco-section ftco-no-pb ftco-no-pt bg-light">
<div class="container">
<div class="row">
<div class="col-md-5 p-md-5 img img-2 d-flex">
<p>
<h2>Our Mission</h2>
There's this notion that to grow a business, 
you have to be ruthless. But we know there's a better way to grow. One where what's good for the bottom line is also good for customers. We believe businesses can grow with a conscience, and succeed with a soul — and that they can do it with inbound. That's why we've created a platform uniting software, education, and community to help businesses grow better every day.
</p>
</div>
<div class="col-md-7 py-5 wrap-about pb-md-5">
<div class="pb-md-5">
{/* <p>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean.</p>
<p>But nothing the copy said could convince her and so it didn’t take long until a few insidious Copy Writers ambushed her, made her drunk with Longe and Parole and dragged her into their agency, where they abused her for their.</p>
<p><a href="#" class="btn btn-primary">Shop now</a></p> */}
</div>
</div>
</div>
</div>
</section>        

<section class="ftco-section bg-light">
<div class="container">
<div class="row no-gutters ftco-services">
<div class="col-lg-4 text-center d-flex align-self-stretch ">
<div class="media block-6 services mb-md-0 mb-4">
<div class="icon bg-color-1 active d-flex justify-content-center align-items-center mb-2">
<span class=""></span>
</div>
<div class="media-body">
<h3 class="heading">
Advantage Sokoleo</h3>
 <span  class="p-5 line">Why choose Sokoleo? See what our customers have to say about the most popular eCommerce platform in the world.</span>
</div>
</div>
</div>
<div class="col-lg-4 text-center d-flex align-self-stretch ftco">
<div class="media block-6 services mb-md-0 mb-4">
<div class="icon bg-color-2 d-flex justify-content-center align-items-center mb-2">
<span ></span>
</div>
<div class="media-body">
<h3 class="heading">In the News</h3>
<span  class="p-5 line" >
Read the latest news from Sokoleo, and what others are saying about us.</span>
</div>
</div>
</div>
<div class="col-lg-4 text-center d-flex align-self-stretch ftco">
<div class="media block-6 services mb-md-0 mb-4">
<div class="icon bg-color-3 d-flex justify-content-center align-items-center mb-2">
<span class="flaticon-award"></span>
</div>
<div class="media-body">
<h3 class="heading">Working at Sokoleo</h3>
<span class="p-5 line">
We're passionate about innovating commerce and helping businesses succeed online. Want to join?
<Link to='/signin'>Join</Link>
</span>
</div>
</div>
</div>

</div>
</div>
</section>
<section class="ftco-section testimony-section">
<div class="container">
<div class="row justify-content-center mb-5 pb-3">
<div class="col-md-7 heading-section  text-center">
<h2 class="mb-4">Our satisfied customer says</h2>

<p>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in</p>
</div>
</div>
<div class="row">
<div class="col-md-12">
   
<Carousel  responsive={responsive} autoPlay="true" infinite="true" dots="true" showArrows="false"   showIndicators="false"
showThumbs="true" autoPlaySpeed='2000'  >
<div class="item">
<div class="testimony-wrap p-4 pb-5">
<div class="user-img mb-5" style={{backgroundImage:`url(${person_1})`}}>
<span class="quote d-flex align-items-center justify-content-center">
<i class="icon-quote-left"></i>
</span>
</div>
<div class="text text-center">
<p class="mb-5 pl-4 line">Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.</p>
<p class="name">Garreth Smith</p>
<span class="position">Marketing Manager</span>
</div>
</div>
</div>
<div class="item">
<div class="testimony-wrap p-4 pb-5">
<div class="user-img mb-5" style={{backgroundImage:`url(${person_2})`}}>
<span class="quote d-flex align-items-center justify-content-center">
<i class="icon-quote-left"></i>
</span>
</div>
<div class="text text-center">
<p class="mb-5 pl-4 line">Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.</p>
<p class="name">Garreth Smith</p>
<span class="position">Interface Designer</span>
</div>
</div>
</div>
<div class="item">
<div class="testimony-wrap p-4 pb-5">
<div class="user-img mb-5" style={{backgroundImage:`url(${person_1})`}}>
<span class="quote d-flex align-items-center justify-content-center">
<i class="icon-quote-left"></i>
</span>
</div>
<div class="text text-center">
<p class="mb-5 pl-4 line">Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.</p>
<p class="name">Garreth Smith</p>
<span class="position">Marketing Manager</span>
</div>
</div>
</div>
<div class="item">
<div class="testimony-wrap p-4 pb-5">
<div class="user-img mb-5" style={{backgroundImage:`url(${person_2})`}}>
<span class="quote d-flex align-items-center justify-content-center">
<i class="icon-quote-left"></i>
</span>
</div>
<div class="text text-center">
<p class="mb-5 pl-4 line">Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.</p>
<p class="name">Garreth Smith</p>
<span class="position">Interface Designer</span>
</div>
</div>
</div>
<div class="item">
<div class="testimony-wrap p-4 pb-5">
<div class="user-img mb-5" style={{backgroundImage:`url(${person_1})`}}>
<span class="quote d-flex align-items-center justify-content-center">
<i class="icon-quote-left"></i>
</span>
</div>
<div class="text text-center">
<p class="mb-5 pl-4 line">Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.</p>
<p class="name">Garreth Smith</p>
<span class="position">Marketing Manager</span>
</div>
</div>
</div>
<div class="item">
<div class="testimony-wrap p-4 pb-5">
<div class="user-img mb-5" style={{backgroundImage:`url(${person_2})`}}>
<span class="quote d-flex align-items-center justify-content-center">
<i class="icon-quote-left"></i>
</span>
</div>
<div class="text text-center">
<p class="mb-5 pl-4 line">Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.</p>
<p class="name">Garreth Smith</p>
<span class="position">Interface Designer</span>
</div>
</div>
</div>
</Carousel>
</div>
</div>
</div>
</section>
<section class="ftco-section ftco-no-pt ftco-no-pb py-5 bg-light">
<div class="container py-4">
<div class="row d-flex justify-content-center py-5">
<div class="col-md-6">
<h2 style={{fontSize:'22px'}} class="mb-0">Subcribe to our company</h2>
<span>Get e-mail updates about our latest Sellers and special offers</span>
</div>
<div class="col-md-6 d-flex align-items-center">
<form action="#" class="subscribe-form">
<div class="form-group d-flex">
<input type="text" class="form-control" placeholder="Enter email address"/>
<input type="submit" value="Subscribe" class="submit px-3"/>
</div>
</form>
</div>
</div>
</div>
</section>

        </div>
    )
}
