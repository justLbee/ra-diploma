import React, { Component } from 'react';
import history from './history'

export default class Paginator extends React.Component {
  constructor(props) {
    super(props);

    this.props = props;

    this.state = {
      prevPage: false,
      nextPage: this.props.nextPage
    };
  }

  componentWillReceiveProps(nextProps, nextContext) {
    this.setState({
      prevPage: nextProps.prevPage,
      nextPage: nextProps.nextPage
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
    // choseFilter(nextPage, 'page', currentPageNum);
  }

  //toDO надо вытаскивать фильтры отдельным файлом ((((((((
  changeLocation(element, currentPageNum) {
    document.querySelector('.active').classList.remove('active');
    element.parentNode.classList.add('active');

    const currentHref = window.location.search;
    console.log(currentHref);
    history.push(`${currentHref}&page=${currentPageNum}`);
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