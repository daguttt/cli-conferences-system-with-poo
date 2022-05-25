import { Conference } from "./Conference";
import { Mentor } from "./Mentor";
import { Response } from "./Response";
import { Student } from "./Student";

class StoreResponse extends Response {
  constructor(error: boolean, message) {
    super(error, message)
  }
}

class Store {
  constructor(
    public students: Student[],
    public conferences: Conference[],
    public mentors: Mentor[],
    public numberOfConferences: number = 0
  ) {}

  // -*************************************************************************-

  // STUDENT
  private studentExists(email: string): boolean {
    return this.students.findIndex((student) => student.email === email) !== -1;
  }
  // TODO: Use Generics to add a single method `setData` (I don'k know yet how to do it 😕)
  storeStudent(name: string, email: string, password: string): StoreResponse {
    const response: StoreResponse = {
      error: false,
      message: "",
    };
    if (this.verifyStudentExistence(email)) {
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

  // MENTORS
  public mentorExists(email: string): boolean {
    return this.mentors.findIndex((mentor) => mentor.email === email) !== -1;
  }
  public getMentorThatAlreadyExists(email: string): Mentor {
    return this.mentors.find((mentor) => mentor.email === email)!;
  }
  public storeMentor(name: string, email: string, password: string): Response {
    const response: Response = new Response();
    if (!this.mentorExists(email)) {
      const mentor = new Mentor(name, email, password);
      this.mentors.push(mentor);
      response.error = false;
      response.message = "Mentor agregado correctamente";
    } else {
      response.error = true;
      response.message = "El mentor ya está registrado";
    }
    return response;
  }
}
export default new Store([], [], []);
