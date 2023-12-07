import mongoose from "mongoose";

export const connectToDB = async () =>{
    try {
        const {connection} = await mongoose.connect(process.env.DB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
          });

        console.log(`Database is connect on host -> ${connection.host}`);
    } catch (error) {
        console.log(error); 
    }
}