import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import prodRouter from "./routes/products-routes.js";
import bodyParser from "body-parser";
import Products from "./model/Products.js";
import Rating from "./model/Rating.js";
import expressAsyncHandler from "express-async-handler";
import router from "./routes/user-routes.js";
import SellerRoute from "./routes/SellerRoute.js";
import dotenv from "dotenv";
import { isAuth } from "./utils.js";
import Order from "./model/Order.js";
import orderRouter from "./routes/orderRoutes.js";


dotenv.config();



const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(cors({ credentials: true, origin: "http://localhost:3000" })),
  app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());



///**************   PRODUCTS_____SECTION **************** *///

app.get("/api/products", async (req, res) => {
  const products = await Products.find();
  res.send(products);
});

app.get("/api/products/:id", async (req, res) => {
  const product = await Products.findById(req.params.id);
  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ message: "Product Not Found" });
  }
});

app.use("/api/rating/getrating",
expressAsyncHandler(async (req, res) => {
  const getRatingView = await Rating.find();
res.send(getRatingView);
}));



///**************   USERS_____SECTION   **************** *///

app.use("/api", router);



///**************   SELLER_____SECTION   **************** *///

app.use("/api/seller", SellerRoute);


///**************   ORDERS_____SECTION   **************** *///


app.use("/api/orders", orderRouter);



mongoose
  .connect(
    `mongodb+srv://brijesh:brijesh@cluster0.qe9bgqk.mongodb.net/eCommerse?retryWrites=true&w=majority`
  )
  .then(() => {
    // app.listen(process.env.PORT || 5000)
    console.log("Database is Connected! Listening to localhost 5000");
  })
  .catch((err) => console.log(err));
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`serve at http://localhost:${port}`);
});
