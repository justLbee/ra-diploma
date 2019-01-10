import React, { Component } from 'react';
import Header from './js/Header';
import Main from './js/Main'
import Footer from './js/Footer'
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.categories = {};
    // this.products = {};
  }

  componentWillMount() {
    const params = {
      method: 'GET',
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    };

    fetch('https://neto-api.herokuapp.com/bosa-noga/categories', params)
      .then(response => response.json())
      .then(categories => {
        this.categories = categories.data;
        console.log(this.categories);
      });

    // fetch('https://neto-api.herokuapp.com/bosa-noga/products', params)
    //   .then(response => response.json())
    //   .then(products => {
    //     this.products = products;
    //     console.log(this.products);
    //   });
  }

  render() {
    return (
      <div>
        <Header />
        <Main/>
        <Footer />
      </div>
    );
  }
}

export default App;
