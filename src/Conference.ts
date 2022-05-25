import { Mentor } from "./Mentor";
import { Student } from "./Student";

export class Conference {
  constructor(
    public id: number,
    public name: string,
    public mentor: Mentor,
    public participants: Student[],
    public startingDate: Date,
    public endingDate: Date
  ) {}
}
