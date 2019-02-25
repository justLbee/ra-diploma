import React from "react";
import {Link} from "react-router-dom";
import SessionStorageVisited from "./sessionVisited"

const sessionVisited = new SessionStorageVisited();

export default class RecentlyWantched extends React.Component {
  constructor(props) {
    super(props);

    this.recentlyWatchedArr = [];

    this.state = {
      recentlyWatchedState: []
    };
  }

  componentWillMount() {
    this.recentlyWatchedArr = sessionVisited.getRecentlyWatched();
  }

  render() {
    return (
      <div>
        {this.recentlyWatchedArr && this.recentlyWatchedArr.length > 0 ? <section className="product-card__overlooked-slider">
          <h3>Вы смотрели:</h3>
          <div className="overlooked-slider">
            {this.recentlyWatchedArr.length > 5 ? <div className="overlooked-slider__arrow overlooked-slider__arrow_left arrow"/> : null}

            {this.recentlyWatchedArr.map((product, index) =>
              <div key={index} className={`overlooked-slider__item`}
                   style={{background: `url(${product.images[0]}) no-repeat`, backgroundSize: 'cover'}}>
                <Link to={`/product/${product.id}`}
                      key={product.id}> </Link>
              </div>
            )}

            {this.recentlyWatchedArr.length > 5 ? <div className="overlooked-slider__arrow overlooked-slider__arrow_right arrow"/> : null}
          </div>
        </section> : null}

      </div>
    )
  }
}