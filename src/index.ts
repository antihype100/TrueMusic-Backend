import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import router from './routes/index.js';
import { trueMusicDb } from './databases/db.js';


const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.json());
app.use(
  cors({
    credentials: true,
  }),
);
app.use('/', router);

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
