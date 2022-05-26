import { Mentor } from "./Mentor";
import Store from "./Store";
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
  public static verifyConferenceAvailability(conference: Conference) {
    return conference.participants.length < 20;
  }
  public checkStudentInsideParticipants(student: Student): boolean {
    return (
      this.participants.findIndex(
        (participant) => participant.email === student.email
      ) !== -1
    );
  }
}
