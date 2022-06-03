import { Conference } from "./Conference";
import { Mentor } from "./Mentor";
import { Response } from "./Response";
import { Person } from "./shared/person";
import { Student } from "./Student";

export abstract class Store<Type extends Person | Conference> {
  constructor(public data: Type[]) {}
  abstract storeOne<T extends Mentor>(item: Type, args?: T): Response;
}

// export default new Store([], [], [])
