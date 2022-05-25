import { Mentor } from "./Mentor";
import { Menu } from "./menu/Menu";
import { MenuOptions } from "./menu/MenuOptions";
import Store from "./Store";

// -*************************************************************************-

// -*************************************************************************-

// MENTORS

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
        await MenuOptions.addMentor();
        break;

      case 2:
        await MenuOptions.addStudent();
        break;

      case 3:
        await MenuOptions.addConference();
        break;

      case 4:
        console.log("\n");
        console.log("\n");
        MenuOptions.showStudents();
        break;

      case 5:
        console.log("\n");
        console.log("\n");
        MenuOptions.showMentors();

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
