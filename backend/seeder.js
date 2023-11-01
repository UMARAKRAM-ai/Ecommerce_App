import mongoose from "mongoose";
import dotenv from "dotenv";
import colors from "colors";
import users from "./data/users.js";
import products from "./data/products.js";
import User from "./models/userModel.js";
import Product from "./models/productModel.js";
import Order from "./models/orderModel.js";
import connectDB from "./config/db.js";

dotenv.config();
connectDB();

const importData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany(); // Here we are deleting everything before adding new data
    await User.deleteMany();

    const createdUsers = await User.insertMany(users); // this will push the users dummy data to Users Schema
    const adminUser = createdUsers[0]._id; //taking the 1st user from dummy data which is set as admin...

    const sampleProducts = products.map((product) => {
      return { ...product, user: adminUser }; //here we are creating product with user as admin
    });
    await Product.insertMany(sampleProducts); // adding that sampleProducts to Product schema

    console.log("Data Imported".green.inverse);
    process.exit();
  } catch (error) {
    console.log(`${error}`.red.inverse);
    process.exit(1);
  }
};

const destroyData = async () => {
    try {
        await Order.deleteMany();
        await Product.deleteMany()
        await User.deleteMany();

        console.log("Data Destroyed".red.inverse);
        process.exit();
      } catch (error) {
        console.log(`${error}`.red.inverse);
        process.exit(1);
      }
    };
    if (process.argv[2] === '-d') {
        destroyData();
      } else {
        importData();
      }