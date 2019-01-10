import React from 'react';

import HomePage from "./HomePage";
import {Refund} from "./Refund";
import {About} from "./About";
import {Delivery} from "./Delivery";
import {Contacts} from "./Contacts";
import {News} from "./News";
import {Catalogue} from "./Catalogue";

import { Switch, Route } from "react-router-dom";

// const {Route, Switch} = ReactRouterDOM;

export default class Main extends React.Component {
  constructor(props) {
    super(props);

  }

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
          <Route path='/catalogue' component={Catalogue}/>
        </Switch>
      </main>
    )
  }
}