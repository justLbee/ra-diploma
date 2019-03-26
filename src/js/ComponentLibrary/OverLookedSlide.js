import React from 'react'
import {Link} from "react-router-dom";
import {ProductCard} from "../ProductCard";

const OverLookedSlide = ({product, display}) => {
  return (
    Object.entries(product).length !== 0 && product.constructor === Object  ?
    <div className={`overlooked-slider__item`}
         style={{background: `url(${product.images[0]}) 0% 0% / contain no-repeat`, display: display}}>
      <Link to={`/product/${product.id}`}
            key={product.id}
            onClick={productChanged}/>
    </div> : null
  )
};

function productChanged() {
  const productCard = new ProductCard();
  productCard.getProductData();
}


export default OverLookedSlide