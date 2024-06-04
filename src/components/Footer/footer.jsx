import React from 'react'
import "./footer.css"

const Footer = () => {
  return (
    <>
      <div className="footer1">
        <div className='insidee' style={{ display: "flex", marginLeft: 120 }}>
          <div className="inner">
            <h4>ABOUT Shopify</h4>
            
            <p>VisitIndia REVIEWS</p>
            <p>WE ARE HIRING</p>
            <p>PRIVACY POLICIES</p>
            <p>COPYRIGHT POLICIES</p>
            <p>APPS</p>
            <p>SUPPORT</p>
          </div>
          <div className="inner" style={{ marginLeft: 30 }}>
            <h4>Top Categories</h4>
            <p>Mobile Phones</p>
            <p>Modern sofa</p>
            <p>Arm chair</p>
            <p>Smart Watches</p>

            {/* <h4>FOR BRANDS</h4>
            <p>PARTNER WITH US</p>
            <p>DESTINATION MARKETING</p>
            <h4>FOR TRAVEL AGENTS</h4>
            <p>SIGN UP AS A AGENT</p>
            <p>AGENT LOGIN</p> */}
          </div>
          <div className="inner">
            <h4>Useful links</h4>
            <p>Shop</p>
            <p>Cart</p>
            <p>Login</p>
            <p>Privacy Policy</p>
          </div>

          <div className='inner'>
            <h4>Contact</h4>
            <p><i class="ri-map-pin-line"></i>123 KPHB, Hyderabad</p> 
            <p> <i class="ri-phone-line"></i>+012-566-895</p>
            <p> <i class="ri-mail-line"></i>Example@gmail.com</p>
          </div>
        </div>
        {/* <div style={{ marginLeft: 80 }}>
          <h4>TRAVEL DESTINATIONS</h4>
          <img
            src="./imgs/Screenshot 2024-04-14 194840.png"
            height="300px"
            alt=""
          />
        </div> */}
      </div>
      <div className="mainftr">
        <div className="mainftrchild">
          <h3>© 2024 shopify.com All rights reserved.</h3>
          <p>
            The content and images used on this site are copyright protected and
            copyrights vests with the respective owners. The usage of the content
            and images on this website is intended to promote the works
          </p>
          <p>
            and no endorsement of the artist shall be implied. Unauthorized use is
            prohibited and punishable by law.
          </p>
        </div>
      </div>
    </>

  )
}

export default Footer