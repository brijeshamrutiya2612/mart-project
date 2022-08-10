import express from "express";
import bcrypt from "bcryptjs";
import expressAsyncHandler from "express-async-handler";
import User from "../model/User.js";
import { generateToken, isAuth } from "../utils.js";
import cloudinary from "../cloudinary.js"; 

const router = express.Router();


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
          address2: user.address2,
          address3: user.address3,
          phone: user.phone,
          age: user.age,
          email: user.email,
          image: user.image,
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
    const {
      firstname,
      lastname,
      address1,
      address2,
      address3,
      phone,
      age,
      email,
      image,
      password,
    } = req.body;

    try {
      if (image) {
        const uplodRes = await cloudinary.uploader.upload(image, {
          upload_preset: "Mart_Shop",
        });
        if (uplodRes) {
          const user = new User({
            firstname,
            lastname,
            address1,
            address2,
            address3,
            phone,
            age,
            email,
            password: bcrypt.hashSync(req.body.password),
            image: uplodRes
          });

          const saveUserDetail = await user.save();
          res.status(200).send(saveUserDetail);
        }
      }
    } catch(error) {
      console.log(error)
      res.status(500).send(error)
    }

    //  const user = await newUser.save();
    // res.send({
    //   _id: user._id,
    //   firstname: user.firstname,
    //   lastname: user.lastname,
    //   address1: user.address1,
    //   address2: user.address2,
    //   address3: user.address3,
    //   phone: user.phone,
    //   age: user.age,
    //   email: user.email,
    //   token: generateToken(user),
    // });
  })
);
router.get("/users", 
expressAsyncHandler(async(req, res, next)=>{
  let users;
  try{
    users = await User.find();
  } catch (err){
    console.log(err);
  }
  if(!users){
     return res.status(404).json({ message: "User not Found" });
   }
   return res.status(200).json({ users });
}));

router.put("/update/:id",
expressAsyncHandler(async (req, res, next) => {
  const { firstname, lastname, email, address, mobile } = req.body;
  const userId = req.params.id;
  let users;
  try {
    users = await User.findByIdAndUpdate(userId, {
      firstname,
      lastname,
      email,
      address,
      mobile,
    });
  } catch (err) {
    return console.log(err);
  }
  if (!users) {
    return res.status(500).json({ message: "Unable Update User Data" });
  }
  return res.status(200).json({ users });
}))

router.delete(
  "/:id",
  expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (user) {
      await user.remove();
      res.send({ message: "User Deleted" });
    } else {
      res
        .status(404)
        .send({ message: "Some problems are occured in Deletion" });
    }
  })
);

export default router;

