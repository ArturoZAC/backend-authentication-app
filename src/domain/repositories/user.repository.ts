import { CreateUserDto, LoginUserDto, RegisterUserDto, ResetPasswordUserDto, UpdateUserDto } from "../dtos";
import { UserEntity } from "../entities/user.entity";

export abstract class UserRepository {

  abstract create( createUserDto: CreateUserDto ): Promise<UserEntity>;
  abstract getAll(): Promise<UserEntity[]>;
  abstract findById( id: string ): Promise<UserEntity>;
  abstract updateById( updateUserDto: UpdateUserDto ): Promise<UserEntity>;
  abstract deleteById( id: string ): Promise<UserEntity>;

  //Auth
  abstract login( loginUserDto: LoginUserDto): Promise<{ user: UserEntity, token: string}>;
  abstract register( registerUserDto: RegisterUserDto): Promise<UserEntity>;
  abstract changeVerify( userId: string ):Promise<void>;
  abstract verifyPasswordEmail( email: string ): Promise<UserEntity>;
  abstract resetPassword( userId: string, resetPasswordUserDto: ResetPasswordUserDto): Promise<void>;
}