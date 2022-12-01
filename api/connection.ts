import mongoose from "mongoose";
import 'dotenv/config';

const MONGO_URI = process.env.MONGO_URI as string;

const connectToDatabase = () => {
     mongoose.connect(MONGO_URI, () => {
        console.log("Connected to database");
    });
}
export default connectToDatabase;