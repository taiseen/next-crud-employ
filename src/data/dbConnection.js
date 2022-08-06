import mongoose from "mongoose";

const MONGO_URI = 'mongodb+srv://addEmployee:addEmployee@cluster0.z9kin.mongodb.net/?retryWrites=true&w=majority';

const connectMongo = async () => {

    try {
        const { connection } = await mongoose.connect(MONGO_URI);

        if (connection.readyState == 1) {
            console.log('DataBase Connected... ✅');
        }

    } catch (error) {
        return Promise.reject(error);
    }
}

export default connectMongo;