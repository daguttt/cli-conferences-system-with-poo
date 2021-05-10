export class Menu{

  protected active: boolean;
  private consoleNumber: number;
  private consoleString: string;

  constructor() {
    this.active = true
    this.consoleNumber = -1;
    this.consoleString="error"
  }

  /**
   *  @description Desactivar el menu
   * 
   * */
  close(): void{
    this.active = false;
  }
    /**
   *  @description Indica si el menu sigue activo
   *  @returns Booleano
    */
  isActive(): boolean{
    return this.active
  }

  /**
   *  @description Imprime el menu de opciones en consola
   */
  printMenu(): void{
    const menu = `
  ###################################################
  # Opciones:                                       #
  #  1) Agregar Mentor                              #
  #  2) Agregar Estudiante                          #
  #  3) Agregar Conferencia                         #
  #  4) Ver lista de Conferencias                   #
  #  5) Ver lista de Conferencias por profesores    #
  #  6) Registrarse en una conferencia              #
  #  7) Esta opción es un ejemplo, ¿quieres probar? #
  #  0) Salir.                                      #
  ###################################################
    `

    console.log(menu);
    
  }


  private ask() {
    return new Promise((resolve, reject) => {      
      process.stdin.once('data', (chunk) => {
        let name = chunk.toString().trim();
        resolve(name)
      // process.exit();
       });      
    })
  }
 /**
  * @description Funcion asincrona que permite solicitar un valor numerico por consola
  * @param question texto que indica pregunta a realizar
  * @returns un numero entero
  */
  async getInt(question: string): Promise<number>{
    console.log(question);
    const data = await this.ask()
    return parseInt(`${data}`)
  }

   /**
  * @description Funcion asincrona que permite solicitar un texto por consola
  * @param question texto que indica pregunta a realizar
  * @returns un string
  */
  async getString(question: string): Promise<string>{
    console.log(question);
    const data = await this.ask()
    return `${data}`
  }

}

