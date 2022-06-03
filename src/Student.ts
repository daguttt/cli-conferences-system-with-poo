import { Response } from "./Response";
import { Person } from "./shared/person";
import { Store } from "./Store";

export class Student extends Person {
  constructor(name: string, email: string, password: string) {
    super(name, email, password);
  }
}

class StudentsStore extends Store<Student> {
  constructor(public data: Student[]) {
    super(data);
  }
  public studentExists(email: string): boolean {
    return this.data.findIndex((student) => student.email === email) !== -1;
  }
  public getStudentThatAlreadyExists(email: string): Student {
    return this.data.find((student) => student.email === email)!;
  }
  public storeOne(student: Student): Response {
    const response: Response = new Response();
    this.data.push(student);
    response.error = false;
    response.message = "Estudiante agregado correctamente";
    return response;
  }
}
export default new StudentsStore([]);
