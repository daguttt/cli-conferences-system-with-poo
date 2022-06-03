import { Conference } from "./Conference";
import { Mentor } from "./Mentor";
import { Response } from "./Response";
import { Student } from "./Student";

class Store {
  constructor(
    public students: Student[],
    public conferences: Conference[],
    public mentors: Mentor[],
    public autoIncrementIdForConferences: number = 1
  ) {}

  // -*************************************************************************-

  // STUDENT
  public studentExists(email: string): boolean {
    return this.students.findIndex((student) => student.email === email) !== -1;
  }
  public getStudentThatAlreadyExists(email: string): Student {
    return this.students.find((student) => student.email === email)!;
  }
  // TODO: Use Generics to add a single method `setData` (I don'k know yet how to do it 😕)
  public storeStudent(student: Student): Response {
    const response: Response = new Response();
    this.students.push(student);
    response.error = false;
    response.message = "Estudiante agregado correctamente";
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
  public storeMentor(mentor: Mentor): Response {
    const response: Response = new Response();
    this.mentors.push(mentor);
    response.error = false;
    response.message = "Mentor agregado correctamente";
    return response;
  }

  // -*************************************************************************-

  // CONFERENCES
  public conferenceExists(id: number): boolean {
    return (
      this.conferences.findIndex((conference) => conference.id === id) !== -1
    );
  }
  public getConferenceThatAlreadyExists(id: number): Conference {
    return this.conferences.find((conference) => conference.id === id)!;
  }
  public addConference(
    mentor: Mentor,
    name: string,
    startingDate: Date,
    endingDate: Date
  ): Response {
    const response = new Response();
    const conference = new Conference(
      this.autoIncrementIdForConferences,
      name,
      mentor,
      [],
      startingDate,
      endingDate
    );
    this.conferences.push(conference);
    mentor.conferences.push(conference);
    this.autoIncrementIdForConferences++;
    response.error = false;
    response.message = "SUCCESS: Conferencia agregada correctamente";
    return response;
  }
}
export default new Store([], [], []);
// export default new Store([], [], [])
