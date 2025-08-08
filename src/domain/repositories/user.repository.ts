import { CreateUserDto, UpdateUserDto } from "../dtos";
import { UserEntity } from "../entities/user.entity";

export abstract class UserRepository {

  abstract create( createUserDto: CreateUserDto ): Promise<UserEntity>;
  abstract getAll(): Promise<UserEntity[]>;
  abstract findById( id: string ): Promise<UserEntity>;
  abstract updateById( updateUserDto: UpdateUserDto ): Promise<UserEntity>;
  abstract deleteById( id: string ): Promise<UserEntity>;

}