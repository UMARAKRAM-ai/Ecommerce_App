import cors from "cors"
import express from "express";
const app = express();
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";
import dotenv from "dotenv";
dotenv.config();

import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
const PORT = process.env.PORT || 4000;
connectDB();



app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))

// Cookie Parser middlware
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("API is Running...");
});

app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)
app.use('/api/orders', orderRoutes)


app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server Running at Port:${PORT}`);
});
