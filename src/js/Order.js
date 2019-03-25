import React from 'react';
import {Link} from "react-router-dom";

import CategoryGetter from './helpers/categoryGetter'
import Favorites from './helpers/favorites'
import RecentlyWatched from './ComponentLibrary/RecentlyWatched'
import SimilarProducts from "./ComponentLibrary/SimilarProducts"
import SessionStorageVisited from "./helpers/sessionVisited"
import Basket from "./helpers/basket"
import {ProductCard} from "./ProductCard";

const categoryGetter = new CategoryGetter();
const favorite = new Favorites();
const sessionVisited = new SessionStorageVisited();
const basket = new Basket();

export class Order extends React.Component {
  constructor(props) {
    super(props);

    this.productsInBasket = basket.showProductsInBasket();

    this.state= {
      productArr: this.productsInBasket,
      sum: 0
    };

    // this.findSum();
  }

  componentDidMount() {
    this.findSum();
  }

  productChanged() {
    const productCard = new ProductCard();
    productCard.getProductData();
  }

  productAmountChange(event, isIncreased, id, size) {
    const productChanged = this.productsInBasket.find(product => {
      if(product.id === id) {
        isIncreased ? product.amount++:product.amount--;
        return product;
      }
    });

    this.setState({
      productArr: this.productsInBasket
    });

    basket.changeProductInCart(productChanged.id, productChanged.size, productChanged.amount);
    this.findSum();
  }

  findSum() {
    let sum = 0;

    this.productsInBasket.forEach(product => {
      sum = product.price * product.amount + sum;
    });

    this.setState({
      sum: sum
    })
  }

  render() {
    return (
      <div>
        <div className="wrapper order-wrapper">
          <div className="site-path">
            <ul className="site-path__items">
              <li className="site-path__item"><a href="index.html">Главная</a></li>
              <li className="site-path__item"><a href="#">Корзина</a></li>
              <li className="site-path__item"><a href="#">Оформление заказа</a></li>
            </ul>
          </div>
          <section className="order-process">
            <h2 className="order-process__title">Оформление заказа</h2>
            <div className="order-process__basket order-basket">
              <div className="order-basket__title">в вашей корзине:</div>
              <div className="order-basket__item-list">
                {this.state.productArr.map(product =>
                  <div key={product.id} className="basket-item">
                    <div className="basket-item__pic"><img
                      src={product.image} alt={product.title} /></div>
                    <div className="basket-item__product">
                      <div className="basket-item__product-name"><Link to={`/product/${product.id}`} onClick={this.productChanged}>{product.title}</Link></div>
                      <div className="basket-item__product-features">
                        <div className="basket-item__size">Размер: <span>{product.size}</span></div>
                        <div className="basket-item__producer">Производитель: <span>{product.brand}</span></div>
                        <div className="basket-item__color">Цвет: <span>{product.color}</span></div>
                      </div>
                    </div>
                    <div className="basket-item__quantity">
                      <div onClick={event => this.productAmountChange(event, false, product.id)}
                           className="basket-item__quantity-change basket-item-list__quantity-change_minus">-</div>
                      {product.amount}
                      <div onClick={event => this.productAmountChange(event, true, product.id)}
                           className="basket-item__quantity-change basket-item-list__quantity-change_plus">+</div>
                    </div>
                    <div className="basket-item__price">{product.price} <i className="fa fa-rub" aria-hidden="true"></i></div>
                  </div>
                )}
              </div>
              <div className="order-basket__summ">Итого: <span>{this.state.sum} <i className="fa fa-rub"
                                                                             aria-hidden="true"></i></span></div>
            </div>
            <div className="order-process__confirmed">
              <form action="#">
                <div className="order-process__delivery">
                  <h3 className="h3">кому и куда доставить?</h3>
                  <div className="order-process__delivery-form">
                    <label className="order-process__delivery-label">
                      <div className="order-process__delivery-text">Имя</div>
                      <input className="order-process__delivery-input" type="text" name="delivery"
                             placeholder="Представьтесь, пожалуйста" />
                    </label>
                    <label className="order-process__delivery-label">
                      <div className="order-process__delivery-text">Телефон</div>
                      <input className="order-process__delivery-input" type="tel" name="delivery"
                             placeholder="Номер в любом формате" />
                    </label>
                    <label className="order-process__delivery-label">
                      <div className="order-process__delivery-text">E-mail</div>
                      <input className="order-process__delivery-input" type="email" name="delivery"
                             placeholder="Укажите E-mail" />
                    </label>
                    <label className="order-process__delivery-label order-process__delivery-label_adress">
                      <div className="order-process__delivery-text">Адрес</div>
                      <input className="order-process__delivery-input order-process__delivery-input_adress" type="text"
                             name="delivery" placeholder="Ваша покупка будет доставлена по этому адресу" />
                    </label>
                  </div>
                  <p>Все поля обязательны для заполнения. Наш оператор свяжется с вами для уточнения деталей заказа.</p>
                </div>
                <div className="order-process__paid">
                  <h3 className="h3">хотите оплатить онлайн или курьеру при получении?</h3>
                  <div className="order-process__paid-form">
                    <label className="order-process__paid-label">
                      <input className="order-process__paid-radio" type="radio" name="paid" value="card-online" /><span
                        className="order-process__paid-text">Картой онлайн</span>
                    </label>
                    <label className="order-process__paid-label">
                      <input className="order-process__paid-radio" type="radio" name="paid" value="card-courier"
                             /><span className="order-process__paid-text">Картой курьеру</span>
                    </label>
                    <label className="order-process__paid-label">
                      <input className="order-process__paid-radio" type="radio" name="paid" value="cash" /><span
                        className="order-process__paid-text">Наличными курьеру</span>
                    </label>
                  </div>
                </div>
                <button className="order-process__form-submit order-process__form-submit_click">Подтвердить заказ
                </button>
              </form>
            </div>
          </section>
        </div>
      </div>
    )
  }
}