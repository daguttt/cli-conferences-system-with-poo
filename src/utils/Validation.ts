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
  public validate(textToValidate: string) {
    const response = new ValidationResponse();
    const isCorrect = this.format.test(textToValidate);
    this.attempts += 1;

    if (!isCorrect && this.attempts < 3)
      return response.set(true, ValidationMessages.OnAttempt, this.attempts);

    if (this.attempts === 3)
      return response.set(true, ValidationMessages.OnError, this.attempts);

    return response.set(false, ValidationMessages.OnSuccess, this.attempts);
  }
}

export type ValidationType = "email" | "password" | "date";

interface ValidationTypes {
  [key: string]: RegExp;
}

const validationTypes: ValidationTypes = {
  email: /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i,
};

export enum ValidationMessages {
  OnSuccess = "Correcto",
  OnAttempt = "Formato inválido. Inténtalo de nuevo...",
  OnError = "Intentos máximos alcanzados",
}
