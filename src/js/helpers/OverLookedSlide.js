import React from 'react'
import {Link} from "react-router-dom";
import history from "./history"

const OverLookedSlide = ({product, display}) => {
  return (
    product ?
    <div className={`overlooked-slider__item`}
         style={{background: `url(${product.images[0]}) no-repeat`, backgroundSize: 'cover', display: display}}>
      <Link to={`/product/${product.id}`}
            key={product.id} />
    </div> : null
  )
};

export default OverLookedSlide