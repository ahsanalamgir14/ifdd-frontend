export class Message {
  constructor(
    public type: string,
    public title: string,
    public description?: string,
    public duration: number = 15000,
  ) {}
}
