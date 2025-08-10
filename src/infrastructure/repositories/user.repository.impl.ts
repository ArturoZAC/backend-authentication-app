import { CreateUserDto, UpdateUserDto, UserDatasource, UserEntity, UserRepository } from "../../domain";

export class UserRepositoryImpl implements UserRepository{

  public constructor(
    private readonly datasource: UserDatasource
  ){}

  public create(createUserDto: CreateUserDto): Promise<UserEntity> {
    return this.datasource.create( createUserDto );
  }
  public getAll(): Promise<UserEntity[]> {
    return this.datasource.getAll();
  }
  public findById(id: string): Promise<UserEntity> {
    return this.datasource.findById( id );
  }
  public updateById(updateUserDto: UpdateUserDto): Promise<UserEntity> {
    return this.datasource.updateById( updateUserDto );
  }
  public deleteById(id: string): Promise<UserEntity> {
    return this.datasource.deleteById( id );
  }

}