import express from "express";
import bcrypt from "bcryptjs";
import expressAsyncHandler from "express-async-handler";
import {
  getUser,
  login,
  logout,
  signup,
} from "../controllers/user-controller.js";
import User from "../model/User.js";
import { generateToken, isAuth } from "../utils.js";

const router = express.Router();

// router.post("/users", signup);
router.post(
  "/login",
  expressAsyncHandler(async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      if (bcrypt.compareSync(req.body.password, user.password)) {
        res.send({
          _id: user._id,
          firstname: user.firstname,
          lastname: user.lastname,
          address1: user.address1,
          email: user.email,
          avatar: user.avatar,
          token: generateToken(user),
        });
        return;
      }
    }
    res.status(401).send({ message: "Invaild email or password" });
  })
);
router.put(
  "/profile",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    if (user) {
      user.firstname = req.body.firstname || user.firstname;
      user.lastname = req.body.lastname || user.lastname;
      user.email = req.body.email || user.email;
      if (req.body.password) {
        user.password = bcrypt.hashSync(req.body.password, 8);
      }
      const updatedUser = await user.save();
      res.send({
        _id: updatedUser._id,
        firstname: updatedUser.firstname,
        lastname: updatedUser.lastname,
        email: updatedUser.email,
        token: generateToken(updatedUser),
      });
    } else {
      res.status(404).send({ message: "User not Found" });
    }
  })
);
router.post(
  "/signup",
  expressAsyncHandler(async (req, res) => {
    const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
      folder: "Avatars",
      width: 150,
      crop: "scale",
    });

    const newUser = new User({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      address1: req.body.address1,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password),
    });
    const user = await newUser.save();
    res.send({
      _id: user._id,
      firstname: user.firstname,
      lastname: user.lastname,
      address1: user.address1,
      email: user.email,
      avatar: {
        public_id: myCloud.public_id,
        url: myCloud.secure_url,
      },
      token: generateToken(user),
    });
  })
);
router.get("/users", getUser); //verifyToken
// //router.get("/refresh",  getUser); refreshToken, verifyToken,
// router.post("/logout", logout); //refreshToken,

export default router;
//module.exports = router;
