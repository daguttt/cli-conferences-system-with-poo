import { Response } from "../Response";

export abstract class Person {
  constructor(
    public name: string,
    public email: string,
    private _password: string
  ) {}
  get password() {
    return this._password;
  }
  set password(newPassword: string) {
    this._password = newPassword;
  }
  auth(password: string): Response {
    const response = new Response();
    if (!(this.password === password)) {
      response.error = true;
      response.message = "Contraseña incorrecta";
      return response;
    }
    response.error = false;
    response.message = "Autenticación exitosa";
    return response;
  }
}
