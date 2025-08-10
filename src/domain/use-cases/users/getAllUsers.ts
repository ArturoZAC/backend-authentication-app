import { UserEntity, UserRepository } from "../..";

export interface GetAllUsersUseCase {
  execute(): Promise<UserEntity[]>
}

export class GetAllUsers implements GetAllUsersUseCase {
  
  public constructor(
    private readonly repository: UserRepository,
  ){}

  public execute = (): Promise<UserEntity[]> => {
    return this.repository.getAll();
  }

}