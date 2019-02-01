export default class favorites {
  constructor() {
    this.favoritesArr = [];
    this.product;
  }
  add(id){
    const params = {
      method: 'GET',
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
    };

    fetch(`https://neto-api.herokuapp.com/bosa-noga/products/${id}`, params)
      .then(response => response.json())
      .then(product => {
        // console.log(product);
        this.product = product.data;

        console.log(this.product);
        this.favoritesArr.push(this.product)

        localStorage.setItem('favorites', JSON.stringify(this.favoritesArr));
      })
  }

  remove(id) {
    this.favoritesArr = JSON.parse(localStorage.getItem('favorites'));

    const removableEl = this.favoritesArr.find(fav => {
      if (fav.id === id) {
        return fav;
      }
    });

    const removableIndex = this.favoritesArr.indexOf(removableEl);

    this.favoritesArr.splice(removableIndex, 1);

    localStorage.setItem('favorites', JSON.stringify(this.favoritesArr));
  }

  getFavorites() {
    return JSON.parse(localStorage.getItem('favorites'));
  }
}