import React from "react";
import NewDealsSlide from './NewDealsSlide'
import Favorites from "../helpers/favorites";
import {Link} from "react-router-dom";

const favorite = new Favorites();

export default class NewDealsProducts extends React.Component {
  constructor(props) {
    super(props);

    this.productsArr = [];
    this.state = {
      filteredProducts: [],
      productFirstImage: '',
      productLastImage: '',
      productActiveImage: '',
      favoriteClass: 'new-deals__product_favorite'
    };

    this.featuredProducts = [];
    this.inFavoritesArr = [];

    this.productFirstIndex = 0;
    this.productActiveIndex = 1;
    this.productLastIndex = 2;
  }

  componentWillReceiveProps(nextProps, nextContext) {
    if (this.props.filteredProducts !== nextProps.filteredProducts) {
      this.featuredProducts = nextProps.filteredProducts;

      this.setState({
        filteredProducts: nextProps.filteredProducts
      });

      this.parsingProducts();
    }
  }

  parsingProducts() {
    if (this.featuredProducts.length > 0) {
      this.inFavoritesArr = [];

      let firstImage, activeImage, lastImage;

      if (this.productFirstIndex < 0) {
        firstImage = '';
      } else {
        firstImage = this.featuredProducts[this.productFirstIndex].images[0];
      }

      if (this.productLastIndex >= this.featuredProducts.length) {
        lastImage = '';
      } else {
        lastImage = this.featuredProducts[this.productLastIndex].images[0];
      }

      activeImage = this.featuredProducts[this.productActiveIndex].images[0];

      this.setState({
        productFirstImage: firstImage,
        productActiveImage: activeImage,
        productLastImage: lastImage,
      });

      const activeProductId = this.featuredProducts[this.productActiveIndex].id;

      if(favorite.isFavorite(activeProductId)) {
        this.setState({
          favoriteClass: 'product-catalogue__product_favorite-chosen'
        })
      } else {
        this.setState({
          favoriteClass: 'new-deals__product_favorite'
        })
      }
    }
  }

  prevProduct(event) {
    if (this.productLastIndex !== 0) {
      this.productFirstIndex--;
      this.productActiveIndex--;
      this.productLastIndex--;
    } else {
      event.preventDefault();
    }

    this.parsingProducts();
  }

  nextProduct(event) {
    if (this.productFirstIndex !== this.featuredProducts.length) {
      this.productFirstIndex++;
      this.productActiveIndex++;
      this.productLastIndex++;
    } else {
      event.preventDefault();
    }

    this.parsingProducts();
  }

  addToFavorites(event) {
    const itemElement = event.target;
    const favoriteId = this.featuredProducts[this.productActiveIndex].id;

    if (itemElement.classList.contains('new-deals__product_favorite')) {
      this.setState({
        favoriteClass: 'product-catalogue__product_favorite-chosen'
      });

      favorite.add(favoriteId);
    } else {
      this.setState({
        favoriteClass: 'ew-deals__product_favorite'
      });

      favorite.remove(favoriteId)
    }
  }

  render() {
    return (
      <div>
        {
          this.state.filteredProducts.length > 0 ?
            <div className="new-deals__slider">
              {this.productActiveIndex > 0 ?
                <div className="new-deals__arrow new-deals__arrow_left arrow"
                     onClick={event => this.prevProduct(event)}/> : null
              }
              <div className={`new-deals__product new-deals__product_first`}
                   style={{background: `url(${this.state.productFirstImage}) 0% 0% / contain no-repeat`}}>
                <Link to={`/product/${this.featuredProducts[this.productFirstIndex].id}`} />
              </div>
              <div className={`new-deals__product new-deals__product_active `}
                   style={{background: `url(${this.state.productActiveImage}) 0% 0% / contain no-repeat`}}>
                <Link to={`/product/${this.featuredProducts[this.productActiveIndex].id}`} />
                <div className={`${this.state.favoriteClass}`} onClick={event => this.addToFavorites(event)} />
              </div>
              <div className={`new-deals__product .new-deals__product_last`}
                   style={{background: `url(${this.state.productLastImage}) 0% 0% / contain no-repeat`}}>
                <Link to={`/product/${this.featuredProducts[this.productLastIndex].id}`} />
              </div>
              {this.productLastIndex < this.featuredProducts.length ?
                <div className="new-deals__arrow new-deals__arrow_right arrow"
                     onClick={event => this.nextProduct(event)}/> : null
              }
            </div> : <div className="new-deals__slider"> <p>В данной категории нет новинок</p> </div>
        }


        <NewDealsSlide product={this.state.filteredProducts[this.productActiveIndex]}/>
      </div>
    )
  }
}