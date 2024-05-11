import mongoose from "mongoose";


export  async function connectDB() {
    try {
        mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/messdb');
        const connection = mongoose.connection;
        connection.on('connected', () => {
            console.log('MongoDB successfully connected');
        })
        connection.on('error', (error) => {
            console.log('Something went wrong while connecting to DB');
            console.log(error);
            process.exit();
        })
    } catch (error) {
        console.log('Something went wrong while connecting to DB');
        console.log(error);
    }
}