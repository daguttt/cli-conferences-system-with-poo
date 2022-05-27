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
    const isMentorAvailable = mentor.verifyMentorAvailability(
      startingDate,
      endingDate
    );
    if (!isMentorAvailable) {
      response.error = true;
      response.message =
        "El mentor tiene ocupada esa fecha. Intenta de nuevo con otro fecha";
      return response;
    }
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
  public registerStudentInConference(
    student: Student,
    conference: Conference
  ): Response {
    const response = new Response();
    const isConferenceAvailable =
      Conference.verifyConferenceAvailability(conference);
    if (!isConferenceAvailable) {
      response.error = true;
      response.message = "La conferencia no tiene más cupos disponibles";
    }
    const isStudentRegisteredNow =
      conference.checkStudentInsideParticipants(student);
    if (isStudentRegisteredNow) {
      response.error = true;
      response.message = "Ya te encuentras en la lista de participantes";
      return response;
    }
    conference.participants.push(student);
    response.error = false;
    response.message = `Has sido añadido a la lista de participantes de "${conference.name}" correctamente`;
    return response;
  }
}
const roso = new Mentor("roso", "roso@gmail.com", "roso123");
const temporalMentors = [roso];
const temporalStudents = [
  new Student("dagut", "dagut@gmail.com", "dagut123"),
  new Student("dani", "dani@gmail.com", "dani123"),
  new Student("daniel", "daniel@gmail.com", "daniel123"),
];
const tomorrow = new Date(Date.parse(Date()) + 86400 * 1000);
const dayPastTomorrow = new Date(Date.parse(Date()) + 86400 * 2 * 1000);
const temporalConferences = [
  new Conference(1, "POO", roso, [], tomorrow, dayPastTomorrow),
];
export default new Store(
  temporalStudents,
  temporalConferences,
  temporalMentors
);
// export default new Store([], [], [])
