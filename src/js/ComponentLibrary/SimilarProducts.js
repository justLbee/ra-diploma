import React from "react";
import {Link} from "react-router-dom";
import SimilarSlide from './SimilarSlide'

export default class RecentlyWatched extends React.Component {
  constructor(props) {
    super(props);

    this.productsArr = [];
    this.state = {
      productArr: [],
      currentIndex: 3, //Отображаем 3, стартуем с третьего
      deletedIndex: -1 //Стартуем с -1, чтобы не удалялся первый элемент
    };
  }

  componentWillReceiveProps(nextProps, nextContext) {
    if (this.props.type !== nextProps.type) {
      this.getProductsData(nextProps.type, nextProps.color);
    }
  }

  getProductsData(type, color) {
    const params = {
      method: 'GET',
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
    };

    fetch(`https://neto-api.herokuapp.com/bosa-noga/products/?type=${type}&color=${color}`, params)
      .then(response => response.json())
      .then(product => {
        this.productsArr = product.data;
        this.setState({
          productArr: this.productsArr
        })
      })
      .finally(() => {

      });
  }

  prevProduct() {
    if (this.state.deletedIndex >= 0) {
      let currIndex = this.state.currentIndex - 1;
      let delIndex = this.state.deletedIndex - 1;
      this.setState({
        currentIndex: currIndex,
        deletedIndex: delIndex
      })
    }
  }

  nextProduct() {
    if (this.state.currentIndex < this.state.productArr.length) {
      let currIndex = this.state.currentIndex + 1;
      let delIndex = this.state.deletedIndex + 1;
      this.setState({
        currentIndex: currIndex,
        deletedIndex: delIndex
      })
    }
  }

  render() {
    return (
      <div>
        {this.state.productArr && this.state.productArr.length > 0 ?
          <section className="product-card__similar-products-slider">
            <h3>Похожие товары:</h3>
            <div className="similar-products-slider">
              {this.state.productArr.length > 3 ?
                <div className="similar-products-slider__arrow similar-products-slider__arrow_left arrow"
                     onClick={event => this.prevProduct(event)}/> : null}

              {this.state.productArr.map((product, index) =>
                this.state.deletedIndex < index && index < this.state.currentIndex ?
                  <SimilarSlide key={index} product={product} display={'block'}/> :
                  <SimilarSlide key={index} product={product} display={'none'}/>)}

              {this.state.productArr.length > 3 ?
                <div className="similar-products-slider__arrow similar-products-slider__arrow_right arrow"
                     onClick={event => this.nextProduct(event)}/> : null}
            </div>
          </section> : null
        }

      </div>
    )
  }
}