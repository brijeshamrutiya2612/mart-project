import express from "express";
import bcrypt from "bcryptjs";
import expressAsyncHandler from "express-async-handler";
import { generateSellerToken } from "../utils.js";
import Seller from "../model/Seller.js";
import cloudinary from "../cloudinary.js";

const SellerRoute = express.Router();

SellerRoute.post(
  "/login",
  expressAsyncHandler(async (req, res) => {
    const sellerUser = await Seller.findOne({ email: req.body.email });
    if (sellerUser) {
      if (bcrypt.compareSync(req.body.password, sellerUser.password)) {
        res.send({
          _id: sellerUser._id,
          firstname: sellerUser.firstname,
          lastname: sellerUser.lastname,
          mnfName: sellerUser.mnfName,
          address1: sellerUser.address1,
          address2: sellerUser.address2,
          address3: sellerUser.address3,
          Mobile: sellerUser.Mobile,
          email: sellerUser.email,
          GSTIN: sellerUser.GSTIN,
          PAN_NO: sellerUser.PAN_NO,
          image: sellerUser.image,
          token: generateSellerToken(sellerUser),
        });
        return;
      }
    }
    res.status(401).send({ message: "Invalid email or password" });
  })
);

SellerRoute.get(
  "/sellerlogin",
  expressAsyncHandler(async (req, res, next) => {
    let sellers;
    try {
      sellers = await Seller.find();
    } catch (err) {
      console.log(err);
    }
    if (!sellers) {
      return res.status(404).json({ message: "Seller not Found" });
    }
    return res.status(200).json({ sellers });
  })
);

SellerRoute.post(
  "/register",
  expressAsyncHandler(async (req, res) => {
    const {
      firstname,
      lastname,
      mnfName,
      email,
      address1,
      address2,
      address3,
      Mobile,
      GSTIN,
      PAN_NO,
      image,
    } = req.body;
    try {
      if (image) {
        const uploadRes = await cloudinary.uploader.upload(image, {
          upload_preset: "Mart_Shop",
        });
        if (uploadRes) {
          const seller = new Seller({
            firstname,
            lastname,
            mnfName,
            email,
            password: bcrypt.hashSync(req.body.password),
            address1,
            address2,
            address3,
            Mobile,
            GSTIN,
            PAN_NO,
            image:uploadRes,
            // token: generateSellerToken(sellerUser),
          });
          const savedSellerDetail = await seller.save();
          res.status(200).send(savedSellerDetail);
        }
      }
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
    // const newSeller = new Seller({
    //   firstname: req.body.firstname,
    //   lastname: req.body.lastname,
    //   mnfName: req.body.mnfName,
    //   email: req.body.email,
    //   address1: req.body.address1,
    //   address2: req.body.address2,
    //   address3: req.body.address3,
    //   Mobile: req.body.Mobile,
    //   GSTIN: req.body.GSTIN,
    //   PAN_NO: req.body.PAN_NO,
    //   image: req.body.image,
    //   password: bcrypt.hashSync(req.body.password),
    // });
    // const sellerUser = await newSeller.save();
    // res.send({
    //   _id: sellerUser._id,
    //   firstname: sellerUser.firstname,
    //   lastname: sellerUser.lastname,
    //   mnfName: sellerUser.mnfName,
    //   email: sellerUser.email,
    //   address1: sellerUser.address1,
    //   address2: sellerUser.address2,
    //   address3: sellerUser.address3,
    //   Mobile: sellerUser.Mobile,
    //   GSTIN: sellerUser.GSTIN,
    //   PAN_NO: sellerUser.PAN_NO,
    //   image: sellerUser.image,
    // });
  })
);

SellerRoute.get("/sellerUser", 
expressAsyncHandler(async(req, res, next)=>{
  let sellers;
  try{
    sellers = await Seller.find();
  } catch (err){
    console.log(err);
  }
  if(!sellers){
     return res.status(404).json({ message: "Selleruser not Found" });
   }
   return res.status(200).json({ sellers });
}));

SellerRoute.delete(
  "/:id",
  expressAsyncHandler(async (req, res) => {
    const seller = await Seller.findById(req.params.id);
    if (seller) {
      await seller.remove();
      res.send({ message: "Seller Deleted" });
    } else {
      res
        .status(404)
        .send({ message: "Some problems are occured in Deletion" });
    }
  })
);
export default SellerRoute;
