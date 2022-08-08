import mongoose from "mongoose";

const Schema = mongoose.Schema;

const SellerSchema = Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  mnfName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
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
  Mobile: {
    type: Number,
    unique: true,
    required: true,
  },
  GSTIN: {
    type: String,
    required: true,
    unique: true,
    max: 15,
  },
  PAN_NO: {
    type: String,
    required: true,
    unique: true,
    max: 10,
  },
  image: {
    type: Object,
    required: true,
  },
});

export default mongoose.model("Seller", SellerSchema);
