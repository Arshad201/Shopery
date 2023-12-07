import express from 'express';
import cookieParser from 'cookie-parser';
export const app = express(); 
import { productRoute } from './routes/product-route.js';
import { ErrorHandler } from './middleware/ErrorHandler-middleware.js';
import { userRoute } from './routes/user-route.js';
import cors from 'cors';
import { orderRoute } from './routes/order-router.js';
import {v2 as cloudinary} from 'cloudinary';
import bodyParser from 'body-parser';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config({path: 'backend/config/.env'});

          
cloudinary.config({ 
  cloud_name: 'arshadmern', 
  api_key: '276899197317436', 
  api_secret: 'ggOLUui7bDiXsd7mLIp5Z-QM5X8' 
});


app.use(express.json({limit: '1024mb'}));
app.use(cookieParser());
app.use(cors({origin: 'http://localhost:5173', credentials: true}));
app.use(bodyParser.urlencoded({extended: true}));

//Product Route
app.use('/api/v1', productRoute);
//User Route
app.use('/api/v2', userRoute);
//User Route
app.use('/api/v3', orderRoute);

// -------------------DEPLOYMENT-----------------
const __dirname1 = path.resolve();

if(process.env.NODE_ENV === 'production'){

  app.use(express.static(path.join(__dirname1, '../frontend/dist')));

  app.get("*", (req, res)=>{
    res.sendFile(path.join(__dirname1, '../', 'frontend', 'dist', 'index.html'));
  });

}else{
  app.get("/", (req, res)=>{
    res.send('API is running successfully!');
  })
}
// -------------------DEPLOYMENT-----------------


app.use(ErrorHandler)