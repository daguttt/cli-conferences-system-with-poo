export class Person {
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
}
