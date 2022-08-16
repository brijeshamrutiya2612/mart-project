import express from "express";
import bcrypt from "bcryptjs";
import expressAsyncHandler from "express-async-handler";
import User from "../model/User.js";
import { generateToken, isAuth } from "../utils/utils.js";
import cloudinary from "../cloudinary.js";
import { sendToken } from "../utils/jwtToken.js";
import { ErrorHandler } from "../utils/errorhader.js";

const router = express.Router();

//Register User Data

router.post(
  "/signup",
  expressAsyncHandler(async (req, res, next) => {
    const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
      folder: "avatars",
      width: 150,
      crop: "scale",
    });

    const { name, email, password } = req.body;

    const user = await User.create({
      firstname,
      lastname,
      address1,
      address2,
      address3,
      phone,
      age,
      email,
      password: bcrypt.hashSync(req.body.password),
    });

    sendToken(user, 201, res);
  })
);

//   (async (req, res) => {
//     const {
//       firstname,
//       lastname,
//       address1,
//       address2,
//       address3,
//       phone,
//       age,
//       email,
//       // image,
//       password,
//     } = req.body;

//     try {
//       // if (image) {
//       //   const uplodRes = await cloudinary.uploader.upload(image, {
//       //     upload_preset: "Mart_Shop",
//       //   });
//       //   if (uplodRes) {
//       const user = new User({
//         firstname,
//         lastname,
//         address1,
//         address2,
//         address3,
//         phone,
//         age,
//         email,
//         password: bcrypt.hashSync(req.body.password),
//         //image: uplodRes,
//       });

//       const saveUserDetail = await user.save();
//       sendToken(user, 201, res);
//       res.status(200).send(saveUserDetail);
//       //  }
//       //}
//     } catch (error) {
//       console.log(error);
//       res.status(500).send(error);
//     }
//   })
// );

// ================  User Login ====================

router.post(
  "/login",
  expressAsyncHandler(async (req, res, next) => {
    const { email, password } = req.body;

    // checking if user has given password and email both

    if (!email || !password) {
      return next(new ErrorHandler("Please Enter Email & Password", 400));
    }

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return next(new ErrorHandler("Invalid email or password", 401));
    }

    const isPasswordMatched = await user.comparePassword(password);

    if (!isPasswordMatched) {
      return next(new ErrorHandler("Invalid email or password", 401));
    }

    sendToken(user, 200, res);
  })
);

// ================  User LogOut ====================

router.get(
  "/logout",
  expressAsyncHandler(async (req, res, next) => {
    res.cookie("token", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
    });

    res.status(200).json({
      success: true,
      message: "Logged Out",
    });
  })
);

//Update User Profile(Data)

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

// Get All User's Data

router.get(
  "/users",
  expressAsyncHandler(async (req, res, next) => {
    let users;
    try {
      users = await User.find();
    } catch (err) {
      console.log(err);
    }
    if (!users) {
      return res.status(404).json({ message: "User not Found" });
    }
    return res.status(200).json({ users });
  })
);

// Delete User By Id

router.delete(
  "/users/:id",
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

//Forgot Password

const forgotPassword = expressAsyncHandler(async (req, res, next) => {
  const user = await User.findOne({
    email: req.body.email,
  });

  if (!user) {
    return next().send({ message: "User Not Found" }, 404);
  }

  // Get ResetPassword Token
});

export default router;

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

// router.put("/update/:id",
// expressAsyncHandler(async (req, res, next) => {
//   const { firstname, lastname, email, address, mobile } = req.body;
//   const userId = req.params.id;
//   let users;
//   try {
//     users = await User.findByIdAndUpdate(userId, {
//       firstname,
//       lastname,
//       email,
//       address,
//       mobile,
//     });
//   } catch (err) {
//     return console.log(err);
//   }
//   if (!users) {
//     return res.status(500).json({ message: "Unable Update User Data" });
//   }
//   return res.status(200).json({ users });
// }))
