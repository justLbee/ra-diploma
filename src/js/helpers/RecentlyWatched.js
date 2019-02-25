import React from "react";
import {Link} from "react-router-dom";
import SessionStorageVisited from "./sessionVisited"
import Slide from "./OverLookedSlide"

const sessionVisited = new SessionStorageVisited();

export default class RecentlyWatched extends React.Component {
  constructor(props) {
    super(props);

    this.recentlyWatchedArr = [];

    this.state = {
      recentlyWatchedState: [],
      currentIndex: 5,
      deletedIndex: -1
    };
  }

  componentWillMount() {
    this.recentlyWatchedArr = sessionVisited.getRecentlyWatched();
  }

  nextProduct() {
    if (this.state.currentIndex < this.recentlyWatchedArr.length) {
      let currIndex = this.state.currentIndex + 1;
      let delIndex = this.state.deletedIndex + 1;
      this.setState({
        currentIndex: currIndex,
        deletedIndex: delIndex
      })
    }
  }

  prevProduct() {
    if (this.state.deletedIndex >= 0) {
      let currIndex = this.state.currentIndex - 1;
      let delIndex = this.state.deletedIndex - 1;
      this.setState({
        currentIndex: currIndex,
        deletedIndex: delIndex
      })
    }
  }

  render() {
    return (
      <div>
        {this.recentlyWatchedArr && this.recentlyWatchedArr.length > 0 ?
          <section className="product-card__overlooked-slider">
            <h3>Вы смотрели:</h3>
            <div className="overlooked-slider">
              {this.recentlyWatchedArr.length > 5 ?
                <div className="overlooked-slider__arrow overlooked-slider__arrow_left arrow"
                     onClick={event => this.prevProduct(event)}/> : null}

              {this.recentlyWatchedArr.map((product, index) =>
                this.state.deletedIndex < index && index < this.state.currentIndex ?
                  <Slide key={index} product={product} display={'block'}/> :
                  <Slide key={index} product={product} display={'none'}/>
              )}


              {this.recentlyWatchedArr.length > 5 ?
                <div className="overlooked-slider__arrow overlooked-slider__arrow_right arrow"
                     onClick={event => this.nextProduct(event)}/> : null}
            </div>
          </section> : null}

      </div>
    )
  }
}