import React from 'react'
import {Link} from "react-router-dom";

const NewDealsSlide = ({product}) => {
  return (
    product ?
    <div className="new-deals__product-info">
      <Link to={`/product/${product.id}`}
            className="h3">{product.title}
      </Link>
      <p>Производитель:
        <span>{product.brand}</span>
      </p>
      <h3 className="h3">{product.price} ₽</h3>
    </div> : null
  )
};

export default NewDealsSlide