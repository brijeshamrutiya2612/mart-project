import express from "express";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import router from "./routes/user-routes";
import cors from "cors";
import prodRouter from "./routes/products-routes";
import productRouter from "./routes/userProducts-routes";
import path from "path";
import dotenv from "dotenv";
import orderRouter from "./routes/orderRoutes.js";
import SellerRoute from "./routes/SellerRoute";
import ratingRouter from "./routes/RatingRoute";
import sellerOrderRouter from "./routes/SellerOrderRoute";
import bodyParser from "body-parser";

dotenv.config();

mongoose
  .connect(
    `mongodb+srv://brijesh:brijesh@cluster0.qe9bgqk.mongodb.net/eCommerse?retryWrites=true&w=majority`
  )
  .then(() => {
    console.log("Database is Connected! Listening to localhost 5000");
  })
  .catch((err) => console.log(err));

const app = express();
app.use(cors()), app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

app.get("/api/keys/paypal", (req, res) => {
  res.send(process.env.PAYPAL_CLIENT_ID || "sb");
});

app.use(cookieParser());
app.use(express.json());
app.use("/api", router);
app.use("/api/products", prodRouter);
app.use("/api/seller", SellerRoute);
app.use("/api/orders", orderRouter);
app.use("/api/sellerorders", sellerOrderRouter);
app.use("/api/rating", ratingRouter);

const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, "/frontend/build")));
console.log(path.join(__dirname, "/frontend/build"))
app.get("*", (req, res) =>
  res.sendFile(path.join(__dirname, "/frontend/build/index.html"))
);

app.use((err, req, res, next) => {
  res.status(500).send({ mesage: err.message });
});


app.listen(process.env.PORT || 5000, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});