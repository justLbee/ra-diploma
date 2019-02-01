import React from 'react';
import {Link} from "react-router-dom";

import history from './helpers/history'
import Favorites from './helpers/favorites'

const favorite = new Favorites();

export class Favorite extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        hui
      </div>
    )
  }
}