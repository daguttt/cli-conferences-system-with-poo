import { Conference } from "./Conference";
import { Person } from "./shared/person";
export class Mentor extends Person {
  public conferences: Conference[];
  constructor(name: string, email: string, password: string) {
    super(name, email, password);
    this.conferences = [];
  }
  public static verifyMentorAvailability(
    mentor: Mentor,
    startingDateEvent: Date
  ): boolean {
    if (mentor.conferences.length)
      return mentor.conferences.every((conference) => {
        conference.endingDate.getTime() <= startingDateEvent.getTime();
      });
    return true;
  }
}
