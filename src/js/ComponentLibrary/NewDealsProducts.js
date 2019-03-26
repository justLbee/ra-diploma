import React from "react";
import NewDealsSlide from './NewDealsSlide'

export default class NewDealsProducts extends React.Component {
  constructor(props) {
    super(props);

    this.productsArr = [];
    this.state = {
      filteredProducts: [],
      productFirstImage: '',
      productLastImage: '',
      productActiveImage: '',
    };

    this.featuredProducts = [];

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
      })
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
                   style={{background: `url(${this.state.productFirstImage}) no-repeat`, backgroundSize: 'contain'}}>
                <a href="#"></a>
              </div>
              <div className={`new-deals__product new-deals__product_active `}
                   style={{background: `url(${this.state.productActiveImage}) no-repeat`, backgroundSize: 'contain'}}>
                <a href="catalogue.html"></a>
                <div className="new-deals__product_favorite"/>
              </div>
              <div className={`new-deals__product .new-deals__product_last`}
                   style={{background: `url(${this.state.productLastImage}) no-repeat`, backgroundSize: 'contain'}}>
                <a href="#"></a>
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