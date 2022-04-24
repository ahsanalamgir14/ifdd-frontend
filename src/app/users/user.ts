export class User {
  public id: number;
  public name: string;
  public email: string;
  public role: number;

  constructor(id: number, name: string, email: string, role: number) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.role = role;
  }
}
