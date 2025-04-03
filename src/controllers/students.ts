import { studentsList } from '../data/studentslist';

interface Student {
    matricula: string;
    nombre: string;
    calificacionFinal: number;
    tieneAdeudos: boolean;
}

interface StudentResponse {
    matricula: string;
    situacion: string;
}

class StudentController {
    async getAllStudents(): Promise<StudentResponse[]> {
        try {
            const students: Student[] = studentsList;

            return students.map(student => this.evaluateStudentStatus(student));
        } catch (error) {
            throw new Error('Error getting students');
        }
    }

    private evaluateStudentStatus(student: Student): StudentResponse {
        const { matricula, calificacionFinal, tieneAdeudos } = student;

        if (calificacionFinal >= 90) {
            if (!tieneAdeudos) {
                return { matricula, situacion: "Te graduaste con honores" };
            }
            return { matricula, situacion: "Tenías honores pero tienes una deuda" };
        }

        if (calificacionFinal >= 70) {
            return { matricula, situacion: "Pasaste muy apenas" };
        }

        if (!tieneAdeudos) {
            return { matricula, situacion: "Como no tienes adeudo tienes derecho a un examen de recuperación" };
        }

        return { matricula, situacion: "Expulsado" };
    }
}

export default StudentController;