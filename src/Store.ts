import { Conference } from "./conference";
import { Mentor } from "./mentor";
import { Student } from "./student";
import { StoreResponse } from "./interfaces/interfaces";

class Store {
  constructor(
    public students: Student[],
    public conferences: Conference[],
    public mentors: Mentor[],
    public numberOfConferences: number = 0
  ) {}
  // -*************************************************************************-
  // STUDENT
  verifyStudent(email: string): boolean {
    return this.students.findIndex((student) => student.email === email) === -1;
  }
  // TODO: Use Generics to add a single method `setData` (I don'k know yet how to do it 😕)
  storeStudent(name: string, email: string, password: string): StoreResponse {
    const response: StoreResponse = {
      error: false,
      message: "",
    };
    if (this.verifyStudent(email)) {
      const student = new Student(name, email, password);
      this.students.push(student);
      response.error = false;
      response.message = "Estudiante agregado correctamente";
    } else {
      response.error = true;
      response.message = "El estudiante ya está registrado";
    }
    return response;
  }
  // -*************************************************************************-
}
export default new Store([], [], []);
