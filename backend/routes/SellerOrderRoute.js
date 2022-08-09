import express from "express";
import expressAsyncHandler from "express-async-handler";
import SellerOrder from "../model/SellerOrder.js";
import { isAuth } from "../utils.js";

const sellerOrderRouter = express.Router();
sellerOrderRouter.post(
  "/",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const newOrder = new SellerOrder({
      sellerOrder: req.body.sellerOrder.map((x) => ({ ...x, product: x._id })),
    });
    const order = await newOrder.save();
    res.status(201).send({ message: "New Order Created", order });
  })
);

sellerOrderRouter.get(
    "/mine",
    expressAsyncHandler(async (req, res) => {
      const orders = await SellerOrder.find();
      // console.log({seller: req.sellerUser._id})
        res.send(orders);
    })
  );

  export default sellerOrderRouter;