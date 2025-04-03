import { Request, Response, NextFunction } from 'express';
import StudentController from '../controllers/students';

const studentController = new StudentController();

export class StudentHttpHandler {
    async getStudentsStatus(req: Request, res: Response) {
        try {
            const students = await studentController.getAllStudents();
            res.status(200).json(students);
        } catch (error) {
            res.status(500).json({ 
                message: 'Error al obtener el estado de los estudiantes'
            });
        }
    }
}