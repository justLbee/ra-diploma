import React from 'react';
// const {Link} = ReactRouterDOM;
import {Link} from "react-router-dom";

export default class Header extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      droppedMenu: false,
      basketProductsAmount: 0,
      basketActiveDisplay: 'none',
      blinkCounter: 0
    };

    this.category = '';
    this.categoryId = 0;
    this.pathName = '';

    this.headerPanel = null;
    this.profilePanel = null;
  }

  componentWillReceiveProps(nextProps, nextContext) {
    this.setState({
      basketProductsAmount: nextProps.basketProductsAmount,
      basketActiveDisplay: nextProps.basketActiveDisplay
    });

    this.blinkBasket();
  }

  componentDidMount() {
    this.headerPanel = document.querySelector('.header-main__hidden-panel');
    this.profilePanel = document.querySelector('.hidden-panel__profile');
  }

  mainMenuClicked(event) {
    if (event.target.parentNode.classList.contains('wrapper') || event.target.parentNode.classList.contains('main-menu__items')) {
      return;
    }

    if (!this.category) {
      this.showDropMenu(true, event.target.parentNode);
    } else if (this.category !== event.target.parentNode) {
      this.showDropMenu(true, event.target.parentNode);
    } else if (this.category === event.target.parentNode && !this.state.droppedMenu) {
      this.showDropMenu(true, event.target.parentNode);
    } else {
      this.showDropMenu(false, event.target.parentNode);
    }

    this.category = event.target.parentNode;
  }

  showDropMenu(isOpen, element) {
    if (this.category) {
      this.category.classList.remove('main-menu__item_active');
    }

    this.setState({
      droppedMenu: isOpen
    });

    if (isOpen) {
      element.classList.add('main-menu__item_active');
      document.querySelector('.dropped-menu').classList.add('dropped-menu_visible');
    } else {
      element.classList.remove('main-menu__item_active');
      document.querySelector('.dropped-menu').classList.remove('dropped-menu_visible');
    }
  }

  changeLink(event) {
    switch (event.target.textContent) {
      case 'Мужская обувь':
        this.categoryId = 12;
        break;
      case 'Женская обувь':
        this.categoryId = 13;
        break;
      case 'Детская обувь':
        this.categoryId = 15;
        break;
      default:
        this.categoryId = 14;
        break;
    }

    this.pathName = `?categoryId=${this.categoryId}`;
  }

  linkClick() {
    this.showDropMenu(false, this.category);
  }

  headerPanelClick(event) {
    if (this.headerPanel.classList.contains('header-main__hidden-panel_visible')) {
      this.showHeaderPanelMenu(false, event.target);
    } else {
      this.showHeaderPanelMenu(true, event.target);
    }
  }

  showHeaderPanelMenu(isOpen, element) {
    if (isOpen) {
      this.headerPanel.classList.add('header-main__hidden-panel_visible');
    } else {
      this.headerPanel.classList.remove('header-main__hidden-panel_visible');
      return;
    }

    if (element.classList.contains('header-main__pic_profile')) {
      this.profilePanel.classList.add('hidden-panel__profile_visible');
    }
  }

  //toDo Возможно нужен генератор
  blinkBasket() {

    // for(let i = 0; i < 8; i++) {
    //   console.log(i);
    //   this.setState({
    //     blinkCounter: i
    //   })
    // }
  }

  render() {
    return (
      <div>
        <div className="container">
          <header className="header">
            <div className="top-menu">
              <div className="wrapper">
                <ul className="top-menu__items">
                  <li className="top-menu__item">
                    <Link to="/refund">Возврат</Link>
                  </li>
                  <li className="top-menu__item">
                    <Link to="/delivery">Доставка и оплата</Link>
                  </li>
                  <li className="top-menu__item">
                    <Link to="/about">О магазине</Link>
                  </li>
                  <li className="top-menu__item">
                    <Link to="/contacts">Контакты</Link>
                  </li>
                  <li className="top-menu__item">
                    <Link to="/news">Новости</Link>
                  </li>
                </ul>
              </div>
            </div>

            <div className="header-main">
              <div className="header-main__wrapper wrapper">
                <div className="header-main__phone">
                  <a href="tel:+7-495-790-35-03">+7 495 79 03 5 03</a>
                  <p>Ежедневно: с 09-00 до 21-00</p>
                </div>
                <div className="header-main__logo">
                  <Link to="/">
                    <h1>
                      <img src="/img/header-logo.png" alt="logotype"/>
                    </h1>
                  </Link>
                  <p>Обувь и аксессуары для всей семьи</p>
                </div>
                <div className="header-main__profile">
                  <div className="header-main__pics">
                    <div className="header-main__pic header-main__pic_search">

                    </div>
                    <div className="header-main__pic_border"/>
                    <div className="header-main__pic header-main__pic_profile"
                         onClick={event => this.headerPanelClick(event)}>
                      <div className="header-main__pic_profile_menu"/>
                    </div>
                    <div className="header-main__pic_border"/>
                    <div className="header-main__pic header-main__pic_basket">
                      <div className="header-main__pic_basket_full blink_basket" style={{display: `${this.state.basketActiveDisplay}`}}>{this.state.basketProductsAmount}</div>
                      <div className="header-main__pic_basket_menu"/>
                    </div>
                  </div>
                  <form className="header-main__search" action="#">
                    <input placeholder="Поиск"/>
                    <i className="fa fa-search" aria-hidden="true"/>
                  </form>
                </div>

              </div>
              <div className="header-main__hidden-panel hidden-panel">
                <div className="wrapper">
                  <div className="hidden-panel__profile">
                    <a href="#">Личный кабинет</a>
                    <Link onClick={e => this.showHeaderPanelMenu(false)} to='/favorite'>
                      <i className="fa fa-heart-o" aria-hidden="true"/>Избранное</Link>
                    <a href="#">Выйти</a>
                  </div>
                  <div className="hidden-panel__basket basket-dropped">
                    <div className="basket-dropped__title">В вашей корзине:</div>
                    <div className="basket-dropped__product-list product-list">
                      <div className="product-list__item">
                        <a className="product-list__pic">
                          <img src="img/product-list__pic_1.jpg" alt="product"/> </a>
                        <a href="#" className="product-list__product">Ботинки женские, Baldinini</a>
                        <div className="product-list__fill"></div>
                        <div className="product-list__price">12 360
                          <i className="fa fa-rub" aria-hidden="true"></i>
                        </div>
                        <div className="product-list__delete">
                          <i className="fa fa-times" aria-hidden="true"></i>
                        </div>
                      </div>

                      <div className="product-list__item">
                        <a className="product-list__pic">
                          <img src="img/product-list__pic_1.jpg" alt="product"/> </a>
                        <a href="#" className="product-list__product">Ботинки женские, Baldinini</a>
                        <div className="product-list__fill"></div>
                        <div className="product-list__price">12 360
                          <i className="fa fa-rub" aria-hidden="true"></i>
                        </div>
                        <div className="product-list__delete">
                          <i className="fa fa-times" aria-hidden="true"></i>
                        </div>
                      </div>
                      <div className="product-list__item">
                        <a className="product-list__pic">
                          <img src="img/product-list__pic_1.jpg" alt="product"/> </a>
                        <a href="#" className="product-list__product">Ботинки женские, Baldinini</a>
                        <div className="product-list__fill"></div>
                        <div className="product-list__price">12 360
                          <i className="fa fa-rub" aria-hidden="true"></i>
                        </div>
                        <div className="product-list__delete">
                          <i className="fa fa-times" aria-hidden="true"></i>
                        </div>
                      </div>
                      <div className="product-list__item">
                        <a className="product-list__pic">
                          <img src="img/product-list__pic_1.jpg" alt="product"/> </a>
                        <a href="#" className="product-list__product">Ботинки женские, Baldinini</a>
                        <div className="product-list__fill"/>
                        <div className="product-list__price">12 360
                          <i className="fa fa-rub" aria-hidden="true"/>
                        </div>
                        <div className="product-list__delete">
                          <i className="fa fa-times" aria-hidden="true"/>
                        </div>
                      </div>

                    </div>
                    <a className="basket-dropped__order-button" href="order.html">Оформить заказ</a>
                  </div>
                </div>
              </div>
            </div>
            <nav className="main-menu" onClick={(e) => this.mainMenuClicked(e)}>
              <div className="wrapper">
                <ul className="main-menu__items">
                  {/*toDo разобраться с ссылками*/}
                  <li className="main-menu__item main-menu__item_sales">
                    <a onClick={(e) => this.changeLink(e)}>Акции</a>
                  </li>
                  <li className="main-menu__item main-menu__item_women">
                    <a onClick={(e) => this.changeLink(e)}>Женская обувь</a>
                  </li>
                  <li className="main-menu__item main-menu__item_men">
                    <a onClick={(e) => this.changeLink(e)}>Мужская обувь</a>
                  </li>
                  <li className="main-menu__item main-menu__item_kids">
                    <a onClick={(e) => this.changeLink(e)}>Детская обувь</a>
                  </li>
                  <li className="main-menu__item main-menu__item_accessories">
                    <a onClick={(e) => this.changeLink(e)}>Аксессуары</a>
                  </li>
                  <li className="main-menu__item main-menu__item_home">
                    <a onClick={(e) => this.changeLink(e)}>Для дома</a>
                  </li>
                  <li className="main-menu__item main-menu__item_brands">
                    <a onClick={(e) => this.changeLink(e)}>Бренды</a>
                  </li>
                  <li className="main-menu__item main-menu__item_new">
                    <a onClick={(e) => this.changeLink(e)}>Новинки</a>
                  </li>
                </ul>
              </div>
            </nav>

            <div className="dropped-menu">
              <div className="wrapper">
                <div className="dropped-menu__lists dropped-menu__lists_women">
                  <h3 className="dropped-menu__list-title">Повод:</h3>
                  <ul className="dropped-menu__list">
                    <li className="dropped-menu__item">
                      <Link onClick={() => this.linkClick()}
                            to={{pathname: '/catalogue', search: `${this.pathName}&reason=Офис`}}>Офис</Link>
                    </li>
                    <li className="dropped-menu__item">
                      <Link onClick={() => this.linkClick()}
                            to={{pathname: '/catalogue', search: `${this.pathName}&reason=Вечеринка`}}>Вечеринка</Link>
                    </li>
                    <li className="dropped-menu__item">
                      <Link onClick={() => this.linkClick()}
                            to={{pathname: '/catalogue', search: `${this.pathName}&reason=Свадьба`}}>Свадьба</Link>
                    </li>
                    <li className="dropped-menu__item">
                      <Link onClick={() => this.linkClick()}
                            to={{pathname: '/catalogue', search: `${this.pathName}&reason=Спорт`}}>Спорт</Link>
                    </li>
                    <li className="dropped-menu__item">
                      <Link onClick={() => this.linkClick()}
                            to={{pathname: '/catalogue', search: `${this.pathName}&reason=Море`}}>Море</Link>
                    </li>
                    <li className="dropped-menu__item">
                      <Link onClick={() => this.linkClick()}
                            to={{pathname: '/catalogue', search: `${this.pathName}&reason=Дом`}}>Дом</Link>
                    </li>
                    <li className="dropped-menu__item">
                      <Link onClick={() => this.linkClick()} to={{
                        pathname: '/catalogue',
                        search: `${this.pathName}&reason=Повседневное`
                      }}>Повседневное</Link>
                    </li>
                  </ul>
                </div>
                <div className="dropped-menu__lists dropped-menu__lists_three-coloumns">
                  <h3 className="dropped-menu__list-title">Категории:</h3>
                  <ul className="dropped-menu__list">
                    <li className="dropped-menu__item">
                      <Link onClick={() => this.linkClick()}
                            to={{pathname: '/catalogue', search: `${this.pathName}&type=Балетки`}}>Балетки</Link>
                    </li>
                    <li className="dropped-menu__item">
                      <Link onClick={() => this.linkClick()}
                            to={{pathname: '/catalogue', search: `${this.pathName}&type=Босоножки`}}>Босоножки</Link>
                    </li>
                    <li className="dropped-menu__item">
                      <Link onClick={() => this.linkClick()}
                            to={{pathname: '/catalogue', search: `${this.pathName}&type=Ботильоны`}}>Ботильоны</Link>
                    </li>
                    <li className="dropped-menu__item">
                      <Link onClick={() => this.linkClick()}
                            to={{pathname: '/catalogue', search: `${this.pathName}&type=Ботинки`}}>Ботинки</Link>
                    </li>
                    <li className="dropped-menu__item">
                      <Link onClick={() => this.linkClick()}
                            to={{pathname: '/catalogue', search: `${this.pathName}&type=Ботфорты`}}>Ботфорты</Link>
                    </li>
                    <li className="dropped-menu__item">
                      <Link onClick={() => this.linkClick()}
                            to={{pathname: '/catalogue', search: `${this.pathName}&type=Галоши`}}>Галоши</Link>
                    </li>
                    <li className="dropped-menu__item">
                      <Link onClick={() => this.linkClick()}
                            to={{pathname: '/catalogue', search: `${this.pathName}&type=Кеды и кроссовки`}}>Кеды и
                        кроссовки</Link>
                    </li>
                    <li className="dropped-menu__item">
                      <Link onClick={() => this.linkClick()}
                            to={{pathname: '/catalogue', search: `${this.pathName}&type=Мокасины`}}>Мокасины</Link>
                    </li>
                    <li className="dropped-menu__item">
                      <Link onClick={() => this.linkClick()}
                            to={{pathname: '/catalogue', search: `${this.pathName}&type=Полусапоги`}}>Полусапоги</Link>
                    </li>
                    <li className="dropped-menu__item">
                      <Link onClick={() => this.linkClick()}
                            to={{pathname: '/catalogue', search: `${this.pathName}&type=Резиновые сапоги`}}>Резиновые
                        сапоги</Link>
                    </li>
                    <li className="dropped-menu__item">
                      <Link onClick={() => this.linkClick()}
                            to={{pathname: '/catalogue', search: `${this.pathName}&type=Сабо`}}>Сабо</Link>
                    </li>
                    <li className="dropped-menu__item">
                      <Link onClick={() => this.linkClick()}
                            to={{pathname: '/catalogue', search: `${this.pathName}&type=Сапоги`}}>Сапоги</Link>
                    </li>
                    <li className="dropped-menu__item">
                      <Link onClick={() => this.linkClick()}
                            to={{pathname: '/catalogue', search: `${this.pathName}&type=Сникерсы`}}>Сникерсы</Link>
                    </li>
                    <li className="dropped-menu__item">
                      <Link onClick={() => this.linkClick()}
                            to={{pathname: '/catalogue', search: `${this.pathName}&type=Тапочки`}}>Тапочки</Link>
                    </li>
                    <li className="dropped-menu__item">
                      <Link onClick={() => this.linkClick()}
                            to={{pathname: '/catalogue', search: `${this.pathName}&type=Туфли`}}>Туфли</Link>
                    </li>
                    <li className="dropped-menu__item">
                      <Link onClick={() => this.linkClick()}
                            to={{pathname: '/catalogue', search: `${this.pathName}&type=Шлёпанцы и вьетнамки`}}>Шлёпанцы
                        и вьетнамки</Link>
                    </li>
                  </ul>
                </div>
                <div className="dropped-menu__lists">
                  <h3 className="dropped-menu__list-title">Сезон:</h3>
                  <ul className="dropped-menu__list">
                    <li className="dropped-menu__item">
                      <Link onClick={() => this.linkClick()}
                            to={{pathname: '/catalogue', search: `${this.pathName}&season=Зима`}}>Зима</Link>
                    </li>
                    <li className="dropped-menu__item">
                      <Link onClick={() => this.linkClick()}
                            to={{pathname: '/catalogue', search: `${this.pathName}&season=Весна`}}>Весна</Link>
                    </li>
                    <li className="dropped-menu__item">
                      <Link onClick={() => this.linkClick()}
                            to={{pathname: '/catalogue', search: `${this.pathName}&season=Лето`}}>Лето</Link>
                    </li>
                    <li className="dropped-menu__item">
                      <Link onClick={() => this.linkClick()}
                            to={{pathname: '/catalogue', search: `${this.pathName}&season=Осень`}}>Осень</Link>
                    </li>
                  </ul>
                </div>
                <div className="dropped-menu__lists">
                  <h3 className="dropped-menu__list-title">Бренды:</h3>
                  <ul className="dropped-menu__list">
                    <li className="dropped-menu__item">
                      <Link onClick={() => this.linkClick()}
                            to={{pathname: '/catalogue', search: `${this.pathName}&brand=Albano`}}>Albano</Link>
                    </li>
                    <li className="dropped-menu__item">
                      <Link onClick={() => this.linkClick()}
                            to={{pathname: '/catalogue', search: `${this.pathName}&brand=Ballin`}}>Ballin</Link>
                    </li>
                    <li className="dropped-menu__item">
                      <Link onClick={() => this.linkClick()}
                            to={{pathname: '/catalogue', search: `${this.pathName}&brand=Baldinini`}}>Baldinini</Link>
                    </li>
                    <li className="dropped-menu__item">
                      <Link onClick={() => this.linkClick()}
                            to={{pathname: '/catalogue', search: `${this.pathName}&brand=Damlax`}}>Damlax</Link>
                    </li>
                    <li className="dropped-menu__item">
                      <Link onClick={() => this.linkClick()}
                            to={{pathname: '/catalogue', search: `${this.pathName}&brand=Pegia`}}>Pegia</Link>
                    </li>
                    <li className="dropped-menu__item">
                      <Link onClick={() => this.linkClick()}
                            to={{pathname: '/catalogue', search: `${this.pathName}&brand=Renzi`}}>Renzi</Link>
                    </li>
                    <li className="dropped-menu__item">
                      <Link onClick={() => this.linkClick()}
                            to={{pathname: '/catalogue', search: `${this.pathName}&brand`}}>Все</Link>
                    </li>
                  </ul>
                </div>

              </div>
            </div>
          </header>
        </div>
      </div>
    )
  }
}