import { Menu } from "./Menu";
import Store from "../Store";
import { Mentor } from "../Mentor";
import { Student } from "../Student";

export class MenuOptions extends Menu {
  constructor() {
    super();
  }
  public static async addMentor(): Promise<void> {
    const name = await this.prototype.getString("Introduce el nombre: ");
    const email = await this.prototype.getString("Introduce el email: ");
    const password = await this.prototype.getString(
      "Introduce una contraseña: "
    );
    const { message } = Store.storeMentor(name, email, password);
    console.log("\n");
    console.log(message);
  }
  public static async addStudent(): Promise<void> {
    const name = await this.prototype.getString("Introduce el nombre: ");
    const email = await this.prototype.getString("Introduce el email: ");
    const password = await this.prototype.getString(
      "Introduce una contraseña: "
    );
    const { message } = Store.storeStudent(name, email, password);
    console.log("\n");
    console.log(message);
  }
  public static async addConference(): Promise<void> {
    const mentorEmail = await this.prototype.getString("Introduce tu correo:");
    const mentorPassword = await this.prototype.getString(
      "Introduce tu contraseña:"
    );
    const { error: errorOfAuth, message: authMessage } = Mentor.authMentor(
      mentorEmail,
      mentorPassword
    );
    console.log(authMessage);
    if (errorOfAuth) return;
    const { message: storeMessage } = Store.addConference(
      mentorEmail,
      await this.prototype.getString("Introduce el título de tu conferencia:"),
      new Date(await this.prototype.getString("Introduce la fecha de inicio:")),
      new Date(await this.prototype.getString("Introduce la fecha de fin:"))
    );
    console.log(storeMessage);
  }
  public static showStudents(): void {
    if (Store.students.length) {
      console.log("################ LISTA DE ESTUDIANTES ################");
      Store.students?.forEach((student) => {
        console.log(`
            Nombre: ${student.name}
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
            Nombre: ${mentor.name}
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
            console.log(`Mentor: "${mentor.name}"`);
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
    const studentEmail = await this.prototype.getString(
      "Introduce tu correo electrónico:"
    );
    if (!Store.studentExists(studentEmail)) {
      console.log("No estás registrado en el sistema");
      return;
    }
    MenuOptions.showConferences();
    const student: Student = Store.getStudentThatAlreadyExists(studentEmail);
    const conferenceIndex = await MenuOptions.prototype.getInt(
      "Elige la conferencia a la que deseas asistir (número)"
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
  public static probarUI() {
    console.log();
    console.log("---------------------- TESTS -------------------------");
    console.log("SUCCESS: Conferencia agregada correctamente");
    console.log("------------------------------------------------------");
    console.log();
  }
}
