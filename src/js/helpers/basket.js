export default class basket {
  constructor() {
    this.basketId = '';
    // this.product;
    this.basketAdded = '';
    this.productsInBasket = [];
    this.productsInBasketParsed = [];

    this.productInfo = {};
  }

  checkStorage() {
    return JSON.parse(localStorage.getItem('basketId'));
  }

  addToBasket(id, size, amount, title, image, brand){
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

          localStorage.setItem('basketId', JSON.stringify(this.basketId));

          // this.getProductsInBasketFromServer();
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

          this.parseItemsInBasket();
          // localStorage.setItem('productsInBasket', JSON.stringify(this.productsInBasket));
          // this.getProductsFromLocalStorage();
          // this.getProductsInBasketFromServer();
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

  getProductsInBasketFromServer() {
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
      })
  }

  parseItemsInBasket() {
    const params = {
      method: 'GET',
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
    };

    this.productsInBasket.forEach(product => {
      fetch(`https://neto-api.herokuapp.com/bosa-noga/products/${product.id}`, params)
        .then(response => response.json())
        .then(element => {
          this.productInfo = {
            title: element.data.title,
            brand: element.data.brand,
            price: element.data.price,
            image: element.data.images[0],
            amount: product.amount,
            size: product.size,
            id: product.id
          };

          this.productsInBasketParsed.push(this.productInfo);

          localStorage.setItem('productsInBasket', JSON.stringify(this.productsInBasketParsed));
        })
    });
  }

  showProductsInBasket() {
    const productsInBasket = JSON.parse(localStorage.getItem('productsInBasket'));
    return productsInBasket;
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