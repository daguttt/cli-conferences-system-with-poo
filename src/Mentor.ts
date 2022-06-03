import { Conference } from "./Conference";
import { Person } from "./shared/person";
import { Response } from "./Response";
import Store from "./Store";
import { Utils } from "./utils/Utils";
export class Mentor extends Person {
  public conferences: Conference[];
  constructor(name: string, email: string, password: string) {
    super(name, email, password);
    this.conferences = [];
  }
  public verifyMentorAvailability(
    startingDateEventToCreate: Date,
    endingDateEventToCreate: Date
  ): boolean {
    if (!this.conferences.length) return true;

    const currentDate: Date = Utils.getCurrentDate();
    const tomorrow: number = currentDate.getTime() + 86400 * 1000;
    const isAfterCurrentDate: boolean =
      tomorrow <= startingDateEventToCreate.getTime();

    if (!isAfterCurrentDate) return false;

    const sortedAscendingBusyDates: number[][] = this.conferences
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
  public static authMentor(email: string, password: string): Response {
    const response = new Response();
    const mentorExists: boolean = Store.mentorExists(email);
    if (!mentorExists) {
      response.error = true;
      response.message =
        "Según las credenciales ingresadas el mentor no está registrado en el sistema";
      return response;
    }
    const mentor = Store.getMentorThatAlreadyExists(email);
    if (!(mentor.password === password)) {
      response.error = true;
      response.message = "Contraseña incorrecta";
      return response;
    }
    response.error = false;
    response.message = "Mentor autenticado con éxito";
    return response;
  }
}
