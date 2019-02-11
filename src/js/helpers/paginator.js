import React, { Component } from 'react';
import history from './history'

export default class Paginator extends React.Component {
  constructor(props) {
    super(props);

    this.props = props;

    this.state = {
      prevPage: false,
      nextPage: false
    };

    this.page = {name: '', value: 1, filter: null};
  }

  componentWillReceiveProps(nextProps, nextContext) {
    this.setState({
      prevPage: this.page.value > 1,
      nextPage: this.page.value < this.props.pagesArr.length
    })
  }

  changePage(event, isForward) {
    event.preventDefault();

    const currentPageEl = document.querySelector('.active').firstElementChild;
    let currentPageNum = Number(currentPageEl.textContent);

    if(isForward) {
      currentPageNum < this.props.pagesArr.length ? currentPageNum++:currentPageNum;
    }
    else {
      currentPageNum > 1 ? currentPageNum--:currentPageNum;
    }

    const nextPage = document.getElementById(`${currentPageNum}`).firstElementChild;

    this.changeLocation(nextPage, currentPageNum)
  }

  changeLocation(element, currentPageNum) {
    const currentHref = window.location.search;

    const replacedPage = `&page=${this.page.value}`;
    let searchString = currentHref.replace(replacedPage, '');

    searchString = `${searchString}&page=${currentPageNum}`;

    document.querySelector('.active').classList.remove('active');
    element.parentNode.classList.add('active');

    this.page.value = currentPageNum;
    history.push(searchString);
  }

  render() {
    return (
      <div className="product-catalogue__pagination">
        <div className="page-nav-wrapper">
          {this.state.prevPage ?
            <div className="angle-back"><a onClick={e => this.changePage(e, false)}/></div> : null}
          <ul>
            {
              this.props.pagesArr.map(page =>
                <li
                  key={page}
                  id={page}
                  className={page === 1 ? 'active' : ''}><a
                  onClick={e => this.changeLocation(e.target, `${page}`)}>{page}</a></li>
              )
            }
          </ul>
          {this.state.nextPage ?
            <div className="angle-forward"><a onClick={e => this.changePage(e, true)}/></div> : null}
        </div>
      </div>
    )
  }
}