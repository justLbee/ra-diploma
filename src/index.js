import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import { Router } from "react-router-dom";
// import {createBrowserHistory} from "history";
// const history = createBrowserHistory();
import history from './js/helpers/history';

ReactDOM.render(
  <Router history={history}>
    <div>
      <App/>
    </div>
  </Router>
  ,
  document.getElementById('root'));
