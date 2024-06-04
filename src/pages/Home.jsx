import React, { useEffect, useState } from 'react'
import "../styles/home.css"
import mainImage from '../assets/images/main.png'
import { Link, NavLink } from 'react-router-dom'
import ServiceData from '../data/services'
import { motion } from "framer-motion"
import ProductsList from '../UI/productsList'
import products from '../data/products'
import Clock from '../UI/clock'
import armchair from "../assets/images/arm-chair-03.jpg"

const Home = () => {
  const [trendingProducts, setTrendingProducts] = useState([])
  const [bestSalesProducts, setBestSalesProducts] = useState([])
  const [mobileProducts,setMobileProducts]=useState([])
  const [wirelessProducts,setWirelessProducts]=useState([])

  useEffect(() => {
    const filteredTrendingProducts = products.filter((item) => item.category === "chair")
    setTrendingProducts(filteredTrendingProducts)

    const filteredBestSalesProducts = products.filter((item) => item.category === "sofa")
    setBestSalesProducts(filteredBestSalesProducts)

    const filteredMobileProducts = products.filter((item) =>  item.category === 'mobile' || item.category === 'wireless')
    setMobileProducts(filteredMobileProducts)

    // const filteredWirelessProducts = products.filter((item)=> item.category === 'wireless' )
    // setWirelessProducts(filteredWirelessProducts)
  }, [])

  const targetDate = '2024-12-31T23:59:59'
  return (<>
    <div className='main'>
      <div className='caption'>
        <p>Trending Products in 2024</p>
        <h3>
          Make Your Interior More <br />
          Minimalistic & Modern
        </h3>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.<br /> quis in vero aperiam quidem distinctio eaque voluptas laboriosam!</p>
        <motion.button whileHover={{ scale: 1.1 }}> <NavLink to="shop" className="nav-link">Shop Now</NavLink> </motion.button>
      </div>

      <div className='mainimg'>
        <img src={mainImage} alt="" />
      </div>
    </div>

    <div className='services'>
      {ServiceData.map(item => (
        <motion.div whileHover={{ scale: 1.05 }} className='service' style={{ background: item.bg }} key={item.id}>
          <div className='service_image'>
            <img src={item.icon} height={100} alt={item.title} />
          </div>
          <div className='service_description'>
            <h4>{item.title}</h4>
            <p>{item.subtitle}</p>
          </div>
        </motion.div>
      ))}
    </div>

    <section className='trending_products'>
      <h2><center>Trending Products</center></h2>
      <ProductsList data={trendingProducts} />
    </section>

    <section>
      <h2 className='styheading'><center className='stycentre'>Best Sales</center></h2>
      <ProductsList data={bestSalesProducts} />
    </section>

    <section className='timer_section'>
      <div className='content_section'>
        <div className="content mb-5">
          <h3 className='pb-3'>Limited Offers</h3>
          <h2 className='qualityChair'>Quality Chair</h2>
        </div>
        <Clock targetDate={targetDate} />
        <div className="btnn mt-2">
          <motion.button whileTap={{scale:1.1}}>Visit Now</motion.button>
        </div>
      </div>
      <div className="image_section">
        <img src={mainImage} height={200} alt="" />
      </div>
    </section>

    <section className='new_arrivals'>
      <h2> <center> New Arrivals</center></h2>
      <ProductsList data={mobileProducts}/>
      <ProductsList data={wirelessProducts} />
    </section>
  </>

  )
}

export default Home