import React from 'react';

export class ProductCard extends React.Component {
  constructor(props) {
    super(props);
    // this.props = props;
    this.state = {
      preloader: ''
    };
  }

  getProductData() {
    // let search = this.match.params.id;
    // console.log(search);
    // const params = {
    //   method: 'GET',
    //   headers: new Headers({
    //     'Content-Type': 'application/json'
    //   }),
    // };
    //
    // fetch(`https://neto-api.herokuapp.com/bosa-noga/products/${id}`, params)
    //   .then(response => response.json())
    //   .then(product => {
    //     // console.log(product);
    //     this.product = product.data;
    //
    //     console.log(this.product);
    //     this.favoritesArr.push(this.product)
    //
    //     localStorage.setItem('favorites', JSON.stringify(this.favoritesArr));
    //   })
    //   .finally(() => {
    //     this.getCategory();
    //     this.hidePreloader(true);
    //   });
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
            <li className="site-path__item"><a href="index.html">Главная</a></li>
            <li className="site-path__item"><a href="#">Женская обувь</a></li>
            <li className="site-path__item"><a href="#">Ботинки</a></li>
            <li className="site-path__item"><a href="#">Ботинки женские</a></li>
          </ul>
        </div>

        <main className="product-card">
          <section className="product-card-content">
            <h2 className="section-name">Ботинки женские</h2>
            <section className="product-card-content__main-screen">

              <section className="main-screen__favourite-product-slider">
                <div className="favourite-product-slider">
                  <div className="favourite-product-slider__arrow favourite-product-slider__arrow_up arrow-up"></div>
                  <div className="favourite-product-slider__item favourite-product-slider__item-1">
                    <a href="#"></a>
                  </div>
                  <div className="favourite-product-slider__item favourite-product-slider__item-2">
                    <a href="#"></a>
                  </div>
                  <div className="favourite-product-slider__item favourite-product-slider__item-3">
                    <a href="#"></a>
                  </div>
                  <div
                    className="favourite-product-slider__arrow favourite-product-slider__arrow_down arrow-down"></div>
                </div>
              </section>

              <div className="main-screen__favourite-product-pic">
                <a href="#"><img src="../public/img/product-card-pics/product-card__favourite-product-pic.png"
                                 alt=""/></a>
                <a href="#" className="main-screen__favourite-product-pic__zoom"></a>
              </div>

              <div className="main-screen__product-info">
                <div className="product-info-title"><h2>Ботинки женские</h2>
                  <div className="in-stock">В наличии</div>
                </div>
                <div className="product-features">
                  {/*<table className="features-table">*/}
                  {/*<tr>*/}
                  {/*<td className="left-col">Артикул:</td>*/}
                  {/*<td className="right-col">BD0677C</td>*/}
                  {/*</tr>*/}
                  {/*<tr>*/}
                  {/*<td className="left-col">Производитель:</td>*/}
                  {/*<td className="right-col"><a href="#"><span className="producer">Fabi</span></a></td>*/}
                  {/*</tr>*/}
                  {/*<tr>*/}
                  {/*<td className="left-col">Цвет:</td>*/}
                  {/*<td className="right-col">чёрный</td>*/}
                  {/*</tr>*/}
                  {/*<tr>*/}
                  {/*<td className="left-col">Материалы:</td>*/}
                  {/*<td className="right-col">натуральная кожа</td>*/}
                  {/*</tr>*/}
                  {/*<tr>*/}
                  {/*<td className="left-col">Сезон:</td>*/}
                  {/*<td className="right-col">Осень-зима</td>*/}
                  {/*</tr>*/}
                  {/*<tr>*/}
                  {/*<td className="left-col">Повод:</td>*/}
                  {/*<td className="right-col">Любой</td>*/}
                  {/*</tr>*/}
                  {/*</table>*/}
                </div>
                <p className="size">Размер</p>
                <ul className="sizes">
                  <li><a href="#">36</a></li>
                  <li className="active"><a href="#">37</a></li>
                  <li><a href="#">38</a></li>
                  <li><a href="#">38</a></li>
                  <li><a href="#">39</a></li>
                </ul>
                <div className="size-wrapper">
                  <a href="#"><span className="size-rule"/><p className="size-table">Таблица размеров</p></a>
                </div>
                <a href="#" className="in-favourites-wrapper">
                  <div className="favourite" href="#"></div>
                  <p className="in-favourites">В избранное</p>
                </a>
                <div className="basket-item__quantity">
                  <div className="basket-item__quantity-change basket-item-list__quantity-change_minus">-</div>
                  1
                  <div className="basket-item__quantity-change basket-item-list__quantity-change_plus">+</div>
                </div>
                <div className="price">26 120 ₽</div>
                <button className="in-basket in-basket-click">В корзину</button>
              </div>

            </section>
          </section>
        </main>
      </div>

    )
  }
}