import express from 'express';
import data from './data.js';
import productRouter from './routers/productRouter.js';
import mongoose from 'mongoose';
import userRouter from './routers/userRouter.js';
import orderRouter from './routers/orderRouter.js';
import dotenv from 'dotenv';
import uploadRouter from './routers/uploadRouter.js';
import path from 'path';
import multer from 'multer';

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(process.env.MONGODB_URL || 'mongodb://localhost/OnlineShoppingApp', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
}).then(()=>{
  console.log('Database successfully connected...')
},
error=>{
  console.log('Database could not be connected:'+error);
});


app.use('/api/uploads', uploadRouter);
app.use('/api/users', userRouter);
app.use('/api/products', productRouter);
app.use('/api/orders', orderRouter);

const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));
console.log(__dirname)

// app.use(express.static('../public'))

app.get('/', (req, res) => {
  res.send('Server is ready');
});
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Serve at http://localhost:${port}`);
});