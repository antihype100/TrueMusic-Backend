import 'dotenv/config'
import express from 'express';
import trueMusicDb from './databases/dbConnect.js';

const PORT = process.env.PORT || 5000;

const app = express();

const start = async () => {
  try {
    await trueMusicDb.authenticate();
    await trueMusicDb.sync();
    app.listen(PORT, () => console.log(`Server started on port ${PORT} and db connected`));
  } catch (e) {
    console.log(e);
  }
};

start();
