import React from 'react';
// import { Link } from "react-router-dom";
import CategoryGetter from './helpers/categoryGetter'
import NewDealsProducts from "./ComponentLibrary/NewDealsProducts"

const categoryGetter = new CategoryGetter();

export default class HomePage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      preloader: '',
      featuredProducts: [],
      activeFeatured: 'new-deals__menu-item_active'
    };

    this.featuredProducts = [];
    this.categories = [];

    this.featuredElement = null;
  }

  componentDidMount() {
    this.hidePreloader(false);

    const params = {
      method: 'GET',
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    };

    fetch('https://neto-api.herokuapp.com/bosa-noga/featured', params)
      .then(response => response.json())
      .then(featured => {
        this.featuredProducts = featured.data;

        this.setState({
          preloader: 'hidden'
        })
      })
      .finally(() => {
        this.categories = categoryGetter.getAllCategories();
        this.hidePreloader(true);

        this.categoryFilter(null, 13);
        // this.inFavorites();
      });
  }

  categoryFilter(event, categoryId) {
    if(event && !this.featuredElement) {
      document.querySelector('.new-deals__menu-item_active').classList.remove('new-deals__menu-item_active');
    }

    if(this.featuredElement){
      this.featuredElement.classList.remove('new-deals__menu-item_active');
    }

    if(event) {
      event.target.parentNode.classList.add('new-deals__menu-item_active');
      this.featuredElement = event.target.parentNode;
    }
    const filteredProducts = this.featuredProducts.filter(product => {
      return product.categoryId === categoryId;
    });

    this.setState({
      featuredProducts: filteredProducts
    });
    // console.log(filteredProducts);
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

        <div className="container">
          <section className="slider">
            <div className="wrapper">
              <div className="slider__pictures">
                <a className="slider__image" href="#">
                  <img src="img/slider.jpg" alt="slide picture"/>
                </a>
                <a className="slider__image" href="#">
                  <img src="img/slider180deg.jpeg" alt="slide picture"/>
                </a>
                <a className="slider__image" href="#">
                  <img src="img/slider.jpg" alt="slide picture"/>
                </a>
                <a className="slider__image" href="#">
                  <img src="img/slider180deg.jpeg" alt="slide picture"/>
                </a>
                <div className="arrow slider__arrow slider__arrow_left" />
                <div className="arrow slider__arrow slider__arrow_right" />
                <div className="slider__circles">
                  <button className="slider__circle" value="0" />
                  <button className="slider__circle" value="1" />
                  <button className="slider__circle" value="2" />
                  <button className="slider__circle" value="3" />
                </div>
                <h2 className="h2">К весне готовы!</h2>
              </div>
            </div>
          </section>

          <section className="new-deals wave-bottom">
            <h2 className="h2">Новинки</h2>
            <div className="new-deals__menu">
              <ul className="new-deals__menu-items">
                <li className="new-deals__menu-item new-deals__menu-item_active" id="women">
                  <a onClick={event => this.categoryFilter(event, 13)}>Женская обувь</a>
                </li>
                <li className="new-deals__menu-item" id="men">
                  <a onClick={event => this.categoryFilter(event, 12)}>Мужская обувь</a>
                </li>
                <li className="new-deals__menu-item" id="children">
                  <a onClick={event => this.categoryFilter(event, 15)}>Детская обувь</a>
                </li>
                <li className="new-deals__menu-item" id="accessories">
                  <a onClick={event => this.categoryFilter(event, 14)}>аксессуары</a>
                </li>
                <li className="new-deals__menu-item" id="home">
                  <a onClick={event => this.categoryFilter(event, 14)}>для дома</a>
                </li>
              </ul>
            </div>
            <NewDealsProducts filteredProducts={this.state.featuredProducts}/>
          </section>

          <section className="sales-and-news wave-bottom">
            <h2 className="h2">акции и новости</h2>
            <div className="sales-and-news__items">
              <div className="sales-and-news__item sales-and-news__item_1">
                <a href="#">
                  <h3 className="h3">обувь к свадьбе</h3>
                </a>
              </div>
              <div className="sales-and-news__item sales-and-news__item_2">
                <a href="#">
                  <h3 className="h3">20% скидка
                    <br/>
                    <span>На летнюю обувь</span>
                  </h3>
                </a>
              </div>
              <div className="sales-and-news__item sales-and-news__item_3">
                <a href="#">
                  <h3 className="h3">готовимся к лету!</h3>
                </a>
              </div>
              <div className="sales-and-news__item sales-and-news__item_4">
                <a href="#">
                  <h3 className="h3">Больше покупок –
                    <br/>больше скидка!</h3>
                </a>
              </div>
              <div className="sales-and-news__news">
                <div className="sales-and-news__arrow sales-and-news__arrow_up arrow" />
                <div className="sales-and-news__new">
                  <time dateTime="2017-01-18 00:00">18 января 2017</time>
                  <a href="#">Американские резиновые сапоги Bogs идеально подходят для русской зимы!</a>
                </div>
                <div className="sales-and-news__new">
                  <time dateTime="2017-05-18 00:00">18 мая 2017</time>
                  <a href="#">Магазины Bosa Noga</a>
                </div>
                <div className="sales-and-news__new">
                  <time dateTime="2017-03-10 00:00">10 марта 2017</time>
                  <a href="#">Тенденция весны 2018: розовый и фуксия. 10 пар обуви для яркого образа</a>
                </div>
                <div className="sales-and-news__arrow sales-and-news__arrow_down arrow" />
              </div>
            </div>
          </section>

          <section className="about-us">
            <h2 className="about-us__title">Клиенты делают заказ
              <br/> в интернет-магазине BosaNoga!</h2>
            <p className="about-us__text">
              В Интернете можно встретить немало магазинов, предлагающих аксессуары. Но именно к нам хочется
              возвращаться снова и снова.
            </p>
            <h3 className="about-us__text_header">Мы предлагаем вам особые условия:</h3>
            <ol className="about-us__text">
              <li>Индивидуальный подход специалиста. Когда поступает новая коллекция обуви весна-лето или же коллекция
                обуви осень-зима
                – покупателям бывает трудно сориентироваться во всем многообразии новинок. Наш менеджер по телефону
                поможет вам
                определиться с товарами, подходящими именно вам.
              </li>
              <li>Мы периодически проводим распродажи как женских и мужских, так и детских моделей. Вы будете приятно
                удивлены ценами
                на аксессуары в мага- зине BosaNoga.
              </li>
              <li>У нас всегда есть из чего выбрать. Неважно, какую категорию вы прос- матриваете: осень-зима, или же
                весна-лето –
                вы всегда сможете найти ва- рианты, подходящие вам по внешнему виду и цене.
              </li>
              <li>Мы несем ответственность за все товары.</li>
              <li>Молодые мамы будут рады обширному ассортименту детских моделей.</li>
            </ol>
            <p className="about-us__text">
              Если вы ищете место, где представлены обувные новинки от самых известных брендов, то вы зашли по верному
              адресу.
            </p>
            <p className="about-us__text"></p>
            <p> У нас представлены модели для мужчин, женщин, а также детские сапоги, босоножки, ботинки и туфли. Сделав
              заказ в нашем интернет-магазине,
              вы сможете быть модным и стильным как осенью-зимой, так и весной-летом. Просто наберите номер нашего
              телефона, и мы
              поможем вам определиться с покупкой.</p>
            <span className="about-us__text_overlay"></span>
            <button className="about-us__text_button">читать</button>
          </section>
        </div>
      </div>
    )
  }
}