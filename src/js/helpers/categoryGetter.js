export default class getCategory {
  constructor() {
    this.categories = [];

    this.getCategoryFromServer();
  }

  getCategoryFromServer() {
    const params = {
      method: 'GET',
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    };

    fetch('https://neto-api.herokuapp.com/bosa-noga/categories', params)
      .then(response => response.json())
      .then(categories => {
        this.categories = categories.data;
      })
      .finally(() => {
        this.getCategoryName(this.id);
      })
  }

  getCategoryName(id) {
    this.id = id;
    let category;
    if (this.categories && this.categories.length > 0) {
        category = this.categories.find(el => {
        return el.id === id;
      });
    }

    if(category) {
      sessionStorage.setItem('category', JSON.stringify(category));
      return category;
    } else {
      const oldCategory = JSON.parse(sessionStorage.getItem('category'));
      return oldCategory;
    }
  }
}