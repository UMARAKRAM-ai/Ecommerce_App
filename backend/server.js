import cors from "cors"
import express from "express";
const app = express();
import connectDB from "./config/db.js";
import dotenv from "dotenv";
dotenv.config();

import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

import productRoutes from "./routes/productRoutes.js";
<<<<<<< HEAD
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
=======
>>>>>>> parent of d58de4d (User profile endpoints)
const PORT = process.env.PORT || 4000;
connectDB();



app.use(cors())
app.get("/", (req, res) => {
  res.send("API is Running...");
});

app.use('/api/products', productRoutes)
<<<<<<< HEAD
app.use('/api/users', userRoutes)
app.use('/api/orders', orderRoutes)
=======
>>>>>>> parent of d58de4d (User profile endpoints)


app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server Running at Port:${PORT}`);
});
