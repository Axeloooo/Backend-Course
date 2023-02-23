// Description: Challenge 2 - Javascript - Class 4

// import fs from "fs/promises";
import fs from "fs/promises";

// 1. Create a class called Product that has the following properties:
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

// 2. Create a class called ProductManager that has the following properties:
class ProductManager {
  constructor(path) {
    this.path = path;
    this.products = [];
  }

  // 3. The ProductManager class must have the following methods:

  // 3.1. addProduct(product): This method must add a new product to the products array.
  async addProduct(product) {
    try {
      const response = await fs.readFile(this.path, "utf-8");
      const products = await JSON.parse(response);
      for (const element of products) {
        if (product.code === element.code) {
          return console.log("Product already exists");
        }
      }
      let id = products.length + 1;
      product = { id, ...product };
      products.push(product);
      this.products = products;
      await fs.writeFile(this.path, JSON.stringify(this.products, null, 2));
      return console.log(`Product added successfully: ${product}`);
    } catch (e) {
      console.error(`Error adding the new product: ${e}`);
    }
  }

  // 3.2. getProductById(id): This method must return a product by its id.
  async getProductById(id) {
    try {
      const response = await fs.readFile(this.path, "utf-8");
      const products = JSON.parse(response);
      return products.find((product) => product.id === id);
    } catch (e) {
      console.log(`Error getting the product: ${e}`);
    }
  }

  // 3.3. getProducts(): This method must return all the products.
  async getProducts() {
    try {
      const response = await fs.readFile(this.path, "utf-8");
      const products = await JSON.parse(response);
      return products;
    } catch (e) {
      console.error(`Error getting the products: ${e}`);
    }
  }

  // 3.4. updateProduct(id, product): This method must update a product by its id.
  async updateProduct(id, product) {
    try {
      const response = await fs.readFile(this.path, "utf-8");
      const products = await JSON.parse(response);
      const index = products.findIndex((product) => product.id === id);
      const productToUpdate = products[index];
      const updatedProduct = { ...productToUpdate, ...product };
      products.splice(index, 1, updatedProduct);
      this.products = products;
      fs.writeFile(this.path, JSON.stringify(this.products, null, 2));
      return console.log(`Product updated successfully: ${updatedProduct}`);
    } catch (e) {
      console.error(`Error updating the product: ${e}`);
    }
  }

  // 3.5. deleteProduct(id): This method must delete a product by its id.
  async deleteProduct(id) {
    try {
      const response = await fs.readFile(this.path, "utf-8");
      const products = JSON.parse(response);
      const productToDelete = products.find((product) => product.id === id);
      const newProducts = products.filter((product) => product.id !== id);
      this.products = newProducts;
      await fs.writeFile(this.path, JSON.stringify(this.products, null, 2));
      return console.log(`Product deleted successfully: ${productToDelete}`);
    } catch (e) {
      console.error(`Error deleting the product: ${e}`);
    }
  }
}

// Test
const axel = new ProductManager("./static/products.txt");
const product1 = new Product(
  "Halo 5",
  "Xbox videogame",
  60,
  "https://www.google.com",
  1,
  10
);
await axel.addProduct(product1);
console.log(await axel.getProducts());
await axel.deleteProduct(1);
