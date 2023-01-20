import 'dotenv/config';
import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import multer from 'multer';
import cookieParser from 'cookie-parser';
import router from './routes/index.js';
import { trueMusicDb } from './databases/db.js';

const PORT = process.env.PORT || 5000;
const app = express();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads');
  },
  filename: (req, file, cb) => {
    const fileExtension = file.originalname.split('.').pop();
    cb(null, file.fieldname + '-' + Date.now() + '.' + fileExtension);
  },
});
const upload = multer({ storage });

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: true,
  }),
);
app.use('/uploads', express.static('uploads'));
app.use('/', router);

app.post('/upload', upload.single('trackFiles'), (req, res) => {
  res.json({
    url: `/uploads/${req.file?.filename}`,
  });
});

app.use((error: any, req: Request, res: Response, next: NextFunction) => {
  res.status(error.status || 500);
  res.json({
    status: error.status,
    message: error.message,
    stack: error.stack,
  });
});

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
