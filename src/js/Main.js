import React from 'react';

import HomePage from "./HomePage";
import {Refund} from "./Refund";
import {About} from "./About";
import {Delivery} from "./Delivery";
import {Contacts} from "./Contacts";
import {News} from "./News";
import {Catalogue} from "./Catalogue";
import {Favorite} from "./Favorite";

import { Switch, Route } from "react-router-dom";

// const {Route, Switch} = ReactRouterDOM;

export default class Main extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      categories: []
    }
  }

  componentDidMount() {
    const params = {
      method: 'GET',
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    };

    fetch('https://neto-api.herokuapp.com/bosa-noga/categories', params)
      .then(response => response.json())
      .then(categories => {
        // this.categories = categories.data;

        this.setState({
          categories: categories.data
        });
      });
  }

  WithCatalogue = (props) => {
    const {categories} = this.state;
    return (
      <Catalogue
        {...props}
        categories={categories}
      />
    );
  };

  render() {
    return(
      <main>
        <Switch>
          <Route exact path='/' component={HomePage}/>
          <Route path='/refund' component={Refund}/>
          <Route path='/delivery' component={Delivery}/>
          <Route path='/about' component={About}/>
          <Route path='/contacts' component={Contacts}/>
          <Route path='/news' component={News}/>
          <Route path='/catalogue' component={this.WithCatalogue}/>
          <Route path='/favorite' component={Favorite}/>
        </Switch>
      </main>
    )
  }
}

