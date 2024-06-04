import React from 'react';
import { Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import '../styles/productCard.css';
import { motion } from 'framer-motion';
import {  toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import  {cartActions}  from '../redux/slices/cartSlice'; 

const ProductCard = ({ item }) => {

    const dispatch = useDispatch()

    const addToCart=()=>{
        dispatch(cartActions.addItem({
            id: item.id,
            productName: item.productName,
            price:item.price,
            imgUrl: item.imgUrl,
        }))
        toast.success("product added to the cart")
    }
 
    return (
        
        <Col>
        <div style={{display:'flex'}}>
            <div className='product_item'>
                <div className="product_img">
                    <motion.img whileHover={{scale:1.1}} src={item.imgUrl}  height={100} alt={item.productName} />
                </div>

                <div className="p-2 product_info">
                    <h3 className="product_name">
                        <Link to={`/shop/${item.id}`}>{item.productName}</Link>
                    </h3>
                    <span className='text-center d-block'>{item.category}</span>
                </div>

                <div className="product_card_bottom d-flex align-items-center justify-content-between p-2">
                    <span className="price">${item.price}</span>
                    <motion.button whileTap={{scale:1.1}} onClick={addToCart} className="add_to_cart_btn">+</motion.button>
                </div>
            </div>
            </div>
        </Col>
    );
};

export default ProductCard;
