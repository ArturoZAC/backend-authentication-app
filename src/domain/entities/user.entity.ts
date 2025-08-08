import { UserProperties } from '../entities';

export class UserEntity {

  public readonly id: string;
  public name: string;
  public email: string;
  public emailValidated: boolean;
  public password: string;
  public createdAt: Date;

  constructor({ id, name, email, emailValidated, password, createdAt }: UserProperties) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.emailValidated = emailValidated;
    this.password = password;
    this.createdAt = createdAt;
  }

  public static fromObject(props: UserProperties): UserEntity {
    return new UserEntity(props);
  }

}
