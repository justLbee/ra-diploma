export default class basket {
  constructor() {
    this.basketId = '';
    // this.product;
    this.basketAdded = '';
    this.productsInBasket = [];
  }

  checkStorage() {
    return JSON.parse(localStorage.getItem('basketId'));
  }

  addToBasket(id, size, amount){
    const productToCart = {
      id: id,
      size: size,
      amount: amount
    };
    this.basketId = this.checkStorage();

    const params = {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify(productToCart)
    };

    if(!this.basketId) {
      fetch(`https://neto-api.herokuapp.com/bosa-noga/cart/`, params)
        .then(response => response.json())
        .then(basket => {
          // console.log(product);
          this.basketId = basket.data.id;
          console.log(this.basketId);

          localStorage.setItem('basketId', JSON.stringify(this.basketId));
        })
    } else {
      fetch(`https://neto-api.herokuapp.com/bosa-noga/cart/${this.basketId}`, params)
        .then(response => response.json())
        .then(basket => {
          // console.log(product);
          this.basketId = basket.data.id;
          this.productsInBasket = basket.data.products;

          console.log(this.productsInBasket);

          localStorage.setItem('basketId', JSON.stringify(this.basketId));
        })
    }
    // fetch(`https://neto-api.herokuapp.com/bosa-noga/products/${id}`, params)
    //   .then(response => response.json())
    //   .then(product => {
    //     // console.log(product);
    //     this.product = product.data;
    //
    //     this.favoritesArr.push(this.product);
    //
    //     localStorage.setItem('favorites', JSON.stringify(this.favoritesArr));
    //   })
  }

  getProductsInBasket() {
    this.basketId = this.checkStorage();

    const params = {
      method: 'GET',
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
    };

    fetch(`https://neto-api.herokuapp.com/bosa-noga/cart/${this.basketId}`, params)
      .then(response => response.json())
      .then(basket => {
        // console.log(product);
        this.basketId = basket.data.id;
        this.productsInBasket = basket.products;

        console.log(this.basketAdded);

      })
  }

  changeProductInCart(id, size, amount) {
    const productToCart = {
      id: id,
      size: size,
      amount: amount
    };
    this.basketId = this.checkStorage();

    const params = {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify(productToCart)
    };

    fetch(`https://neto-api.herokuapp.com/bosa-noga/cart/${this.basketId}`, params)
      .then(response => response.json())
      .then(basket => {
        // console.log(product);
        this.basketId = basket.data.id;
        this.productsInBasket = basket.products;

        console.log(this.productsInBasket);
      })
  }

  // remove(id) {
  //   this.favoritesArr = JSON.parse(localStorage.getItem('favorites'));
  //
  //   const removableEl = this.favoritesArr.find(fav => {
  //     if (fav.id === id) {
  //       return fav;
  //     }
  //   });
  //
  //   const removableIndex = this.favoritesArr.indexOf(removableEl);
  //
  //   this.favoritesArr.splice(removableIndex, 1);
  //
  //   localStorage.setItem('favorites', JSON.stringify(this.favoritesArr));
  // }
  //

  //
  // isFavorite(id) {
  //   this.favoritesArr = JSON.parse(localStorage.getItem('favorites'));
  //
  //   if(this.favoritesArr) {
  //     return !!this.favoritesArr.find(fav => {
  //       return fav.id === id;
  //     });
  //   } else {
  //     return false
  //   }
  // }
}