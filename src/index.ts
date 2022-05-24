import { Menu } from "./Menu";
// @ts-ignore
import Store from "./Store";

// -*************************************************************************-

// STUDENTS
const addStudent = (name: string, email: string, password: string): void => {
  // ! I'm not using the 'error'
  const { message } = Store.storeStudent(name, email, password);
  console.log(message);
};

const showStudents = (): void => {
  if (Store.students.length)
    Store.students?.forEach((student) => {
      console.log(`
            Nombre: ${student.name}
            Email: ${student.email}
            `);
    });
  else console.log("No hay estudiantes registrados");
};

// -*************************************************************************-

// MENTORS
const addMentor = (name: string, email: string, password: string): void => {
  // ! I'm not using the 'error'
  const { message } = Store.storeMentor(name, email, password);
  console.log(message);
};

const showMentors = (): void => {
  if (Store.mentors.length)
    Store.mentors?.forEach((mentor) => {
      console.log(`
            Nombre: ${mentor.name}
            Email: ${mentor.email}
            `);
    });
  else console.log("No hay mentores registrados");
};

(async () => {
  const menu = new Menu();
  while (menu.isActive()) {
    menu.printMenu();
    let key = await menu.getInt("seleccione un número de la lista:");

    switch (key) {
      case 0:
        console.log("0: ", key);
        menu.close();
        process.exit();

      case 1:
        addMentor(
          await menu.getString("Introduce el nombre: "),
          await menu.getString("Introduce el email: "),
          await menu.getString("Introduce una contraseña: ")
        );
        break;

      case 2:
        addStudent(
          await menu.getString("Introduce el nombre: "),
          await menu.getString("Introduce el email: "),
          await menu.getString("Introduce una contraseña: ")
        );
        break;

      case 3:
        console.log("Falta por implementar la opción: : ", key);
        break;

      case 4:
        showStudents();
        break;

      case 5:
        showMentors();
        break;

      case 6:
        console.log("Falta por implementar la opción: : ", key);
        break;

      case 7:
        console.log("Falta por implementar la opción: : ", key);
        break;

      default:
        console.log("Debe elegir una opción valida");
        //menu.close()
        break;
    }
  }

  console.log("Adios");
})();
