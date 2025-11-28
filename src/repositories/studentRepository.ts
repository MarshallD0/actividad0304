import { studentsList } from '../data/studentslist';
import { Student } from '../models/student';

export class StudentRepository {
  getAll(): Student[] {
    return studentsList;
  }
}
