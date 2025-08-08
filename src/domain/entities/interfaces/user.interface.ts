export interface UserProperties {
  readonly id: string;
  name: string;
  email: string;
  emailValidated: boolean;
  password: string;
  createdAt: Date;
}