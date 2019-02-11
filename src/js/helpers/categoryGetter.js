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
      // .finally(() => )
  }

  getCategoryName(id) {
    if (this.categories && this.categories.length > 0) {
      const category = this.categories.find(el => {
        return el.id === id ? el.title : '';
      });

      return category;
    }
  }
}