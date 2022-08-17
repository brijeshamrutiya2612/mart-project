import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const Schema = mongoose.Schema;

const UserSchema = Schema(
  {
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      // validate(value){
      //     if(!validator.isEmail(value)){
      //         throw new Error('Email is Invalid')
      //     }
      // }
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    address1: {
      type: String,
      required: true,
    },
    address2: {
      type: String,
      required: true,
    },
    address3: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
      unique: true,
      minlength: 10,
      maxlength: 10,
    },
    age: {
      type: Number,
      required: true,
      max: 100,
    },
    // image: {
    //   type: Object,
    //   required: true,
    // },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
  },
  { timestamps: true }
);

export default mongoose.model("User", UserSchema);
