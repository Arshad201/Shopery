import { app } from './app.js';
import dotenv from 'dotenv';
import { connectToDB } from './config/db.js';

// dotenv.config({path: 'backend/config/.env'});
connectToDB();

const PORT = process.env.PORT || 3000
app.listen(PORT,()=>{
    console.log(`server is listening on the PORT : ${PORT}`);
})