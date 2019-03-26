export default class favorites {
  constructor() {
    this.productsInBasket = [];
    this.favoritesArr = [];
    this.product = {};
  }

  add(id){
    if(this.getFavorites()) {
      this.favoritesArr = this.getFavorites();
    } else {
      this.favoritesArr = [];
    }

    const params = {
      method: 'GET',
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
    };

    fetch(`https://neto-api.herokuapp.com/bosa-noga/products/${id}`, params)
      .then(response => response.json())
      .then(product => {

        this.product = product.data;
        // console.log(this);
        this.favoritesArr.push(this.product);

        localStorage.setItem('favorites', JSON.stringify(this.favoritesArr));
      })
  }

  remove(id) {
    this.favoritesArr = JSON.parse(localStorage.getItem('favorites'));

    const removableEl = this.favoritesArr.find(fav => {
        return fav.id === id;
    });

    const removableIndex = this.favoritesArr.indexOf(removableEl);

    this.favoritesArr.splice(removableIndex, 1);

    localStorage.setItem('favorites', JSON.stringify(this.favoritesArr));
  }

  getFavorites() {
    return JSON.parse(localStorage.getItem('favorites'));
  }

  isFavorite(id) {
    const favsArr = this.getFavorites();

    if(favsArr) {
      return !!favsArr.find(fav => {
        return fav.id === id;
      });
    } else {
      return false
    }
  }
}