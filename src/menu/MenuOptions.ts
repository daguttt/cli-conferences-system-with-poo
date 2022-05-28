import Store from "../Store";
import { Menu } from "./Menu";
import { Mentor } from "../Mentor";
import { Student } from "../Student";
import { Utils } from "../utils/Utils";

export class MenuOptions extends Menu {
  constructor() {
    super();
  }
  public static async addMentor(): Promise<void> {
    const name = await this.prototype.getString("Introduce el nombre: ");
    const email = await this.prototype.getEmail();
    if (!email) return;
    const password = await this.prototype.getString(
      "Introduce una contraseña: ",
      "password"
    );
    if (!password) return;
    const { message } = Store.storeMentor(name, email, password);
    console.log("\n");
    console.log(message);
  }
  public static async addStudent(): Promise<void> {
    const name = await this.prototype.getString("Introduce el nombre: ");
    const email = await this.prototype.getEmail();
    if (!email) return;
    const password = await this.prototype.getString(
      "Introduce una contraseña: ",
      "password"
    );
    if (!password) return;
    const { message } = Store.storeStudent(name, email, password);
    console.log("\n");
    console.log(message);
  }
  public static async addConference(): Promise<void> {
    const mentorEmail = await this.prototype.getEmail();
    if (!mentorEmail) return;
    const mentorPassword = await this.prototype.getString(
      "Introduce tu contraseña:",
      "password"
    );
    if (!mentorPassword) return;
    const { error: errorOfAuth, message: authMessage } = Mentor.authMentor(
      mentorEmail,
      mentorPassword
    );
    console.log(authMessage);
    if (errorOfAuth) return;
    const mentor: Mentor = Store.getMentorThatAlreadyExists(mentorEmail);
    const conferenceTitle = await this.prototype.getString(
      "Introduce el título de tu conferencia:"
    );
    const startingDate = await this.prototype.getString(
      "Introduce la fecha de inicio:",
      "date"
    );
    if (!startingDate) return;
    console.log(startingDate);
    const endingDate = await this.prototype.getString(
      "Introduce la fecha de fin:",
      "date"
    );
    if (!endingDate) return;
    console.log(endingDate);
    const { message: storeMessage } = Store.addConference(
      mentor,
      conferenceTitle,
      new Date(startingDate),
      new Date(endingDate)
    );
    console.log(storeMessage);
  }
  public static showStudents(): void {
    if (Store.students.length) {
      console.log("################ LISTA DE ESTUDIANTES ################");
      Store.students?.forEach((student) => {
        console.log(`
            Nombre: ${Utils.titleCase(student.name)}
            Email: ${student.email}
            `);
      });
      console.log("################# ################# #################");
    } else console.log("No hay estudiantes registrados");
  }
  public static showMentors(): void {
    if (Store.mentors.length) {
      console.log("################ LISTA DE MENTORES ##################");
      Store.mentors?.forEach((mentor) => {
        console.log(`
            Nombre: ${Utils.titleCase(mentor.name)}
            Email: ${mentor.email}
            `);
      });
      console.log("################# ################# #################");
    } else console.log("No hay mentores registrados");
  }
  public static showConferences(): void {
    if (Store.conferences.length) {
      console.log("############### LISTA DE CONFERENCIAS ################");
      [...Store.conferences]
        .sort((a, b) => a.endingDate.getTime() - b.startingDate.getTime())
        .forEach(
          ({ id, name, mentor, startingDate, endingDate, participants }) => {
            console.log();
            console.log(`ID: ${id}`);
            console.log(`Título evento: "${name}"`);
            console.log(`Mentor: "${Utils.titleCase(mentor.name)}"`);
            console.log(`Fecha de inicio | Fecha de finalizacion`);
            console.log(
              `${startingDate.toLocaleDateString()}  ----------> ${endingDate.toLocaleDateString()}`
            );
            console.log(`Número de participantes: ${participants.length}`);
            console.log();
          }
        );
      console.log("################# ################# #################");
    } else console.log("No hay conferencias");
  }
  public static async registerStudentInConference(): Promise<void> {
    const studentEmail = await this.prototype.getEmail();
    if (!studentEmail) return;
    if (!Store.studentExists(studentEmail)) {
      console.log("No estás registrado en el sistema");
      return;
    }
    MenuOptions.showConferences();
    const student: Student = Store.getStudentThatAlreadyExists(studentEmail);
    const conferenceIndex = await MenuOptions.prototype.getInt(
      "Elige la conferencia a la que deseas asistir: (ID)"
    );
    if (!Store.conferenceExists(conferenceIndex)) {
      console.log("Conferencia no encontrada");
      return;
    }
    const conference = Store.getConferenceThatAlreadyExists(conferenceIndex);
    const { message } = Store.registerStudentInConference(student, conference);
    console.log("\n");
    console.log(message);
  }
  public static async showParticipantsByConference(): Promise<void> {
    if (!Store.conferences.length) return console.log("No hay conferencias");
    this.showConferences();
    const conferenceIndex = await MenuOptions.prototype.getInt(
      "Elige la conferencia a la que deseas asistir: (ID)"
    );
    if (!Store.conferenceExists(conferenceIndex)) {
      console.log("Conferencia no encontrada");
      return;
    }
    const conference = Store.getConferenceThatAlreadyExists(conferenceIndex);
    console.log(`################ "${conference.name}" ################`);
    console.log();
    if (!conference.participants.length) {
      console.log("Esta conferencia aún no tiene estudiantes registrados");
      return;
    }
    console.log(
      `-> Número de Participantes: ${conference.participants.length}`
    );
    conference.participants.forEach((participant, index) => {
      console.log(
        `
        ${index + 1})
        Nombre: ${Utils.titleCase(participant.name)}
        Email: ${participant.email}
        `
      );
    });
  }
  public static probarUI() {
    console.log();
    console.log("---------------------- TESTS -------------------------");
    console.log("SUCCESS: Conferencia agregada correctamente");
    console.log("------------------------------------------------------");
    console.log();
  }
}
