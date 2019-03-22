import React from 'react';
import {Link} from "react-router-dom";

import Favorites from './helpers/favorites'
import Paginator from './ComponentLibrary/paginator'

const favorite = new Favorites();

export class Favorite extends React.Component {
  constructor(props) {
    super(props);

    this.favoriteGoods = [];

    this.state = {
      preloader: '',
      goods: [],
      favoriteAmount: 0
    };

    this.pagesArr = [1];
  }

  componentWillMount() {
    this.hidePreloader(false);

    this.favoriteGoods = favorite.getFavorites();

    if(this.favoriteGoods) {
      this.setState({
        goods: this.favoriteGoods,
        favoriteAmount: this.favoriteGoods.length
      });
    }
  }

  componentDidMount() {
    this.hidePreloader(true);
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

  favoriteClick(event, id) {
    event.preventDefault();

    let favoriteAmount = this.state.favoriteAmount;
    favoriteAmount--;

    this.setState({
      favoriteAmount: favoriteAmount
    });

    const itemElement = event.currentTarget.parentNode;
    const goodNode = itemElement.parentNode;

    favorite.remove(id);
    goodNode.remove();
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
          <div className="wrapper wrapper_favorite">
            <div className="site-path">
              <ul className="site-path__items">
                <li className="site-path__item"><Link to="/">Главная</Link></li>
                <li className="site-path__item"><Link to="/favorites">Избранное</Link></li>
              </ul>
            </div>
            <main className="product-catalogue product-catalogue_favorite">
              <section className="product-catalogue__head product-catalogue__head_favorite">
                <div className="product-catalogue__section-title">
                  <h2 className="section-name">В вашем избранном {this.state.favoriteAmount === 0 ? 'пока ничего нет':null}</h2>
                  {this.state.favoriteAmount > 0 ? <span className="amount amount_favorite"> {this.state.favoriteAmount} товаров</span> : null}
                </div>
                {this.state.favoriteAmount > 0 ? <div className="product-catalogue__sort-by">
                  <p className="sort-by">Сортировать</p>
                  <select id="sorting" name="">
                    <option value="">по дате добавления</option>
                    <option value="">по размеру</option>
                    <option value="">по производителю</option>
                  </select>
                </div> : null}

              </section>
              <section className="product-catalogue__item-list product-catalogue__item-list_favorite">
                {this.state.goods.map(good =>
                  <Link
                    to={`/product/${good.id}`}
                    key={good.id}
                    className="item-list__item-card item"
                    >
                    <div className="item-pic"><img className="item-pic-1"
                                                   src={good.images[0]}
                                                   alt={good.title}
                                                   width='100%'/>
                      <div className="product-catalogue__product_favorite"
                           onClick={event => this.favoriteClick(event, good.id)}>
                        <p/>
                      </div>
                      <div className="arrow arrow_left"/>
                      <div className="arrow arrow_right"/>
                    </div>
                    <div className="item-desc">
                      <h4 className="item-name">{good.title}</h4>
                      <p className="item-producer">Производитель: <span className="producer">{good.brand}</span></p>
                      <p className="item-price">{good.price}</p>
                      <div className="sizes">
                        <p className="sizes__title">Размеры в наличии:</p>
                        <p className="sizes__avalible">{good.sizes.map(size => {return size.size}).join()}</p>
                      </div>
                    </div>
                  </Link>
                )}
              </section>

              {this.state.goods.length > 0 ? <Paginator pagesArr={this.pagesArr}/>:null}

            </main>
          </div>
        </div>
      </div>
    )
  }
}