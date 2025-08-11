import { BcryptAdapter } from "../../config/adapters";
import { prisma } from "../../data/postgres.data";
import { CreateUserDto, CustomError, LoginUserDto, UpdateUserDto, UserDatasource, UserEntity } from "../../domain";

export class UserDatasourceImpl implements UserDatasource {

  public async login(loginUserDto: LoginUserDto): Promise<UserEntity> {
    const hasAccount = await prisma.user.findUnique({ where: { email: loginUserDto.email }});
    if ( !hasAccount ) throw CustomError.notFound('User not exist');

    const isMatch = BcryptAdapter.compare( loginUserDto.password, hasAccount.password);
    if ( isMatch ){
      return UserEntity.fromObject( hasAccount );
    }

    throw CustomError.badRequest('Password incorrect');
  }
  
  public async create(createUserDto: CreateUserDto): Promise<UserEntity> {

    const existUser = await prisma.user.findUnique({ where: { email: createUserDto.email }})
    if( existUser ) throw CustomError.badRequest('Email already exist');

    const user = await prisma.user.create({ data: {
      ...createUserDto,
      password: BcryptAdapter.hash( createUserDto.password )
    } })
    if (!user) throw CustomError.internalServer("User could not be created");

    return UserEntity.fromObject(user);
  }

  public async getAll(): Promise<UserEntity[]> {
    const users = await prisma.user.findMany();
    if ( !users ) throw CustomError.notFound('Users do not exist');

    return users.map( user => UserEntity.fromObject(user));
  }

  public async findById(id: string): Promise<UserEntity> {
    const user = await prisma.user.findUnique({ where: { id: id }})
    if( !user ) throw CustomError.notFound(`User with id: ${id} is not found`)

    return UserEntity.fromObject(user);
  }

  public async updateById(updateUserDto: UpdateUserDto): Promise<UserEntity> {
    await this.findById(updateUserDto.id);

    const { id:updatedId , ...rest} = updateUserDto;

    const updatedUser = await prisma.user.update({
      where: { id: updatedId},
      data: rest
    })

    return UserEntity.fromObject(updatedUser);
  }

  public async deleteById(id: string): Promise<UserEntity> {
    await this.findById(id);

    const userDeleted = await prisma.user.delete({ where: { id }})
    console.log({userDeleted});

    return UserEntity.fromObject(userDeleted);
  }

}