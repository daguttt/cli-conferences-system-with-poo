import { Conference } from "./Conference";
import { Person } from "./shared/person";
import { Response } from "./Response";
import Store from "./Store";
export class Mentor extends Person {
  public conferences: Conference[];
  constructor(name: string, email: string, password: string) {
    super(name, email, password);
    this.conferences = [];
  }
  public static verifyMentorAvailability(
    mentor: Mentor,
    startingDateEventToCreate: Date
  ): boolean {
    if (!mentor.conferences.length) return false;

    const currentDate: number = Date.parse(Date());
    const tomorrow: number = currentDate + 86400 * 1000;
    const isAfterCurrentDate: boolean =
      tomorrow <= startingDateEventToCreate.getTime();

    if (!isAfterCurrentDate) return false;

    const busyDates: FlatArray<number[], 0 | 1>[] = mentor.conferences
      .map((conference) => [
        conference.startingDate.getTime(),
        conference.endingDate.getTime(),
      ])
      .flat(2);
    const sortedAscendingBusyDates = busyDates.sort((a, b) => a - b);
    const isOnAvailableDate: boolean = sortedAscendingBusyDates.every(
      (date) => date !== startingDateEventToCreate.getTime()
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
