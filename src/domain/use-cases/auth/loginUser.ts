import { LoginUserDto, UserEntity, UserRepository } from "../..";

export interface LoginUserUseCase {
  execute( loginUserDto: LoginUserDto ): Promise<UserEntity>
}

export class LoginUser implements LoginUserUseCase {
  
  public constructor(
    private readonly repository: UserRepository,
  ){}

  public execute = ( loginUserDto: LoginUserDto ): Promise<UserEntity> => {
    return this.repository.login(loginUserDto);
  }

}