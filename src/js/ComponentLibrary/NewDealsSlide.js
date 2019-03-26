import React from 'react'
import {Link} from "react-router-dom";
import {ProductCard} from "../ProductCard";

const NewDealsSlide = ({product, display, prodId}) => {
  return (
    product ?
    <div className="new-deals__product-info">
      <Link to={`/product/${product.id}`}
            key={product.id}
            onClick={() => productChanged(product.id)}
            className="h3">{product.title}
      </Link>
      <p>Производитель:
        <span>{product.brand}</span>
      </p>
      <h3 className="h3">{product.price} ₽</h3>
    </div> : null
  )
};

function productChanged() {
  const productCard = new ProductCard();
  productCard.getProductData();
}


export default NewDealsSlide