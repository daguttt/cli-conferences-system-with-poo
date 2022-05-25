import { Conference } from "./Conference";
import { Mentor } from "./Mentor";
import { Response } from "./Response";
import { Student } from "./Student";

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
  public storeStudent(name: string, email: string, password: string): Response {
    const response: Response = new Response();
    if (!this.studentExists(email)) {
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

  // -*************************************************************************-

  // CONFERENCES
  public addConference(
    mentorEmail: string,
    name: string,
    startingDate: Date,
    endingDate: Date
  ): Response {
    const response = new Response();
    if (!this.mentorExists(mentorEmail)) {
      response.error = true;
      response.message = "No existe un mentor registrado con ese email";
      return response;
    }
    const mentor = this.getMentorThatAlreadyExists(mentorEmail);
    const isMentorAvailable = Mentor.verifyMentorAvailability(
      mentor,
      startingDate
    );
    if (!isMentorAvailable) {
      response.error = true;
      response.message =
        "El mentor dictará un evento ese día. Intenta de nuevo con otro día";
      return response;
    }
    const conference = new Conference(
      this.numberOfConferences,
      name,
      mentor,
      [],
      startingDate,
      endingDate
    );
    this.conferences.push(conference);
    mentor.conferences.push(conference);
    this.numberOfConferences++;
    response.error = false;
    response.message =
      "******* SUCCESS!: Conferencia agregada correctamente *******";
    return response;
  }
}
export default new Store([], [], []);
