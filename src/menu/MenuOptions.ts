import Store from "../Store";
import { Menu } from "./Menu";
import { Mentor } from "../Mentor";
import { Student } from "../Student";
import { Utils } from "../utils/Utils";
import { ValidationType } from "../utils/Validation";

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
      ValidationType.Password
    );
    if (!password) return;
    if (Store.mentorExists(email)) {
      console.log("El mentor ya está registrado");
      return;
    }
    const mentor = new Mentor(name, email, password);
    const { message } = Store.storeMentor(mentor);
    console.log("\n");
    console.log(message);
  }
  public static async addStudent(): Promise<void> {
    const name = await this.prototype.getString("Introduce el nombre: ");
    const email = await this.prototype.getEmail();
    if (!email) return;
    const password = await this.prototype.getString(
      "Introduce una contraseña: ",
      ValidationType.Password
    );
    if (!password) return;
    if (Store.studentExists(email)) {
      console.log("El estudiante ya está registrado");
      return;
    }
    const student = new Student(name, email, password);
    const { message } = Store.storeStudent(student);
    console.log("\n");
    console.log(message);
  }
  public static async addConference(): Promise<void> {
    const mentorEmail = await this.prototype.getEmail();
    if (!mentorEmail) return;
    const mentorPassword = await this.prototype.getString(
      "Introduce tu contraseña:",
      ValidationType.Password
    );
    if (!mentorPassword) return;
    if (!Store.mentorExists(mentorEmail)) {
      console.log(
        "Según las credenciales ingresadas el mentor no está registrado en el sistema"
      );
      return;
    }
    const mentor: Mentor = Store.getMentorThatAlreadyExists(mentorEmail);
    const { error: errorOfAuth, message: authMessage } =
      mentor.authMentor(mentorPassword);
    console.log();
    console.log(authMessage);
    console.log();
    if (errorOfAuth) return;
    const conferenceTitle = await this.prototype.getString(
      "Introduce el título de tu conferencia:"
    );
    const startingDate = await this.prototype.getString(
      "Introduce la fecha de inicio (formato: MM-DD-YYYY):",
      ValidationType.Date
    );
    if (!startingDate) return;
    const endingDate = await this.prototype.getString(
      "Introduce la fecha de fin (formato: MM-DD-YYYY):",
      ValidationType.Date
    );
    if (!endingDate) return;
    const isMentorAvailable = mentor.verifyMentorAvailability(
      new Date(startingDate),
      new Date(endingDate)
    );
    if (!isMentorAvailable) {
      console.log(
        "El mentor tiene ocupada esa fecha. Intenta de nuevo con otro fecha"
      );
      return;
    }
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
    const conferenceIndex = await this.prototype.getInt(
      "Elige la conferencia a la que deseas asistir: (ID)"
    );
    if (!Store.conferenceExists(conferenceIndex)) {
      console.log("Conferencia no encontrada");
      return;
    }
    const conference = Store.getConferenceThatAlreadyExists(conferenceIndex);
    const isConferenceAvailable = conference.verifyConferenceAvailability();
    if (!isConferenceAvailable) {
      console.log("La conferencia no tiene más cupos disponibles");
      return;
    }
    const isStudentRegisteredNow =
      conference.checkStudentInsideParticipants(student);
    if (isStudentRegisteredNow) {
      console.log("Ya te encuentras en la lista de participantes");
      return;
    }
    conference.participants.push(student);
    console.log(
      `Has sido añadido a la lista de participantes de "${conference.name}" correctamente`
    );
    console.log("\n");
  }
  public static async showParticipantsByConference(): Promise<void> {
    if (!Store.conferences.length) return console.log("No hay conferencias");
    this.showConferences();
    const conferenceIndex = await MenuOptions.prototype.getInt(
      "Elige la conferencia de la que deseas conocer los participantes: (ID)"
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
  public static async showConferencesByMentor(): Promise<void> {
    if (!Store.conferences.length) return console.log("No hay conferencias");
    // Ask for mentor email
    const mentorEmail = await this.prototype.getEmail(
      "Introduce el correo electrónico del mentor"
    );
    if (!mentorEmail) return; // Invalid Format
    if (!Store.mentorExists(mentorEmail))
      return console.log(
        `El mentor con el correo: "${mentorEmail}" no está registrado`
      );
    // Get mentor
    const mentor = Store.getMentorThatAlreadyExists(mentorEmail);
    // Show mentor conferences if exist
    console.log();
    console.log(
      `#################### "${Utils.titleCase(
        mentor.name
      )}" #####################`
    );
    if (!mentor.conferences.length) {
      console.log();
      console.log("Este mentor no ha programado conferencias");
      console.log();
      console.log("################# ################# #################");
      return;
    }
    console.log();
    console.log(`-> Número de Conferencias: ${mentor.conferences.length}`);
    [...mentor.conferences]
      .sort((a, b) => a.endingDate.getTime() - b.startingDate.getTime())
      .forEach(({ id, name, startingDate, endingDate, participants }) => {
        console.log();
        console.log(`ID: ${id}`);
        console.log(`Título evento: "${name}"`);
        console.log(`Fecha de inicio | Fecha de finalizacion`);
        console.log(
          `${startingDate.toLocaleDateString()}  ----------> ${endingDate.toLocaleDateString()}`
        );
        console.log(`Número de participantes: ${participants.length}`);
        console.log();
      });
    console.log("################# ################# #################");
  }
  public static probarUI() {
    console.log();
    console.log("---------------------- TESTS -------------------------");
    console.log("SUCCESS: Conferencia agregada correctamente");
    console.log("------------------------------------------------------");
    console.log();
  }
}
