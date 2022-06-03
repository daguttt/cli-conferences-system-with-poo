import { Mentor } from "./Mentor";
import { Response } from "./Response";
import { Store } from "./Store";
import { Student } from "./Student";

export class Conference {
  constructor(
    public id: number,
    public name: string,
    public mentor: Mentor,
    public participants: Student[],
    public startingDate: Date,
    public endingDate: Date
  ) {}
  public verifyConferenceAvailability() {
    return this.participants.length < 20;
  }
  public checkStudentInsideParticipants(student: Student): boolean {
    return (
      this.participants.findIndex(
        (participant) => participant.email === student.email
      ) !== -1
    );
  }
}
class ConferencesStore extends Store<Conference> {
  constructor(
    public data: Conference[],
    public autoIncrementIdForConferences: number = 1
  ) {
    super(data);
  }
  public conferenceExists(id: number): boolean {
    return this.data.findIndex((conference) => conference.id === id) !== -1;
  }
  public getConferenceThatAlreadyExists(id: number): Conference {
    return this.data.find((conference) => conference.id === id)!;
  }
  public storeOne<T extends Mentor>(
    conference: Conference,
    mentor?: T
  ): Response {
    const response = new Response();
    this.data.push(conference);
    mentor?.conferences.push(conference);
    this.autoIncrementIdForConferences++;
    response.error = false;
    response.message = "SUCCESS: Conferencia agregada correctamente";
    return response;
  }
}

export default new ConferencesStore([]);
