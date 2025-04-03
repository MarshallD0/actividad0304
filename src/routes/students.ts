import express from 'express';
import { StudentHttpHandler } from '../handlers/students';

const router = express.Router();
const studentHandler = new StudentHttpHandler();

router.get('/status', studentHandler.getStudentsStatus);

export default router;