import { Request, Response } from 'express';
import { StudentService } from '../services/studentService';

export class StudentController {
  private service: StudentService;

  constructor(service: StudentService) {
    this.service = service;
  }

  getStudentsStatus = (req: Request, res: Response): void => {
    try {
      const students = this.service.getAllStudentsStatus();
      res.status(200).json(students);
    } catch (error) {
      res.status(500).json({
        message: 'Error al obtener el estado de los estudiantes',
      });
    }
  };
}
