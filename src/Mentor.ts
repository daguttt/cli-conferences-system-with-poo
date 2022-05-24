import { Person } from "./shared/person";

export class Mentor extends Person {
  public conferences: number[];
  constructor(name: string, email: string, password: string) {
    super(name, email, password);
    this.conferences = [];
  }
}
