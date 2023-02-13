// Description: Challenge 1 - Javascript - Class 3

class Product {
  constructor(title, description, price, thumbnail, code, stock) {
    this.title = title;
    this.description = description;
    this.price = price;
    this.thumbnail = thumbnail;
    this.code = code;
    this.stock = stock;
  }
}

class ProductManager {
  constructor() {
    this.products = [];
  }

  addProduct(product) {
    for (const element of this.products) {
      if (product.code === element.code) {
        return console.log("Product already exists");
      }
    }
    let id = this.products.length + 1;
    product = { id, ...product };
    this.products.push(product);
  }

  getProductById(id) {
    try {
      return this.products.find((product) => product.id === id);
    } catch (e) {
      console.log(`Not found: ${e}`);
    }
  }

  getProducts() {
    return this.products;
  }
}

// Test
const axel = new ProductManager();
const product1 = new Product(
  "Halo 5",
  "Xbox videogame",
  60,
  "https://www.google.com",
  1,
  10
);
axel.addProduct(product1);
console.log(axel.getProducts());
