import { UpdateUserDto, UserEntity, UserRepository } from "../../../domain";

export interface UpdateUserUseCase {
  execute( updateUserDto: UpdateUserDto ): Promise<UserEntity>
}

export class UpdateUser implements UpdateUserUseCase {
  
  public constructor(
    private readonly repository: UserRepository,
  ){}

  public execute = ( updateUserDto: UpdateUserDto ): Promise<UserEntity> => {
    return this.repository.updateById(updateUserDto);
  }

}