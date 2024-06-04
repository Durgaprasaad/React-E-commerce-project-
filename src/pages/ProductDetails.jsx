import React, { useRef, useState } from 'react'
import CommonSection from '../UI/CommonSection'
import { Col, Container, Row } from 'reactstrap'
import { useParams } from 'react-router-dom'
import products from '../data/products'
import "../styles/product-details.css"
import { motion } from 'framer-motion'
import ProductsList from "../UI/productsList"
import { useDispatch } from 'react-redux'
import { cartActions } from '../redux/slices/cartSlice'
import { toast } from 'react-toastify'

const ProductDetails = () => {

  const [tab, setTab] = useState('desc')
  const [rating, setRating] = useState(null)
  const reviewUser = useRef('')
  const reviewMsg =  useRef('') 
 

  const { id } = useParams()
  const product = products.find(item => item.id === id)

  const { imgUrl, productName, price, avgRating, reviews, shortDesc, description, category } = product

  const relatedProducts = products.filter(item => item.category === category)


  const submitHandler = (e)=>{
    e.preventDefault()

    const reviewUserName = reviewUser.current.value
    const reviewUserMsg = reviewMsg.current.value

    const reviewObj={
      userName: reviewUserName,
      text: reviewUserMsg,
      rating
    }
    
    console.log(reviewObj)
  }

  const dispatch = useDispatch()
  const addToCart = ()=>{
   dispatch(
    cartActions.addItem({
        id,
        imgUrl:imgUrl,
        productName,
        price,
      })
   );
   toast.success("Product Added Succesfully")
  }

  return <>
    <CommonSection title={productName} />
    <section className='pt-0'>
      <Container>
        <Row>
          <Col lg='6'>
            <img src={imgUrl} height={400} alt="" />
          </Col>
          <Col lg='6'>
            <div className='product__details'>
              <h2>{productName}</h2>
              <div className="product__rating  d-flex align-items-center gap-5 mb-3">
                <div>
                  <span onClick={() => setRating(1)}><i class="ri-star-fill"></i></span>
                  <span onClick={() => setRating(2)} ><i class="ri-star-fill"></i></span>
                  <span><i class="ri-star-fill"></i></span>
                  <span onClick={() => setRating(4)}><i class="ri-star-fill"></i></span>
                  <span onClick={() => setRating(5)}><i class="ri-star-half-fill"></i></span>

                  <p>( <span>{avgRating}</span> ratings)</p>
                  <div className='d-flex align-items-center gap-5'>
                    <span className='product__price'>${price}</span>
                    <span>Category: {category.toUpperCase()}</span>
                  </div>
                  <p className='mt-3'>{shortDesc}</p>
                  <motion.button whileTap={{ scale: 1.1 }} className='buy__btn' onClick={addToCart}>Add To cart</motion.button>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>

    <section>
      <Container>
        <Row>
          <Col lg='12'>
            <div className="tab__wrapper d-flex align-items-center gap-5 mt-4">
              <h6 className={`${tab === 'desc' ? 'active__tab' : ''}`} onClick={() => setTab('desc')}>Description</h6>
              <h6 className={`${tab === 'rev' ? 'active__tab' : ''}`} onClick={() => setTab('rev')} >Reviews ({reviews.length})</h6>
            </div>
            {
              tab === 'desc' ? (<div className="tab__content mt-5">
                <p>{description}</p>
              </div>) : (<div className='product__review mt-5'>
                <div className="review__wrapper">
                  <ul>
                    {
                      reviews.map((item, index) => (
                        <li key={index} className='mb-4'>
                          <h6>John Doe</h6>
                          <span>{item.rating}(rating) </span>
                          <p>{item.text}</p>
                        </li>
                      ))
                    }
                  </ul>

                  <div className="review__form">
                    <form action="" onSubmit={submitHandler}>
                      <h4>Leave Your Experience</h4>
                      <div className='form__group'>
                        <input type="text" placeholder='Enter Name' ref={reviewUser} />
                      </div>

                      <div className='form__group d-flex align-items-center gap-5 '>
                          <span onClick={() => setRating(1)}>1<i class="ri-star-s-fill"></i></span>
                          <span onClick={() => setRating(2)}>2<i class="ri-star-s-fill"></i></span>
                          <span onClick={() => setRating(3)}>3<i class="ri-star-s-fill"></i></span>
                          <span onClick={() => setRating(4)}>4<i class="ri-star-s-fill"></i></span>
                          <span onClick={() => setRating(5)} >5<i class="ri-star-s-fill"></i></span>
                      </div>

                      <div className='form__group'>
                        <textarea ref={reviewMsg} rows={4} type="text" placeholder='Review Message...' />
                      </div>

                      <button type='submit' className='buy__btn'>Submit</button>
                    </form>
                  </div>
                </div>
              </div>)
            }
          </Col>

          <Col lg='12' className='mt-5'>
            <h2 className='related__title'>You Might Also Like</h2>
          </Col>

          <ProductsList data={relatedProducts} />
        </Row>
      </Container>
    </section>
  </>
}

export default ProductDetails