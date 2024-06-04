import React from 'react'
import ProductCard from './productCard'
import "../styles/productList.css"

const ProductsList = ({ data }) => {
    return (
        <div className="products_list">
            {
                data.map((item,index) => (
                    <ProductCard item={item} key={index} />
                ))
            }
        </div>
    )
}

export default ProductsList