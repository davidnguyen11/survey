import express from 'express';
import { router as v1Endpoint } from './v1';

const router = express.Router();

router.use('/v1', v1Endpoint);

export { router };
