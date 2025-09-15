import { LoginUserDto, UserEntity, UserRepository } from "../..";

export interface LoginUserUseCase {
  execute(
    loginUserDto: LoginUserDto
  ): Promise<{ user: UserEntity; token: string }>;
}

export class LoginUser implements LoginUserUseCase {
  public constructor(private readonly repository: UserRepository) {}

  public execute = (
    loginUserDto: LoginUserDto
  ): Promise<{ user: UserEntity; token: string }> => {
    return this.repository.login(loginUserDto);
  };
}
