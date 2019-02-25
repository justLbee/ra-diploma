import React from 'react'
import {Link} from "react-router-dom";

const OverLookedSlide = ({product, display}) => {
  return (
    <div className={`overlooked-slider__item`}
         style={{background: `url(${product.images[0]}) no-repeat`, backgroundSize: 'cover', display: display}}>
      <Link to={`/product/${product.id}`}
            key={product.id}> </Link>
    </div>
  )
};

export default OverLookedSlide