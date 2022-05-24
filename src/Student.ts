import { Person } from "./shared/person";

export class Student extends Person {
  constructor(name: string, email: string, password: string) {
    super(name, email, password);
  }
}
