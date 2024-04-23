import express from "express";
import { adminOnly } from "../middlewares/auth.js";
import { deleteProduct, getAllCategories, getAllProducts, getadminProducts, getsingleProduct, newProduct, updateProduct } from "../controllers/product.js";
import { getlatestProducts } from "../controllers/product.js";

import { singleUpload } from "../middlewares/multer.js";

const app = express.Router();

 app.post("/new", adminOnly,singleUpload, newProduct);


 app.get("/all", getAllProducts);

app.get("/latest", getlatestProducts);

app.get("/categories", getAllCategories);

 app.get("/admin-products",adminOnly, getadminProducts);

 app
   .route("/:id")
   .get(getsingleProduct)
   .put(adminOnly,singleUpload, updateProduct)
   .delete( adminOnly,deleteProduct);

export default app;