import { UserEntity, UserRepository } from "../..";
import { RegisterUserDto } from '../../dtos/auth/registerUser.dto';

export interface RegisterUserUseCase {
  execute( registerUserDto: RegisterUserDto ): Promise<UserEntity>
}

export class RegisterUser implements RegisterUserUseCase {
  
  public constructor(
    private readonly repository: UserRepository,
  ){}

  public execute = ( registerUserDto: RegisterUserDto ): Promise<UserEntity> => {
    return this.repository.register(registerUserDto);
  }

}