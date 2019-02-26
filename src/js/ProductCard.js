import React from 'react';
import throttle from "./helpers/throttle";
import {Link} from "react-router-dom";

import CategoryGetter from './helpers/categoryGetter'
import Favorites from './helpers/favorites'
import RecentlyWatched from './ComponentLibrary/RecentlyWatched'
import SimilarProducts from "./ComponentLibrary/SimilarProducts"
import SessionStorageVisited from "./helpers/sessionVisited"

const categoryGetter = new CategoryGetter();
const favorite = new Favorites();
const sessionVisited = new SessionStorageVisited();

export class ProductCard extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {
      preloader: '',
      category: {},
      brand: '',
      color: '',
      id: Number,
      images: [],
      material: '',
      popularity: Number,
      price: 0,
      reason: '',
      season: '',
      sizes: [],
      sku: '',
      title: '',
      type: '',
      inFavorites: 'В избранное',
      size: undefined,
      amount: 1,
      available: 'В наличии',
      basketDisabled: 'in-basket_disabled',
      isFavorite: false,
      basketText: 'В корзину',
      categoryObj: {}
    };

    this.categoryObj = {};

    this.product = {};
    this.chosenSize = null;
    this.id = this.props.match.params.id;
  }

  componentDidMount() {
    this.getProductData();
  }

  getProductData(id = 0) {
    this.hidePreloader(false);

    if (id === 0) {
      id = this.id;
    }

    const params = {
      method: 'GET',
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
    };

    fetch(`https://neto-api.herokuapp.com/bosa-noga/products/${id}`, params)
      .then(response => response.json())
      .then(product => {
        this.product = product.data;

        this.setState({
          brand: this.product.brand,
          color: this.product.color,
          id: this.product.id,
          images: this.product.images,
          material: this.product.material,
          popularity: this.product.popularity,
          price: this.product.price,
          reason: this.product.reason,
          season: this.product.season,
          sizes: this.product.sizes,
          sku: this.product.sku,
          title: this.product.title,
          type: this.product.type,
          isFavorite: favorite.isFavorite(this.product.id)
        })
      })
      .finally(() => {
        this.hidePreloader(true);
        this.getCategory();
        this.isFavorite();

        sessionVisited.add(this.product);
      });
  }

  getCategory() {
    this.categoryObj = categoryGetter.getCategoryName(this.product.categoryId);

    setTimeout(() =>
      this.setState({
        categoryObj: this.categoryObj
      })
    )
  }

  hidePreloader(isHidden = false) {
    if (isHidden) {
      this.setState({
        preloader: 'hidden'
      });
    } else {
      this.setState({
        preloader: ''
      });
    }
  }

  isFavorite() {
    const favoriteWrapper = document.querySelector('.in-favourites-wrapper');
    const heart = favoriteWrapper.firstElementChild;

    if (this.state.isFavorite) {
      heart.classList.remove('favourite');
      heart.classList.add('favourite-fill');

      this.setState({
        inFavorites: 'В избранном'
      });
    }
  }

  addToFavorite(event, id) {
    const itemElement = event.target.parentNode;
    const heart = itemElement.firstElementChild;

    if (heart.classList.contains('favourite')) {
      heart.classList.remove('favourite');
      heart.classList.add('favourite-fill');

      this.setState({
        inFavorites: 'В избранном'
      });

      favorite.add(id);
    } else {
      heart.classList.add('favourite');
      heart.classList.remove('favourite-fill');

      this.setState({
        inFavorites: 'В избранное'
      });

      favorite.remove(id);
    }
  }

  choseSize(event, size) {
    const element = event.target;

    if (this.chosenSize) {
      this.chosenSize.parentNode.classList.remove('active');
    }

    element.parentNode.classList.add('active');
    this.setState({
      basketText: 'В корзину'
    });

    if (size.available) {
      this.setState({
        basketDisabled: null,
        size: size.size,
        available: 'В наличии'
      })
    } else {
      this.setState({
        basketDisabled: 'in-basket_disabled',
        size: null,
        available: 'Нет в наличии'
      })
    }

    this.chosenSize = element;
  }

  amountIncrease(event, isIncreased) {
    let amount = this.state.amount;

    if (isIncreased) {
      amount++;
      this.setState({
        amount: amount
      })
    } else {
      amount--;
      this.setState({
        amount: amount
      })
    }
  }

  addToBasket() {
    if (!this.state.size) {
      this.setState({
        basketText: 'Выберите размер!'
      })
    }
  }

  render() {
    return (
      <div>
        <div className={`preloader_wrapper ${this.state.preloader}`}>
          <div className="preloader">
            <hr/>
            <hr/>
            <hr/>
            <hr/>
          </div>
        </div>

        <div className="site-path">
          <ul className="site-path__items">
            <li className="site-path__item">
              <Link to="/">Главная
              </Link>
            </li>
            <li className="site-path__item">
              <Link to={{
                pathname: '/catalogue',
                search: `?categoryId=${this.state.categoryObj ? this.state.categoryObj.id : 13}`
              }}>
                {this.state.categoryObj.title ? this.state.categoryObj.title : ''}
              </Link>
            </li>
            <li className="site-path__item">
              <Link to={{
                pathname: '/catalogue',
                search: `?categoryId=${this.state.categoryObj.id}&type=${this.state.type}`
              }}>
                {this.state.type}
              </Link>
            </li>
            <li className="site-path__item"><a href="#">{this.state.title}</a></li>
          </ul>
        </div>

        <main className="product-card">
          <section className="product-card-content">
            <h2 className="section-name">{this.state.title}</h2>
            <section className="product-card-content__main-screen">

              {this.state.images.length > 1 ?
                <section className="main-screen__favourite-product-slider">
                  <div className="favourite-product-slider">
                    {this.state.images.length > 3 ?
                      <div
                        className="favourite-product-slider__arrow favourite-product-slider__arrow_up arrow-up"/> : null}

                    {this.state.images.map((image, index) =>
                      <div key={index} className={`favourite-product-slider__item `}
                           style={{background: `url(${image}) no-repeat`, backgroundSize: 'cover'}}>
                        <a href="#"/>
                      </div>
                    )}
                    {this.state.images.length > 3 ?
                      <div
                        className="favourite-product-slider__arrow favourite-product-slider__arrow_down arrow-down"/> : null}

                  </div>
                </section> : null}


              <div className="main-screen__favourite-product-pic"
                   style={{background: `url(${this.state.images[0]}) no-repeat`, backgroundSize: 'cover'}}
              >
                <a href="#" className="main-screen__favourite-product-pic__zoom"/>
              </div>

              <div className="main-screen__product-info">
                <div className="product-info-title"><h2>{this.state.title}</h2>
                  <div className="in-stock">{this.state.available}</div>
                </div>
                <div className="product-features">
                  <table className="features-table">
                    <tbody>
                    <tr>
                      <td className="left-col">Артикул:</td>
                      <td className="right-col">{this.state.sku}</td>
                    </tr>
                    <tr>
                      <td className="left-col">Производитель:</td>
                      <td className="right-col"><a href="#"><span className="producer">{this.state.brand}</span></a>
                      </td>
                    </tr>
                    <tr>
                      <td className="left-col">Цвет:</td>
                      <td className="right-col">{this.state.color}</td>
                    </tr>
                    <tr>
                      <td className="left-col">Материалы:</td>
                      <td className="right-col">{this.state.material}</td>
                    </tr>
                    <tr>
                      <td className="left-col">Сезон:</td>
                      <td className="right-col">{this.state.season}</td>
                    </tr>
                    <tr>
                      <td className="left-col">Повод:</td>
                      <td className="right-col">{this.state.reason}</td>
                    </tr>
                    </tbody>
                  </table>
                </div>
                <p className="size">Размер</p>
                <ul className="sizes">
                  {this.state.sizes.map((size, index) =>
                    <li key={index}><a onClick={event => this.choseSize(event, size)}>{size.size}</a></li>)}
                </ul>
                <div className="size-wrapper">
                  <a href="#"><span className="size-rule"/><p className="size-table">Таблица размеров</p></a>
                </div>
                <a className="in-favourites-wrapper" onClick={event => this.addToFavorite(event, this.state.id)}>
                  <div className="favourite"/>
                  <p className="in-favourites">{this.state.inFavorites}</p>
                </a>
                <div className="basket-item__quantity">
                  <div className="basket-item__quantity-change basket-item-list__quantity-change_minus"
                       onClick={event => this.amountIncrease(event, false)}>-
                  </div>
                  {this.state.amount}
                  <div className="basket-item__quantity-change basket-item-list__quantity-change_plus"
                       onClick={event => this.amountIncrease(event, true)}>+
                  </div>
                </div>
                <div className="price">{this.state.price} ₽</div>
                <button className={`in-basket in-basket-click ${this.state.basketDisabled}`}
                        onClick={event => this.addToBasket(event)}>{this.state.basketText}</button>
              </div>
            </section>
          </section>
        </main>

        <RecentlyWatched/>
        <SimilarProducts type={this.state.type} color={this.state.color} similarProductId={this.id}/>
      </div>

    )
  }
}