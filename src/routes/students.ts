import express from 'express';
import { StudentController } from '../controllers/studentController';
import { StudentService } from '../services/studentService';
import { StudentRepository } from '../repositories/studentRepository';

const router = express.Router();

const studentRepository = new StudentRepository();
const studentService = new StudentService(studentRepository);
const studentController = new StudentController(studentService);

router.get('/status', studentController.getStudentsStatus);

export default router;
