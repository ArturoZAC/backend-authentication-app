import { UserEntity, UserRepository } from "../..";

export interface DeleteOneUserUseCase {
  execute( id: string ): Promise<UserEntity>
}

export class DeleteOneUser implements DeleteOneUserUseCase {
  
  public constructor(
    private readonly repository: UserRepository,
  ){}

  public execute = ( id : string ): Promise<UserEntity> => {
    return this.repository.deleteById(id);
  }

}