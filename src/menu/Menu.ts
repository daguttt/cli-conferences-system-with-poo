import {
  Validation,
  ValidationMessages,
  ValidationType,
} from "../utils/Validation";
export class Menu {
  protected active: boolean;
  private consoleNumber: number;
  private consoleString: string;

  constructor() {
    this.active = true;
    this.consoleNumber = -1;
    this.consoleString = "error";
  }

  /**
   *  @description Desactivar el menu
   *
   * */
  close(): void {
    this.active = false;
  }
  /**
   *  @description Indica si el menu sigue activo
   *  @returns Booleano
   */
  isActive(): boolean {
    return this.active;
  }

  /**
   *  @description Imprime el menu de opciones en consola
   */
  printMenu(): void {
    const menu = `
  ###################################################
  # Opciones:                                       #
  #  1) Agregar Mentor                              #
  #  2) Agregar Estudiante                          #
  #  3) Agregar Conferencia                         #
  #  4) Ver lista de Estudiantes                    #
  #  5) Ver lista de Mentores                       #
  #  6) Ver lista de Conferencias                   #
  #  7) Registrarse en una conferencia              #
  #  8) Ver lista de Estudiantes por Conferencia    #
  #  9) Ver lista Conferencias por Mentor           #
  #  0) Salir.                                      #
  ###################################################
    `;

    console.log(menu);
  }

  private ask() {
    return new Promise<string>((resolve, reject) => {
      process.stdin.once("data", (chunk) => {
        let name = chunk.toString().trim();
        resolve(name);
        // process.exit();
      });
    });
  }
  /**
   * @description Funcion asincrona que permite solicitar un valor numerico por consola
   * @param question texto que indica pregunta a realizar
   * @returns un numero entero
   */
  async getInt(question: string): Promise<number> {
    console.log(question);
    const data = await this.ask();
    return parseInt(`${data}`);
  }

  /**
   * @description Funcion asincrona que permite solicitar un texto por consola
   * @param printMessage texto que indica pregunta a realizar
   * @param type (Opcional) Tipo de validación a realizar
   * @returns string
   */
  async getString(
    printMessage: string,
    type?: ValidationType
  ): Promise<string> {
    if (!type) {
      console.log(printMessage);
      const data = await this.ask();
      return data;
    }
    const validation = new Validation(type);
    let data: string = "";
    while (true) {
      console.log(printMessage);
      data = await this.ask();
      let { message: validationMessage, attempts } = validation.validate(data);
      if (validationMessage === ValidationMessages.OnSuccess) break;
      if (validationMessage === ValidationMessages.OnError) {
        console.log();
        console.log(`${validationMessage} (${attempts})`);
        data = "";
        break;
      }
      if (validationMessage === ValidationMessages.OnAttempt) {
        console.log();
        console.log(`${validationMessage} (${attempts})`);
        console.log();
      }
    }
    return data;
  }

  async waitForPressingEnter(): Promise<void> {
    console.log();
    await this.getString("(Presiona ENTER para continuar)");
  }

  async getEmail(
    printMessage: string = "Introduce tu correo electrónico:"
  ): Promise<string> {
    return this.getString(printMessage, ValidationType.Email);
  }
}
