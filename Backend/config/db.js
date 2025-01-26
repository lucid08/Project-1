import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("DB connection established")
    } catch (error) {
        console.log(error.message);
        console.log("DB Connection Error")
        process.exit(1);
    }
}

export default connectDB;