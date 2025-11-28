import { StudentService } from '../../src/services/studentService';
import { StudentRepository } from '../../src/repositories/studentRepository';
import { Student } from '../../src/models/student';

// Mock the repository
jest.mock('../../src/repositories/studentRepository');

describe('StudentService', () => {
  let studentService: StudentService;
  let studentRepository: jest.Mocked<StudentRepository>;

  beforeEach(() => {
    // Clear all instances and calls to constructor and all methods:
    (StudentRepository as jest.Mock).mockClear();

    studentRepository = new StudentRepository() as jest.Mocked<StudentRepository>;
    studentService = new StudentService(studentRepository);
  });

  describe('getAllStudentsStatus', () => {
    it('should return correct status for all students', () => {
      const mockStudents: Student[] = [
        {
          matricula: 'A1',
          nombre: 'S1',
          calificacionFinal: 95,
          tieneAdeudos: false,
        },
      ];

      studentRepository.getAll.mockReturnValue(mockStudents);

      const result = studentService.getAllStudentsStatus();

      expect(result).toHaveLength(1);
      expect(result[0].situacion).toBe('Te graduaste con honores');
      expect(studentRepository.getAll).toHaveBeenCalled();
    });

    it('should throw error if repository fails', () => {
        studentRepository.getAll.mockImplementation(() => {
            throw new Error('DB Error');
        });

        expect(() => studentService.getAllStudentsStatus()).toThrow('Error getting students');
    });
  });

  describe('evaluateStudentStatus', () => {
    it('should return "Te graduaste con honores" when grade >= 90 and no debts', () => {
      const student: Student = { matricula: '1', nombre: 'Test', calificacionFinal: 90, tieneAdeudos: false };
      const result = studentService.evaluateStudentStatus(student);
      expect(result.situacion).toBe('Te graduaste con honores');
    });

    it('should return "Tenías honores pero tienes una deuda" when grade >= 90 and has debts', () => {
      const student: Student = { matricula: '1', nombre: 'Test', calificacionFinal: 90, tieneAdeudos: true };
      const result = studentService.evaluateStudentStatus(student);
      expect(result.situacion).toBe('Tenías honores pero tienes una deuda');
    });

    it('should return "Pasaste muy apenas" when grade >= 70 and < 90', () => {
      const student: Student = { matricula: '1', nombre: 'Test', calificacionFinal: 70, tieneAdeudos: false };
      const result = studentService.evaluateStudentStatus(student);
      expect(result.situacion).toBe('Pasaste muy apenas');
    });

    it('should return "Como no tienes adeudo tienes derecho a un examen de recuperación" when grade < 70 and no debts', () => {
      const student: Student = { matricula: '1', nombre: 'Test', calificacionFinal: 69, tieneAdeudos: false };
      const result = studentService.evaluateStudentStatus(student);
      expect(result.situacion).toBe('Como no tienes adeudo tienes derecho a un examen de recuperación');
    });

    it('should return "Expulsado" when grade < 70 and has debts', () => {
      const student: Student = { matricula: '1', nombre: 'Test', calificacionFinal: 69, tieneAdeudos: true };
      const result = studentService.evaluateStudentStatus(student);
      expect(result.situacion).toBe('Expulsado');
    });
  });
});
