import express from "express";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import router from "./routes/user-routes";
import cors from "cors"
import prodRouter from "./routes/products-routes";
import productRouter from "./routes/userProducts-routes";
import path from 'path';
import dotenv from 'dotenv'
import orderRouter from "./routes/orderRoutes.js";
import SellerRoute from "./routes/SellerRoute";
import ratingRouter from "./routes/RatingRoute";
import sellerOrderRouter from "./routes/SellerOrderRoute";
import bodyParser from 'body-parser'

dotenv.config();

const app = express();
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.urlencoded({extended:true}));

app.use(cors({ credentials: true, origin: "http://localhost:3000"} )),

app.get('/api/keys/paypal', (req, res)=>{
  res.send(process.env.PAYPAL_CLIENT_ID || 'sb')
})

app.use(cookieParser());
app.use(express.json());
app.use("/api", router);
app.use("/api/products", prodRouter);
app.use("/api/seller", SellerRoute);
app.use("/api/orders", orderRouter);
app.use("/api/sellerorders", sellerOrderRouter);
app.use("/api/rating",  ratingRouter);


const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, '/Client/build')));
app.get('*', (req, res)=>
  res.sendFile(path.join(__dirname, '/Client/build/index.html'))
)

app.use((err, req, res, next)=>{
  res.status(500).send({mesage: err.message})
})



mongoose
  .connect(
    process.env.MONGODB_URI
  )
  .then(() => {
    app.listen(5000);
    console.log("Database is Connected! Listening to localhost 5000");
  })
  .catch((err) => console.log(err));
