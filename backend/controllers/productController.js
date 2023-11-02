import { Error } from "mongoose";
import asyncHandler from "../middleware/asyncHandler.js";
import Product from "../models/productModel.js";

const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({}); // passing empty object to get all products
  res.json(products);
});

const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    return res.json(product);
  } else {
    res.status(404);
    throw new Error("Product Not Found");
  }
});

export {getProducts, getProductById};
// const getProductById= async (req, res) =>{
//     const product= await Product.findById(req.params.id)
//     if (product) {
//         return res.json(product);
//       }
//       res.status(404).json({ message: 'Product Not Found' });
// }
