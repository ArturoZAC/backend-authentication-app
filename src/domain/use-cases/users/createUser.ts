import { CreateUserDto, UserEntity, UserRepository } from "../../../domain";

export interface CreateUserUseCase {
  execute( createUserDto: CreateUserDto ): Promise<UserEntity>
}

export class CreateUser implements CreateUserUseCase {
  
  public constructor(
    private readonly repository: UserRepository,
  ){}

  public execute = ( createUserDto: CreateUserDto ): Promise<UserEntity> => {
    return this.repository.create(createUserDto);
  }

}