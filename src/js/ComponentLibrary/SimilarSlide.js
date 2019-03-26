import React from 'react'
import {Link} from "react-router-dom";
import {ProductCard} from "../ProductCard";

const SimilarSlide = ({product, display, prodId}) => {
  return (
    Object.entries(product).length !== 0 && product.constructor === Object && product.id !== Number(prodId) ?
        <div className="similar-products-slider__item-list__item-card item"
          style={{display: display}}>
          <div className="similar-products-slider__item">
            <Link to={`/product/${product.id}`}
                  key={product.id} onClick={() => productChanged(product.id)}><img
              src={product.images[0]}
              className="similar-products-slider__item-pic-1"/>
            </Link>
          </div>
          <div className="similar-products-slider__item-desc">
            <h4 className="similar-products-slider__item-name">{product.title}</h4>
            <p className="similar-products-slider__item-producer">Производитель: <span
              className="producer">{product.brand}</span></p>
            <p className="similar-products-slider__item-price">{product.price}</p>
          </div>
        </div>
       : null
  )
};

function productChanged() {
  const productCard = new ProductCard();
  productCard.getProductData();
}


export default SimilarSlide