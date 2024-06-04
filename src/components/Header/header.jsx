import React, { useRef } from 'react'
import { Container, Row } from "reactstrap"
import { NavLink, useNavigate } from 'react-router-dom'
import "./header.css"
import { useSelector } from 'react-redux'
import useAuth from '../../custom-hooks/useAuth'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { signOut } from 'firebase/auth'
import { auth } from '../../Firebase/firebase.config'
import { toast } from 'react-toastify'
import userIcon from './user.png'

const nav_link = [
  {
    path: '/',
    display: 'home'
  },
  {
    path: 'shop',
    display: 'shop'
  },
  {
    path: 'cart',
    display: 'cart'
  }
]

const Header = () => {

  const totalQuantity=useSelector(state=>state.cart.totalQuantity)
  const profileActionRef = useRef(null)

  const navigate = useNavigate()

  const {currentUser} = useAuth()

  const navigateToCart=()=>{
    navigate('/cart')
  }

  const logout = ()=>{

    signOut(auth).then(()=>{
      toast.success('logged out succesfully')
      navigate('/');
    }).catch((err)=>{
      toast.error(err)
    })

  }


  // const userIcon = "./logo.jpg"


  const toggleProfileActions = () => profileActionRef.current.classList.toggle('show__profileActions')

  console.log(userIcon)

  return <header>
    <Container>
      <Row>
        <div className='navbar1'>
          <div className="logo_section1">
            {/* <img src="" alt="" /> */}
            <img src="https://companieslogo.com/img/orig/SHOP_BIG-cc7ba62b.png?t=1633439432" height={40} alt="" />
          </div>

          <div className='nav_options1'>
            
            <ul>
              {
                nav_link.map(items => (
                  <li>
                    <NavLink to={items.path} className={({ isActive }) => isActive ? 'active' : ''} >{items.display}</NavLink>
                  </li>
                ))
              }
            </ul>
          </div>

          <div className="nav_icons1">
            {/* <span className='heart1'>
              <img src="https://www.iconpacks.net/icons/2/free-heart-icon-3510-thumb.png" height={30} alt="" />
              <span className='badge1'>1</span>
            </span> */}

            <span className='cart_icon1' onClick={navigateToCart}>
              <img src="https://d1nhio0ox7pgb.cloudfront.net/_img/g_collection_png/standard/512x512/shopping_cart.png" height={30} alt="" />
              <span className='badge1'>{totalQuantity}</span>
            </span>

            <div className='user_icon1' >
              <motion.img onClick={toggleProfileActions} whileTap={{ scale: 1.1 }} src={currentUser ? currentUser.photoURL : userIcon} height={30} alt="" />
              
              <div className="profile__actions" ref={profileActionRef} onClick={toggleProfileActions}>
                {
                  currentUser ? <span onClick={logout}>Logout</span> 
                  : 
                  <div className='d-flex align-items-center justify-content-center flex-column'>
                    <Link to='/signup' style={{ textDecoration: 'none' } }>Signup</Link>
                    <Link to='/login'  style={{ textDecoration: 'none' } }>login</Link>
                  </div>
                }
              </div>
            </div>
            <span className='hamburger1'><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Hamburger_icon.svg/1200px-Hamburger_icon.svg.png" height={30} alt="" /></span>
          </div>
        </div>
      </Row>
    </Container>
  </header>
}

export default Header