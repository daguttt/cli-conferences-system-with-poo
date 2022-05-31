import { Response } from "../Response";

class ValidationResponse extends Response {
  constructor(public attempts = 0) {
    super();
  }
  set(error: boolean, message: string, attemps: number): ValidationResponse {
    this.message = message;
    this.error = error;
    this.attempts = attemps;
    return this;
  }
}

export class Validation {
  public attempts: number = 0;
  public format: RegExp;
  constructor(type: string) {
    this.format = validationTypes[type];
  }
  public validate(textToValidate: string): ValidationResponse {
    const response = new ValidationResponse();
    const isCorrect = this.format.test(textToValidate);
    this.attempts += 1;
    if (isCorrect)
      return response.set(false, ValidationMessages.OnSuccess, this.attempts);
    if (!isCorrect && this.attempts < 3)
      return response.set(true, ValidationMessages.OnAttempt, this.attempts);
    return response.set(true, ValidationMessages.OnError, this.attempts);
  }
}

export enum ValidationType {
  Email = "email",
  Password = "password",
  Date = "date",
}

interface ValidationTypes {
  [key: string]: RegExp;
}

const validationTypes: ValidationTypes = {
  email: /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i,
  password: /^.{8,20}$/i,
  date: /^(0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])[- /.](19|20)\d\d$/i,
};

export enum ValidationMessages {
  OnSuccess = "Correcto",
  OnAttempt = "Formato inválido. Inténtalo de nuevo...",
  OnError = "Intentos máximos alcanzados",
}
