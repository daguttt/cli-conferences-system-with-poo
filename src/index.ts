import { Menu } from "./Menu";
// @ts-ignore
import Store from "./Store";

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

const addStudent = (name: string, email: string, password: string): void => {
  // ! I'm not using the 'error'
  const { message } = Store.storeStudent(name, email, password);
  console.log(message);
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
        console.log("Falta por implementar la opción: : ", key);
        break;

      case 2:
        const name = await menu.getString("Introduce el nombre: ");
        const email = await menu.getString("Introduce el email: ");
        const password = await menu.getString("Introduce una contraseña: ");
        addStudent(name, email, password);
        break;

      case 3:
        console.log("Falta por implementar la opción: : ", key);
        break;

      case 4:
        showStudents();
        break;

      case 5:
        console.log("Falta por implementar la opción: : ", key);
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
