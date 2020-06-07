import express from 'express';
import compression from 'compression';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { router } from './api';

export const app = express();
// register middlewares
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());
// set
const port = 4000;
app.set('port', port);
app.set('env', process.env.NODE_ENV || 'development');

// health check
app.get('/healthz', (req, res) => res.send('OK'));

// routes
app.use('/api', router);
