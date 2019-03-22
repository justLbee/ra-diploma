import React, {Component} from 'react';
import Header from './js/Header';
import Main from './js/Main'
import Footer from './js/Footer'
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.categories = {};
  }

  render() {
    return (
      <div>
        <HeaderMenuWrapper />
        <Footer/>
      </div>
    );
  }
}

class HeaderMenuWrapper extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      basketProductsAmount: false,
      basketActiveDisplay: 'none',
      productsInBasket: []
    }
  }

  toggleBasket = (increase) => {
    if(increase) {
      this.setState({
        basketProductsAmountIncrease: true,
      });
    } else {
      this.setState({
        basketProductsAmountIncrease: false,
      });
    }
  };


  render() {
    return(
      <div>
        <Header basketProductsAmountIncrease={this.state.basketProductsAmountIncrease}/>
        <Main onClick={this.toggleBasket}/>
      </div>
    )
  }
}

export default App;
