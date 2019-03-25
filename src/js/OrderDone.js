import React from 'react';
import {Link} from "react-router-dom";
import history from './helpers/history'

export class OrderDone extends React.Component {
  constructor(props) {
    super(props);

    this.customerInformation = JSON.parse(sessionStorage.getItem('customerInformation'));
    this.payTypeArr = [
      {
        id: 'card-online',
        value: 'Картой онлайн'
      },
      {
        id: 'card-courier',
        value: 'Картой курьеру'
      },
      {
        id: 'cash',
        value: 'Наличными'
      }
    ];

    this.payTypeObj = this.payTypeArr.find(type => {
      return type.id === this.customerInformation.customerPayType;
    });
    this.payType = this.payTypeObj.value;
  }

  backToShop(event) {
    history.push('/')
  }

  render() {
    return (
      <div>
        <div className="wrapper order-wrapper">
          <div className="site-path">
            <ul className="site-path__items">
              <li className="site-path__item"><Link to='/'>Главная</Link></li>
              <li className="site-path__item">Заказ принят</li>
            </ul>
          </div>
          <section className="order-done">
            <h2 className="order-done__title order-process__title">Заказ принят, спасибо!</h2>
            <div className="order-done__information order-info">
              <div className="order-info__item order-info__item_summ">
                <h3>Сумма заказа:</h3>
                <p>{this.customerInformation.orderSum}<i className="fa fa-rub" aria-hidden="true" /></p>
              </div>
              <div className="order-info__item order-info__item_pay-form">
                <h3>Способ оплаты:</h3>
                <p>{this.payType}</p>
              </div>
              <div className="order-info__item order-info__item_customer-name">
                <h3>Имя клиента:</h3>
                <p>{this.customerInformation.customerName}</p>
              </div>
              <div className="order-info__item order-info__item_adress">
                <h3>Адрес доставки:</h3>
                <p>{this.customerInformation.customerAdress}</p>
              </div>
              <div className="order-info__item order-info__item_phone">
                <h3>Телефон:</h3>
                <p>{this.customerInformation.customerPhone}</p>
              </div>
            </div>
            <p className="order-done__notice">Данные о заказе отправлены на
              адрес <span>{this.customerInformation.customerEmail}.  </span></p>
            <button className="order-done__continue" onClick={event => this.backToShop(event)}>продолжить покупки</button>
          </section>
        </div>
      </div>
    )
  }
}