export class Conference {
  constructor(
    public id: number,
    public mentor: string, // Correo mentor
    public participants: string[], // Correos de los estudiantes
    public startingDate: Date,
    public endingDate: Date
  ) {}
}
