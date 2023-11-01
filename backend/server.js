import cors from "cors"
import express from "express";
const app = express();
import connectDB from "./config/db.js";
import dotenv from "dotenv";
dotenv.config();
import productRoutes from "./routes/productRoutes.js";
const PORT = process.env.PORT || 4000;
connectDB();


app.use(cors())
app.get("/", (req, res) => {
  res.send("API is Running...");
});

app.use('/api/products', productRoutes)

app.listen(PORT, () => {
  console.log(`Server Running at Port:${PORT}`);
});
