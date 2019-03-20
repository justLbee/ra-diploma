import React, {Component} from 'react';
import Header from './js/Header';
import Main from './js/Main'
import Footer from './js/Footer'
import './App.css';
import history from "./js/helpers/history";

class App extends Component {
  constructor(props) {
    super(props);

    this.categories = {};


    // this.products = {};
  }

  // componentWillMount() {
  //   const params = {
  //     method: 'GET',
  //     headers: new Headers({
  //       'Content-Type': 'application/json'
  //     })
  //   };
  //
  //   fetch('https://neto-api.herokuapp.com/bosa-noga/categories', params)
  //     .then(response => response.json())
  //     .then(categories => {
  //       // this.categories = categories.data;
  //
  //       this.setState({
  //         categories: categories.data
  //       });
  //     });
  // }

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
      basketProductsAmount: 0,
      basketActiveDisplay: 'none',
      productsInBasket: []
    }
  }

  toggleBasket = (increase) => {
    console.log(increase);
    let basketCounter = this.state.basketProductsAmount;

    if (increase) {
      basketCounter++;
    } else {
      basketCounter--;
    }

    this.setState({
      basketProductsAmount: basketCounter,
      basketActiveDisplay: 'block',
    });
  };


  render() {
    return(
      <div>
        <Header basketProductsAmount={this.state.basketProductsAmount} basketActiveDisplay={this.state.basketActiveDisplay}/>
        <Main onClick={this.toggleBasket}/>
      </div>
    )
  }
}

export default App;
