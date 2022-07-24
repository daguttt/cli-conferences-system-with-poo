import { Person } from "./shared/person";
import Store from "./Store";
import { Response } from "./Response";
import { Utils } from "./utils/Utils";
export class Mentor extends Person {
  constructor(name: string, email: string, password: string) {
    super(name, email, password);
  }
  public verifyMentorAvailability(
    startingDateEventToCreate: Date,
    endingDateEventToCreate: Date
  ): boolean {
    const mentorConferences = Store.getMentorConferences(this.email);
    if (!mentorConferences.length) return true;

    const currentDate: Date = Utils.getCurrentDate();
    const tomorrow: number = currentDate.getTime() + 86400 * 1000;
    const isAfterCurrentDate: boolean =
      tomorrow <= startingDateEventToCreate.getTime();

    if (!isAfterCurrentDate) return false;

    const sortedAscendingBusyDates: number[][] = mentorConferences
      .map((conference) => [
        conference.startingDate.getTime(),
        conference.endingDate.getTime(),
      ])
      .sort((a: number[], b: number[]) => a[1] - b[0]);
    const firstBusyDate = sortedAscendingBusyDates[0];
    const isBeforeFirstConference =
      endingDateEventToCreate.getTime() < firstBusyDate[0];

    if (isBeforeFirstConference) return true;

    const isOnAvailableDate: boolean = sortedAscendingBusyDates.some(
      (date: number[], index, array) => {
        const currentEndingDate = date[1];
        const nextStartingDate = array?.[index + 1]?.[0] ?? Infinity;
        return (
          currentEndingDate < startingDateEventToCreate.getTime() &&
          endingDateEventToCreate.getTime() < nextStartingDate
        );
      }
    );
    return isOnAvailableDate;
  }
  public authMentor(password: string): Response {
    console.log("Hi");
    const response = new Response();
    if (!(this.password === password)) {
      response.error = true;
      response.message = "Contraseña incorrecta";
      return response;
    }
    response.error = false;
    response.message = "Mentor autenticado con éxito";
    return response;
  }
}
