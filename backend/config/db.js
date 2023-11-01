import mongoose from "mongoose";
const connectDB= async ()=>{
    try {
        const conn= await mongoose.connect(process.env.URL)
        console.log(`MongoDB Connected:${conn.connection.host}`)  
    } catch (error) {
        console.log(error.message)
process.exit(1);  // Terminate the application with an exit code of 1 in case of a database connection error

    }
}

export default connectDB