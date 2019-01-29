import React from 'react';
import {Link} from "react-router-dom";

import throttle from './helpers/throttle.js'

import history from './helpers/history'

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
      pages: 0,
      minPrice: 1000,
      maxPrice: 3000,
      brand: '',
    };

    this.search = {
      oldValue: '',
      searchString: ''
    };

    this.sizeFilterArr = [];
    this.pagesArr = [];

    this.filter = {
      type: {name: '', value: '', filter: null},
      price: {name: '', value: '', filter: null},
      color: {name: '', value: '', filter: null},
      size: {name: '', value: '', filter: null},
      reason: {name: '', value: '', filter: null},
      season: {name: '', value: '', filter: null},
      brand: {name: '', value: '', filter: null},
      discount: {name: '', value: '', filter: null},
      minPrice: {name: '', value: '', filter: null},
      maxPrice: {name: '', value: '', filter: null},
      page: {name: '', value: '', filter: null},
      discounted: {name: '', value: '', filter: null},
      sortBy: {name: '', value: '', filter: null}
    };
    this.throttledUpdatePath = null;
  }

  componentDidUpdate(newProps, newState) {
    if (this.props !== newProps) {
      this.throttledUpdatePath();
    }

    this.pagesArr = [];

    for(let i = 0; i < this.state.pages; i++) {
      this.pagesArr.push(i+1);
    }
  }

  componentDidMount() {
    this.throttledUpdatePath = throttle(this.updatePath, 2000);
    this.getServerData(this.props.location.search);

    // const typeWord = this.props.location.search.substring(20);
    // const category = Number(this.props.location.search.substr(12, 2));
    // const listLinks = document.querySelectorAll('ul > li > a');
    // const searchElement = Array.from(listLinks).find(link => {
    //   if (link.textContent === typeWord){
    //     return link;
    //   }
    // });
    //
    // this.choseFilter(searchElement, 'type', typeWord, category);
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
        console.log(products);
        this.products = products;
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
      });
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

  choseFilter(element, filterType, search, category) {
    const filter = element;

    const replacedPage = `&page=${this.filter.page.value}`;
    this.search.searchString = this.search.searchString.replace(replacedPage, '');

    if (this.filter[filterType].filter || search === '') {
      const replacedString = `&${this.filter[filterType].name}=${this.filter[filterType].value}`;
      this.search.searchString = this.search.searchString.replace(replacedString, '');

      switch(filterType){
        case 'type':
          this.filter[filterType].filter.classList.remove('chosen');
          break;
        case 'color':
          this.filter[filterType].filter.classList.remove('chosen');
          break;
        case 'reason':
          this.filter[filterType].filter.classList.remove('chosen');
          break;
      }
    }

    switch(filterType){
      case 'type':
        filter.classList.add('chosen');
        break;
      case 'color':
        filter.classList.add('chosen');
        break;
      case 'reason':
        filter.classList.add('chosen');
        break;
      case 'page':
        document.querySelector('.active').classList.remove('active');
        filter.parentNode.classList.add('active');
    }

    this.filter[filterType].name = filterType;
    this.filter[filterType].filter = filter;

    if(filterType === 'size' && this.sizeFilterArr.length > 1) {
      const sizesString = this.sizeFilterArr.join();
      this.filter[filterType].value = sizesString;
      this.search.searchString += `&${filterType}=${sizesString}`;
    }
    else if(filterType === 'size' && this.sizeFilterArr.length === 1) {
      this.search.searchString += `&${filterType}=${this.sizeFilterArr[0]}`;
      this.filter[filterType].value = this.sizeFilterArr[0];
    }
    else if(filterType === 'size' && this.sizeFilterArr.length === 0) {
      this.search.searchString += '';
    }
    else {
      this.search.searchString += `&${filterType}=${search}`;
      this.filter[filterType].value = search;
    }

    if(filterType === 'discounted' && !search) {
      const replacedDiscount = `&discounted=false`;
      this.search.searchString = this.search.searchString.replace(replacedDiscount, '');
    }

    this.search.oldValue = search;

    category ?
      history.push(`/catalogue?categoryId=${category}${this.search.searchString}`) :
      history.push(`/catalogue?categoryId=${this.state.category.id}${this.search.searchString}`);
  }

  getMinPrice(event) {
    const minPrice = event.target.value;

    this.setState({
      minPrice: minPrice
    })
  }

  setMinPrice(event) {
    const maxPriceEl = document.querySelector('.max-price');
    const maxPrice = maxPriceEl.value;
    let minPrice = this.state.minPrice;

    if (minPrice > maxPrice) {
      minPrice = maxPrice - 1;

      this.setState({
        minPrice: minPrice,
        maxPrice: maxPrice
      })
    }

    this.choseFilter(maxPriceEl, 'maxPrice', maxPrice);
    this.choseFilter(event.target, 'minPrice', minPrice);
  }

  getMaxPrice(event) {
    const maxPrice = event.target.value;
    this.setState({
      maxPrice: maxPrice
    })
  }

  setMaxPrice(event) {
    const minPriceEl = document.querySelector('.min-price');
    const minPrice = minPriceEl.value;
    let maxPrice = this.state.minPrice;

    if (maxPrice < minPrice) {
      maxPrice = minPrice + 1;

      this.setState({
        minPrice: minPrice,
        maxPrice: maxPrice
      })
    }

    this.choseFilter(minPriceEl, 'minPrice', minPrice);
    this.choseFilter(event.target, 'maxPrice', maxPrice);
  }

  getFilteredSize(event) {
    let sizeNumber = 0;
    if(event.target.checked) {
      const selectedSize = event.target.parentNode.querySelector('.label');
      sizeNumber = Number(selectedSize.textContent);

      this.sizeFilterArr.push(sizeNumber);
    } else {
      this.sizeFilterArr.splice(this.sizeFilterArr.indexOf(sizeNumber), 1);
    }

    this.choseFilter(event.target, 'size', sizeNumber);
  }

  brandChange(event) {
    const brandName = event.target.value;
    this.setState({
      brand: brandName
    })
  }

  brandSearch(event) {
    event.preventDefault;
    this.choseFilter(event.target, 'brand', this.state.brand);
  }

  changePage(event, isForward) {
    const currentPageEl = document.querySelector('.active').firstElementChild;
    let currentPageNum = Number(currentPageEl.textContent);

    if(isForward) {
      currentPageNum < this.pagesArr.length ? currentPageNum++:currentPageNum;
    }
    else {
      currentPageNum > 1 ? currentPageNum--:currentPageNum;
    }

    const nextPage = document.getElementById(`${currentPageNum}`).firstElementChild;
    this.choseFilter(nextPage, 'page', currentPageNum);
  }

  clearFilters() {
    this.search.searchString = '';
  }

  getDiscounted(event) {
    const isDiscounted = event.target.checked;

    this.choseFilter(event.target, 'discounted', isDiscounted);
  }

  sortChange(event) {
    const sortingBy = event.target.value;

    this.choseFilter(event.target, 'sortBy', sortingBy);
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
            <li className="site-path__item"><Link to="/">Главная</Link></li>
            <li className="site-path__item"><Link
              onClick={e => this.clearFilters(e)}
              to={{
              pathname: '/catalogue',
              search: `?categoryId=${this.state.category.id}`
            }}>{this.state.category.title}</Link></li>
          </ul>
        </div>

        <main className="product-catalogue">
          <section className="sidebar">
            <section className="sidebar__division">
              <div className="sidebar__catalogue-list">
                <div className="sidebar__division-title">
                  <h3>Каталог</h3>
                  <div className="opener-down"/>
                </div>
                <ul>
                  <li><a onClick={e => this.choseFilter(e.target, 'type', 'Балетки')}>Балетки</a></li>
                  <li><a onClick={e => this.choseFilter(e.target, 'type', 'Босоножки и сандалии')}>Босоножки и сандалии</a></li>
                  <li><a onClick={e => this.choseFilter(e.target, 'type', 'Ботильоны')}>Ботильоны</a></li>
                  <li><a onClick={e => this.choseFilter(e.target, 'type', 'Ботинки')}>Ботинки</a></li>
                  <li><a onClick={e => this.choseFilter(e.target, 'type', 'Ботфорты')}>Ботфорты</a></li>
                  <li><a onClick={e => this.choseFilter(e.target, 'type', 'Галоши')}>Галоши</a></li>
                  <li><a onClick={e => this.choseFilter(e.target, 'type', 'Тапочки')}>Тапочки</a></li>
                  <li><a onClick={e => this.choseFilter(e.target, 'type', 'Туфли')}>Туфли</a></li>
                  <li><a onClick={e => this.choseFilter(e.target, 'type', 'Сапоги')}>Сапоги</a></li>
                </ul>
              </div>
            </section>
            <div className="separator-150 separator-150-1"/>
            <section className="sidebar__division">
              <div className="sidebar__price">
                <div className="sidebar__division-title">
                  <h3>Цена</h3>
                  <div className="opener-down" />
                </div>
                <div className="price-slider">
                  <div className="circle-container">
                    <div className="circle-1" />
                    <div className="line-white" />
                    <div className="line-colored" />
                    <div className="circle-2" />
                  </div>
                  <div className="counter">
                    <input type="text" className="input-1 min-price"
                           onChange={e => this.getMinPrice(e)}
                           onBlur={e => this.setMinPrice(e)}
                           value={this.state.minPrice}/>
                    <div className="input-separator" />
                    <input type="text" className="input-2 max-price"
                           onChange={e => this.getMaxPrice(e)}
                           onBlur={e => this.setMaxPrice(e)}
                           value={this.state.maxPrice}/>
                  </div>
                </div>
              </div>
            </section>
            <div className="separator-150 separator-150-2" />
            <section className="sidebar__division">
              <div className="sidebar__color">
                <div className="sidebar__division-title">
                  <h3>Цвет</h3>
                  <div className="opener-down" />
                </div>
                <ul>
                  <li><a onClick={e => this.choseFilter(e.target, 'color', 'Бежевый')}>
                    <div className="color beige" />
                    <span className="color-name">Бежевый</span>
                  </a></li>
                  <li><a onClick={e => this.choseFilter(e.target, 'color', 'Белый')}>
                    <div className="color whitesnake" />
                    <span className="color-name">Белый</span></a></li>
                  <li><a onClick={e => this.choseFilter(e.target, 'color', 'Голубой')}>
                    <div className="color shocking-blue" />
                    <span className="color-name">Голубой</span></a></li>
                  <li><a onClick={e => this.choseFilter(e.target, 'color', 'Жёлтый')}>
                    <div className="color yellow" />
                    <span className="color-name">Жёлтый</span></a></li>
                  <li><a onClick={e => this.choseFilter(e.target, 'color', 'Алый')}>
                    <div className="color king-crimson" />
                    <span className="color-name">Алый</span></a></li>
                  <li><a onClick={e => this.choseFilter(e.target, 'color', 'Фиолетовый')}>
                    <div className="color deep-purple" />
                    <span className="color-name">Фиолетовый</span></a></li>
                  <li><a onClick={e => this.choseFilter(e.target, 'color', 'Чёрный')}>
                    <div className="color black-sabbath" />
                    <span className="color-name">Чёрный</span></a></li>
                </ul>
              </div>
            </section>
            <div className="separator-150 separator-150-3" />
            <section className="sidebar__division">
              <div className="sidebar__size">
                <div className="sidebar__division-title">
                  <h3>Размер</h3>
                  <div className="opener-down" />
                </div>
                <ul>
                  <div className="list-1">
                    <li><label>
                      <input type="checkbox" className="checkbox" name="checkbox-31" onChange={e => this.getFilteredSize(e)} />
                      <span className="checkbox-custom" /> <span className="label">31</span>
                    </label></li>
                    <li><label>
                      <input type="checkbox" className="checkbox" name="checkbox-33" onChange={e => this.getFilteredSize(e)}/>
                      <span className="checkbox-custom" /> <span className="label">33</span></label></li>
                    <li><label>
                      <input type="checkbox" className="checkbox" name="checkbox-35" onChange={e => this.getFilteredSize(e)}/>
                      <span className="checkbox-custom" /> <span className="label">35</span></label></li>
                    <li><label>
                      <input type="checkbox" className="checkbox" name="checkbox-37" onChange={e => this.getFilteredSize(e)}/>
                      <span className="checkbox-custom" /> <span className="label">37</span></label></li>
                    <li><label>
                      <input type="checkbox" className="checkbox" name="checkbox-39" onChange={e => this.getFilteredSize(e)}/>
                      <span className="checkbox-custom" /> <span className="label">39</span></label></li>
                  </div>
                  <div className="list-2">
                    <li><label>
                      <input type="checkbox" className="checkbox" name="checkbox-32" onChange={e => this.getFilteredSize(e)}/>
                      <span className="checkbox-custom" /> <span className="label">32</span></label></li>
                    <li><label>
                      <input type="checkbox" className="checkbox" name="checkbox-34" onChange={e => this.getFilteredSize(e)}/>
                      <span className="checkbox-custom" /> <span className="label">34</span></label></li>
                    <li><label>
                      <input type="checkbox" className="checkbox" name="checkbox-36" onChange={e => this.getFilteredSize(e)}/>
                      <span className="checkbox-custom" /> <span className="label">36</span></label></li>
                    <li><label>
                      <input type="checkbox" className="checkbox" name="checkbox-38" onChange={e => this.getFilteredSize(e)}/>
                      <span className="checkbox-custom" /> <span className="label">38</span></label></li>
                    <li><label>
                      <input type="checkbox" className="checkbox" name="checkbox-40" onChange={e => this.getFilteredSize(e)}/>
                      <span className="checkbox-custom" /> <span className="label">40</span></label></li>
                  </div>
                </ul>
              </div>
            </section>
            <div className="separator-150 separator-150-4"/>
            <section className="sidebar__division">
              <div className="sidebar__heel-height">
                <div className="sidebar__division-title">
                  <h3>Размер каблука</h3>
                  <div className="opener-up"/>
                </div>
              </div>
            </section>
            <div className="separator-150 separator-150-5"/>
            <section className="sidebar__division">
              <div className="sidebar__occasion">
                <div className="sidebar__division-title">
                  <h3>Повод</h3>
                  <div className="opener-down"/>
                </div>
                <ul>
                  <li><a onClick={e => this.choseFilter(e.target, 'reason', 'Офис')}>Офис</a></li>
                  <li><a onClick={e => this.choseFilter(e.target, 'reason', 'Вечеринка')}>Вечеринка</a></li>
                  <li><a onClick={e => this.choseFilter(e.target, 'reason', 'Свадьба')}>Свадьба</a></li>
                  <li><a onClick={e => this.choseFilter(e.target, 'reason', 'Спорт')}>Спорт</a></li>
                  <li><a onClick={e => this.choseFilter(e.target, 'reason', 'Путешествие')}>Путешествие</a></li>
                  <li><a onClick={e => this.choseFilter(e.target, 'reason', 'Свидание')}>Свидание</a></li>
                  <li><a onClick={e => this.choseFilter(e.target, 'reason', 'Дома')}>Дома</a></li>
                  <li><a onClick={e => this.choseFilter(e.target, 'reason', 'Произвести впечатление')}>Произвести
                    впечатление</a></li>
                </ul>
              </div>
            </section>
            <div className="separator-150 separator-150-6"/>
            <section className="sidebar__division">
              <div className="sidebar__season">
                <div className="sidebar__division-title">
                  <h3>Сезон</h3>
                  <div className="opener-up"/>
                </div>
              </div>
            </section>
            <div className="separator-150 separator-150-7"/>
            <section className="sidebar__division">
              <div className="sidebar__brand">
                <h3>Бренд</h3>
                <form action="" className="brand-search">
                  <input
                    type="search"
                    className="brand-search"
                    id="brand-search"
                    placeholder="Поиск"
                    onChange={e => this.brandChange(e)}
                  />
                  <input
                    type="button"
                    name=""
                    value=""
                    className="submit"
                    onClick={e => this.brandSearch(e)}
                  />
                </form>
              </div>

              <label><input
                onChange={e => this.getDiscounted(e)}
                type="checkbox"
                className="checkbox"
                name="checkbox-disc"/>
                <span className="checkbox-discount" />
                <span className="text-discount">Со скидкой</span></label>

              <div className="separator-240" />
            </section>

            <section className="sidebar__division">
              <div className="drop-down">
                <Link
                  onClick={e => this.clearFilters(e)}
                  to={{
                  pathname: '/catalogue',
                  search: `?categoryId=${this.state.category.id}`}}><span className="drop-down-icon" />Сбросить</Link>
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
                <select name="" id="sorting" onChange={event => this.sortChange(event)}>
                  <option value="popularity">по популярности</option>
                  <option value="price">по цене</option>
                </select>
              </div>
            </section>

            <section className="product-catalogue__item-list">

              {this.state.items.map(item =>
                <a key={item.id} className="item-list__item-card item">
                  <div className="item-pic"><img className="item-pic-1"
                                                 src={item.images[0]}
                                                 alt={item.title}
                                                 width='100%'/>
                    <div className="product-catalogue__product_favorite">
                      <p />
                    </div>
                    <div className="arrow arrow_left" />
                    <div className="arrow arrow_right" />
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
                <div className="angle-back"><a onClick={e => this.changePage(e, false)} /></div>
                <ul>
                  {
                    this.pagesArr.map(page =>
                      <li
                        key={page}
                        id={page}
                        className={page === 1 ? 'active':''}><a
                        onClick={e => this.choseFilter(e.target, 'page', `${page}`)}>{page}</a></li>
                    )
                  }
                </ul>
                <div className="angle-forward"><a onClick={e => this.changePage(e, true)} /></div>
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

{/*<li><a*/
}
{/*onClick={e => this.choseFilter(e, 'type', 'Балетки')}*/
}
{/*>*/
}
{/*Балетки</a></li>*/
}
{/*<li><Link*/
}
{/*to={{*/
}
{/*pathname: '/catalogue', search: `?categoryId=${this.state.category.id}&type=Босоножки и сандалии`}}*/
}
{/*onClick={e => this.choseFilter(e, 'type', 'Босоножки и сандалии')}>Босоножки и сандалии</Link></li>*/
}
{/*<li><Link*/
}
{/*to={{pathname: '/catalogue', search: `?categoryId=${this.state.category.id}&type=Ботильоны`}}*/
}
{/*onClick={e => this.choseFilter(e, 'type', 'Ботильоны')}>Ботильоны</Link></li>*/
}
{/*<li><Link*/
}
{/*to={{pathname: '/catalogue', search: `?categoryId=${this.state.category.id}&type=Ботинки`}}*/
}
{/*onClick={e => this.choseFilter(e, 'type', 'Ботинки')}>Ботинки</Link></li>*/
}
{/*<li><Link*/
}
{/*to={{pathname: '/catalogue', search: `?categoryId=${this.state.category.id}&type=Ботфорты`}}*/
}
{/*onClick={e => this.choseFilter(e, 'type', 'Ботфорты')}>Ботфорты</Link></li>*/
}
{/*<li><Link*/
}
{/*to={{pathname: '/catalogue', search: `?categoryId=${this.state.category.id}&type=Галоши`}}*/
}
{/*onClick={e => this.choseFilter(e, 'type', 'Галоши')}>Галоши</Link></li>*/
}
{/*<li><Link*/
}
{/*to={{pathname: '/catalogue', search: `?categoryId=${this.state.category.id}&type=Тапочки`}}*/
}
{/*onClick={e => this.choseFilter(e, 'type', 'Тапочки')}>Тапочки</Link></li>*/
}
{/*<li><Link*/
}
{/*to={{pathname: '/catalogue', search: `?categoryId=${this.state.category.id}&type=Туфли`}}*/
}
{/*onClick={e => this.choseFilter(e, 'type', 'Туфли')}>Туфли</Link></li>*/
}
{/*<li><Link*/
}
{/*to={{pathname: '/catalogue', search: `?categoryId=${this.state.category.id}&type=Сапоги`}}*/
}
{/*onClick={e => this.choseFilter(e, 'type', 'Сапоги')}>Сапоги</Link></li>*/
}