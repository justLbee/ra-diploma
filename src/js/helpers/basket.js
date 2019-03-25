export default class basket {
  constructor() {
    this.basketId = '';
    this.basketAdded = '';
    this.productsInBasket = [];
    this.productsInBasketParsed = [];

    this.productInfo = {};
  }

  checkStorageForId() {
    const basketId = localStorage.getItem('basketId');
    if(basketId) {
      return JSON.parse(basketId);
    }
    else {
      return null;
    }
  }

  addToBasket(id, size, amount) {
    const productToCart = {
      id: id,
      size: size,
      amount: amount
    };
    this.basketId = this.checkStorageForId();

    const params = {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify(productToCart)
    };

    if (!this.basketId) {
      fetch(`https://neto-api.herokuapp.com/bosa-noga/cart/`, params)
        .then(response => response.json())
        .then(basket => {
          // console.log(product);
          this.basketId = basket.data.id;

          localStorage.setItem('basketId', JSON.stringify(this.basketId));
        })
    } else {
      fetch(`https://neto-api.herokuapp.com/bosa-noga/cart/${this.basketId}`, params)
        .then(response => response.json())
        .then(basket => {
          // console.log(product);
          this.basketId = basket.data.id;
          this.productsInBasket = basket.data.products;

          localStorage.setItem('basketId', JSON.stringify(this.basketId));

          this.parseItemsInBasket();
        })
    }
  }

  getProductsInBasketFromServer() {
    this.basketId = this.checkStorageForId();

    const params = {
      method: 'GET',
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
    };

    if(this.basketId) {
      fetch(`https://neto-api.herokuapp.com/bosa-noga/cart/${this.basketId}`, params)
        .then(response => response.json())
        .then(basket => {
          if(basket.status !== 'error') {
            this.productsInBasket = basket.data.products;
            this.parseItemsInBasket();
          } else {
            this.basketId = '';
            localStorage.removeItem('basketId');
          }
        })
    }

  }

  parseItemsInBasket() {
    this.productsInBasketParsed = [];

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
            id: product.id,
            color: element.data.color
          };

          this.productsInBasketParsed.push(this.productInfo);

          localStorage.setItem('productsInBasket', JSON.stringify(this.productsInBasketParsed));
        })
    });
  }

  showProductsInBasket() {
    this.productsInBasketParsed = JSON.parse(localStorage.getItem('productsInBasket'));
    return this.productsInBasketParsed;
  }

  changeProductInCart(id, size, amount) {
    const productToCart = {
      id: id,
      size: size,
      amount: amount
    };
    this.basketId = this.checkStorageForId();

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
        if(basket.status !== 'error') {
          this.productsInBasket = basket.data.products;
          this.parseItemsInBasket();
        } else {
          this.basketId = '';
          localStorage.removeItem('basketId');
        }
      })
  }

  removeItemFromBasket(id, size) {
    const productToCart = {
      id: id,
      size: size,
      amount: 0
    };
    this.basketId = this.checkStorageForId();

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
        console.log(basket);
        // this.basketId = basket.data.id;
        // this.productsInBasket = basket.products;
      })
      .finally(() => {

      });

    const removable = this.productsInBasketParsed.find(product => {
      return product.id === id
    });
    const removableIndex = this.productsInBasketParsed.indexOf(removable);

    this.productsInBasketParsed.splice(removableIndex, 1);

    localStorage.setItem('productsInBasket', JSON.stringify(this.productsInBasketParsed));

    return this.productsInBasketParsed;
  }
}