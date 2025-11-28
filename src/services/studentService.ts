import { Student, StudentResponse } from '../models/student';
import { StudentRepository } from '../repositories/studentRepository';

export class StudentService {
  private repository: StudentRepository;

  constructor(repository: StudentRepository) {
    this.repository = repository;
  }

  getAllStudentsStatus(): StudentResponse[] {
    try {
      const students: Student[] = this.repository.getAll();
      return students.map((student) => this.evaluateStudentStatus(student));
    } catch (error) {
      throw new Error('Error getting students');
    }
  }

  evaluateStudentStatus(student: Student): StudentResponse {
    const { matricula, calificacionFinal, tieneAdeudos } = student;

    if (calificacionFinal >= 90) {
      if (!tieneAdeudos) {
        return { matricula, situacion: 'Te graduaste con honores' };
      }
      return { matricula, situacion: 'Tenías honores pero tienes una deuda' };
    }

    if (calificacionFinal >= 70) {
      return { matricula, situacion: 'Pasaste muy apenas' };
    }

    if (!tieneAdeudos) {
      return {
        matricula,
        situacion: 'Como no tienes adeudo tienes derecho a un examen de recuperación',
      };
    }

    return { matricula, situacion: 'Expulsado' };
  }
}
