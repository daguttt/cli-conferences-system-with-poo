import { Menu } from "./menu/Menu";
import { MenuOptions } from "./menu/MenuOptions";

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
        MenuOptions.showStudents();
        await menu.waitForPressingEnter();
        break;

      case 5:
        MenuOptions.showMentors();
        await menu.waitForPressingEnter();
        break;

      case 6:
        MenuOptions.showConferences();
        await menu.waitForPressingEnter();
        break;

      case 7:
        await MenuOptions.registerStudentInConference();
        break;

      case 8:
        await MenuOptions.showParticipantsByConference();
        break;

      case 9:
        await MenuOptions.showConferencesByMentor();
        break;

      case 10:
        console.log("Falta por implementar la opción: : ", key);
        break;

      case 11:
        MenuOptions.probarUI();
        break;

      default:
        console.log("Debe elegir una opción valida");
        break;
    }
  }

  console.log("Adios");
})();
