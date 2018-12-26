import React, { Component } from 'react';
import Header from './js/Header';
// import About from './js/about';
import Main from './js/Main'
import './App.css';

class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <Main />
      </div>
    );
  }
}

export default App;
