import { UserEntity, UserRepository } from "../../../domain";

export interface GetUsersUseCase {
  execute(): Promise<UserEntity[]>
}

export class GetUsers implements GetUsersUseCase {
  
  public constructor(
    private readonly repository: UserRepository,
  ){}

  public execute = (): Promise<UserEntity[]> => {
    return this.repository.getAll();
  }

}