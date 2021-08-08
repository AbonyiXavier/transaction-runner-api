import express from 'express';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import cors from 'cors';
import helmet from 'helmet';
import router from './routes/index';

const app = express();

app.use(helmet());
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

require('dotenv').config();

app.use('/api', router);

app.get('/', (req, res) => {
  res.status(200).json({
    status: true,
    message: 'Transaction Runner API',
  });
});
app.all('*', (req, res) => {
  res.status(404).json({
    status: 'error',
    error: 'resource not found',
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`server running on http://localhost:${PORT}`);
});

export default app;
