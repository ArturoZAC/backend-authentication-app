import { UserEntity, UserRepository } from "../..";

export interface GetOneUserUseCase {
  execute( id: string ): Promise<UserEntity>
}

export class GetOneUser implements GetOneUserUseCase {
  
  public constructor(
    private readonly repository: UserRepository,
  ){}

  public execute = ( id : string ): Promise<UserEntity> => {
    return this.repository.findById(id);
  }

}