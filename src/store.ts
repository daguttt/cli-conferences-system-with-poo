import { Conference } from "./conference";
import { Mentor } from "./mentor";
import { Student } from "./student";
import { StoreResponse } from "./interfaces/interfaces";

class Store {
  constructor(
    public students: Student[],
    public conferences: Conference[],
    public mentors: Mentor[],
    public numberOfConferences: number = 0
  ) {}
}
