export default class sessionVisited {
  constructor() {
    this.visitedArr = JSON.parse(sessionStorage.getItem('recentlyWatched'));
    this.product = {};
  }

  add(product){
    if(!this.visitedArr) {
      this.visitedArr = [];

      this.visitedArr.push(product);
    }
    else if(this.visitedArr.length < 10 && !this.visitedArr.find(watched => {return watched.id === product.id;})) {
      this.visitedArr.push(product);
    }
    else if(this.visitedArr && this.visitedArr.length > 10){
      this.visitedArr.shift();
      this.visitedArr.push(product);
    }

    sessionStorage.setItem('recentlyWatched', JSON.stringify(this.visitedArr));
  }

  getRecentlyWatched() {
    return this.visitedArr = JSON.parse(sessionStorage.getItem('recentlyWatched'));
  }
}