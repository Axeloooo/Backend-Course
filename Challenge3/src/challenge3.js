// Description: Challenge 3 - Javascript - Class 6

// import express from "express";
import express from "express";

// import { ProductManager } from "./ProductManager.js";
import { ProductManager } from "./ProductManager.js";

// initialize express
const app = express();

app.use(express.urlencoded({ extended: true }));

// initialize ProductManager
const productManager = new ProductManager("./database/database.json");

app.get("/products", async (req, res) => {
  const limit = req.query.limit;
  if (limit === undefined) {
    return res.send(await productManager.getProducts());
  }
  return res.send(await productManager.getProducts(limit));
});

app.get("/products/:id", async (req, res) => {
  const { id } = req.params;
  const product = await productManager.getProductById(parseInt(id));
  return res.send(await JSON.stringify(product));
});

// initialize port
const server = app.listen(8080, () => {
  console.log(`Server running on port ${server.address().port}`);
});
