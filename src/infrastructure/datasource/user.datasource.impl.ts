import { prisma } from "../../data/postgres.data";
import { CreateUserDto, CustomError, UpdateUserDto, UserDatasource, UserEntity } from "../../domain";

export class UserDatasourceImpl implements UserDatasource {
  
  public async create(createUserDto: CreateUserDto): Promise<UserEntity> {

    const existUser = await prisma.user.findUnique({ where: { email: createUserDto.email }})
    if( existUser ) throw CustomError.badRequest('Email already exist');

    const user = await prisma.user.create({ data: createUserDto })
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

  updateById(updateUserDto: UpdateUserDto): Promise<UserEntity> {
    throw new Error("Method not implemented.");
  }
  deleteById(id: string): Promise<UserEntity> {
    throw new Error("Method not implemented.");
  }

}