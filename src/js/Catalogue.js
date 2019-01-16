import React from 'react';
import {Link} from "react-router-dom";

import throttle from './helpers/throttle.js'

import {createBrowserHistory} from "history";
const history = createBrowserHistory();

export class Catalogue extends React.Component {
  constructor(props) {
    super(props);
    this.products = {};
    // this.categories = this.props.categories;
    // this.category = '';

    this.state = {
      preloader: '',
      category: {},
      goods: 0,
      items: [],
      offset: 0,
      page: 0,
      pages: 0
    };

    this.search = {
      type: String,
      default: ''
    };

    this.throttledUpdatePath = null;
  }

  componentDidUpdate(newProps, newState) {
    if(this.props !== newProps) {
      this.throttledUpdatePath();
    }
  }

  componentDidMount() {
    this.throttledUpdatePath = throttle(this.updatePath, 2000);
    this.getServerData(this.props.location.search);
  }

  getCategory() {
    const searchCategory = Number(this.props.location.search.substr(12, 2));

    if (this.props.categories && this.props.categories.length > 0) {
      const category = this.props.categories.find(el => {
        return el.id === searchCategory ? el.title : '';
      });

      this.setState({
        category: category
      });
    }
  }

  updatePath() {
    let search = this.props.location.search;

    this.getServerData(search)
  }

  getServerData(request) {
    this.hidePreloader(false);

    const params = {
      method: 'GET',
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
    };

    fetch(`https://neto-api.herokuapp.com/bosa-noga/products${request}`, params)
      .then(response => response.json())
      .then(products => {
        this.products = products;
        console.log(this.products);
        this.setState({
          goods: this.products.goods,
          items: this.products.data,
          page: this.products.page,
          pages: this.products.pages,
          offset: this.products.offset
        })
      })
      .finally(() => {
        this.getCategory();
        this.hidePreloader(true);
        console.log(this.state);
      });
  }

  hidePreloader(isHidden = false) {
    if(isHidden) {
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
    return(
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
            <li className="site-path__item"><a href="index.html">Главная</a></li>
            <li className="site-path__item"><a href="#">Женская обувь</a></li>
          </ul>
        </div>

        <main className="product-catalogue">

          <section className="sidebar">
            <section className="sidebar__division">
              <div className="sidebar__catalogue-list">
                <div className="sidebar__division-title">
                  <h3>Каталог</h3>
                  <div className="opener-down"></div>
                </div>
                <ul>
                  <li><a href="#">Балетки</a></li>
                  <li><a href="#">Босоножки и сандалии</a></li>
                  <li><a href="#">Ботильоны</a></li>
                  <li><a href="#">Ботинки</a></li>
                  <li><a href="#">Ботфорты</a></li>
                  <li><a href="#">Галоши</a></li>
                  <li><a href="#">Тапочки</a></li>
                  <li><a href="#">Туфли</a></li>
                  <li><a href="#">Сапоги</a></li>
                </ul>
              </div>
            </section>
            <div className="separator-150 separator-150-1"></div>
            <section className="sidebar__division">
              <div className="sidebar__price">
                <div className="sidebar__division-title">
                  <h3>Цена</h3>
                  <div className="opener-down"></div>
                </div>
                <div className="price-slider">
                  <div className="circle-container">
                    <div className="circle-1"></div>
                    <div className="line-white"></div>
                    <div className="line-colored"></div>
                    <div className="circle-2"></div>
                  </div>
                  <div className="counter">
                    <input type="text" className="input-1" value="1000"/>
                    <div className="input-separator"></div>
                    <input type="text" className="input-2" value="30 000"/>
                  </div>
                </div>
              </div>
            </section>
            <div className="separator-150 separator-150-2"></div>
            <section className="sidebar__division">
              <div className="sidebar__color">
                <div className="sidebar__division-title">
                  <h3>Цвет</h3>
                  <div className="opener-down"></div>
                </div>
                <ul>
                  <li><a href="#">
                    <div className="color beige"></div>
                    <span className="color-name">Бежевый</span></a></li>
                  <li><a href="#">
                    <div className="color whitesnake"></div>
                    <span className="color-name">Белый</span></a></li>
                  <li><a href="#">
                    <div className="color shocking-blue"></div>
                    <span className="color-name">Голубой</span></a></li>
                  <li><a href="#">
                    <div className="color yellow"></div>
                    <span className="color-name">Жёлтый</span></a></li>
                  <li><a href="#">
                    <div className="color king-crimson"></div>
                    <span className="color-name">Алый</span></a></li>
                  <li><a href="#">
                    <div className="color deep-purple"></div>
                    <span className="color-name">Фиолетовый</span></a></li>
                  <li><a href="#">
                    <div className="color black-sabbath"></div>
                    <span className="color-name">Чёрный</span></a></li>
                </ul>
              </div>
            </section>
            <div className="separator-150 separator-150-3"></div>
            <section className="sidebar__division">
              <div className="sidebar__size">
                <div className="sidebar__division-title">
                  <h3>Размер</h3>
                  <div className="opener-down"></div>
                </div>
                <ul>
                  <div className="list-1">
                    <li><label><input type="checkbox" className="checkbox" name="checkbox-31"/><span
                      className="checkbox-custom"></span> <span className="label">31</span></label></li>
                    <li><label><input type="checkbox" className="checkbox" name="checkbox-33"/><span
                      className="checkbox-custom"></span> <span className="label">33</span></label></li>
                    <li><label><input type="checkbox" className="checkbox" name="checkbox-35"/><span
                      className="checkbox-custom"></span> <span className="label">35</span></label></li>
                    <li><label><input type="checkbox" className="checkbox" name="checkbox-37"/><span
                      className="checkbox-custom"></span> <span className="label">37</span></label></li>
                    <li><label><input type="checkbox" className="checkbox" name="checkbox-39"/><span
                      className="checkbox-custom"></span> <span className="label">39</span></label></li>
                  </div>
                  <div className="list-2">
                    <li><label><input type="checkbox" className="checkbox" name="checkbox-32"/><span
                      className="checkbox-custom"></span> <span className="label">32</span></label></li>
                    <li><label><input type="checkbox" className="checkbox" name="checkbox-34"/><span
                      className="checkbox-custom"></span> <span className="label">34</span></label></li>
                    <li><label><input type="checkbox" className="checkbox" name="checkbox-36" checked/><span
                      className="checkbox-custom"></span> <span className="label">36</span></label></li>
                    <li><label><input type="checkbox" className="checkbox" name="checkbox-38"/><span
                      className="checkbox-custom"></span> <span className="label">38</span></label></li>
                    <li><label><input type="checkbox" className="checkbox" name="checkbox-40"/><span
                      className="checkbox-custom"></span> <span className="label">40</span></label></li>
                  </div>
                </ul>
              </div>
            </section>
            <div className="separator-150 separator-150-4"></div>
            <section className="sidebar__division">
              <div className="sidebar__heel-height">
                <div className="sidebar__division-title">
                  <h3>Размер каблука</h3>
                  <div className="opener-up"></div>
                </div>
              </div>
            </section>
            <div className="separator-150 separator-150-5"></div>
            <section className="sidebar__division">
              <div className="sidebar__occasion">
                <div className="sidebar__division-title">
                  <h3>Повод</h3>
                  <div className="opener-down"></div>
                </div>
                <ul>
                  <li><a href="#">Офис</a></li>
                  <li><a href="#">Вечеринка</a></li>
                  <li><a href="#">Свадьба</a></li>
                  <li><a href="#">Спорт</a></li>
                  <li><a href="#">Путешествие</a></li>
                  <li><a href="#">Свидание</a></li>
                  <li><a href="#">Дома</a></li>
                  <li><a href="#">Произвести впечатление</a></li>
                </ul>
              </div>
            </section>
            <div className="separator-150 separator-150-6"></div>
            <section className="sidebar__division">
              <div className="sidebar__season">
                <div className="sidebar__division-title">
                  <h3>Сезон</h3>
                  <div className="opener-up"></div>
                </div>
              </div>
            </section>
            <div className="separator-150 separator-150-7"></div>
            <section className="sidebar__division">
              <div className="sidebar__brand">
                <h3>Бренд</h3>
                <form action="post" className="brand-search">
                  <input type="search" className="brand-search" id="brand-search" placeholder="Поиск"/>
                  <input type="submit" name="" value="" className="submit"/>
                </form>
              </div>

              <label><input type="checkbox" className="checkbox" name="checkbox-disc" /><span
                className="checkbox-discount"></span> <span className="text-discount">Со скидкой</span></label>

              <div className="separator-240"></div>
            </section>

            <section className="sidebar__division">
              <div className="drop-down">
                <a href="#"><span className="drop-down-icon"></span>Сбросить</a>
              </div>
            </section>
          </section>

          <section className="product-catalogue-content">

            <section className="product-catalogue__head">
              <div className="product-catalogue__section-title">
                <h2 className="section-name">{this.state.category.title ? this.state.category.title : ''}</h2>
                <span className="amount"> {this.products.goods} товаров</span>
              </div>
              <div className="product-catalogue__sort-by">
                <p className="sort-by">Сортировать</p>
                <select name="" id="sorting">
                  <option value="">по популярности</option>
                  <option value="">по размеру</option>
                  <option value="">по производителю</option>
                </select>
              </div>
            </section>

            <section className="product-catalogue__item-list">

              {this.state.items.map(item =>
                <a key={item.id} className="item-list__item-card item" href="product-card-desktop.html">
                  <div className="item-pic"><img className="item-pic-1"
                                                 src={item.images[0]}
                                                 alt={item.title}
                  width='80%' />
                    <div className="product-catalogue__product_favorite">
                      <p></p>
                    </div>
                    <div className="arrow arrow_left"></div>
                    <div className="arrow arrow_right"></div>
                  </div>
                  <div className="item-desc">
                    <h4 className="item-name">{item.title}</h4>
                    <p className="item-producer">Производитель: <span className="producer">{item.brand}</span></p>
                    <p className="item-price">{item.price}</p>
                    <div className="sizes">
                      <p className="sizes__title">Размеры в наличии:</p>
                      <p className="sizes__avalible">36, 37, 38, 39, 40, 41, 42</p>
                    </div>
                  </div>
                </a>
              )}
            </section>

            <div className="product-catalogue__pagination">
              <div className="page-nav-wrapper">
                <div className="angle-back"><a href="#"></a></div>
                <ul>
                  <li className="active"><a href="#">1</a></li>
                  <li><a href="#">2</a></li>
                  <li><a href="#">3</a></li>
                  <li><a href="#">4</a></li>
                  <li><a href="#">5</a></li>
                  <li><a href="">...</a></li>
                  <li><a href="#">99</a></li>
                </ul>
                <div className="angle-forward"><a href="#"></a></div>
              </div>
            </div>
          </section>
        </main>

        <section className="product-catalogue__overlooked-slider">
          <h3>Вы смотрели:</h3>
          <div className="overlooked-slider">
            <div className="overlooked-slider__arrow overlooked-slider__arrow_left arrow"></div>
            <div className="overlooked-slider__item overlooked-slider__item-1">
              <a href="product-card-desktop.html"></a>
            </div>
            <div className="overlooked-slider__item overlooked-slider__item-2">
              <a href="product-card-desktop.html"></a>
            </div>
            <div className="overlooked-slider__item overlooked-slider__item-3">
              <a href="product-card-desktop.html"></a>
            </div>
            <div className="overlooked-slider__item overlooked-slider__item-4">
              <a href="product-card-desktop.html"></a>
            </div>
            <div className="overlooked-slider__item overlooked-slider__item-5">
              <a href="product-card-desktop.html"></a>
            </div>
            <div className="overlooked-slider__arrow overlooked-slider__arrow_right arrow"></div>
          </div>
        </section>
      </div>
    )
  }
}