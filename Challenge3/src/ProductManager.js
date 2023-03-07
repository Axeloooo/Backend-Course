// Description: Product Manager - Javascript - Class 6

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

  // 3.1. readProducts(): This method must read the products from the database.json file.
  async readFile() {
    const res = await fs.readFile(this.path, "utf-8");
    return await JSON.parse(res);
  }

  // 3.2. writeProducts(): This method must write the products to the database.json file.
  async writeFile() {
    await fs.writeFile(this.path, JSON.stringify(this.products, null, 2));
  }

  // 3.3. addProduct(product): This method must add a new product to the products array.
  async addProduct(product) {
    try {
      const products = await this.readFile();
      for (const element of products) {
        if (product.code === element.code) {
          return console.log("Product already exists");
        }
      }
      let id = products.length + 1;
      product = { id, ...product };
      products.push(product);
      this.products = products;
      await this.writeFile();
      return console.log(`Product added successfully: ${product}`);
    } catch (e) {
      console.error(`Error adding the new product: ${e}`);
    }
  }

  // 3.4. getProductById(id): This method must return a product by its id.
  async getProductById(id) {
    try {
      const products = await this.readFile();
      return products.find((product) => product.id === id);
    } catch (e) {
      console.log(`Error getting the product: ${e}`);
    }
  }

  // 3.5. getProducts(): This method must return all the products.
  async getProducts(limit = null) {
    try {
      if (!limit) {
        return await this.readFile();
      }
      const products = await this.readFile();
      return products.slice(0, limit);
    } catch (e) {
      console.error(`Error getting the products: ${e}`);
    }
  }

  // 3.6. updateProduct(id, product): This method must update a product by its id.
  async updateProduct(id, product) {
    try {
      const products = await this.readFile();
      const index = products.findIndex((product) => product.id === id);
      const productToUpdate = products[index];
      const updatedProduct = { ...productToUpdate, ...product };
      products.splice(index, 1, updatedProduct);
      this.products = products;
      await this.writeFile();
      return console.log(`Product updated successfully: ${updatedProduct}`);
    } catch (e) {
      console.error(`Error updating the product: ${e}`);
    }
  }

  // 3.7. deleteProduct(id): This method must delete a product by its id.
  async deleteProduct(id) {
    try {
      const products = await this.readFile();
      const productToDelete = products.find((product) => product.id === id);
      const newProducts = products.filter((product) => product.id !== id);
      this.products = newProducts;
      await this.writeFile();
      return console.log(`Product deleted successfully: ${productToDelete}`);
    } catch (e) {
      console.error(`Error deleting the product: ${e}`);
    }
  }
}

// 4. Export the Product and ProductManager classes.
export { ProductManager };
