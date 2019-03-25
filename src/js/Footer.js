import React from 'react';
import {Link} from "react-router-dom";

export default class Footer extends React.Component {
  constructor(props) {
    super(props);

    this.spamInformation = {
      sex: '',
      email: ''
    };

    this.state = {
      spamActivated: false,
      sex: ''
    }
  }

  handleSexChange(event) {
    this.setState({
      sex: event.target.value
    });

    this.spamInformation.sex = event.target.value;
  }

  spamMailChange(event) {
    this.spamInformation.email = event.target.value;
  }

  checkButtonStatus() {
    if(this.spamInformation.sex && this.spamInformation.email) {
      this.setState({
        spamActivated: true
      })
    } else {
      this.setState({
        spamActivated: false
      })
    }
  }

  subscribeClick(event) {
    this.checkButtonStatus();
  }

  render() {
    return(
      <footer className="footer">
        <section className="subscribe">
          <div className="subscribe__wrapper">
            <h2 className="subscribe__title">подписаться на рассылку выгодных предложений</h2>
            {this.state.spamActivated ? <p>Подписка оформлена! Спасибо!»</p> :
              <form className="subscribe__radios" action="">
                <label className="subscribe__radio_label">
                  <input checked={this.state.sex === 'women'}
                         onChange={event => this.handleSexChange(event)}
                         className="subscribe__radio"
                         type="radio"
                         name="subscribe"
                         value="women"/>
                  <div className="subscribe__radio_text">Женское</div>
                </label>
                <label className="subscribe__radio_label">
                  <input checked={this.state.sex === 'men'}
                         onChange={event => this.handleSexChange(event)}
                         className="subscribe__radio"
                         type="radio"
                         name="subscribe"
                         value="men"/>
                  <div className="subscribe__radio_text">Мужское</div>
                </label>
                <label className="subscribe__radio_label">
                  <input checked={this.state.sex === 'both'}
                         onChange={event => this.handleSexChange(event)}
                         className="subscribe__radio"
                         type="radio"
                         name="subscribe"
                         value="both" />
                  <div className="subscribe__radio_text">Всё</div>
                </label>
                <input className="subscribe__email" type="email" placeholder="Ваш e-mail" onChange={e => this.spamMailChange(e)}/>
                <input className="subscribe__submit" type="button" value="ПОДПИСАТЬСЯ" onClick={event => this.subscribeClick(event)}/>
              </form>}
          </div>
        </section>
        <div className="footer__bottom">
          <div className="wrapper">
            <div className="footer__menus">
              <div className="footer__menu footer__menu_about">О магазине
                <ul>
                  <li><Link to='/'>BosaNoga</Link></li>
                  <li><Link to="/news">Новости</Link></li>
                  <li><Link to='/'>Пресса</Link></li>
                </ul>
              </div>
              <div className="footer__menu footer__menu_collection">Коллекции
                <ul>
                  <li><Link to='/'>Обувь</Link></li>
                  <li><Link to='/'>Аксессуары</Link></li>
                  <li><Link to='/'>Для дома</Link></li>
                </ul>
              </div>
              <div className="footer__menu footer__menu_help">Помощь
                <ul>
                  <li><Link to='/'>Как купить?</Link></li>
                  <li><Link to="/refund">Возврат</Link></li>
                  <li><Link to="/contacts">Контакты</Link></li>
                </ul>
              </div>
            </div>
            <div className="footer__info">
              <h3 className="footer__info_title">Принимаем к оплате:</h3>
              <div className="footer__paid-systems">
                <div className="footer__paid footer__paid_paypal" />
                <div className="footer__paid footer__paid_master-card" />
                <div className="footer__paid footer__paid_visa" />
                <div className="footer__paid footer__paid_yandex" />
                <div className="footer__paid footer__paid_webmoney" />
                <div className="footer__paid footer__paid_qiwi" />
              </div>
              <div className="footer__social-links">
                <h3 className="footer__social-links_title">Мы в соц.сетях:</h3>
                <div className="footer__social-link footer__social-link_twitter" />
                <div className="footer__social-link footer__social-link_vk" />
              </div>
              <div className="footer__copyright">2009-2018 © BosaNoga.ru — модный интернет-магазин обуви<br/> и
                аксессуаров. Все права защищены. Доставка по всей России!
              </div>
            </div>
            <div className="footer__contacts"><a className="footer__phone" href="tel:+7-495-790-35-03">+7 495 79 03
              5 03</a>
              <p className="footer__phone_text">Ежедневно: с 09-00 до 21-00</p><a className="footer__email"
                                                                                  href="mailto:office@bosanoga.ru">office@bosanoga.ru</a>
            </div>
          </div>
        </div>
      </footer>
    )
  }
}