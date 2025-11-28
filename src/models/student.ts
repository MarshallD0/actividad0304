export interface Student {
  matricula: string;
  nombre: string;
  calificacionFinal: number;
  tieneAdeudos: boolean;
}

export interface StudentResponse {
  matricula: string;
  situacion: string;
}
