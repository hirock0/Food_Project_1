import mongoose from "mongoose";
import { ConnectionDB } from "../connectionDB/dbconnection";
ConnectionDB();
const UserloginData = new mongoose.Schema({
  name: {
    type: String,
    required: [false, "fill the field"],
  },
  emailOrnumber: {
    type: String,
    required: [false, "fill the field"],
  },
  password: {
    type: String,
    required: [false, "fill the field"],
  },
  image: {
    type: String,
    required: [false, "fill the field"],
  },
  isVerify: {
    type: Boolean,
    default: false,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  dateField: {
    type: Date,
    required: true,
    default: Date.now,
  },
  token: String,
  tokenVerified: Date,
  forgotPassword: String,
  forgotPasswordVerified: Date,
});

export const SignupSchema =
  mongoose.models.signup_details ||
  mongoose.model("signup_details", UserloginData);




  // cart_Schema
  const CartData = new mongoose.Schema({
    foodName:{
      type: String,
      required: [false, "fill the field"],
    },
    emailOrnumber: {
      type: String,
      required: [false, "fill the field"],
    },
    image: {
      type: String,
      required: [false, "fill the field"],
    },
    price:{
      type: String,
      required: [false, "fill the field"],
    },
    date:{
      type: String,
      required: [false, "fill the field"],
    },
    dateField: {
      type: Date,
      required: true,
      default: Date.now,
    },
  })

  export const CartSchema = mongoose.models.cart_details || mongoose.model("cart_details", CartData);



    // cart_Schema
    const orderFood_Data = new mongoose.Schema({
      foodname:{
        type: String,
        required: [false, "fill the field"],
      },
      emailOrnumber: {
        type: String,
        required: [false, "fill the field"],
      },
      image: {
        type: String,
        required: [false, "fill the field"],
      },
      price:{
        type: String,
        required: [false, "fill the field"],
      },
      contact:{
        type: String,
        required: [false, "fill the field"],
      },
      address:{
        type: String,
        required: [false, "fill the field"],
      },
      date:{
        type: String,
        required: [false, "fill the field"],
      },
      dateField: {
        type: Date,
        required: true,
        default: Date.now,
      },
    })
  
    export const FoodOrderSchema = mongoose.models.food_orders || mongoose.model("food_orders",orderFood_Data);

 